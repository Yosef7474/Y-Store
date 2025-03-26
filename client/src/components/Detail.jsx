import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
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

    return (
        <>
            {product ? (
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-gray-100 p-6 md:p-12">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <img
                            className="w-full h-[500px] object-cover rounded-lg shadow-md"
                            src={product.imageUrl[currentImageIndex]}
                            alt={product.model}
                        />
                        <div className="flex justify-between w-full mt-4">
                            <button onClick={handlePrevImage} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">Previous</button>
                            <button onClick={handleNextImage} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">Next</button>
                        </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-lg text-gray-700 mt-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-gray-900 mt-4">Price: ${product.price}</p>
                        <p className="text-gray-500 text-sm mt-2">Listed on: {new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl">Product not found</p>
            )}
        </>
    );
};

export default Detail;
