﻿# olaClone

# Ola Clone Project

## Project Overview
This project is a clone of the Ola application, designed to simulate the core functionalities of a ride-hailing platform. It includes features for users to book rides, view available drivers, track rides in real time, and manage user accounts. The backend is built using **Node.js** and **MongoDB**, while the frontend is developed using **React.js**.

## Features
1. **User Authentication**
   - Login and signup functionality with JWT authentication.
   - Password reset via email.

2. **Ride Booking**
   - Users can book rides by entering pickup and drop-off locations.
   - Fare estimation based on distance.

3. **Real-Time Tracking**
   - Integrated map to track the driver’s location.

4. **Driver Management**
   - Drivers can update their availability status.
   - Assigned rides are visible to drivers.

5. **Admin Dashboard**
   - Admins can monitor ride statuses and manage users and drivers.

## Project Structure
```
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── userController.js
│   │   ├── rideController.js
│   │   └── adminController.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models
│   │   ├── User.js
│   │   ├── Driver.js
│   │   └── Ride.js
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── driverRoutes.js
│   │   └── adminRoutes.js
│   ├── utils
│   │   └── calculateFare.js
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│   └── package.json
└── README.md
```

## Technologies Used
### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication

### Frontend
- **React.js**
- **Redux** for state management
- **Axios** for API calls

### Other Tools
- **Multer** for handling file uploads.
- **Google Maps API** for location services.
- **Socket.io** for real-time tracking.

## Installation
### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ola-clone.git
   ```
2. Navigate to the backend and frontend directories to install dependencies:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Start the frontend:
   ```bash
   npm start
   ```

## Usage
- Open the frontend in your browser at `http://localhost:3000`.
- Use the app to sign up, book rides, or explore the admin panel.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Note**: This is a work-in-progress project. Additional features will be added in future updates.
