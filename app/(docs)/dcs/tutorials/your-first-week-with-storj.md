---
title: Your first week with Storj
docId: first-week-storj-tutorial
metadata:
  title: Your First Week with Storj DCS - Complete Beginner Tutorial
  description: Comprehensive 7-day tutorial to master Storj DCS fundamentals, from account setup to advanced features
---

{% callout type="note" %}
**Tutorial** - Learning-oriented guide for hands-on skill development
{% /callout %}

Master Storj DCS in your first week with this comprehensive tutorial that takes you from complete beginner to confident user.

## What you'll build

By the end of this tutorial, you'll have:
- A fully configured Storj DCS account
- Multiple buckets with different access levels
- Uploaded and organized files using multiple methods
- A simple web application that uses Storj for storage
- Automated backup processes
- Understanding of costs and optimization

**Time to complete**: 7 days, 1-2 hours per day
**Skill level**: Complete beginner
**Prerequisites**: Computer with internet access

## Day 1: Account setup and first upload

### Create your Storj account

1. **Go to [storj.io](https://storj.io)** and click "Get Started"
2. **Choose your plan**:
   - Free tier: 25GB storage, 25GB bandwidth/month
   - Pro tier: Pay-as-you-use pricing
3. **Complete signup** with email verification
4. **Create your first project** named "learning-storj"

### Set up access credentials

5. **Go to Access page** in the console
6. **Click "Create Access Grant"**
7. **Name it**: "learning-access"
8. **Select permissions**: All permissions for learning
9. **Choose buckets**: All buckets
10. **Set no expiration** for this tutorial
11. **Generate and save** your access grant securely

### Create your first bucket

12. **Go to Buckets page**
13. **Click "Create Bucket"**
14. **Name it**: "my-first-bucket"
15. **Choose a region** close to you
16. **Create the bucket**

### Make your first upload

17. **Click on your bucket** to open it
18. **Click "Upload"** 
19. **Select a small file** (image, document, etc.)
20. **Complete the upload**
21. **View your file** in the browser

**Expected outcome**: You have a working Storj account with your first uploaded file.

### Day 1 verification

- [ ] Account created and verified
- [ ] Project and access grant created
- [ ] First bucket created and accessible
- [ ] File successfully uploaded and viewable
- [ ] Access grant saved securely

## Day 2: Command line basics

### Install Uplink CLI

**Windows**:
```powershell
# Download from GitHub releases
Invoke-WebRequest https://github.com/storj/storj/releases/latest/download/uplink_windows_amd64.exe -OutFile uplink.exe
```

**macOS**:
```bash
brew install uplink
```

**Linux**:
```bash
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip -o uplink.zip
unzip uplink.zip
sudo mv uplink /usr/local/bin/
```

### Configure Uplink

1. **Set up access**:
   ```bash
   uplink access import main-access YOUR_ACCESS_GRANT_HERE
   ```

2. **Test connection**:
   ```bash
   uplink ls
   ```
   You should see your "my-first-bucket"

### Practice basic commands

3. **List bucket contents**:
   ```bash
   uplink ls sj://my-first-bucket
   ```

4. **Upload via command line**:
   ```bash
   uplink cp /local/path/to/file.txt sj://my-first-bucket/uploaded-via-cli.txt
   ```

5. **Download a file**:
   ```bash
   uplink cp sj://my-first-bucket/uploaded-via-cli.txt ./downloaded-file.txt
   ```

6. **Create a new bucket**:
   ```bash
   uplink mb sj://cli-bucket
   ```

**Expected outcome**: You can manage Storj storage from the command line.

### Day 2 verification

- [ ] Uplink CLI installed and configured
- [ ] Can list buckets and files from command line
- [ ] Successfully uploaded file via CLI
- [ ] Successfully downloaded file via CLI
- [ ] Created new bucket via CLI

## Day 3: S3 compatibility and third-party tools

### Get S3-compatible credentials

1. **In Storj console, go to Access page**
2. **Click "Create S3 Credentials"**
3. **Name**: "s3-compatible-access"
4. **Choose permissions and buckets**
5. **Generate credentials**
6. **Copy Access Key and Secret Key**

### Configure AWS CLI

7. **Install AWS CLI** ([instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))

8. **Configure AWS CLI for Storj**:
   ```bash
   aws configure set aws_access_key_id YOUR_STORJ_ACCESS_KEY
   aws configure set aws_secret_access_key YOUR_STORJ_SECRET_KEY
   aws configure set default.region us-east-1
   ```

### Test S3 operations

9. **List buckets**:
   ```bash
   aws s3 ls --endpoint-url https://gateway.storjshare.io
   ```

10. **Upload file**:
    ```bash
    aws s3 cp test-file.txt s3://my-first-bucket/ --endpoint-url https://gateway.storjshare.io
    ```

11. **Create and sync directory**:
    ```bash
    mkdir local-folder
    echo "test content" > local-folder/test.txt
    aws s3 sync local-folder/ s3://cli-bucket/sync-test/ --endpoint-url https://gateway.storjshare.io
    ```

### Try a GUI tool (Cyberduck)

12. **Download and install** [Cyberduck](https://cyberduck.io)
13. **Create new connection**:
    - Protocol: Amazon S3
    - Server: gateway.storjshare.io
    - Access Key ID: Your Storj access key
    - Secret Access Key: Your Storj secret key
14. **Connect and browse** your buckets
15. **Upload/download files** using the GUI

**Expected outcome**: You can use standard S3 tools with Storj.

### Day 3 verification

- [ ] S3-compatible credentials created
- [ ] AWS CLI configured for Storj
- [ ] Successfully used S3 commands with Storj
- [ ] GUI tool (Cyberduck) connected and working
- [ ] Comfortable with multiple access methods

## Day 4: Web integration and sharing

### Create shareable links

1. **In Storj console, select a file**
2. **Click "Share"**
3. **Configure sharing options**:
   - Link expires: Set to 1 week
   - Password protection: Optional
4. **Generate and copy link**
5. **Test link** in private browser window

### Set up CORS for web applications

6. **Go to bucket settings**
7. **Configure CORS policy**:
   ```json
   [
     {
       "allowedHeaders": ["*"],
       "allowedMethods": ["GET", "POST", "PUT"],
       "allowedOrigins": ["http://localhost:3000"],
       "exposeHeaders": ["ETag"]
     }
   ]
   ```

### Build a simple web upload form

8. **Create simple HTML page** (`upload-demo.html`):
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Storj Upload Demo</title>
   </head>
   <body>
       <h1>Upload to Storj</h1>
       <input type="file" id="fileInput">
       <button onclick="uploadFile()">Upload</button>
       <div id="status"></div>
       
       <script src="https://unpkg.com/aws-sdk@2.1.24/dist/aws-sdk.min.js"></script>
       <script>
           AWS.config.update({
               accessKeyId: 'YOUR_ACCESS_KEY',
               secretAccessKey: 'YOUR_SECRET_KEY',
               region: 'us-east-1'
           });
           
           const s3 = new AWS.S3({
               endpoint: 'https://gateway.storjshare.io',
               s3ForcePathStyle: true
           });
           
           function uploadFile() {
               const file = document.getElementById('fileInput').files[0];
               if (!file) return;
               
               const params = {
                   Bucket: 'my-first-bucket',
                   Key: 'web-uploads/' + file.name,
                   Body: file
               };
               
               document.getElementById('status').innerHTML = 'Uploading...';
               
               s3.upload(params, (err, data) => {
                   if (err) {
                       document.getElementById('status').innerHTML = 'Error: ' + err.message;
                   } else {
                       document.getElementById('status').innerHTML = 'Upload successful!';
                   }
               });
           }
       </script>
   </body>
   </html>
   ```

9. **Open page in browser** and test upload

**Expected outcome**: You can share files and integrate Storj into web applications.

### Day 4 verification

- [ ] Created and tested shareable links
- [ ] CORS configured for web access
- [ ] Simple web upload form working
- [ ] Understanding of web integration possibilities

## Day 5: Organization and management

### Organize your data structure

1. **Plan your folder structure**:
   - `personal/photos/`
   - `personal/documents/`
   - `work/projects/`
   - `backups/`

2. **Create organized buckets**:
   ```bash
   uplink mb sj://personal-files
   uplink mb sj://work-files
   uplink mb sj://automated-backups
   ```

3. **Upload files to organized structure**:
   ```bash
   uplink cp family-photo.jpg sj://personal-files/photos/
   uplink cp resume.pdf sj://work-files/documents/
   ```

### Set up versioning

4. **Enable versioning** on important bucket:
   ```bash
   aws s3api put-bucket-versioning \
     --bucket work-files \
     --versioning-configuration Status=Enabled \
     --endpoint-url https://gateway.storjshare.io
   ```

5. **Test versioning** by uploading same file twice:
   ```bash
   echo "Version 1" > test-versioning.txt
   aws s3 cp test-versioning.txt s3://work-files/ --endpoint-url https://gateway.storjshare.io
   
   echo "Version 2" > test-versioning.txt
   aws s3 cp test-versioning.txt s3://work-files/ --endpoint-url https://gateway.storjshare.io
   ```

6. **List versions**:
   ```bash
   aws s3api list-object-versions \
     --bucket work-files \
     --endpoint-url https://gateway.storjshare.io
   ```

### Create lifecycle management strategy

7. **Plan data lifecycle**:
   - Active files: Keep in main buckets
   - Archive files: Move to archive bucket after 6 months
   - Temporary files: Auto-delete after 30 days

8. **Document your data management strategy**

**Expected outcome**: Your data is well-organized with proper versioning and lifecycle planning.

### Day 5 verification

- [ ] Data organized into logical bucket structure
- [ ] Object versioning enabled and tested
- [ ] Understanding of lifecycle management
- [ ] Documentation of your data strategy

## Day 6: Automation and scripting

### Create backup automation script

1. **Create backup script** (`daily-backup.sh`):
   ```bash
   #!/bin/bash
   
   # Configuration
   BACKUP_BUCKET="automated-backups"
   LOCAL_DIRS=("/home/user/documents" "/home/user/photos")
   DATE=$(date +%Y-%m-%d)
   
   # Create date-based folder
   for dir in "${LOCAL_DIRS[@]}"; do
       DIR_NAME=$(basename "$dir")
       echo "Backing up $dir to $BACKUP_BUCKET/$DATE/$DIR_NAME/"
       
       uplink cp --recursive "$dir/" "sj://$BACKUP_BUCKET/$DATE/$DIR_NAME/"
       
       if [ $? -eq 0 ]; then
           echo "Backup of $dir completed successfully"
       else
           echo "Backup of $dir failed"
       fi
   done
   
   echo "Daily backup completed at $(date)"
   ```

2. **Test the backup script**:
   ```bash
   chmod +x daily-backup.sh
   ./daily-backup.sh
   ```

3. **Set up automated scheduling** (cron on Linux/macOS):
   ```bash
   crontab -e
   # Add line: 0 2 * * * /path/to/daily-backup.sh
   ```

### Create sync script for active files

4. **Create sync script** (`sync-work-files.sh`):
   ```bash
   #!/bin/bash
   
   LOCAL_WORK="/home/user/work-projects"
   REMOTE_BUCKET="work-files"
   
   echo "Syncing work files..."
   uplink sync "$LOCAL_WORK/" "sj://$REMOTE_BUCKET/current-projects/"
   
   if [ $? -eq 0 ]; then
       echo "Sync completed successfully at $(date)"
   else
       echo "Sync failed at $(date)"
   fi
   ```

### Monitor usage and costs

5. **Create usage monitoring script**:
   ```bash
   #!/bin/bash
   
   echo "=== Storj Usage Report ==="
   echo "Date: $(date)"
   echo
   
   echo "Buckets and sizes:"
   for bucket in $(uplink ls | grep -v "CREATED" | awk '{print $4}'); do
       if [ ! -z "$bucket" ]; then
           size=$(uplink ls --recursive sj://$bucket | tail -1 | awk '{print $1}')
           echo "$bucket: $size"
       fi
   done
   ```

**Expected outcome**: You have automated backup and sync processes running.

### Day 6 verification

- [ ] Backup automation script created and tested
- [ ] Sync script for active files working
- [ ] Scheduled tasks configured
- [ ] Usage monitoring in place

## Day 7: Cost optimization and advanced features

### Analyze your usage

1. **Check billing information** in Storj console
2. **Review storage and bandwidth usage**
3. **Identify cost optimization opportunities**

### Implement cost optimization

4. **Set up efficient data organization**:
   - Keep frequently accessed files in main buckets
   - Move archives to separate buckets
   - Delete unnecessary temporary files

5. **Optimize transfer patterns**:
   ```bash
   # Use efficient batch operations instead of individual file transfers
   uplink cp --recursive local-folder/ sj://bucket/folder/
   
   # Use compression for large files when possible
   tar -czf archive.tar.gz large-folder/
   uplink cp archive.tar.gz sj://bucket/archives/
   ```

### Explore advanced features

6. **Set up object lock** (if available):
   ```bash
   aws s3api put-object-lock-configuration \
     --bucket important-files \
     --object-lock-configuration ObjectLockEnabled=Enabled \
     --endpoint-url https://gateway.storjshare.io
   ```

7. **Configure bucket notifications** (using webhooks if available)

8. **Test presigned URLs**:
   ```python
   import boto3
   
   s3 = boto3.client('s3',
       endpoint_url='https://gateway.storjshare.io',
       aws_access_key_id='your-access-key',
       aws_secret_access_key='your-secret-key'
   )
   
   # Generate presigned URL
   url = s3.generate_presigned_url(
       'get_object',
       Params={'Bucket': 'my-first-bucket', 'Key': 'shared-file.txt'},
       ExpiresIn=3600  # 1 hour
   )
   print(f"Presigned URL: {url}")
   ```

### Plan your ongoing usage

9. **Document your Storj setup**:
   - Access credentials and their purposes
   - Bucket organization and policies
   - Automation scripts and schedules
   - Cost optimization strategies

10. **Create maintenance checklist**:
    - Weekly: Review usage and costs
    - Monthly: Clean up unnecessary files
    - Quarterly: Review and optimize data organization

**Expected outcome**: You have an optimized, automated Storj setup ready for production use.

### Day 7 verification

- [ ] Usage and costs analyzed
- [ ] Cost optimization implemented  
- [ ] Advanced features explored
- [ ] Documentation completed
- [ ] Maintenance plan established

## Tutorial completion checklist

After completing all 7 days:

### Technical achievements

- [ ] Storj account set up and configured
- [ ] Multiple access methods working (console, CLI, S3-compatible)
- [ ] Data organized in logical bucket structure
- [ ] Automation scripts created and scheduled
- [ ] Web integration demonstrated
- [ ] Cost optimization implemented

### Knowledge gained

- [ ] Understanding of Storj's architecture and benefits
- [ ] Familiarity with different access methods
- [ ] Knowledge of S3 compatibility and third-party tools
- [ ] Web integration capabilities
- [ ] Data organization best practices
- [ ] Automation and scripting skills
- [ ] Cost optimization strategies

### Production readiness

- [ ] Secure credential management
- [ ] Backup and sync processes automated
- [ ] Monitoring and alerting configured
- [ ] Documentation completed
- [ ] Maintenance procedures established

## What's next

Now that you've mastered the basics:

1. **Explore specific use cases**:
   - [Build your first app](docId:build-your-first-app) with Storj integration
   - [Set up multi-region storage](docId:setup-multi-region-storage) for global applications
   - [Migrate from AWS S3](docId:migrate-from-s3) to Storj

2. **Dive deeper into features**:
   - [Optimize upload performance](docId:optimize-upload-performance)
   - [Set up object versioning](docId:setup-object-versioning)
   - [Configure CORS](docId:configure-cors) for web applications

3. **Join the community**:
   - [Storj Forum](https://forum.storj.io)
   - [Discord Community](https://discord.gg/storj)
   - [Documentation](https://docs.storj.io)

Congratulations on completing your first week with Storj! You're now ready to build amazing applications with decentralized cloud storage.

## Related Content

**More Tutorials:**
- [Build Your First App](docId:build-your-first-app-tutorial) - Create a web application with Storj integration

**Next Steps (How-to Guides):**
- [Optimize Upload Performance](docId:optimize-upload-performance) - Speed up your data uploads
- [Configure CORS](docId:configure-cors-how-to) - Set up web application security
- [Migrate from AWS S3](docId:migrate-from-s3) - Switch from S3 to Storj

**Technical Reference:**
- [CLI Commands Reference](docId:cli-reference-001) - Complete command documentation
- [S3 API Reference](docId:s3-api-reference) - API compatibility details

**Understanding Concepts:**
- [Understanding Decentralized Storage](docId:understand-decent-stor) - Learn the fundamentals
- [Storj Architecture Overview](docId:storj-architecture-overview) - How the network works