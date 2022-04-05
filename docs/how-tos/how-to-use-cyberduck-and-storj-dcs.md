---
description: For simple and open source file storage and management
---

# How to use Cyberduck and Storj DCS

Cyberduck is a free open-source libre server - a small server system which enables you to run your own internet services independently - cloud storage browser for macOS, Windows and Linux that supports FTP and SFTP, WebDAV, and cloud storage such as **Storj DCS** and other cloud storage providers.

Users can leverage the Cyberduck services via the user interface (GUI) or CLI (for Linux), including file transfer by drag and drop and notifications via Growl. It is also able to open some files in external text editors.

Users can choose **Storj DCS** to act as a decentralized cloud storage network target to send files to via the Cyberduck file manager interface, available via Storj's hosted multitenant gateway ([Gateway MT](https://docs.storj.io/dcs/getting-started/gateway-mt/)) that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

In this brief tutorial, we'll go over downloading and setting up Cyberduck to integrate with Storj DCS, facilitating easy and intuitive drag-and-drop file transfer to Storj DCS.

### Downloading Cyberduck

As a free solution, Cyberduck gives users the freedom to run, copy, distribute, study, change and improve the software. Those who wish to pay for Cyberduck will receive a registration key as a contributor. Becoming a contributor registers the installed application to your name, disabling donation prompts after downloading or updating.

