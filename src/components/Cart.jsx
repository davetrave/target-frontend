// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import { FaTrash, FaShoppingCart } from 'react-icons/fa';
// import { gsap } from 'gsap';
// import FileUploadPopup from './FileUploadPopup';

// const Cart = () => {
//   const { cart, removeFromCart } = useContext(CartContext);
//   const cartRef = useRef([]);
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const [isCheckoutPending, setCheckoutPending] = useState(false);

//   useEffect(() => {
//     cartRef.current.forEach((el, index) => {
//       gsap.fromTo(
//         el,
//         { scale: 0, rotationY: 180, opacity: 0 },
//         {
//           scale: 1,
//           rotationY: 0,
//           opacity: 1,
//           duration: 0.5,
//           ease: 'power3.out',
//           delay: index * 0.1,
//         }
//       );
//     });

//     const stars = document.querySelectorAll('.star');
//     stars.forEach(star => {
//       const startX = Math.random() * 100;
//       const startY = Math.random() * 100;
//       const endX = Math.random() * 100;
//       const endY = Math.random() * 100;
//       const duration = Math.random() * 10 + 10;
//       const delay = Math.random() * 5;

//       gsap.fromTo(
//         star,
//         {
//           x: `${startX}vw`,
//           y: `${startY}vh`,
//         },
//         {
//           x: `${endX}vw`,
//           y: `${endY}vh`,
//           repeat: -1,
//           duration,
//           ease: 'linear',
//           delay,
//         }
//       );
//     });
//   }, [cart]);

//   const handleRemoveFromCart = async (cartId) => {
//     try {
//       await removeFromCart(cartId);
//     } catch (err) {
//       console.error(`Failed to remove from cart: ${err}`);
//     }
//   };

//   const handleCheckoutClick = () => {
//     setPopupOpen(true);
//   };

//   const handlePopupClose = () => {
//     setPopupOpen(false);
//     setCheckoutPending(true);
//   };

//   return (
//     <div className="relative overflow-hidden h-screen bg-black">
//       <h2 className="text-3xl text-white text-center my-4">My Cart</h2>
//       <div className="absolute inset-0">
//         {[...Array(200)].map((_, index) => (
//           <div
//             key={index}
//             className="star absolute rounded-full w-2 h-2 bg-white opacity-75"
//             style={{ top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw` }}
//           ></div>
//         ))}
//       </div>
//       {cart.length > 0 ? (
//         <div className="flex flex-wrap justify-center">
//           {cart.map((item, index) => (
//             <div
//               key={item.id}
//               ref={(el) => (cartRef.current[index] = el)}
//               className="cart-item p-4 m-2 bg-gray-800 rounded-lg shadow-lg text-white w-full sm:w-1/2"
//             >
//               <div className="flex items-center">
//                 <img
//                   src={item.course.img_url}
//                   alt={item.course.title}
//                   className="w-16 h-16 object-cover rounded-full mr-4"
//                 />
//                 <span className="flex-grow">{item.course.title}</span>
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <button
//                   onClick={() => handleRemoveFromCart(item.id)}
//                   className="flex items-center text-red-500 hover:text-red-700"
//                 >
//                   <FaTrash className="mr-1" />
//                   <span>Remove</span>
//                 </button>
//                 <button
//                   className={`bg-${isCheckoutPending ? 'gray' : 'green'}-500 text-white px-3 py-1 rounded-lg flex items-center`}
//                   onClick={handleCheckoutClick}
//                   disabled={isCheckoutPending}
//                 >
//                   <FaShoppingCart className="mr-1" />
//                   {isCheckoutPending ? 'Pending' : 'Checkout'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-white text-center">Your cart is empty</p>
//       )}
//       <FileUploadPopup open={isPopupOpen} handleClose={handlePopupClose} />
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import { gsap } from 'gsap';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const cartRef = useRef([]);

  useEffect(() => {
    cartRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { scale: 0, rotationY: 180, opacity: 0 },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: index * 0.1,
        }
      );
    });
  }, [cart]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden mb-10 pb-20">
      <h2 className="text-3xl text-white text-center my-4">My Cart</h2>
      {cart.length > 0 ? (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={item.id} ref={(el) => (cartRef.current[index] = el)}>
                <CartItem item={item} onRemove={removeFromCart} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;

