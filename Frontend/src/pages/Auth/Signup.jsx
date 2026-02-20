import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../redux/store";
import logo from "../../assets/logo.svg";
import { signup } from "../../services/userService";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        let newError = {};
        if (!name) {
            newError.name = "Name is required";
        }

        if (!email) newError.email = "Email is required";
        else if (!emailRegex.test(email)) newError.email = "Invalid email format";

        if (!password) newError.password = "Password is required";
        else if (!passwordRegex.test(password))
            newError.password = "Password must contain uppercase, lowercase, number, special char";

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const result = await signup({ email, password, name });
            console.log(result);

            dispatch(loginSuccess(result));
            console.log("Redux state after login:", store.getState().auth);

            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.token);
            if (result.success) {
                alert("Login successfull");
                if (result.user.role === "admin") {
                    navigate("/admin/dashboard")
                }
                else {
                    navigate("/");
                }

            }

        } catch (err) {
            console.log("Full error:", err);
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                "Server error. Check backend.";
            alert(message);
        }
    };

    return (
        <div className="grid md:grid-cols-2 min-h-screen  gap-7">
            <div className="w-full flex flex-col justify-center items-center  ">
                <img src={logo} className="w-16 h-16" />
                <h1 className="text-6xl font-semibold text-primary tracking-wide font-serif">
                    NestAway
                </h1>

                <p className="mt-4 text-lg text-gray-500 font-medium tracking-wide">
                    Live in your destiny.
                </p>
            </div>

            <div className="flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        Signup
                    </h2>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError((prev) => ({ ...prev, name: "" }))
                                }}
                            />
                            {error.name && <p className="text-red-500">{error.name}</p>}
                        </div>

                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError((prev) => ({ ...prev, email: "" }))
                                }
                                }
                            />
                            {error.email && <p className="text-red-500">{error.email}</p>}
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError((prev) => ({ ...prev, password: "" }))
                                }
                                }
                            />
                            {error.password && <p className="text-red-500">{error.password}</p>}
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md">
                            Create Account
                        </button>

                        <Link to="/login" className="block mt-4 text-center text-sm text-gray-600 hover:text-primary">
                            Already Logined? Signin
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