As noted, Cyberduck supports Windows, macOS as well as Linux. Users can download Cyberduck by navigating to [https://cyberduck.io/download/](https://cyberduck.io/download/). Here, you can download the given installer for both Windows and macOS.

For those who wish to download via CLI:

#### Windows

{% tabs %}
{% tab title="GUI" %}
```
choco install cyberduck
```
{% endtab %}

{% tab title="CLI" %}
```
choco install duck
```
{% endtab %}
{% endtabs %}

_Requires Chocolatey. See other installation options to download the_ [_MSI installer for Windows_](https://cyberduck.io/download/)_._

#### macOS

```
brew install duck
```

_Requires Homebrew. See other installation options to download an_ [_OS X installer package_](https://cyberduck.io/download/)_._

#### Linux

**RPM Package**

```
echo -e "[duck-stable]\nname=duck-stable\nbaseurl=https://repo.cyberduck.io/stable/\$basearch/\nenabled=1\ngpgcheck=0" | sudo tee /etc/yum.repos.d/duck-stable.repo
sudo yum install duck
```

_Requires Yum Package Manager. See_ [_other installation options_](https://docs.duck.sh/cli/#Linux) _to download DEB and RPM packages._

**DEB Package**

```
echo -e "deb https://s3.amazonaws.com/repo.deb.cyberduck.io stable main" | sudo tee /etc/apt/sources.list.d/cyberduck.list > /dev/null
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FE7097963FEFBE72
sudo apt-get update
sudo apt-get install duck
```

_Requires APT. See_ [_other installation options_](https://docs.duck.sh/cli/#Linux) _to download DEB and RPM packages._

### Using CyberDuck with Storj - Windows

Once the download is complete you'll be able to open the CyberDuck client. By selecting **Open Connection** to the top left, you’ll be able to establish a connection via Cyberduck. By selecting Amazon S3 from the dropdown, you’ll be prompted to fill out the following:

* **Server:**
* **Port:**
* **Access Key ID:**
* **Secret Access Key:**

![](<../.gitbook/assets/image (26).png>)

To configure **Storj DCS** as the decentralized cloud storage network target you’ll need to generate Storj credentials. [_Let’s take a look_](how-to-use-cyberduck-and-storj-dcs.md#generate-credentials-to-the-gateway-mt)_._

### Using CyberDuck with Storj - macOS

Once the download is complete you'll be able to open the CyberDuck client. By selecting the **+** button in the bottom left-hand corner of the client, you'll be able to add a connection bookmark, facilitating the connection between CyberDuck and Storj DCS. Select **Amazon S3** from the drop-down.

![](<../.gitbook/assets/Copy of CyberDuck MAC pt1.png>)

This is where you will add **Server, Access Key ID, and the Secret Access Key** for Storj Gateway MT .

![](<../.gitbook/assets/image (179).png>)

To configure **Storj DCS** as the decentralized cloud storage network target you’ll need to generate Storj credentials. [_Let’s take a look_](how-to-use-cyberduck-and-storj-dcs.md#generate-credentials-to-the-gateway-mt)_._

### Generate Credentials to the Gateway MT

One of the most versatile ways to get up and running with **Storj DCS** is through the [hosted multi tenant S3 Gateway known as GatewayMT](../api-reference/s3-compatible-gateway/).

**Gateway MT offers the following:**

* Encryption, erasure coding, and upload to nodes occur server-side
* Supports parallelism for upload and multi transfer for download
* 1GB upload will result in 1GB of data being uploaded to storage nodes across the network
* Based on S3 standard

Navigate to the [**Access**](../getting-started/satellite-developer-account/access-grants.md) page within your project and then click on **Create Access Grant +**. A modal window will pop up where you should enter a name for this access grant.

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQVLIIMCFtXDE8qzxZ%2F-MYQWpbsk7-KI2L\_YA0c%2FScreen%20Shot%202021-04-16%20at%209.02.50%20AM.png?alt=media\&token=e9af210f-5f94-45ee-ad14-5590d0bfdad7)

Assign the permissions you want this access grant to have, then click on **Continue in Browser**:

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQVLIIMCFtXDE8qzxZ%2F-MYQX4PIukMqd-fIQdkV%2FScreen%20Shot%202021-04-16%20at%209.03.15%20AM.png?alt=media\&token=384df630-92bc-4302-802b-342652825c9e)

{% hint style="info" %}
_If you do not feel comfortable entering this sensitive information into your browser, we understand. Storj does not know or store your encryption passphrase. However, if you are still reluctant to enter your passphrase into our web application, please select “Continue in CLI” and follow_ [_these instructions_](../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) _instead._
{% endhint %}

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQVLIIMCFtXDE8qzxZ%2F-MYQXEVH2joTsdUHaBL1%2FScreen%20Shot%202021-04-16%20at%209.03.34%20AM.png?alt=media\&token=99debf2f-d31a-402e-bf6f-bee088572ebb)

**Generate and Save the Encryption Passphrase.** If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you if you choose "Generate Phrase.") You will need this passphrase later if you want to again access files uploaded with this encryption phrase.

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQXInmQn0RUm82NU3s%2F-MYQak0-ztaNYqXEtOZS%2FScreen%20Shot%202021-04-16%20at%209.03.50%20AM.png?alt=media\&token=1e7ab286-af99-4964-9658-e811888e62e1)

Be sure to download the Access Grant to save it and then click on the **Generate S3 Gateway Credentials** link.&#x20;

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQXInmQn0RUm82NU3s%2F-MYQcC3DlpKlaom3E-gj%2FScreen%20Shot%202021-04-16%20at%209.03.54%20AM.png?alt=media\&token=e59efad0-4cf6-41fe-aaaf-7d5dd68d6a49)

Now click on the **Generate Credentials** button.

![](https://files.gitbook.com/v0/b/gitbook-legacy-files/o/assets%2F-LmlDzFHYn9g\_f2QxmPe%2F-MYQXInmQn0RUm82NU3s%2F-MYQcUv\_UZxoAOmIVAvS%2FScreen%20Shot%202021-04-16%20at%209.04.08%20AM.png?alt=media\&token=39d49b74-5680-46ed-9925-ba5f33248cc6)

Copy your _**Access Key**_, ** **_**Secret Key**_, and ** **_**Endpoint**_ to a safe location.

### Configuring Storj + Cyberduck

Whether using Windows or macOS, you’ll simply add the Storj Gateway S3 credentials into the CyberDuck client to establish the connection. Click the **Open Connection** button to create a new connection.

* First start by selecting S3 from the drop-down menu
* Enter your S3 Gateway Credentials Endpoint for the **Server** selection (**without `https://`**)
* Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection
* Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection

![](<../.gitbook/assets/image (26).png>)

**Click Connect**&#x20;

{% hint style="info" %}
_Use endpoint without `https://`, i.e. **gateway.us1.storjshare.io** in the Cyberduck **Server** entry above, otherwise Cyberduck will revert to WEBDAV (HTTPS) causing a connection error._

As seen here:

![](https://lh6.googleusercontent.com/36wWD3Zfow0ZEyrn3OP-c-wFm\_KPrIEvwOjmtTBMsZtV-\_7USmgYtgrRRXAQ\_Y8BnFGLdpGxGsaqdM49sdhGsxu98Y19\_C8QQGz1tmQl7xBVvKtk0WV5eBxUAmaY0n71-XfYB4Tt)
{% endhint %}

**For macOS:**

Back to the open connection in Cyberduck as we referenced above in [**Using CyberDuck with Storj - macOS**](how-to-use-cyberduck-and-storj-dcs.md#using-cyberduck-with-storj-macos) you now have all the information you need to send files to your **Storj DCS** network.

*   **select your saved bookmark** Here, you'll see the Amazon S3 server window reopen. To move forward, you'll simply just add in your Storj Gateway S3 credentials that we previously configured.

    ![](<../.gitbook/assets/image (179).png>)
* Enter your S3 Gateway Credentials Endpoint for the **Server** selection
* Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection
* Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection

Close the modal window and click the modified bookmark.

If you’ve added in your S3 Gateway Credentials properly, you’ll see your **Storj DCS** buckets and you can now drag and drop files to your **Storj DCS** network seamlessly and easily via the Cyberduck GUI. Congrats!
