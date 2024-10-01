/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const app = express();

// Middleware to add custom security headers
app.use((req, res, next) => {
    res.set('X-Frame-Options', 'DENY');
    res.set('Content-Security-Policy', "frame-ancestors 'none'");
    next();
  });

  // Serve static files from the "dist" folder
app.use(express.static(path.join(__dirname, './public')));

// Catch-all handler for serving index.html (for SPA routing)
app.get('**', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Export the app as an HTTP function
exports.app = functions.https.onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
