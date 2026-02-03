// const jwt = require('jsonwebtoken');
// //const User = require('../models/userModel');

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;



const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) return res.status(401).json({ message: "User not found" });

    // Check if user is blocked
    if (user.userStatus === "blocked") {
      return res.status(403).json({ message: "Your are  blocked by admin" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      userStatus: user.userStatus,
      hostStatus: user.hostStatus
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
