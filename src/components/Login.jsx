import React, { useState } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const Login = () => {
    const showMessage = useFlashMessage(); // Get the showMessage function
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const route="api/user/token/"

    const handleUsernameOnChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleReg = (e) => {
        navigate("/register");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

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
                navigate("/");
                
            } else {
                showMessage("Whoops, response=", `${error}`);
                console.log(response);
            }
        } catch (error) {
            if (error.response.data.detail) showMessage(`Error: ${error.response.data.detail}`, 'error');
            else if (error.response.data){
                if (error.response.data.username) showMessage(`Error: ${error.response.data.username[0]}`, 'error');
            }
            else if (error.response) showMessage(`Error: ${error.response}`, 'error');
            else showMessage(`Error: ${error}`, 'error');
            console.log(error);
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
                <input
                type="submit"
                value="Login"
                className="neon-button"
                />
            </div>

            <p className="text-white text-sm p-2 mt-2">New here? <button className="bg-pink-400 hover:bg-purple-400 p-1 rounded" onClick={handleReg}>Register</button></p>
        
        </form>
        </div>
        </div>
    );
}



export default Login