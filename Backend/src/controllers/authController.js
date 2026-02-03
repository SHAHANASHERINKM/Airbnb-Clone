const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format"
                });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
                });
            }
            // const salt=await bcrypt.genSalt(10);  //THIS IS PLACED IN MODEL
            // const passwordHash=await bcrypt.hash(password,salt)
            const user = await User.create({ name, email, password, role: "user" })
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role

                },
                token
            });

        }
        catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({
                success: false,
                message: "Server error during signup"
            });

        }

    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide email and password"
                })
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    messsage: "Invalid email or password"
                })
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            if(user.userStatus=="blocked"){
                return res.status(403).json({
                    success: false,
                    message: "Your account is blocked by admin"
                });

            }

            const token = jwt.sign({ id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }

            );

            res.status(200).json({
                success: true,
                message: "Login Successfull",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        }
        catch (error) {
            console.error("Login error", error);
            res.status(500).json({
                success: false,
                message: "Server error"
            });

        }
    },





}




