---
title: Appendix
docId: vood1Lai4OoV3Ooz

metadata:
  title: Appendix
  description: Appendix

weight: 14   
---

## Getting S3 credentials using the AWS console

1. **Visit** <https://s3.console.aws.amazon.com>

2. **Navigate to** *Services* > *IAM*

3. **Open** *Users* and **click** on the *Add user* button

   1. **Set** a username
   2. **Select** the *Programmatic access* option
   3. **Click** on *Next*

4. In the *Set Permissions* page **select** *Attach existing policies directly*

   1. **Select** an existing policy, e.g., *AmazonS3ReadOnlyAccess* or *AmazonS3FullAccess*
   2. or **Create** a new policy that has the *s3:ListAllMyBuckets* permission and at least the *s3:ListBucket* and *s3:GetObject* permissions for each bucket available to the user
   3. **Click** on *Next*

5. **Review** and confirm to create the new user

6. **Download** the CSV file by pressing the corresponding button

7. **Use** the Access key ID and Secret Access key as described in {ref}`user-guide-import-credentials`

## Getting Azure credentials using Azure portal

1. **Visit** <https://portal.azure.com/>
2. **From services, select** *Storage Accounts*
3. **Click on the** *Storage Account* **you want the key for**
4. **In the** *Security + networking* section **click** *Access keys*
5. **Click on the** *Show keys* button
6. **Use** the *Storage account name* and *Key* as described in {ref}`user-guide-azure-native-credentials`

## Getting Google Cloud credentials using the console

1. **Visit** <https://cloud.google.com/>
2. **Go to the** *Service Accounts* page
3. **Select the** *project* **you want to provide access to**
4. **Click the** *email address* **of the service account that you want to create a key for**
5. **Click the** *Keys* tab
6. **Click the** *Add key* **drop-down menu, then select** *Create new key*
7. **Select** *JSON* **as the** *Key type* **and click** *Create*
8. **Use** the *downloaded JSON file* as described in {ref}`user-guide-gcs-native-credentials`
