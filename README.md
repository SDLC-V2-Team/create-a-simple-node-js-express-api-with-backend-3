# Health Check Service

A simple Express.js API with a single `GET /health` endpoint returning HTTP 200 and JSON `{ "status": "ok" }`.

## Quick Start

```bash
npm install
npm start
```

The server will start on port 3000 (or the `PORT` environment variable).

## Test

```bash
npm test
```

## API

### `GET /health`

- **Response 200**: `{"status": "ok"}`
- **Content-Type**: `application/json`
