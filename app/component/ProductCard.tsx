import Image from 'next/image';
import { useState } from 'react';

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
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 bg-transparent transition-colors duration-200">
      {!imageError ? (
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          className="w-full  h-64 mix-blend-multiply dark:mix-blend-normal  object-contain mb-4"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
          Image not available
        </div>
      )}
      <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{product.category}</p>
      <p className="text-xl font-bold mb-4">Rs {product.price.toFixed(2)}</p>
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