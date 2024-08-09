const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());

// Initialize the Firebase Admin SDK with environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines with actual newlines
  }),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Endpoint to send a notification
app.post('/sendNotification', (req, res) => {
  console.log("dsfdfdfdf")
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch(error => {
      console.log('Error sending message:', error);
      res.status(500).send('Error sending notification');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
