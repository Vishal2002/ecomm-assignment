'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // In a real application, you'd fetch this from an API or local storage
    const mockCartItems: CartItem[] = [
      { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", price: 109.95, image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", quantity: 1 },
      { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", quantity: 1 },
    ];
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
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
              <button onClick={() => removeItem(item.id)} className="text-black border p-2 rounded-lg font-bold bg-red-500 dark:text-white">Remove</button>
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
      <Link href="/" className="mt-8 inline-block text-blue-500 dark:text-blue-400 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}