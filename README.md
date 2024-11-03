# Notification Microservice
## Project Overview
The Notification Microservice is an Express.js API that manages notifications for various events such as request creation, request state updates, user authentication, and session closures. This service creates and stores notifications in a MongoDB database and sends email notifications to users using Nodemailer. API documentation is provided through Swagger and OpenAPI. 
## Features

   - Create Notifications: Generates notifications for request creation, request state updates, user authentication, and session closures.
   - Email Notifications: Sends email alerts using Gmail’s SMTP service via Nodemailer.
   - Swagger Documentation: API documentation generated with Swagger, accessible through /api-docs.
   - MongoDB Storage: Uses MongoDB to persist notification data.

## Installation

Install Micro-service Notification Server

```bash
    git clone https://github.com/belzir-studyCase/ms-notification.git
    cd ms-notification
```
Install dependencies:

```bash
    npm install
```

Run Server

```bash
    npm run dev
```


