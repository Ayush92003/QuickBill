# QuickBill 🧾

QuickBill is a full-stack **invoice management application** built with the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to register, create invoices, and manage their billing details securely.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Create and Manage Invoices
- Invoice List with Details
- Responsive UI using React + TailwindCSS
- Backend API using Express.js and MongoDB

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt
- **Deployment:** Vercel (Client), Render (Server)

---

## 📂 Project Structure

QuickBill/
- client/ → React Frontend
- server/ → Express Backend
- README.md


---

## 🚧 Installation (Local Setup)

```bash
### Clone the repository
git clone https://github.com/Ayush92003/quickbill.git
cd quickbill

# Setup backend
cd server
npm install

# Setup frontend
cd ../client
npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

cd server
npm run dev

cd client
npm run dev
```

## Made with 💙 by Ayush Kumar

