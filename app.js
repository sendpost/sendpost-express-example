require('dotenv').config();
const express = require('express');
const app = express();
const emailService = require('./services/emailService');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SendPost Express Example API' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, htmlBody, textBody } = req.body;

    if (!to || !subject || !htmlBody) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, htmlBody',
      });
    }

    const result = await emailService.sendEmail({
      to,
      subject,
      htmlBody,
      textBody,
    });

    if (result.success) {
      res.json({
        success: true,
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Send a POST request to http://localhost:${PORT}/api/send-email`);
});
