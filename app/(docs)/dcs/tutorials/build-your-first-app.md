---
title: Build your first app
docId: build-first-app-storj
metadata:
  title: Build Your First App with Storj DCS
  description: 30-minute tutorial to build a simple file sharing web application using Storj DCS
---

Build a simple file sharing web application using Storj DCS in just 30 minutes. Perfect for developers new to Storj.

## What you'll build

A web application that allows users to:
- Upload files to Storj DCS
- View uploaded files
- Share files with generated links
- Delete files when needed

**Time to complete**: 30 minutes
**Skill level**: Beginner developer
**Prerequisites**: Basic HTML/JavaScript knowledge, Node.js installed

## Prerequisites

- Node.js 16+ installed
- Storj DCS account with project created
- Text editor or IDE
- Web browser

## Step 1: Set up Storj credentials

### Create S3-compatible access

1. **Log in to Storj console**
2. **Go to Access page**
3. **Click "Create S3 Credentials"**
4. **Configure access**:
   - Name: "file-share-app"
   - Permissions: All
   - Buckets: All buckets
   - Expiration: None (for tutorial)
5. **Save Access Key and Secret Key**

### Create a bucket

6. **Go to Buckets page**
7. **Click "Create Bucket"**
8. **Name it**: "file-share-demo"
9. **Choose your preferred region**
10. **Create the bucket**

**Expected result**: You have S3-compatible credentials and a bucket ready.

## Step 2: Set up the project

### Initialize Node.js project

```bash
# Create project directory
mkdir storj-file-share
cd storj-file-share

# Initialize npm project
npm init -y

# Install dependencies
npm install express multer aws-sdk cors dotenv
npm install --save-dev nodemon
```

### Create project structure

```bash
# Create directories
mkdir public uploads

# Create files
touch server.js .env
touch public/index.html public/style.css public/app.js
```

**Expected result**: Project structure is set up with required dependencies.

## Step 3: Configure environment

### Set up environment variables

Create `.env` file:
```env
STORJ_ACCESS_KEY=your_access_key_here
STORJ_SECRET_KEY=your_secret_key_here
STORJ_BUCKET=file-share-demo
STORJ_ENDPOINT=https://gateway.storjshare.io
PORT=3000
```

**Replace the credentials** with your actual Storj S3 credentials from Step 1.

**Expected result**: Environment variables are configured securely.

## Step 4: Build the server

### Create the Express server

Create `server.js`:
```javascript
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS SDK for Storj
const s3 = new AWS.S3({
  accessKeyId: process.env.STORJ_ACCESS_KEY,
  secretAccessKey: process.env.STORJ_SECRET_KEY,
  endpoint: process.env.STORJ_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  region: 'us-east-1'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload file to Storj
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileContent = require('fs').readFileSync(req.file.path);
    const fileName = `${Date.now()}-${req.file.originalname}`;
    
    const params = {
      Bucket: process.env.STORJ_BUCKET,
      Key: fileName,
      Body: fileContent,
      ContentType: req.file.mimetype
    };

    const result = await s3.upload(params).promise();
    
    // Clean up local file
    require('fs').unlinkSync(req.file.path);
    
    res.json({
      success: true,
      fileName: fileName,
      url: result.Location,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// List files
app.get('/files', async (req, res) => {
  try {
    const params = {
      Bucket: process.env.STORJ_BUCKET,
      MaxKeys: 50
    };

    const data = await s3.listObjectsV2(params).promise();
    
    const files = data.Contents.map(file => ({
      name: file.Key,
      size: file.Size,
      lastModified: file.LastModified
    }));

    res.json({ files });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Generate shareable link
app.post('/share/:fileName', async (req, res) => {
  try {
    const params = {
      Bucket: process.env.STORJ_BUCKET,
      Key: req.params.fileName,
      Expires: 60 * 60 * 24 * 7 // 1 week
    };

    const url = s3.getSignedUrl('getObject', params);
    
    res.json({
      shareUrl: url,
      expires: '7 days'
    });
  } catch (error) {
    console.error('Share link error:', error);
    res.status(500).json({ error: 'Failed to generate share link' });
  }
});

// Delete file
app.delete('/files/:fileName', async (req, res) => {
  try {
    const params = {
      Bucket: process.env.STORJ_BUCKET,
      Key: req.params.fileName
    };

    await s3.deleteObject(params).promise();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Expected result**: Server is configured with all necessary API endpoints.

## Step 5: Build the frontend

### Create the HTML structure

Create `public/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storj File Share</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 Storj File Share</h1>
            <p>Upload, share, and manage your files with decentralized storage</p>
        </header>

        <div class="upload-section">
            <div class="upload-area" id="uploadArea">
                <div class="upload-content">
                    <div class="upload-icon">📁</div>
                    <p>Drag & drop files here or click to browse</p>
                    <input type="file" id="fileInput" multiple>
                </div>
            </div>
            <div class="progress-bar" id="progressBar" style="display: none;">
                <div class="progress-fill"></div>
            </div>
        </div>

        <div class="files-section">
            <h2>Your Files</h2>
            <div class="files-list" id="filesList">
                <div class="loading">Loading files...</div>
            </div>
        </div>
    </div>

    <div class="modal" id="shareModal" style="display: none;">
        <div class="modal-content">
            <span class="close" onclick="closeShareModal()">&times;</span>
            <h3>Share File</h3>
            <div class="share-content">
                <p>Your shareable link (expires in 7 days):</p>
                <div class="link-container">
                    <input type="text" id="shareLink" readonly>
                    <button onclick="copyLink()">Copy</button>
                </div>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

