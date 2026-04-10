# Smart Queue and Navigation System for Government Hospitals

## Team
**Foramaze**

## Abstract
Government hospitals in India face severe inefficiencies in patient management: long physical queues, poor real-time visibility, medicine uncertainty, and difficult on-ground navigation. Patients often arrive at 4 AM just to secure tokens, causing overcrowding and discomfort, especially for elderly and critical patients.

This project proposes a modular web application that digitizes end-to-end patient flow:
- Remote and QR-based queue joining
- Real-time queue updates and smart no-show handling
- QR-based check-in
- Medicine availability tracking at dispensary
- Hospital navigation support (Google Maps-ready integration)
- OTP-based login and future kiosk extension for non-smartphone users
- Nearby government hospital discovery

## Tech Stack
- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Realtime:** Socket.IO
- **Auth:** OTP-based verification
- **Hosting Target:** Vercel (frontend), Node deployment for API

## Repository Structure

```text
smart-hospital-queue/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QueueCard.jsx
│   │   │   ├── QRScanner.jsx
│   │   │   ├── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── QueuePage.jsx
│   │   │   ├── Dispensary.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── queueService.js
│   │   ├── socket/
│   │   │   ├── socket.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│
├── server/
│   ├── config/
│   │   ├── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Queue.js
│   │   ├── Hospital.js
│   │   ├── Medicine.js
│   │   ├── Prescription.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── queueRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── dispensaryRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── queueController.js
│   │   ├── dispensaryController.js
│   ├── services/
│   │   ├── queueService.js
│   │   ├── predictionService.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── sockets/
│   │   ├── queueSocket.js
│   ├── utils/
│   │   ├── qrGenerator.js
│   │   ├── otpService.js
│   ├── server.js
│   ├── package.json
│
├── docs/
│   ├── architecture.png
│   ├── api-docs.md
│   ├── flow-diagram.png
│
├── .env.example
├── README.md
├── .gitignore
```

## Quick Start

### 1) Install dependencies
```bash
npm install
npm --prefix client install
npm --prefix server install
```

### 2) Configure environment
Copy `.env.example` values into your runtime environment.

### 3) Run
```bash
npm --prefix server run dev
npm --prefix client start
```

## Impact
- Reduces waiting time and overcrowding
- Improves transparency in government hospital queues
- Makes care journey easier via navigation and dispensary visibility
- Provides scalable architecture for pilot-to-city expansion
