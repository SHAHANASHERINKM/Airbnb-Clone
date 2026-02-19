import React, { useState } from "react";
import { login } from "../../services/userService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../redux/store";
import logo from "../../assets/logo.svg";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let newError = {};

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
      const result = await login({ email, password });
      console.log(result);

      dispatch(loginSuccess(result));
      console.log("Redux state after login:", store.getState().auth);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
     
      if(result.success){
        alert("Login successfull");
        if(result.user.role==="admin"){
          navigate("/admin/dashboard")
        }
        else{
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
    <div className="grid md:grid-cols-2  gap-7 flex min-h-screen  ">
      <div className="w-full flex flex-col justify-center items-center  ">
<img src={logo}  className="w-16 h-16"/>
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
            Welcome Back
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && <p className="text-red-500">{error.password}</p>}
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2 rounded-md">
              Login
            </button>
                 
<Link to="/signup" className="block mt-4 text-center text-sm text-gray-600 hover:text-primary">
  Don’t have an account? Signup
</Link>

          </form>
        </div>
      </div>
    </div>
   
  );
}

export default Login;
