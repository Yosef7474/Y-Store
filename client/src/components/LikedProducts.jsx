import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../utils/baseUrl';

const LikedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getTokenFromCookies = () => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
  };

  const fetchLikedProducts = async () => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${getBaseUrl()}/api/products/getlike`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
      setLoading(false);
    }
  };

  const handleUnlike = async (productId) => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`${getBaseUrl()}/api/products/removelike/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refetch liked products after unlike
      fetchLikedProducts();
    } catch (err) {
      console.error('Error unliking product:', err);
    }
  };

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Liked Products</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No liked products</h3>
            <p className="mt-1 text-gray-500">Like products to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                <Link to={`/detail/${product._id}`} className="block">
                  <div className="relative pb-2/3 h-48">
                    <img 
                      src={product.imageUrl?.[0] || 'https://via.placeholder.com/300'} 
                      alt={product.name}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-lg font-bold text-blue-600">
                      ETB {product.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => handleUnlike(product._id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;