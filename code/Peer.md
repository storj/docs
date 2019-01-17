# Peer

```
package projectconsole

type DB interface {
	Projects() projects.DB
}

type Config struct {
	Database string
	Public   server.Config
	Private  server.Config
	Projects projects.Config
}

type Peer struct {
	Log      *zap.Logger
	Identity *identity.Full
	DB       DB

	Public  *server.Server
	Private *server.Server

	Projects struct {
		Service   *projects.Service
		Endpoint  *projects.Endpoint
		Inspector *projects.Inspector
	}
}

func New(log *zap.Logger, identity *identity.Full, db DB, config Config) (*Peer, error) {
	peer := &Peer{
		Log: log,
		Identity: identity,
		DB: db,
	}
	var err error

	{ // create the servers
		peer.Public, err = server.NewPublic(peer.Log.Named("public"), identity, config.Public)
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}

		peer.Private, err = server.NewPrivate(peer.Log.Named("private"), identity, config.Private)
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}
	}s

	{ // create a sub-system
		config := config.Projects

		peer.Projects.Service, err = projects.New(peer.Log.Named("projects"), peer.DB.Projects())
		if err != nil {
			return nil, errs.Combine(err, peer.Close())
		}

		peer.Projects.Endpoint = projects.NewEndpoint(peer.Log.Named("projects:endpoint"), peer.Project.Service)
		pb.RegisterProjectsEndpoint(peer.Public.GRPC(), peer.Projects.Endpoint)

		peer.Projects.Inspector = projects.NewInspector(peer.Log.Named("projects:inspector"), peer.Project.Inspector)
		pb.RegisterProjectsEndpoint(peer.Private.GRPC(), peer.Projects.Inspector)
	}

	return peer, nil
}

func (peer *Peer) Run(ctx context.Context) error {
	var group errgroup.Group
	group.Go(func() error {
		return ignoreCancel(peer.Projects.Service.Run(ctx))
	})
	group.Go(func() error {
		return ignoreCancel(peer.Projects.Service.Run(ctx))
	})
	return group.Wait()
}

func (peer *Peer) Close() error {
	if peer == nil {
		return nil
	}

	var errlist errs.Group
	{ // close projects sub-system
		errlist.Add(peer.Projects.Service.Close())
	}

	{ // close servers
		errlist.Add(peer.Public.Close())
		errlist.Add(peer.Private.Close())
	}

	return errlist.Err()
}
```