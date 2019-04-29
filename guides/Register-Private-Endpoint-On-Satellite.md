# Registering a private endpoint on the satellite

1) Create a .proto file for the endpoints you want to have and place in `pkg/pb`
2) Create a folder inside of `satellite/` with the name of your service. IE `satellite/privatething`. Add your server endpoint functions here
3) Register your service on the satellite’s private endpoints by adding it to `satellite/peer.go`
    * Add your server endpoint struct to the `Peer` struct inside of `satellite/peer.go`

```golang
Privatething struct {
    Endpoint *privatething.Endpoint
}
```

    * Register this struct on the satellite’s private endpoints by adding to the `New` function in `satellite/peer.go`

```golang
{ // setup inspector
    log.Debug("Setting up privatething")
    peer.Privatething.Endpoint = privatething.NewEndpoint(
        peer.Log.Named("privatething"),
        // whatever else your privatething needs
    )

        pb.RegisterPrivateThingServer(peer.Server.PrivateGRPC(), peer.Privatething.Endpoint)
}
```

* Obviously you’ll have to change privatething to match what you named it
