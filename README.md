# ShelfLife AI - Backend

Backend API for **ShelfLife AI**, developed for the **DYLP Vibe Coding Hackathon 2026**.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- CORS
- dotenv

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Current User API

### Inventory

- Add Product
- Get All Products
- Get Single Product
- Update Product
- Delete Product

### Analytics

- Total Products
- Fresh Products
- Expiring Soon Products
- Expired Products
- Total Inventory Value
- Money at Risk

### Notifications

- Generate Expiry Notifications
- Get Notifications
- Mark Notification as Read
- Delete Notification


## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

### Inventory

| Method | Endpoint |
|--------|----------|
| POST | /api/inventory |
| GET | /api/inventory |
| GET | /api/inventory/:id |
| PUT | /api/inventory/:id |
| DELETE | /api/inventory/:id |

### Analytics

| Method | Endpoint |
|--------|----------|
| GET | /api/analytics |

### Notifications

| Method | Endpoint |
|--------|----------|
| GET | /api/notifications |
| POST | /api/notifications/check |
| PUT | /api/notifications/:id/read |
| DELETE | /api/notifications/:id |
