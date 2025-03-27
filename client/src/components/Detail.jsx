import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    // `http://localhost:5000/api/products/${id}`
                    `https://shopfloww.onrender.com/api/products/${id}`
                );
                
                if (!res.data || !res.data.imageUrl || !Array.isArray(res.data.imageUrl)) {
                    throw new Error('Invalid product data format from API');
                }
                
                setProduct(res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleNextImage = () => {
        if (product?.imageUrl?.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
        }
    };

    const handlePrevImage = () => {
        if (product?.imageUrl?.length > 1) {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex - 1 + product.imageUrl.length) % product.imageUrl.length
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">Error loading product: {error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Product not found</h3>
                <p className="text-gray-500">The requested product could not be found.</p>
            </div>
        );
    }

    const currentImage = product.imageUrl[currentImageIndex] || 'https://via.placeholder.com/600x400?text=No+Image+Available';

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Image Gallery - 60% width */}
                    <div className="w-full lg:w-3/5">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                            <div className="relative pb-[75%] h-0">
                                <img
                                    className="absolute top-0 left-0 w-full h-full object-contain"
                                    src={currentImage}
                                    alt={product.model || product.name || 'Product image'}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                                    }}
                                />
                            </div>
                            
                            {/* Navigation Arrows */}
                            {product.imageUrl.length > 1 && (
                                <>
                                    <button 
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                        aria-label="Previous image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                        aria-label="Next image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            
                            {/* Image Indicators */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {product.imageUrl.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-indigo-600 w-6' : 'bg-gray-300'}`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Details - 40% width */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-white p-8 rounded-2xl shadow-xl h-full">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            
                            <div className="flex items-center mb-6">
                                <div className="flex items-center text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-500 ml-2">(24 reviews)</span>
                            </div>
                            
                            <p className="text-3xl font-bold text-indigo-600 mb-6">ETB {product.price?.toLocaleString() || 'N/A'}</p>
                            
                            <div className="prose prose-lg text-gray-600 mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="whitespace-pre-line">
                                    {product.description || 'No description available'}
                                </p>
                            </div>
                            
                            {/* <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Authentic product
                                    </li>
                                   
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Fast response from seller
                                    </li>
                                </ul>
                            </div> */}
                            
                            <div className="flex space-x-4">
                                <a 
                                    href={`tel:${product.phoneNumber || ''}`}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Call Seller
                                </a>
                            </div>
                            
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-500">
                                    Listed on: {product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    }) : 'Date not available'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;