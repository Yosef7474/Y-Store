import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrl.length) % product.imageUrl.length);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="animate-pulse text-2xl font-semibold text-indigo-600">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="text-2xl font-semibold text-red-500">Product not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 mt-5">
            <div className="flex flex-col lg:flex-row h-screen mt-5">
                {/* Image Gallery - 60% width */}
                <div className="w-full lg:w-3/5 h-full flex items-center justify-center p-4 lg:p-8">
                    <div className="relative h-full w-full max-w-4xl  overflow-hidden  flex items-center">
                        <img
                            className="w-full h-full object-contain p-4 mt-10 transition-all duration-300 hover:scale-105"
                            src={product.imageUrl[currentImageIndex]}
                            alt={product.model}
                        />
                        
                        {/* Navigation Arrows */}
                        {product.imageUrl.length > 1 && (
                            <>
                                <button 
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-110"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
                <div className="w-full lg:w-2/5 h-full flex items-center justify-center p-4 lg:p-8">
                    <div className=" p-6 lg:p-8 border-l-2 lg:border-gray-300 h-full max-w-2xl w-full flex flex-col">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        
                        <p className="text-3xl font-bold text-indigo-600 mb-6"><p>birr</p>{product.price.toLocaleString()}</p>
                    
                        {/* Scrollable Description */}
                        <div className="mb-6 overflow-y-auto flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <div className="prose prose-lg text-gray-600 max-h-[200px] lg:max-h-[300px] overflow-y-auto pr-2">
                                <p className="whitespace-pre-line">{product.description}</p>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4 mt-auto">
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg">
                            <a href={`tel:${product.phoneNumber}`} >
                                Call seller
                            </a>
                            </button>
                            
                        </div>
                        
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-500">
                                Listed on: {new Date(product.createdAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;


{/* <div className="flex space-x-4 mt-auto">
                            <button  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg">
                                Call seller
                            </button>
                        </div> */}