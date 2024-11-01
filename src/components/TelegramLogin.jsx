import React, { useState, useEffect } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const TelegramLogin = () => {
    const showMessage = useFlashMessage();
    const [tgData, setTgData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const route = "api/token/";

    useEffect(() => {
        telegram_login();
    }, []);

    useEffect(() => {
        const auth = async () => {
            if (!tgData) return
            try {

                const response = await api.post(route, {
                    username: tgData.id,
                    password: "ttt7476134736:AAFE5qzkrUlfAJxeOKtlH7Pp6TfJ-6_gK4E"
                });

                if (response.status === 200 || response.status === 201) {
                    localStorage.setItem('access', response.data.access);
                    localStorage.setItem('refresh', response.data.refresh);
                    showMessage(`Welcome, ${tgData.firstName}! Happy learning`, 'success');
                    navigate("/");
                } else {
                    showMessage(`Unexpected response: ${response.status}`, 'error');
                    console.log(response);
                } 

            } catch (error){
                showMessage(`Error: ${error}`, 'error');
                console.log(error);

            }
        }
        auth();
        console.log("TG DATA:> ", tgData)
    }, [tgData]);

    const telegram_login = async () => {
        setLoading(true);
        try {
            // Check if the Telegram WebApp API is available
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.ready();
                console.log(window.Telegram.WebApp.initDataUnsafe);
                const user = window.Telegram.WebApp.initDataUnsafe?.user;
                if (user) {
                    setTgData({
                        id: user.id,
                        username: user.username,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        photoUrl: user.photo_url,
                    });
                } else {
                    showMessage('Error fetching user data!', 'error');
                }
            } else {
                showMessage("Telegram WebApp API not found", 'error');
                console.error();
            }
            
        } catch (error) {
            showMessage(`Error: ${error}`, 'error');
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Twinkling Starry Background */}
            {[...Array(150)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: `${Math.random() * 2}px`,
                        height: `${Math.random() * 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `twinkle ${Math.random() * 2 + 2}s infinite ease-in-out`,
                    }}
                ></div>
            ))}

            {/* Pretty Loading Spinner in the Center */}
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-400"></div>
            </div>
            

            <style>
                {`
                /* Twinkling Star Effect */
                @keyframes twinkle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                /* Bounce animation delays for spinner dots */
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
                `}
            </style>
        </div>
    );
};

export default TelegramLogin;
