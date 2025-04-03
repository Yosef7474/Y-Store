import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../utils/baseUrl';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const imageRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${getBaseUrl()}/api/products/${id}`
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


    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
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

    // Touch event handlers for swipe navigation
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swipe left - next image
            handleNextImage();
        }

        if (touchStart - touchEnd < -50) {
            // Swipe right - previous image
            handlePrevImage();
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
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                    {/* Image Gallery - Full width on mobile, 60% on desktop */}
                    <div className="w-full lg:w-3/5">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-white p-2 sm:p-4">
                            <div 
                                className="relative pb-[75%] h-0"
                                ref={imageRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <img
                                    className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300"
                                    src={currentImage}
                                    alt={product.model || product.name || 'Product image'}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                                    }}
                                />
                            </div>
                            
                            {/* Navigation Arrows - Hidden on mobile when only one image */}
                            {product.imageUrl.length > 1 && (
                                <>
                                    <button 
                                        onClick={handlePrevImage}
                                        className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                        aria-label="Previous image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={handleNextImage}
                                        className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                        aria-label="Next image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            
                            {/* Image Indicators with swipe hint on mobile */}
                            <div className="flex flex-col items-center mt-3 sm:mt-4">
                                <div className="flex justify-center space-x-2 mb-2">
                                    {product.imageUrl.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-indigo-600 w-4 sm:w-6' : 'bg-gray-300'}`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                {product.imageUrl.length > 1 && (
                                    <p className="text-xs text-gray-500 sm:hidden">Swipe to view more images</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Details - Full width on mobile, 40% on desktop */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg sm:shadow-xl h-full">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-4 sm:mb-6">
                                ETB {product.price?.toLocaleString() || 'N/A'}
                            </p>
                            
                            {/* Category and condition chips */}
                            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                                {product.category && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800">
                                        {product.category}
                                    </span>
                                )}
                                {product.condition && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
                                        {product.condition}
                                    </span>
                                )}
                            </div>
                            
                            <div className="prose prose-sm sm:prose-lg text-gray-600 mb-6 sm:mb-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="whitespace-pre-line">
                                    {product.description || 'No description available'}
                                </p>
                            </div>
                            
                            {/* Seller info */}
                            {product.seller && (
                                <div className="mb-6 sm:mb-8 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">Seller Information</h4>
                                    <p className="text-sm text-gray-600">{product.seller.name}</p>
                                    {product.address && (
                                        <p className="text-sm text-gray-600 flex items-center mt-1">
                                            <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {product.address}
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a 
                                    href={`tel:${product.seller.phone || ''}`}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 sm:px-6 rounded-lg font-medium transition-all hover:shadow-md flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Call Seller
                                </a>
                                
                                <button className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-3 px-4 sm:px-6 rounded-lg font-medium transition-all hover:shadow-md flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Save
                                </button>
                            </div>
                            
                            {/* Listing date */}
                            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Listed on: {product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
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