# API Specification — Route Handlers & Server Actions

## 1. Overview

The application features type-safe REST API endpoints and Server Actions built on Next.js Route Handlers. All payloads are validated using Zod schemas, returning consistent JSON response structures.

### Standard Response Envelope

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address format",
    "details": []
  }
}
```

---

## 2. Endpoints

### 2.1 Fan Club Subscription
- **Route**: `POST /api/fan-club/subscribe`
- **Auth**: Public
- **Rate Limit**: 5 requests / min per IP
- **Request Body**:
  ```json
  {
    "email": "fan@example.com",
    "fullName": "Chinedu Okafor",
    "interests": {
      "music": true,
      "tour": true,
      "merch": false
    }
  }
  ```
- **Response**: `200 OK` on success, `409 Conflict` if email already subscribed.

### 2.2 Booking Inquiries
- **Route**: `POST /api/inquiries/booking`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "contactName": "Sarah Jenkins",
    "organization": "Afro Nation Festival",
    "email": "sarah@afronation.com",
    "phone": "+44 20 7946 0991",
    "eventType": "Festival",
    "proposedDate": "2026-11-20",
    "location": "Portimão, Portugal",
    "budgetRange": "$50,000 - $100,000",
    "message": "We would like to book Ayo Maff for a 45-minute festival headline slot."
  }
  ```
- **Response**: `201 Created`

### 2.3 General Contact
- **Route**: `POST /api/inquiries/contact`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "name": "David Alaba",
    "email": "david@press.ng",
    "subject": "Interview Request — Native Mag",
    "message": "Requesting a 20-minute feature interview ahead of the new release."
  }
  ```
- **Response**: `201 Created`

### 2.4 Order Creation & Verification
- **Route**: `POST /api/orders/create`
- **Request Body**:
  ```json
  {
    "items": [
      { "productId": "prod_01", "variantId": "var_01", "quantity": 1 }
    ],
    "customer": {
      "name": "Tunde Bakare",
      "email": "tunde@example.com",
      "address": "15 Admiralty Way, Lekki Phase 1, Lagos"
    },
    "currency": "NGN"
  }
  ```
- **Response**: `201 Created` with order summary and simulated/live Paystack checkout reference.

### 2.5 Paystack Webhook & Verification
- **Route**: `POST /api/paystack/verify`
- **Auth**: Paystack signature header (`x-paystack-signature`) verified via HMAC SHA-512.
- **Action**: Verifies transaction amount, idempotently marks order as `paid`, and dispatches confirmation email.

### 2.6 Admin Endpoints
- `GET /api/admin/metrics`: Aggregated analytics and submission counters.
- `GET /api/admin/subscribers/export`: Generates downloadable CSV of fan club emails.
- `PATCH /api/admin/inquiries/[id]`: Update inquiry status (`pending`, `contacted`, `confirmed`).
