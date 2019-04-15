# Vanguard Alpha Release - Setup Instructions!

Hello, data storage seekers! We are thrilled you are interested in storing your valuable data on our distributed, resilient, and durable decentralized cloud storage network. We want to thank you for joining the V3 waitlist and for your patience while we build this incredible network. 

We have been building up the available supply of storage capacity and bandwidth on the network for the last two months during the Explorer phase of our alpha.  The Vanguard release will welcome the first clients looking to store data to the network. This release is gated so we will be controlling how many invitations we send and each user will have disk space and egress bandwidth caps of 25 GB per month. We want to ensure you have a great experience during this alpha, and that the network grows at a sustainable pace. Your invitation to join the Vanguard alpha will give you early access to the V3 network to start integrating with our library and build applications with our V3 network as your storage layer. Since this is still an alpha, please use extreme caution with the data you store on the network and make sure you have backups. We want to emphasize that this is an alpha, do NOT store any mission-critical information on the network without a backup elsewhere. We are not guaranteeing backward compatibility or any Service Level Agreements (SLA). 


### Before you begin
- Make sure you have received an email invitation to the Vanguard release. This email will contain a link to a Satellite with an authorization token in the URL, which you will use to create an account. As mentioned before, the Vanguard alpha release is gated, so you may not receive an invitation right away at launch. 


### Creating your Satellite account

1) Click on the link you received in the Vanguard invitation email. This will navigate you to the Mars Satellite account creation page where you can create your account. Once you create an account you will recive an account activate email to confirm it.

2) In the Satellite console, begin by creating a project. Click New Project in the top right corner and fill in the project name and description.

3) Create an API key for your project on the API Keys page. You will need to create an API key to configure your Uplink or use our library. 
*__NOTE:__ API keys are unique to one project, but each project can have multiple API keys.*


#### Setting up your Uplink/ Gateway on the V3 Network!

1) Download the Identity tool binary and create an Identity.

Download the correct binary for your operating system:
- Mac OS: [identity_darwin_amd64.zip](http://storj-v3-alpha-builds.storage.googleapis.com/2f7405a-heads-v0.9.2-go1.12.1/identity_darwin_amd64.zip)
- Linux: [identity_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/2f7405a-heads-v0.9.2-go1.12.1/identity_linux_amd64.zip)
- Raspberry Pi: [identity_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/2f7405a-heads-v0.9.2-go1.12.1/identity_linux_arm.zip)
- Windows Pro: [identity_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/2f7405a-heads-v0.9.2-go1.12.1/identity_windows_amd64.exe.zip)

2) Unzip the file and run the following command to create an identity for the uplink and/or gateway. (this example is for Mac OS, substitute the appropriate identity binary for your OS).

To create an identity for the uplink tool:

```bash
$ ./identity_darwin_amd64 create uplink --difficulty=0
```

To create an identity for the gateway tool:

```bash
$ ./identity_darwin_amd64 create gateway --difficulty=0
```


### Configuring your Uplink CLI


5) Set up your Uplink CLI by following these instructions on GitHub: https://github.com/storj/storj/wiki/Uplink-CLI

The uplink CLI is one of the ways you can interact with the network to upload and download files. 


### Configuring your S3 gateway:

5) Set up your S3 gateway by following these instructions on GitHub: https://github.com/storj/storj/wiki/S3-Gateway

The S3 gateway is our service that mimics the Amazon S3 API using the Tardigrade network.
