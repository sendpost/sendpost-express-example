# SendPost Express.js Example

This example demonstrates how to send emails using SendPost in an Express.js application.

## Prerequisites

- Node.js 14 or higher
- A SendPost Sub-Account API Key

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
SENDPOST_API_KEY=your_sub_account_api_key
SENDPOST_FROM_EMAIL=hello@playwithsendpost.io
SENDPOST_FROM_NAME=SendPost
PORT=3000
```

3. Update `.env` with your SendPost Sub-Account API Key

## Run

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Usage

Send a POST request to `http://localhost:3000/api/send-email`:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "htmlBody": "<h1>Hello World!</h1>"
  }'
```

## Notes

- Make sure your sender email domain is verified in your SendPost account
- The example includes error handling and validation
- The email service is modular and reusable
