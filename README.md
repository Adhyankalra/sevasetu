# SevaSetu (MERN + Socket.io)

SevaSetu is a full-stack healthcare web application with **two completely separate services**:

1. **Queue Management System (Hospitals)**
2. **Medicine Finder System (Pharmacies)**

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, Socket.io-client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, CORS, dotenv

## Project Structure

```txt
root/
 ├── client/   # React frontend (Vite + Tailwind)
 ├── server/   # Node.js + Express backend
 └── README.md
```

## Backend API

### Queue APIs

- `POST /api/queue/join`
  - body: `{ "userId": "U123", "department": "General" }`
  - returns queue position

- `GET /api/queue/status/:userId`
  - returns:
    ```json
    {
      "position": 2,
      "peopleAhead": 1,
      "status": "waiting"
    }
    ```

- `GET /api/queue/list`
  - returns all waiting users sorted by `createdAt` (FIFO)

- `POST /api/queue/checkin`
  - marks first waiting user as `checked-in`
  - emits socket event: `queueUpdated`

### Medicine API

- `GET /api/medicine/search?name=paracetamol`
  - returns mocked pharmacy results with distance and maps link

## Setup Instructions

### 1) Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sevasetu
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

### 2) Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and backend at `http://localhost:5000`.

## Real-time Updates

Socket.io is initialized on the server and emits `queueUpdated` whenever queue state changes. The frontend listens to this event and automatically refreshes queue list and status.
