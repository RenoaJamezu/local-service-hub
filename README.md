# Local Service Hub

A full-stack service booking platform where users can discover and request local services, and providers can manage their offerings and incoming bookings.

This project is a **portfolio-ready full-stack application** demonstrating real-world business logic such as authentication, role-based access control, booking workflows, soft deletes, provider dashboards, and modern React architecture.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login using **JWT**
* Password hashing with **bcrypt**
* Protected routes using custom auth middleware
* Get current user profile (me endpoint)

### 👤 User Roles

* **User**: can browse, request, and cancel services
* **Provider**: can create, update, delete services and manage booking requests

### 🛠 Services

* Providers can create services with title, description, price, and category
* Providers can update service details (title, description, price, category)
* Providers can toggle service status (active/inactive)
* Providers can delete services (soft delete)
* Users can browse all active services
* Services automatically exclude those with active bookings by the user
* Service query filtering based on user role

### 📅 Bookings System

* Users can request services with optional messages
* Prevents duplicate active bookings (pending / accepted)
* Providers can accept or reject bookings
* Users can cancel pending bookings (soft delete)
* Only pending bookings can be accepted, rejected, or cancelled
* Role-based booking visibility (users see their requests, providers see their received bookings)

### 📊 Dashboard & Statistics

* **Provider Dashboard**:
  * View all incoming booking requests
  * Real-time statistics (pending, accepted, rejected, cancelled counts)
  * Accept or reject pending bookings
  * View booking history with user details
* **User Dashboard**:
  * Browse available services with search functionality
  * View service details (provider, price, category)
  * Request services directly from the dashboard
  * Automatic filtering of already-requested services

### 🔍 Additional Features

* Soft delete for services and bookings (status-based)
* Query pre-hooks to exclude deleted services
* Population of related data (user, provider, service details)
* Timestamp tracking for all resources
* Message support for booking requests

---

## 🧠 Business Rules Implemented

### Booking Rules

* A user **cannot request the same service twice** if there is already a pending or accepted booking
* A user **can request again** if the previous booking was rejected or cancelled
* Services with active bookings (pending/accepted) are **automatically hidden** from the user's service list
* Only **pending bookings** can be accepted, rejected, or cancelled
* Bookings are **soft deleted** using a `cancelled` status instead of being removed from the database

### Authorization Rules

* Only the **service provider** (owner) can accept or reject a booking
* Only the **requesting user** (creator) can cancel their own booking
* Only the **service owner** can update service details (title, description, price, category)
* Only the **service owner** can update service status (active/inactive)
* Only the **service owner** can delete their own services
* Role-based middleware enforces **user** and **provider** permissions on specific endpoints

### Service Rules

* Only **providers** can create services
* Services require all fields: title, description, price (must be a number), and category
* Service status can only be set to **"active"** or **"inactive"** (rejected values throw errors)
* Services are **soft deleted** using a `deleted` status
* Deleted services are automatically excluded from queries via Mongoose pre-find hooks
* **Users** only see active services (excluding inactive and deleted ones)
* **Providers** see their own services (both active and inactive, excluding deleted)

### Data Visibility Rules

* **Users** see only their own booking requests
* **Providers** see only bookings for their services
* Statistics are **role-scoped** (users get their stats, providers get theirs)
* All bookings and services are sorted by **creation date (newest first)**

### Validation Rules

* Status updates validate against allowed enum values only
* Price must be a valid number during service creation
* JWT authentication required for all protected routes
* User role verification performed at the database level for authorization checks

---

## 🧱 Tech Stack

### Backend

* **Node.js** – Runtime environment
* **Express.js** – Web framework
* **TypeScript** – Type-safe JavaScript
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ODM

### Frontend

* **React** – UI library
* **TypeScript** – Type-safe JavaScript
* **Vite** – Build tool and dev server
* **React Router DOM** – Client-side routing
* **Tailwind CSS** – Utility-first CSS framework
* **Axios** – HTTP client
* **React Hot Toast** – Toast notifications
* **React Icons** – Icon library

### Frontend Architecture

* **Context API** – Global state management (Auth, Booking, Service contexts)
* **Custom Hooks** – Reusable logic (`useAuth`, `useBooking`, `useService`)
* **Component Composition** – Modular UI components
* **Protected Routes** – Role-based route protection

### Authentication & Security

* **JWT** (jsonwebtoken) – Token-based authentication
* **bcrypt** – Password hashing

