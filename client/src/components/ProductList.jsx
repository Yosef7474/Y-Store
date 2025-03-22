import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error('Expected an array but got:', res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

 

return (
    <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link to={`/detail/${product._id}`} key={product._id} className="border rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <img src={product.imageUrl} alt="" />
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-lg font-bold mb-2">Price: ${product.price}</p>
                        <p className="text-gray-600">Seller: {product.seller.name}</p>
                        <p className="text-gray-600">Phone: {product.seller.phone}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
};

export default ProductList;