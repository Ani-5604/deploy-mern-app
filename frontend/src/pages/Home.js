import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user);
        
        fetchProducts();  // Fetch products after the component mounts
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        toast.success('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://deploy-mern-app-sandy.vercel.app/products";
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(url, { headers });
            // Log the token to verify it is correct
            console.log('Token:', token);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}. Details: ${errorText}`);
            }
            const result = await response.json();
            console.log(result);
            setProducts(result);
          
        } catch (err) {
            console.error('Error fetching products:', err);
            handleError(err);
            toast.error(`Error fetching products: ${err.message}`);
        }
    };

    return (
        <div>
            <h1>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {products && products.map((item, index) => (
                    <ul key={item.id}>
                        <span>{item.name}: {item.price}</span>
                    </ul>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
