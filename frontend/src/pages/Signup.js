import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utile";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
    
        if (!name || !email || !password) {
            return handleError("Name, email, and password are required");
        }
    
        try {
            const response = await fetch('https://deploy-mern-app-pi.vercel.app/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (!response.ok) {
                const errorText = await response.text(); // Get the response text to understand the error
                throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
            }
    
            const contentType = response.headers.get("content-type");
    
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                const { success, message, jwtToken, name, error } = result;
    
                if (success) {
                    handleSuccess(message);
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedInUser', name);
                    toast.success('Signup successful');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                } else if (error) {
                    
                    handleError(error.details[0].message);
                } else {
                    handleError(message);
                }
            } else {
                const text = await response.text();
                throw new Error(`Expected JSON, got: ${text}`);
            }
        } catch (error) {
            console.error('Error:', error);
            handleError(`Signup failed: ${error.message}`);
            toast.error(`Signup failed: ${error.message}`);
        }
    };
    
    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name="name"
                        autoFocus
                        placeholder="Enter your name.."
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name="email"
                        placeholder="Enter your Email-id.."
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name="password"
                        placeholder="Enter your Password.."
                        value={signupInfo.password}
                    />
                </div>
                <button type="submit">Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