### Styling & UI

* **Tailwind CSS** – Utility-first styling
* **class-variance-authority** – Component variants
* **clsx** & **tailwind-merge** – Conditional class merging

### Development Tools

* **Yarn** – Package manager
* **Nodemon** – Backend hot reload
* **ts-node-dev** – TypeScript execution
* **ESLint** – Code linting
* **Morgan** – HTTP request logging
* **SWC** – Fast React refresh

### Deployment

* Backend: Render
* Frontend: Vercel

### CI/CD

* **Automated Builds** – Vercel and Render automatically build on every push to GitHub
* **Build Verification** – Both platforms verify TypeScript compilation and dependencies
* **Automatic Deployment** – Successful builds are automatically deployed to production
* **GitHub Integration** – Build status visible directly in GitHub pull requests and commits

---

## 🔑 Environment Variables

### Backend

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## ▶️ Running the Project Locally

### Backend

```bash
# navigate to backend directory
cd backend

# install dependencies
yarn install

# start development server
yarn dev
```

Server will run on:

```
http://localhost:3000
```

### Frontend

```bash
# navigate to frontend directory
cd frontend

# install dependencies
npm install

# start development server
npm run dev
```

Server will run on:

```
http://localhost:5173
```

---

## 🧪 API Endpoints (Summary)

### Auth

* `POST /api/auth/signup` – Register user
* `POST /api/auth/login` – Login user
* `GET /api/auth/me` – Get current user (protected)

### Services

* `GET /api/services` – List all services (protected)
* `POST /api/services` – Create service (provider only)
* `PUT /api/services/:id/delete` – Delete service (provider only)
* `PUT /api/services/:id/update-status` – Update service status (provider only)
* `PUT /api/services/:id/update-details` – Update service details (provider only)

### Bookings

* `GET /api/bookings` – Get bookings (protected)
* `GET /api/bookings/stats` – Get booking statistics (protected)
* `POST /api/bookings` – Create booking (user only)
* `PUT /api/bookings/:id/status` – Accept/Reject booking (provider only)
* `PUT /api/bookings/:id/cancel` – Cancel booking (user only)

---

## 🔮 Future Improvements

### Core Features

* **Pagination** – Add pagination for booking and service lists to improve performance with large datasets
* **Search & Filtering** – Implement backend search functionality for services by title, category, or provider name (UI already has search input)
* **Category Management** – Add predefined categories or category CRUD operations instead of free-text input
* **User Profiles** – Add profile pages with avatar, bio, contact information, and edit functionality

### Enhanced Functionality

* **Reviews & Ratings System** – Allow users to rate and review completed services
* **Booking History** – Add detailed booking history with date ranges and export functionality
* **Service Availability** – Add scheduling/calendar feature for providers to set available time slots
* **Real-time Notifications** – Implement WebSocket or Socket.io for instant booking updates
* **Email Notifications** – Send email confirmations for booking requests, acceptances, and cancellations
* **Price Filtering** – Add min/max price range filters for service browsing

### Advanced Features

* **Payment Integration** – Integrate Stripe or PayPal for secure payments
* **Multi-step Booking** – Add booking flow with date/time selection and custom requirements
* **Provider Verification** – Add verification badge system for trusted providers
* **Geolocation** – Add location-based service discovery with maps integration
* **Messaging System** – In-app chat between users and providers
* **MongoDB Aggregation** – Replace manual stats calculation with aggregation pipelines for better performance

### Developer Experience

* **Testing** – Add unit and integration tests using Jest and Supertest
* **API Documentation** – Generate Swagger/OpenAPI documentation
* **Input Validation** – Add comprehensive validation using Zod or Joi
* **Rate Limiting** – Implement rate limiting to prevent API abuse
* **Logging** – Add structured logging with Winston or Pino
* **GitHub Actions** – Add custom workflows for running tests before deployment and checking code quality on pull requests

---

## 👨‍💻 Author

Built by **Lenor James Jamero**, a **Junior Full‑Stack Developer** passionate about creating practical solutions and learning modern web technologies.

### About This Project

This full-stack application was built as a portfolio project to demonstrate:

* RESTful API design and implementation
* Role-based access control and authentication
* Complex business logic and data relationships
* Modern frontend architecture with React and TypeScript
* Clean code practices and project organization

---

⭐ If you find this project helpful, feel free to star the repository!
