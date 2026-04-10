# Smart Hospital Queue API Docs

## Base URL
`/api`

## Auth
- `POST /auth/request-otp` → request OTP
- `POST /auth/verify-otp` → verify OTP

## Queue
- `POST /queue/join` → join queue
- `GET /queue/status/:userId` → queue status
- `POST /queue/checkin` → check-in user

## Dispensary
- `GET /dispensary/medicines` → list medicines and availability

## Hospitals
- `GET /hospitals/nearby` → list nearby government hospitals

## Test
- `GET /test` → health check
- `GET /test/demo-user` → create demo user for local testing
