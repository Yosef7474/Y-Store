import React from 'react'
import { useParams } from 'react-router-dom';
import Products from '../products.json'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const Detail = () => {
    // const { id } = useParams();
    // const product = Products.find((product) => product.id === Number(id));
    const { id } = useParams();
    const [product, setProduct] = useState(null);

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


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrl.length) % product.imageUrl.length);
    };

    return (
        <>
            {product ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                    <h1 className="text-4xl font-bold mb-4">Product: {product.name}</h1>
                    <img
                        className="w-64 h-64 object-cover mb-4"
                        src={product.imageUrl[currentImageIndex]}
                        alt={product.model}
                    />
                    <div className="flex justify-between w-64 mb-4">
                        <button onClick={handlePrevImage} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Previous
                        </button>
                        <button onClick={handleNextImage} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Next
                        </button>
                    </div>
                    <p className="text-lg mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold">Price: ${product.price}</p>
                </div>
            ) : (
                <p className="text-center text-xl">Product not found</p>
            )}
        </>
    );
};

export default Detail;