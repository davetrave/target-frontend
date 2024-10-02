import React, { useContext, useState } from 'react';
import { FaTrash, FaShoppingCart, FaStar } from 'react-icons/fa';
import FileUploadPopup from './FileUploadPopup';
import { purchaseCourse } from '../services/CartService';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, onRemove }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCheckoutPending, setCheckoutPending] = useState(false);
  const { removeFromCart, updatePurchasedCourses } = useContext(CartContext);

  const handleCheckoutClick = () => {
    setPopupOpen(true);
  };

  const handlePopupSubmit = async (file) => {
    if (file) {
      try {
        // Purchase the course
        await purchaseCourse(item.course.id, file);

        // Update purchased courses
        await updatePurchasedCourses();

        // Remove the course from the cart
        await removeFromCart(item.id);

        // Mark the button as pending
        setCheckoutPending(true);
        setPopupOpen(false);

      } catch (error) {
        console.error('Failed to purchase course:', error);
      }
    } else {
      setPopupOpen(false);
    }
  };

  return (
    <div className="cart-item flex bg-gray-700 bg-opacity-70 p-4 m-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out relative overflow-hidden">
      {/* Image and Title */}
      <div className="w-1/3 flex-shrink-0">
        <img
          src={item.course.img_url}
          alt={item.course.title}
          className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="w-2/3 pl-4">
      <h3 className="text-xl font-bold mb-2 text-white">{item.course.title}</h3>
        <h2 className="text-white font-bold mb-2">{`Category: ${item.course.category}`}</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${i < item.course.rating ? 'text-yellow-500' : 'text-gray-500'}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-auto">
          
          <button
            className={`bg-${isCheckoutPending ? 'gray' : 'green'}-500 text-white px-4 py-2 rounded-lg flex items-center`}
            onClick={handleCheckoutClick}
            disabled={isCheckoutPending}
          >
            <FaShoppingCart className="mr-1" />
            {isCheckoutPending ? 'Pending' : 'Checkout'}
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <FaTrash className="mr-1" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* File Upload Popup */}
      <FileUploadPopup
        price={item.course.price}
        open={isPopupOpen} 
        handleClose={() => setPopupOpen(false)} 
        handleSubmit={handlePopupSubmit} 
      />
    </div>
  );
};

export default CartItem;
