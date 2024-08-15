'use client';
import { useState, useEffect } from 'react';
import ProductCard from './component/ProductCard';
import Sidebar from './component/Sidebar';

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
  const [selectedCategory, setSelectedCategory] = useState('');

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
    setFilteredProducts(products.filter(product => 
      product.price <= priceRange && 
      (selectedCategory === '' || product.category === selectedCategory)
    ));
  }, [priceRange, selectedCategory, products]);

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <Sidebar 
        priceRange={priceRange} 
        products={products} 
        setCategory={setSelectedCategory} 
        setPriceRange={setPriceRange}
        selectedCategory={selectedCategory}
      />
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}