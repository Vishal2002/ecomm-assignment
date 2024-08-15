'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../component/CartContext';
import EmptyCart from '../../public/delete.svg';
export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className='flex justify-center items-center flex-col w-full'>
          <Image alt='Image' src={EmptyCart} width={300} height={300} />
          <p className='text-xl font-bold'>Your cart is empty.</p>
        </div>
       
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex items-center mb-4 p-4 border dark:border-gray-700 rounded bg-white dark:bg-gray-800">
              <Image 
                src={item.image} 
                alt={item.title} 
                width={100} 
                height={100} 
                className="mr-4 object-contain" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder.png';
                }}
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className=" p-2 border bg-red-500 hover:bg-red-400  text-black rounded-lg dark:text-white">Remove</button>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      
      <Link href="/" className="mt-8 border justify-center p-2 bg-green-500 font-bold  inline-block rounded-lg text-black dark:text-white hover:bg-green-400">
        Continue Shopping
      </Link>
    </div>
  );
}