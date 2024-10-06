import React, { useState } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const Login = () => {
    const showMessage = useFlashMessage(); // Get the showMessage function
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for spinner
    const navigate = useNavigate();
    const route = "api/user/token/";

    const handleUsernameOnChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReg = (e) => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start spinner when request starts
        try {
            const response = await api.post(route, {
                username,
                password,
            });

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('data', response.data);
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                showMessage('Login Successful, Happy Learning', 'success');
                navigate("/"); // Redirect to home after login
            } else {
                showMessage("Whoops, response=", `${response.status}`);
                console.log(response);
            }
        } catch (error) {
            if (error.response?.data?.detail) showMessage(`Error: ${error.response.data.detail}`, 'error');
            else if (error.response?.data) {
                if (error.response.data.username) showMessage(`Error: ${error.response.data.username[0]}`, 'error');
            } else if (error.response) showMessage(`Error: ${error.response}`, 'error');
            else showMessage(`Error: ${error}`, 'error');
            console.log(error);
        } finally {
            setLoading(false); // Stop spinner once the request completes
        }
    };

    return (
        <div className="form-container">
            <div className="starry-bg"></div>
            <div className="card">
                <h1 className="form-title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username" className="neon-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameOnChange}
                            className="neon-input"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="neon-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordOnChange}
                            className="neon-input"
                        />
                    </div>
                    <div className="submit-container">
                        <button
                            type="submit"
                            className="neon-button flex justify-center items-center"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                // Spinner inside the button when loading is true
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>

                    <p className="text-white text-sm p-2 mt-2">
                        New here?{" "}
                        <button
                            className="bg-pink-400 hover:bg-purple-400 p-1 rounded"
                            onClick={handleReg}
                            type="button"
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
