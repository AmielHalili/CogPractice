// lambda/lib/http.js
// Helpers for API Gateway HTTP API (payload format 2.0) request/response shapes.

export const parseBody = (event) => {
  if (!event.body) return {};
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body;
  return raw ? JSON.parse(raw) : {};
};

const respond = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const success = (payload, statusCode = 200) =>
  respond(statusCode, { success: true, ...payload });

export const failure = (message, statusCode = 400) =>
  respond(statusCode, { success: false, message });
