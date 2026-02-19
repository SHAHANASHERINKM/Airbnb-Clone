# NestAway 🏡 – Full-Stack Property Booking Platform

NestAway is a full-featured property rental platform where hosts can list their homes and travelers can discover and book unique stays. Built with modern web technologies, it handles everything from user authentication and payment flows to property management and booking administration. Whether you're a host monitoring your listings or a guest searching for your next adventure, the platform provides an intuitive experience backed by a robust backend.

## Quick Links

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Running](#setup--running)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

---

## Features

### For Guests
- **Search & Discovery** – Browse properties with advanced filters (location, dates, price range, amenities)
- **Detailed Property Pages** – See photos, descriptions, amenities, and host information before booking
- **Secure Bookings** – Reserve properties with automatic availability checking and payment integration
- **Wishlist** – Save favorite properties for later
- **Reviews & Ratings** – Rate and review completed stays, see what others think about properties
- **Booking Management** – View your booking history and cancellation options

### For Hosts
- **Easy Listing Creation** – Add properties with up to 5 images (stored on Cloudinary), set room types, prices, and amenities
- **Availability Management** – Block dates when you're unavailable or doing maintenance
- **Dashboard** – Track your properties, bookings, and guest interactions in one place
- **Property Status** – Submit properties for approval before they go live


### For Admins
- **User Management** – View all users, block accounts if needed
- **Host Approval Workflow** – Review and approve/reject host requests
- **Property Moderation** – Approve or reject property listings before they appear publicly
- **Booking Overview** – Monitor all bookings across the platform
- **Cancellation Policies** – Adjust refund policies and thresholds

---

## Tech Stack

**Frontend:**
- React 19 + Vite (fast builds and hot reload)
- Redux Toolkit (state management for auth, properties, wishlist)
- Tailwind CSS (styling)
- Axios (API calls)
- React Router (navigation)
- Heroicons (UI icons)

**Backend:**
- Node.js + Express 5
- MongoDB + Mongoose (database)
- JWT + bcryptjs (authentication & security)
- Cloudinary + multer (image uploads)
- node-cron (automated tasks like booking expiration)

**Infrastructure:**
- CORS enabled for development
- Environment variables via dotenv
- ESLint for code quality

---

## Project Structure

```
AirBnb/
├── Backend/
│   ├── src/
│   │   ├── app.js                    # Express app setup
│   │   ├── config/                   # DB & Cloudinary config
│   │   ├── constants/                # Amenities list
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.js     # Login, register, JWT
│   │   │   ├── propertyController.js # CRUD for properties
│   │   │   ├── bookingController.js  # Booking logic
│   │   │   ├── hostController.js     # Host-specific logic
│   │   │   └── adminController.js    # Admin operations
│   │   ├── middlewares/              # Auth, uploads, role checks
│   │   ├── models/                   # Mongoose schemas
│   │   ├── routes/                   # API endpoints
│   │   ├── cron/                     # Scheduled jobs (auto-expire pending bookings, etc.)
│   │   └── utils/
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Full page components
│   │   │   ├── Home/                 # Landing page
│   │   │   ├── Explore.jsx           # Browse properties
│   │   │   ├── PropertyDetails/      # Single property view
│   │   │   ├── Bookings.jsx          # Guest's bookings
│   │   │   ├── WishList.jsx          # Saved properties
│   │   │   ├── Auth/                 # Login & signup
│   │   │   ├── Host/                 # Host dashboard & property management
│   │   │   └── Admin/                # Admin panels (users, properties, bookings)
│   │   ├── redux/                    # State slices (auth, properties, wishlist)
│   │   ├── routes/                   # Protected route components
│   │   ├── services/                 # API calls (userService, propertyService)
│   │   └── assets/                   # Icons, images
│   ├── vite.config.js                # Build config
│   ├── tailwind.config.js            # Styling config
│   └── package.json
│
└── README.md
```

---

## Setup & Running

### Prerequisites
- Node.js v14+
- MongoDB (Atlas or local)
- Cloudinary account (for image storage)

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Run the backend:
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Frontend runs on `http://localhost:3000`

### Quick Start
1. Start MongoDB
2. `cd Backend && npm run dev`
3. `cd Frontend && npm run dev` (in another terminal)
4. Open http://localhost:3000 in your browser

---

## API Endpoints

All endpoints require the base URL: `http://localhost:5000/api`

**Auth**
- `POST /auth/register` – Sign up new user
- `POST /auth/login` – Log in user
- `POST /auth/logout` – Log out user

**Properties**
- `GET /properties` – Get all approved properties
- `GET /properties/:id` – Get single property
- `POST /properties` – Create property (host only)
- `PUT /properties/:id` – Update property
- `DELETE /properties/:id` – Delete property
- `GET /properties/search` – Search with filters

**Bookings**
- `POST /bookings` – Create booking
- `GET /bookings` – Get user's bookings
- `GET /bookings/:id` – Get booking details
- `PUT /bookings/:id` – Update booking status
- `POST /bookings/:id/cancel` – Cancel booking

**Users**
- `GET /users/profile` – Get user profile
- `PUT /users/profile` – Update profile
- `POST /users/wishlist` – Add to wishlist
- `DELETE /users/wishlist/:propertyId` – Remove from wishlist
- `GET /users/wishlist` – Get wishlist

**Host**
- `POST /host/request` – Request to become host
- `GET /host/properties` – Get my properties
- `GET /host/bookings` – Get my bookings

**Admin**
- `GET /admin/users` – Get all users
- `PUT /admin/users/:id/block` – Block/unblock user
- `GET /admin/hosts` – Get host requests
- `PUT /admin/hosts/:id/approve` – Approve host
- `PUT /admin/hosts/:id/reject` – Reject host
- `GET /admin/properties` – Get all properties
- `PUT /admin/properties/:id/approve` – Approve property
- `PUT /admin/properties/:id/reject` – Reject property
- `GET /admin/bookings` – Get all bookings

---

## Database Schema

**User**
- name, email, password (hashed with bcrypt)
- role: user | host | admin
- userStatus: active | blocked
- hostStatus: active | blocked | pending | rejected

**Property**
- host (ref: User)
- title, description, location
- roomType, propertyType
- maxGuests, beds, bedrooms, bathrooms
- pricePerNight
- images (array, up to 5 on Cloudinary)
- amenities (WiFi, Pool, Kitchen, etc.)
- blockedDate (array of date ranges)
- status: draft | pending | approved | rejected
- rating, reviewCount, isActive

**Booking**
- property, user, host (refs)
- checkIn, checkOut dates
- guests, pricePerNight, totalPrice
- status: pending | confirmed | cancelled | completed
- paymentStatus: pending | paid | failed | refunded
- expiresAt (auto-expire pending bookings)

**Review**
- user, property, booking (refs)
- rating (1–5)
- comment, createdAt

**Wishlist**
- user, property (refs)
- Unique constraint: user + property

**CancellationPolicy**
- fullRefundBeforeDays (e.g., 2 days)
- partialRefundBeforeDays, partialRefundPercent
- updatedBy (admin ref), timestamps

---

## How It Works

**Authentication:** JWT tokens issued on login, verified on protected routes. Passwords hashed with bcrypt.

**Roles:** Three tiers (user, host, admin) with role-based route guards and permission checks.

**Image Uploads:** Properties store up to 5 images on Cloudinary, managed by multer middleware.

**Cron Jobs:** Automated tasks run in the background:
- Expiring pending bookings after a set time  
- Marking completed bookings when checkout date passes

**Availability & Dates:** Hosts can block date ranges. System checks availability when creating bookings.

**Ratings:** After checkout, guests can review properties (1–5 stars). Average rating updates automatically.

## Future Improvements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications for bookings and reviews
- [ ] Google Maps integration for property locations
- [ ] Real-time messaging between guests and hosts
- [ ] SMS notifications
- [ ] Advanced analytics for hosts
- [ ] Mobile app (React Native)


---

Questions or feedback? Feel free to open an issue or reach out. Built with React, Node.js, and MongoDB.
