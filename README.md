# Galhooks
Galhooks is a simple Node.js / Express server used to save and list Unity Cloud builds online. It was made as an internal tool, but should work for any project.

![image](https://user-images.githubusercontent.com/47401343/183262247-86dee139-8c3d-4bc7-aecf-326db9e6f8cd.png)

## Set-up
Galhooks will by default run on port 3000. This can be changed directly in `/bin/www`.

1.
```bash
git clone https://github.com/LiterallyFabian/Galhooks.git
cd Galhooks
npm install
# (set up database from `table.sql`)
# (set your environment variables from `.env.example`)
npm start 
```

2. Head over to your projects integrations page (`https://dashboard.unity3d.com/organizations/--ORG--/projects/--PROJECT UPID--/settings/integrations`) and click "New integration"

3. Select `Webhook`, and select the `Build Success` event.

4. Fill in your webhook URL (see [API](#API)) and authorization secret. Leave SSL/TLS verification enabled. 

## Prereqs
- Node.js >=v10.24.1
- MySQL 

## API


HTTP Method | URI Path | Headers | Description
--- | --- | --- | ---
GET | / | | Returns the table with all builds.
POST | /webhook | Authorization | Adds a build to the database. Unity should be configured to post here.
