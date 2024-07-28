import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utile";

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return toast.error("Email and password are required");
        }

        try {
            const response = await fetch('https://deploy-mern-app-sandy.vercel.app//auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Log the response status and headers for debugging
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            // Parse the JSON response
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                handleError(error.details[0].message);
            } else {
                handleError(message);
            }

            console.log(result);

            // Check if the response is ok
            if (!response.ok) {
                // Check if the response content type is JSON
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    throw new Error(result.message || 'Network response was not ok');
                } else {
                    // Handle non-JSON responses (like HTML errors)
                    const text = await response.text();
                    throw new Error(`Unexpected response: ${text}`);
                }
            }

            setMessage(result.message);
            toast.success(result.message);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Login failed: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name="email"
                        placeholder="Enter your Email-id.."
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name="password"
                        placeholder="Enter your Password.."
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Do not have an account? <Link to="/Signup">Signup</Link></span>
            </form>
            {message && <p>{message}</p>}
            <ToastContainer />
        </div>
    );
}

export default Login;
