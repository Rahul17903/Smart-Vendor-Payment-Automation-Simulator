# Smart Vendor Payment Automation Simulator

A MERN stack project that simulates a vendor payment process with features like **invoice upload, duplicate detection, approval rules, early-payment discount suggestions, and reporting dashboard**.  
This project is submitted as part of the assignment.

---

## 🚀 Features
- User **Signup/Login** with JWT authentication
- Upload **Vendor Invoices** (manual form / CSV support)
- **Duplicate Detection** → highlights duplicate invoices
- **Early-Payment Discount Suggestions** (simple hard-coded logic)
- **Approval Rules** → Invoices > ₹1,00,000 require manager approval
- Approve / Reject workflow
- **Dashboard**:
  - Total invoices processed
  - Duplicates detected
  - Estimated money saved
- Responsive UI with **TailwindCSS**
- Backend powered by **Node.js + Express + MongoDB**

---

## 🛠 Tech Stack
**Frontend**: React (Vite), TailwindCSS, Axios, React Router  
**Backend**: Node.js, Express.js, MongoDB, JWT, Bcrypt  
**Deployment**: Vercel (frontend) + Render (backend)

---

## Sample Invoice Data
This section contains a sample CSV file with invoice records. The data is provided for testing and demonstration purposes, so you can easily upload invoices and verify how the system processes them.

## 🔐 Credentials for authentication (for testing)

| Email            | Password  |
| -----------------| ----------|
| rahul@gmail.com  | 123456    |

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Rahul17903/Smart-Vendor-Payment-Automation-Simulator.git
cd Smart-Vendor-Payment-Automation-Simulator

```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/: 

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=yourSecretKey
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Create a .env file inside frontend/:

```bash
VITE_API_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```

📊 Dashboard Preview

- Total invoices processed

- Duplicate detection

- Estimated savings

- Approval status tracking


