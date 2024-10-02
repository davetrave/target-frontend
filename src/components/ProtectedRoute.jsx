// import React, { useState, useEffect, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import api from "../services/AuthService";
// import { jwtDecode } from 'jwt-decode';
// import { CartContext } from '../context/CartContext';

// const Protected = ({ children }) => {
//     const [isAuth, setIsAuth] = useState(null);
//     const { updateCart } = useContext(CartContext);

//     useEffect(() => {
//         auth().catch(() => { setIsAuth(false); });
//     }, []);

//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem("refresh");
//         try {
//             const response = await api.post("api/user/token/refresh/", { refresh: refreshToken });
//             if (response.status === 200) {
//                 localStorage.setItem("access", response.data.access);
//                 setIsAuth(true);
//                 updateCart();  // Update cart after refreshing token
//             } else {
//                 setIsAuth(false);
//             }
//         } catch (error) {
//             setIsAuth(false);
//             console.log(error);
//         }
//     };

//     const auth = async () => {
//         const token = localStorage.getItem('access');
        
//         if (!token) {
//             setIsAuth(false);
//             return;
//         }

//         const decodedToken = jwtDecode(token);
//         const tokenExp = decodedToken.exp;

//         if (tokenExp > Date.now() / 1000) {
//             setIsAuth(true);
//             updateCart();  // Update cart when token is valid
//         } else {
//             await refreshToken();  // Try to refresh the token if expired
//         }
//     };

//     if (isAuth == null) {
//         return <div>Loading...</div>;
//     }

//     return isAuth ? children : <Navigate to="/login" />;
// };

// export default Protected;

import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CartContext } from '../context/CartContext';

const Protected = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const { updateCart, updatePurchasedCourses } = useContext(CartContext);

  useEffect(() => {
    auth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh');
    try {
      const response = await api.post('api/user/token/refresh/', { refresh: refreshToken });
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        setIsAuth(true);
        updateCart(); // Update cart after refreshing token
        updatePurchasedCourses; // Update PurchasedCourses after refreshing token
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  };

  const auth = async () => {
    const token = localStorage.getItem('access');

    if (!token) {
      setIsAuth(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const tokenExp = decodedToken.exp;

    if (tokenExp > Date.now() / 1000) {
        console.log("Here here")
      setIsAuth(true);
      updateCart(); // Update cart when token is valid
    } else {
      await refreshToken(); // Try to refresh the token if expired
    }
  };

  if (isAuth == null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default Protected;

