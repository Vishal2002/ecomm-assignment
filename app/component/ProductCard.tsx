'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext';
import { HeartIcon } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
  };

  return (
    <div className="border relative dark:border-gray-700 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
  <div className='absolute right-2 top-2'>
  {isAdded ? (
    <HeartIcon className="text-red-500 fill-current" />
  ) : (
    <HeartIcon className="text-gray-400" />
  )}
</div>
      {!imageError ? (
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          className="w-full h-64 object-contain mb-4"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
          Image not available
        </div>
      )}
      <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{product.category}</p>
      <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className={`w-full py-2 px-4 rounded transition-colors duration-200 ${
          isAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}