### Add CSS styling

Create `public/style.css`:
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 40px;
    color: white;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.upload-section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}

.upload-area {
    border: 3px dashed #ddd;
    border-radius: 8px;
    padding: 60px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.upload-area:hover {
    border-color: #667eea;
    background-color: #f8f9ff;
}

.upload-area.dragover {
    border-color: #667eea;
    background-color: #f0f2ff;
}

.upload-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

#fileInput {
    display: none;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    margin-top: 20px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background-color: #667eea;
    width: 0%;
    transition: width 0.3s ease;
}

.files-section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.files-section h2 {
    margin-bottom: 20px;
    color: #333;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.file-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.file-info {
    flex-grow: 1;
}

.file-name {
    font-weight: 600;
    margin-bottom: 5px;
}

.file-details {
    font-size: 0.9rem;
    color: #666;
}

.file-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.btn-share {
    background-color: #667eea;
    color: white;
}

.btn-delete {
    background-color: #ff6b6b;
    color: white;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
}

.close {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 24px;
    cursor: pointer;
}

.link-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.link-container input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #666;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
}
```

### Add JavaScript functionality

Create `public/app.js`:
```javascript
class FileShareApp {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.filesList = document.getElementById('filesList');
        this.progressBar = document.getElementById('progressBar');
        this.shareModal = document.getElementById('shareModal');
        this.shareLink = document.getElementById('shareLink');
        
