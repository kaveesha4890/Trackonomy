import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validCredentials = {
        email: "test@gmail.com",
        password: "123",
    };

    const handleSubmit = /*async*/ (e) => {
        e.preventDefault();
        if (email === validCredentials.email && password === validCredentials.password) {
            localStorage.setItem("token", "dummy-token");
            alert("Login successfull!");
            navigate("/dashboard");
        } else {
            alert("Invalid email or password. Please try again.");
        }
        /*try {
            const { data } = await axios.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (err) {
            alert("Login failed");
        }*/
    };

    return (
        <div classname="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                
                <input 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 fous:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Login
                </button>
                
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Don't have an account?{" "}
                <span className="text-purple-600 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
                >Sign up</span>
            </p>
            </div>
        </div>
    );
};

export default Login;