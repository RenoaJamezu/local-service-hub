# Local Service Hub – Backend API

A RESTful backend API for a local service booking platform where users can request services and providers can manage incoming bookings.

This project is built as a **portfolio-ready full‑stack backend** demonstrating real‑world business logic such as authentication, role-based access, booking workflows, soft deletes, and provider dashboards.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login using **JWT**
* Password hashing with **bcrypt**
* Protected routes using custom auth middleware

### 👤 User Roles

* **User**: can request and cancel services
* **Provider**: can accept or reject service requests

### 🛠 Services

* Providers can create services
* Users can browse and request available services

### 📅 Bookings System

* Users can request services
* Prevents duplicate active bookings (pending / accepted)
* Providers can accept or reject bookings
* Users can cancel bookings (soft delete)

### 📊 Provider Dashboard

* View all bookings
* Filter bookings by status
* View booking statistics (pending, accepted, rejected, cancelled)

---

## 🧠 Business Rules Implemented

* A user **cannot request the same service twice** if there is already a pending or accepted booking
* A user **can request again** if the previous booking was rejected or cancelled
* Only the **service provider** can accept or reject a booking
* Only the **requesting user** can cancel a booking
* Bookings are **soft deleted** using a `cancelled` status

---

## 🧱 Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JWT** (jsonwebtoken)
* **bcrypt**

### Tooling

* **Yarn** (package manager)
* **Nodemon** (development)
* **Morgan** (HTTP request logging)

### Deployment

* Backend: Render
* Frontend: Vercel

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

## ▶️ Running the Project Locally

```bash
# install dependencies
yarn install

# start development server
yarn dev
```

Server will run on:

```
http://localhost:3000
```

---

## 🧪 API Endpoints (Summary)

### Auth

* `POST /auth/register` – Register user
* `POST /auth/login` – Login user

### Services

* `POST /services` – Create service (provider only)
* `GET /services` – List services

### Bookings

* `POST /bookings` – Request service
* `PATCH /bookings/:id/status` – Accept / Reject booking
* `PATCH /bookings/:id/cancel` – Cancel booking (soft delete)
* `GET /bookings/provider` – Provider bookings
* `GET /bookings/provider?status=pending` – Filter bookings
* `GET /bookings/provider/stats` – Provider dashboard stats

---

## 🔮 Future Improvements

* Pagination for booking lists
* MongoDB aggregation for stats
* Reviews & ratings system
* Notifications (email or in-app)

---

## 👨‍💻 Author

Built by a **Junior Full‑Stack Developer** as a portfolio project focused on real‑world backend practices.

---

⭐ If you find this project helpful, feel free to star the repository!