        this.initializeEventListeners();
        this.loadFiles();
    }

    initializeEventListeners() {
        // Upload area click
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // File input change
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    }

    async handleFiles(files) {
        for (let file of files) {
            await this.uploadFile(file);
        }
        this.loadFiles();
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        this.showProgress();

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('File uploaded successfully!', 'success');
            } else {
                this.showNotification('Upload failed: ' + result.error, 'error');
            }
        } catch (error) {
            this.showNotification('Upload error: ' + error.message, 'error');
        } finally {
            this.hideProgress();
        }
    }

    async loadFiles() {
        try {
            const response = await fetch('/files');
            const data = await response.json();

            this.renderFiles(data.files);
        } catch (error) {
            console.error('Failed to load files:', error);
            this.filesList.innerHTML = '<div class="error">Failed to load files</div>';
        }
    }

    renderFiles(files) {
        if (files.length === 0) {
            this.filesList.innerHTML = '<div class="empty-state">No files uploaded yet</div>';
            return;
        }

        this.filesList.innerHTML = files.map(file => `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-details">
                        ${this.formatFileSize(file.size)} • 
                        ${new Date(file.lastModified).toLocaleDateString()}
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn btn-share" onclick="app.shareFile('${file.name}')">
                        Share
                    </button>
                    <button class="btn btn-delete" onclick="app.deleteFile('${file.name}')">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    async shareFile(fileName) {
        try {
            const response = await fetch(`/share/${fileName}`, {
                method: 'POST'
            });

            const data = await response.json();
            
            this.shareLink.value = data.shareUrl;
            this.shareModal.style.display = 'block';
        } catch (error) {
            this.showNotification('Failed to generate share link', 'error');
        }
    }

    async deleteFile(fileName) {
        if (!confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            const response = await fetch(`/files/${fileName}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showNotification('File deleted successfully', 'success');
                this.loadFiles();
            } else {
                this.showNotification('Failed to delete file', 'error');
            }
        } catch (error) {
            this.showNotification('Delete error: ' + error.message, 'error');
        }
    }

    showProgress() {
        this.progressBar.style.display = 'block';
        this.progressBar.querySelector('.progress-fill').style.width = '100%';
    }

    hideProgress() {
        setTimeout(() => {
            this.progressBar.style.display = 'none';
            this.progressBar.querySelector('.progress-fill').style.width = '0%';
        }, 1000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showNotification(message, type = 'info') {
        // Simple notification - you could enhance this with a proper notification library
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            z-index: 1001;
            background-color: ${type === 'error' ? '#ff6b6b' : '#51cf66'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for modal
function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    app.showNotification('Link copied to clipboard!', 'success');
}

// Initialize app
const app = new FileShareApp();
```

**Expected result**: Complete frontend with upload, view, share, and delete functionality.

## Step 6: Test your application

### Start the application

```bash
# Add start script to package.json
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"

# Start the development server
npm run dev
```

### Test all features

1. **Open browser** to `http://localhost:3000`
2. **Test file upload**:
   - Drag and drop a file
   - OR click to browse and select a file
   - Verify upload success notification
3. **Test file listing**:
   - Check that uploaded file appears in the list
   - Verify file size and date are displayed
4. **Test file sharing**:
   - Click "Share" button
   - Copy the generated link
   - Test link in private browser window
5. **Test file deletion**:
   - Click "Delete" button
   - Confirm deletion
   - Verify file is removed from list

**Expected result**: All features working correctly with Storj storage.

## Verification checklist

- [ ] Application starts without errors
- [ ] Files can be uploaded via drag & drop
- [ ] Files can be uploaded via file browser
- [ ] Uploaded files appear in the file list
- [ ] Share links are generated and work
- [ ] Files can be deleted successfully
- [ ] UI is responsive and user-friendly

## What you've learned

### Technical skills

- **Storj integration**: Using S3-compatible API with AWS SDK
- **File upload handling**: Multer middleware for multipart uploads
- **Frontend development**: Modern JavaScript with drag & drop
- **API design**: RESTful endpoints for file operations
- **Security**: Environment variables and signed URLs

### Storj concepts

- **S3 compatibility**: Using standard S3 tools and libraries
- **Presigned URLs**: Secure file sharing without credentials
- **Bucket organization**: Organizing files in cloud storage
- **Access management**: Different types of credentials and permissions

## Next steps

### Enhance your application

1. **Add user authentication**:
   - Implement user registration/login
   - User-specific file storage
   - Access control per user

2. **Improve file management**:
   - File versioning support
   - Bulk operations (upload/delete multiple files)
   - File search and filtering

3. **Add advanced features**:
   - Image thumbnail generation
   - File type restrictions
   - Upload progress for large files
   - File encryption/decryption

### Learn more Storj features

- [Object versioning](docId:setup-object-versioning) for file history
- [CORS configuration](docId:configure-cors) for web applications  
- [Performance optimization](docId:optimize-upload-performance) for large files
- [Multi-region deployment](docId:setup-multi-region-storage) for global apps

### Deploy your application

- Deploy to Vercel, Netlify, or Heroku
- Set up production environment variables
- Configure proper error handling and logging
- Add monitoring and analytics

Congratulations! You've built your first application with Storj DCS. You now understand how to integrate decentralized storage into web applications and can build more complex projects.