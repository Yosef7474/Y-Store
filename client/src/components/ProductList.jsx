import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
          const uniqueCategories = [...new Set(res.data.map(product => product.category))];
          setCategories(uniqueCategories);
        } else {
          console.error('Expected an array but got:', res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mx-2 ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleCategoryClick('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/detail/${product._id}`} key={product._id} className="border rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                <span className="block sm:hidden">
                  {product.name.length > 12 ? `${product.name.substring(0, 11)}...` : product.name}
                </span>
                <span className="hidden sm:block">
                  {product.name}
                </span>
              </h3>
              {product.imageUrl?.length >= 0 && (
                <img 
                  className="w-full h-48 object-cover mb-4"
                  src={product.imageUrl[0]} // Show first image
                  alt={product.name}
                />
              )}
              <p className="text-lg font-bold mb-2">Price: ${product.price}</p>
              <p className="text-gray-600">Seller: {product.seller.name}</p>
              <p className="text-gray-600">Phone: {product.seller.phone}</p>
              <p className="text-gray-600"> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;