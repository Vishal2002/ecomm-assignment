'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../component/CartContext';
import EmptyCart from '../../public/delete.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutClicked(true);
    setTimeout(() => {
    
      setCheckoutClicked(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl text-center font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className='flex justify-center items-center flex-col w-full'
        >
          <Image alt='Empty Cart' src={EmptyCart} width={300} height={300} />
          <p className='text-xl font-bold mt-4'>Your cart is empty.</p>
        </motion.div>
      ) : (
        <>
          {cart.map(item => (
            <motion.div 
              key={item.id} 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4 p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                width={100} 
                height={100} 
                className="mr-4 object-contain rounded-md" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder.png';
                }}
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                    className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="mx-3 font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="p-2 border bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                Remove
              </button>
            </motion.div>
          ))}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <p className="text-2xl font-bold mb-4">Subtotal: ${subtotal.toFixed(2)}</p>
            <Link href='/checkout'
              onClick={handleCheckout}
              className={`w-full mt-4 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${
                checkoutClicked 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {checkoutClicked ? 'Processing...' : 'Proceed to Checkout'}
            </Link>
          </motion.div>
        </>
      )}
      
      <Link href="/">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 border justify-center p-3 bg-green-500 font-bold inline-block rounded-lg text-white hover:bg-green-600 transition-colors duration-200"
        >
          Continue Shopping
        </motion.button>
      </Link>
    </motion.div>
  );
}