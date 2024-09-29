const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // For raw body parsing for Stripe
const { handleWebhook } = require('../controllers/HandleHook');

// Stripe requires the raw body to construct the event
router.post('/', bodyParser.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
