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

