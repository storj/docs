# Chore

Chores handle internal peer logic that needs to happen in regular intervals. Chores use databases or other services to fulfill their logic.

Chores have a lifecycle, which means they must be run and shutdown.

## Adding a new chore

To add a new chore there are few steps:

1. add a new chore implementation
2. add a new config definition, if needed
3. add the chore to the corresponding peer
3.1. add it to the appropriate subsystem in the peer struct definition
3.2. wire it together in `New`
3.3. call `Run` in `peer.Run`
3.3. call `Close` in `peer.Close`
4. add config to testplanet

## Implementation

A basic chore implementation looks like:s

```go
package orders

import (
    ...
)

// DB implements storing orders for sending to the satellite.
type DB interface {
	// Enqueue inserts order to the list of orders needing to be sent to the satellite.
	Enqueue(ctx context.Context, info *Info) error
	// ListUnsent returns orders that haven't been sent yet.
	ListUnsent(ctx context.Context, limit int) ([]*Info, error)
	// ListUnsentBySatellite returns orders that haven't been sent yet grouped by satellite.
	ListUnsentBySatellite(ctx context.Context) (map[storj.NodeID][]*Info, error)

	// Archive marks order as being handled.
	Archive(ctx context.Context, satellite storj.NodeID, serial storj.SerialNumber, status Status) error

	// ListArchived returns orders that have been sent.
	ListArchived(ctx context.Context, limit int) ([]*ArchivedInfo, error)
}

// Config defines configuration for sending orders.
type Config struct {
	Interval time.Duration `help:"duration between sending" default:"1h0m0s"`
	Timeout  time.Duration `help:"timeout for sending" default:"1h0m0s"`
}

// Sender sends every interval unsent orders to the satellite.
type Sender struct {
	// common things
	log    *zap.Logger
	config Config
	// dependencies
	transport transport.Client
	kademlia  *kademlia.Kademlia
	orders    DB

	Loop sync2.Cycle // use cycle to run things in intervals
}

// NewSender creates an order sender.
func NewSender(log *zap.Logger, transport transport.Client, kademlia *kademlia.Kademlia, orders DB, config Config) *Sender {
	return &Sender{
		log:       log,
		transport: transport,
		kademlia:  kademlia,
		orders:    orders,
		config:    config,

		Loop: *sync2.NewCycle(config.Interval),
	}
}

// Run sends orders on every interval to the appropriate satellites.
func (sender *Sender) Run(ctx context.Context) error {
	return sender.Loop.Run(ctx, func(ctx context.Context) error {
		sender.log.Debug("sending")

		ordersBySatellite, err := sender.orders.ListUnsentBySatellite(ctx)
		if err != nil {
			sender.log.Error("listing orders", zap.Error(err))
			return nil
		}

		if len(ordersBySatellite) > 0 {
			var group errgroup.Group
			ctx, cancel := context.WithTimeout(ctx, sender.config.Timeout)
			defer cancel()

			for satelliteID, orders := range ordersBySatellite {
				satelliteID, orders := satelliteID, orders
				group.Go(func() error {

					sender.Settle(ctx, satelliteID, orders)
					return nil
				})
			}
			_ = group.Wait() // doesn't return errors
		} else {
			sender.log.Debug("no orders to send")
		}

		return nil
	})
}

// Close stops the sending service.
func (sender *Sender) Close() error {
	sender.Loop.Stop()
	return nil
}
```
