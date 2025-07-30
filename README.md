<h1 align="center">🧾 QuickBill</h1>

<p align="center">
  A clean and powerful Invoice Management Web App built with the MERN stack.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Node.js-Server-brightgreen?logo=node.js" />
</p>

---

## 🔗 Live Demo

🌐 **Frontend**: [quickbill-xi.vercel.app](https://quickbill-xi.vercel.app)  
⚙️ **Backend**: [quickbill-62sw.onrender.com](https://quickbill-62sw.onrender.com)

---

## 🚀 Features

✅ JWT-based Authentication (with Cookies)  
✅ Create, View & Manage Invoices  
✅ Light/Dark Theme (TailwindCSS)  
🚧 Dashboard with Charts (Coming Soon)  
🚧 PDF Invoice Download (Coming Soon)  
🚧 Search, Filter, Edit & Delete Invoices


## 🛠️ Tech Stack

| Frontend        | Backend         | Database        | Auth            | Deployment      |
|-----------------|------------------|------------------|------------------|------------------|
| React (Vite)    | Node.js + Express | MongoDB (Atlas) | JWT + Cookies    | Vercel + Render  |
| TailwindCSS     | Mongoose         |                  |                  |                  |

---

## 📂 Folder Structure
```
quickbill/
├── client/ # React + Vite frontend
├── server/ # Express backend with MongoDB
└── README.md
```


---

## ⚙️ Setup Instructions

### 📦 Backend

```bash
cd server
npm install
npm run dev
```
## Create .env in server/:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### 💻 Frontend
```
cd client
npm install
npm run dev
```

## Make sure axios.js points to your deployed backend:
```
const API = axios.create({
  baseURL: "https://quickbill-62sw.onrender.com/api",
  withCredentials: true,
});
```

## 👨‍💻 Author
---
Ayush Kumar

GitHub: [Ayush92003](https://github.com/Ayush92003)

LinkedIn: [ayush-kumar-a02950250](https://www.linkedin.com/in/ayush-kumar-a02950250/)
