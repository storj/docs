# Migrating from Docker CLI to a GUI Install on Windows

## Migrating from Docker CLI to a GUI Install on Windows

1\. Make sure the Docker version is stopped and removed.

2\. Move orders from the data location to the installation folder location (`"%ProgramFiles%\Storj\Storage Node\orders"` by default) (PowerShell):

```aspnet
robocopy /MIR /MOVE D:\Storj\orders "$env:ProgramFiles\Storj\Storage Node\orders"
```

3\. Point to the same exact **storage** folder where you were previously storing the data.&#x20;

{% hint style="warning" %}
Do NOT copy the path from the old `config.yaml` or `source` part of the `--mount` option of your Docker node where the **storage** subfolder was not explicitly included in the path.

It is better to specify the path to the **storage** subfolder with the **Browse...** button.
{% endhint %}

![Specify storage location pointed to existing "storage" folder](<../../../.gitbook/assets/image (43).png>)

4\. Verify the complete path to the correct **storage** folder on your hard drive.

{% hint style="danger" %}
**If you choose a different folder, your previously stored data will not be recognized, and your node will be disqualified**.
{% endhint %}

## Migrating from Docker CLI on Linux to a GUI install on Windows

First you need to transfer both the identity and the data from the Linux installation to the new Windows device: [How do I migrate my node to a new device?](./)

Then you can follow the [Migrating from Docker CLI to a GUI Install on Windows](migrating-from-docker-cli-to-a-gui-install-on-windows.md#migrating-from-docker-cli-to-a-gui-install-on-windows) guide.
