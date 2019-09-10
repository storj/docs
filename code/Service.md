# Service

Services handle internal peer logic. Services use databases or other services to fulfill their logic.

Services do not have a life-cycle, usually, which means they must be explicitly shut down. It should be safe to run the same service concurrently in the same process or multiple processes.

Arguments to / return values from services should be hand-crafted Go types, rather than generated protobuf types. Exceptions for this are types that require signatures. This is to ensure that services aren't tied to a specific transport implementation.

## Adding a new service

To add a new service there are few steps:

1. add a new service implementation
2. add a new config definition, if needed
3. add the service to the corresponding peer
3.1. add it to the appropriate subsystem in the peer struct definition
3.2. wire it together in `New`
3.3. call `Close` in `peer.Close`, if needed
4. add config to testplanet

## Implementation

A basic service implementation looks like:

```go
package orders

import (
    ...
)

// DB implements saving order after receiving from storage node
type DB interface {
	// CreateSerialInfo creates serial number entry in database
	CreateSerialInfo(ctx context.Context, serialNumber storj.SerialNumber, bucketID []byte, limitExpiration time.Time) error
	// UseSerialNumber creates serial number entry in database
	UseSerialNumber(ctx context.Context, serialNumber storj.SerialNumber, storageNodeID storj.NodeID) ([]byte, error)
	// UnuseSerialNumber removes pair serial number -> storage node id from database
	UnuseSerialNumber(ctx context.Context, serialNumber storj.SerialNumber, storageNodeID storj.NodeID) error
	...
}

// Config is a configuration struct for orders Service.
type Config struct {
	Expiration time.Duration `help:"how long until an order expires" default:"168h"` // 7 days
}

// Sender sends every interval unsent orders to the satellite.
type Sender struct {
	// common things
	log    *zap.Logger
	config Config
	// dependencies
	satellite signing.Signer
	overlay   *overlay.Service
	orders    DB
	address   *pb.NodeAddress
}

// NewService creates new service for creating order limits.
func NewService(
	log *zap.Logger, satellite signing.Signer, overlay *overlay.Service,
	orders DB, orderExpiration time.Duration, satelliteAddress *pb.NodeAddress,
) *Service {
	return &Service{
		log:              log,
		satellite:        satellite,
		overlay:          overlay,
		orders:           orders,
		satelliteAddress: satelliteAddress,
		orderExpiration:  orderExpiration,
	}
}

// VerifyOrderLimitSignature verifies that the signature inside order limit belongs to the satellite.
//
// NOTE it accepts pb.OrderLimit becase it uses its serialization to verify the signature.
func (service *Service) VerifyOrderLimitSignature(ctx context.Context, signed *pb.OrderLimit) (err error) {
	defer mon.Task()(&ctx)(&err)
	return signing.VerifyOrderLimitSignature(ctx, service.satellite, signed)
}

// Close stops the service.
func (sender *Sender) Close() error {
	// This is usually used to close any opened resources.
	return nil
}
```
