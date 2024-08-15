import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface SidebarProps {
  products: Product[];
  priceRange: number;
  setPriceRange: (value: number) => void;
  setCategory: (value: string) => void;
  selectedCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ priceRange, setPriceRange, setCategory, products, selectedCategory }) => {
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <aside className="w-64 pr-8">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-6">
        <label htmlFor="priceRange" className="block mb-2">Max Price: ${priceRange}</label>
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
      <div>
        <h2 className='text-xl font-bold mb-2'>Categories</h2>
        <div>
          <div className="mb-2">
            <input
              type="radio"
              id="all"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={() => setCategory('')}
              className="mr-2"
            />
            <label htmlFor="all">All</label>
          </div>
          {categories.map(category => (
            <div key={category} className="mb-2">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setCategory(category)}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;