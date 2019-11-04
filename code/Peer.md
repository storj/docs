# Peer

Peer is the top-level entity in Storj. In the production network every peer runs in a standalone process (except Satellite, which is many processes). For tests multiple peers may run in a single process.

Peers describe how a particular network participant is setup, wired together and run.

Currently the network contains these peers:

1. Storage Node
2. Uplink
3. Version Control
4. Satellite (the satellite peer is made up of satellite.Core, satellite.API, and satellite.Repairer)

## Lifecycle

In principle we can think of the full flow of Storage Node and Satellite as:

1. Identity of the particular peer class is loaded. This is used to uniquely identify the peer on the network.
2. A connection(s) to the database is made.
3. Peer is created:
3.1. Creation takes identity and database as an argument
3.2. Listeners and servers are started.
3.3. Every subsystem is created one by one:
3.3.1. every sub-system consists of services and endpoints
3.3.2. uses other services or databases as dependencies
3.3.3. endpoints register themselves to the server
4. Peer is started using `Run`, which:
4.1. starts the services,
4.2. starts waiting for network requests.
5. Peer is running until,
6. Peer is stopped via canceling the context used for `Run`.
6.1. This cancels all subsystems in the reverse creation order.
7. Peer is closed and all service and endpoint resources released.
8. Database is closed

Other peers may have a simplified setup.

## Example Peer

Here is an example showing how a Peer works internally and its general layout.

```
package example

// DB is the master database for Example Peer
type DB interface {
	CreateTables() error
	Close() error

	Overlay() overlay.DB
}

// Config is all the configuration parameters for a Example Node
type Config struct {
	Identity identity.Config

	Server  server.Config
	Overlay overlay.Config
}

// Peer is the representation of a Example Node.
type Peer struct {
	// core dependencies
	Log      *zap.Logger
	Identity *identity.FullIdentity
	DB       DB

	Transport transport.Client
	Server    *server.Server

	Overlay struct {
		Service  *overlay.Service
		Endpoint *overlay.Endpoint
	}
}

// New creates a new example Peer
func New(log *zap.Logger, full *identity.FullIdentity, db DB, config Config) (*Peer, error) {
	peer := &Peer{
		Log:      log,
		Identity: full,
		DB:       db,
	}

	var err error
	{
		// setup listener and server
		//
		// here we setup TLS for servers and transport.Client for connecting to other peers.
		
		sc := config.Server
		options, err := tlsopts.NewOptions(peer.Identity, sc.Config)
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}

		peer.Transport = transport.NewClient(options)

		peer.Server, err = server.New(options, sc.Address, sc.PrivateAddress, nil)
		
		// in case of any errors we need to close everything that was already started
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}
	}

	{ // setup overlay
		config := config.Overlay

		// create an overlay service using the database that is retrieved from master database
		peer.Overlay.Service, err = overlay.NewService(peer.DB.Overlay(), config)
		
		// in case of any errors we close everything that was already started
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}

		// create an overlay endpoint, which uses overlay service for domain logic
		peer.Service.Endpoint = overlay.NewEndpoint(peer.Log.Named("overlay:endpoint"), peer.Overlay.Service)
		
		// register overlay endpoint to the server
		pb.RegisterOverlayServer(peer.Server.GRPC(), peer.Overlay.Endpoint)
	}

	return peer, nil
}

// Run runs the peer until it's either closed or it errors.
func (peer *Peer) Run(ctx context.Context) error {
	// setup a errgroup, such that we stop the peer together when one of the endpoint or services fails.
	group, ctx := errgroup.WithContext(ctx)

	// start overlay service as a separate goroutine
	group.Go(func() error {
		return ignoreCancel(peer.Overlay.Service.Run(ctx))
	})

	// start the public server
	group.Go(func() error {
		return ignoreCancel(peer.Server.Run(ctx))
	})

	// wait for termination
	return group.Wait()
}

// we ignore cancellation and stopping errors since they are expected
func ignoreCancel(err error) error {
	if err == context.Canceled || err == grpc.ErrServerStopped || err == http.ErrServerClosed {
		return nil
	}
	return err
}

// Close closes all the resources.
func (peer *Peer) Close() error {
	// error list for collecting all the errors
	var errlist errs.Group

	// close servers, to avoid new connections to closing subsystems
	if peer.Server != nil {
		errlist.Add(peer.Server.Close())
	}

	// stop the service
	if peer.Overlay.Service != nil {
		errlist.Add(peer.Overlay.Service.Close())
	}

	return errlist.Err()
}
```
