import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Myproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchMyProducts = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || 
                         localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get('http://localhost:5000/api/products/myproducts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const productsArray = Array.isArray(response.data) 
                ? response.data 
                : response.data.products || [];
            
            setProducts(productsArray);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || 
                         localStorage.getItem('token');
            
            await axios.delete(`http://localhost:5000/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Refresh the product list after deletion
            fetchMyProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const handleEdit = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Loading your products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
    }

    if (!Array.isArray(products) || products.length === 0) {
        return <div className="text-center text-gray-500">You haven't listed any products yet.</div>;
    }

    const sortedProducts = [...products].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Products</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {sortedProducts.map((product) => (
                    <div key={product._id} className="bg-white shadow-lg rounded-xl p-4 transition transform hover:scale-105 flex flex-col">
                        {product.imageUrl?.[0] && (
                            <img 
                                src={product.imageUrl[0]} 
                                alt={product.name} 
                                className="w-full h-48 object-cover rounded-md"
                            />
                        )}
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mt-3">{product.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            <p className="text-blue-600 font-bold mt-2">Price: ${product.price}</p>
                            <p className="text-gray-400 text-sm">Listed: {new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button 
                                onClick={() => handleEdit(product._id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(product._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Myproducts;