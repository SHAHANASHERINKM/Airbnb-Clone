# 🏠 AirBnb Clone - Full-Stack Application

A modern, full-featured Airbnb clone built with React and Node.js, featuring property rentals, booking management, user authentication, and admin controls.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Key Features Explained](#key-features-explained)
- [Contributing](#contributing)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure authentication with JWT tokens
- **Password Hashing** - Bcrypt-based password encryption
- **Role-Based Access Control** - Three user roles: User, Host, Admin
- **Protected Routes** - Role-specific route protection for sensitive operations

### 🏠 Property Management
- **List Properties** - Hosts can create and manage property listings
- **Property Details** - Comprehensive property information including:
  - Multiple images (up to 5) with Cloudinary integration
  - Room types (entire place, private room, shared room)
  - Property types (house, apartment, villa, hotel, guesthouse)
  - Amenities selection (WiFi, Pool, Kitchen, etc.)
  - Guest capacity and room/bed/bathroom counts
  - Pricing per night
  - Special instructions for guests
- **Property Status** - Draft, Pending Approval, Approved, Rejected
- **Blocked Dates** - Hosts can block dates when property is unavailable

### 🗓️ Booking System
- **Search & Filter** - Find properties by location, dates, and filters
- **Availability Check** - Real-time availability checking
- **Booking Confirmation** - Secure booking with payment flow
- **Booking Status Tracking** - Pending, Confirmed, Cancelled, Completed
- **Payment Processing** - Integration-ready payment system
- **Booking Expiration** - Automated expiration of pending bookings (via cron job)
- **Booking Completion** - Automatic status update when checkout date passes (via cron job)

### ❤️ Wishlist & Reviews
- **Add to Wishlist** - Users can save favorite properties
- **Reviews & Ratings** - Rate properties (1-5 stars) after completed bookings
- **Rating Aggregation** - Automatic calculation of average property ratings

### 💰 Cancellation Policy
- **Flexible Policies** - Dynamic cancellation refund policies
- **Refund Tiers**:
  - Full refund - Configurable days before check-in
  - Partial refund - Configurable percentage and timing
  - No refund - If cancelled too close to check-in
- **Admin Control** - Admins can update cancellation policies

### 👨‍💼 Host Management
- **Host Requests** - Users can request to become hosts
- **Host Approval** - Admins approve or reject host requests
- **Host Status Tracking** - Active, Blocked, Pending, Rejected
- **Dashboard** - Hosts view their properties and bookings
- **Booking Management** - Track guest bookings and details

### 🛡️ Admin Dashboard
- **User Management** - View and manage all users
- **User Blocking** - Block/unblock users as needed
- **Host Management** - Review and approve host requests
- **Property Approval** - Review pending properties before approval
- **Property Management** - View all properties and their status
- **Booking Management** - Monitor all bookings in the system
- **Analytics** - View ratings and review counts

### 🌐 User Features
- **Browse Properties** - Explore all approved properties
- **Advanced Filtering** - Filter by location, price range, amenities
- **Property Details** - View full property information with images
- **Booking History** - View personal booking history
- **User Profile** - Manage user account information

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0 with Vite
- **State Management**: Redux Toolkit 2.11.2
- **HTTP Client**: Axios 1.13.4
- **Routing**: React Router DOM 7.13.0
- **Styling**: Tailwind CSS 3.4.1
- **UI Icons**: Heroicons 2.2.0
- **Build Tool**: Vite 7.2.4

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Security**: bcryptjs 3.0.3
- **File Storage**: Cloudinary with multer
- **Task Scheduling**: node-cron 4.2.1
- **Environment**: dotenv 17.2.3
- **CORS**: enabled for development

### Development Tools
- **Frontend Linting**: ESLint
- **Frontend Building**: PostCSS & Autoprefixer
- **Backend Server**: Nodemon (auto-reload in development)

---

## 📁 Project Structure

```
AirBnb/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app initialization
│   │   ├── config/
│   │   │   ├── cloudinary.js      # Cloudinary configuration
│   │   │   └── db.js              # MongoDB connection
│   │   ├── constants/
│   │   │   └── amenties.js        # Available amenities list
│   │   ├── controllers/           # Business logic
│   │   │   ├── authController.js  # Auth operations
│   │   │   ├── userController.js  # User operations
│   │   │   ├── hostController.js  # Host operations
│   │   │   ├── bookingController.js # Booking operations
│   │   │   └── adminController.js # Admin operations
│   │   ├── middlewares/           # Custom middleware
│   │   │   ├── authMiddleware.js  # JWT verification
│   │   │   ├── roleMiddleware.js  # Role-based access control
│   │   │   ├── hostBlockMiddleware.js # Host blocking logic
│   │   │   └── cloudinaryUpload.js # Image upload handling
│   │   ├── models/                # Database schemas
│   │   │   ├── userModel.js       # User schema
│   │   │   ├── propertyModel.js   # Property schema
│   │   │   ├── bookingModel.js    # Booking schema
│   │   │   ├── reviewModel.js     # Review schema
│   │   │   ├── wishlistModel.js   # Wishlist schema
│   │   │   └── cancellationPolicyModel.js # Policy schema
│   │   ├── routes/                # API endpoints
│   │   │   ├── index.js           # Route aggregator
│   │   │   ├── auth.routes.js     # Auth endpoints
│   │   │   ├── user.routes.js     # User endpoints
│   │   │   ├── host.routes.js     # Host endpoints
│   │   │   ├── booking.routes.js  # Booking endpoints
│   │   │   └── admin.routes.js    # Admin endpoints
│   │   ├── cron/                  # Scheduled tasks
│   │   │   ├── expiredBookings.js # Expire pending bookings
│   │   │   └── completedBookings.js # Mark bookings complete
│   │   └── utils/                 # Utility functions
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   ├── index.css              # Global styles
│   │   ├── App.css                # App styles
│   │   ├── components/            # Reusable components
│   │   │   ├── Layout.jsx         # Main layout wrapper
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── SearchBar.jsx      # Property search
│   │   │   ├── PropertyCard.jsx   # Property card component
│   │   │   ├── PropertyGrid.jsx   # Grid of properties
│   │   │   ├── CategoryBanner.jsx # Category display
│   │   │   └── FilterModel.jsx    # Search/filter modal
│   │   ├── pages/                 # Page components
│   │   │   ├── Home/              # Landing page
│   │   │   ├── Explore.jsx        # Property exploration
│   │   │   ├── FilteredList.jsx   # Filtered search results
│   │   │   ├── PropertyDetails/   # Single property view
│   │   │   ├── Bookings.jsx       # User bookings
│   │   │   ├── WishList.jsx       # Saved properties
│   │   │   ├── Auth/              # Login & Signup
│   │   │   ├── Confirm&Pay/       # Payment confirmation
│   │   │   ├── Host/              # Host dashboard
│   │   │   │   ├── Dashboard.jsx  # Host overview
│   │   │   │   ├── AddProperty.jsx# Add new property
│   │   │   │   ├── Property.jsx   # Manage properties
│   │   │   │   └── HostBookings.jsx # Host booking view
│   │   │   └── Admin/             # Admin dashboard
│   │   │       ├── AdminDashboard.jsx # Overview
│   │   │       ├── UsersList.jsx  # Manage users
│   │   │       ├── HostList.jsx   # Manage hosts
│   │   │       ├── HostRequests.jsx # Host approvals
│   │   │       ├── Properties.jsx # All properties
│   │   │       ├── BookingManagement.jsx # All bookings
│   │   │       └── PropertyView.jsx # Property details
│   │   ├── services/              # API service layer
│   │   │   ├── Api.js             # Axios configuration
│   │   │   ├── userService.js     # User API calls
│   │   │   └── propertyService.js # Property API calls
│   │   ├── redux/                 # State management
│   │   │   ├── store.js           # Redux store config
│   │   │   └── slices/            # Redux reducers
│   │   │       ├── authSlice.js   # Auth state
│   │   │       ├── propertySlice.js # Property state
│   │   │       └── wishlistSlice.js # Wishlist state
│   │   ├── routes/                # Route guards
│   │   │   ├── UserRoutes.jsx     # Protect user routes
│   │   │   ├── HostRoutes.jsx     # Protect host routes
│   │   │   └── AdminRoutes.jsx    # Protect admin routes
│   │   └── assets/
│   │       └── icons/             # SVG/icon files
│   ├── public/                    # Static assets
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── eslint.config.js           # ESLint rules
│   └── package.json
│
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account (for image storage)
- npm or yarn package manager

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd Backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Verify Configuration Files**
   - Check `src/config/cloudinary.js` for Cloudinary setup
   - Check `src/config/db.js` for MongoDB connection

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Verify Configuration**
   - Check `src/services/Api.js` for API endpoint configuration

---

## ▶️ Running the Application

### Backend Server

```bash
cd Backend

# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend will start on `http://localhost:5000` by default.

### Frontend Application

```bash
cd Frontend

# Development server (with hot reload)
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The frontend will start on `http://localhost:3000` by default (Vite's default).

### Accessing the Application

- **User Interface**: http://localhost:3000
- **API Base URL**: http://localhost:5000/api

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id/wishlist` - Get user wishlist
- `POST /api/users/:id/wishlist` - Add to wishlist
- `DELETE /api/users/:id/wishlist/:propertyId` - Remove from wishlist

### Property Endpoints
- `GET /api/properties` - Get all approved properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property (Host only)
- `PUT /api/properties/:id` - Update property (Host only)
- `DELETE /api/properties/:id` - Delete property (Host only)
- `GET /api/properties/search` - Search and filter properties

### Booking Endpoints
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking

### Host Endpoints
- `POST /api/host/request` - Request to become host
- `GET /api/host/properties` - Get host's properties
- `GET /api/host/bookings` - Get host's bookings
- `PUT /api/host/profile` - Update host profile
- `GET /api/host/stats` - Get host statistics

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/unblock user
- `GET /api/admin/hosts` - Get all hosts
- `PUT /api/admin/hosts/:id/approve` - Approve host request
- `PUT /api/admin/hosts/:id/reject` - Reject host request
- `GET /api/admin/properties` - Get all properties
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/policies` - Get cancellation policies
- `PUT /api/admin/policies` - Update cancellation policies

---

## 🗄️ Database Models

### User Model
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - Role type (user, host, admin)
- `userStatus` - Account status (active, blocked)
- `hostStatus` - Host request status (active, blocked, pending, rejected)
- `hostRequestedAt` - Timestamp of host request
- `timestamps` - Created and updated dates

### Property Model
- `host` - Reference to host user
- `title` - Property title
- `description` - Detailed description
- `location` - Property location/address
- `roomType` - entire, private, or shared
- `propertyType` - house, apartment, villa, hotel, guesthouse
- `maxGuests` - Maximum guest capacity
- `beds`, `bedrooms`, `bathrooms` - Room counts
- `pricePerNight` - Nightly rate
- `images` - Array of image objects (URL & public_id)
- `amenities` - Array of selected amenities
- `instructions` - Special instructions for guests
- `blockedDate` - Array of blocked date ranges
- `status` - draft, pending, approved, rejected
- `rating` - Average rating
- `reviewCount` - Number of reviews
- `isActive` - Property availability status

### Booking Model
- `property` - Reference to property
- `user` - Reference to guest user
- `host` - Reference to host user
- `checkIn` - Check-in date
- `checkOut` - Check-out date
- `guests` - Number of guests
- `pricePerNight` - Booking price per night
- `totalPrice` - Total booking amount
- `status` - pending, confirmed, cancelled, completed
- `paymentStatus` - pending, paid, failed, refunded
- `expiresAt` - Expiration timestamp for pending bookings

### Review Model
- `user` - Reference to reviewing user
- `property` - Reference to property
- `booking` - Reference to booking
- `rating` - 1-5 star rating
- `comment` - Review text
- `createdAt` - Review creation date

### Wishlist Model
- `user` - Reference to user
- `property` - Reference to property
- Unique constraint on user + property combination

### Cancellation Policy Model
- `fullRefundBeforeDays` - Days before check-in for full refund
- `partialRefundBeforeDays` - Days before check-in for partial refund
- `partialRefundPercent` - Refund percentage (e.g., 50%)
- `updatedBy` - Admin who updated the policy
- `timestamps` - Created and updated dates

---

## 🔑 Key Features Explained

### JWT Authentication
The application uses JWT (JSON Web Tokens) for secure authentication. Tokens are issued on login and verified on protected routes through the `authMiddleware.js`.

### Role-Based Access Control (RBAC)
Three roles with different permissions:
- **User**: Browse properties, make bookings, leave reviews, manage wishlist
- **Host**: List properties, manage bookings, view property analytics
- **Admin**: Manage all entities, approve properties and hosts, update policies

### Image Management
Properties support up to 5 images stored on Cloudinary. The `cloudinaryUpload.js` middleware handles file processing and storage.

### Cron Jobs
- **Expired Bookings**: Automatically expire pending bookings after a certain time
- **Completed Bookings**: Automatically mark bookings as completed when checkout date passes

### Search & Filter
Users can filter properties by:
- Location
- Check-in/Check-out dates
- Guest count
- Price range
- Amenities

---

## 🤝 Contributing

To contribute to this project:

1. Create a new branch: `git checkout -b feature/YourFeatureName`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/YourFeatureName`
4. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.

---

## 💬 Support

For issues, questions, or suggestions, please create an issue in the project repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
