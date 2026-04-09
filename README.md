🏥 Smart Hospital Queue Management System
Redefining patient flow in government hospitals with real-time, intelligent queue management.
🚀 Overview
Government hospitals in India face severe inefficiencies—long queues, overcrowding, lack of real-time information, and poor patient experience.
This project introduces a digitally orchestrated queue system that bridges the gap between online access and on-ground hospital workflows, enabling patients to join queues remotely, track their status live, and move seamlessly through departments.
🎯 Problem Statement
Patients arrive as early as 4 AM to secure tokens
No visibility into waiting time or queue status
Overcrowding leads to discomfort, especially for:
Elderly
Pregnant women
Critically ill patients
No integration between:
Registration
Consultation
Pharmacy
💡 Our Solution
A web-based, real-time queue management platform that:
Allows users to join queues remotely or via QR
Provides live queue position & wait-time estimation
Implements smart queue logic (priority + no-show handling)
Enables QR-based check-in verification
Extends to dispensary (pharmacy) queue system
✨ Key Features
📲 Remote Queue Joining
⏱️ Real-Time Queue Tracking
🧠 Smart Queue Engine
Priority handling
No-show skipping
📍 Department-Based Queueing (OPD, etc.)
🔐 OTP-ready Authentication Structure
💊 Dispensary Flow Integration (Prescription → Medicine Queue)
⚡ Scalable API Architecture
🧠 System Flow
User → Join Queue → Live Status → Check-in → Consultation → Prescription → Dispensary Queue → Medicine Pickup
🏗️ Tech Stack
Backend
Node.js
Express.js
Database
MongoDB (Atlas)
Architecture
REST APIs
MVC Pattern
Service Layer (Queue Logic Engine)
⚙️ API Endpoints
➤ Queue Management
Method Endpoint Description
POST /api/queue/join Join queue
GET /api/queue/status/:userId Get queue status
POST /api/queue/checkin Check-in user
