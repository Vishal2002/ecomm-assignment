'use client';

import { useState, useEffect } from 'react';
import ProductCard from './component/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter(product => product.price <= priceRange));
  }, [priceRange, products]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <aside className="w-64 pr-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div>
          <label htmlFor="priceRange" className="block mb-2">Max Price: Rs {priceRange}</label>
          <input 
            type="range" 
            id="priceRange" 
            min="0" 
            max="1000" 
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </aside>
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}