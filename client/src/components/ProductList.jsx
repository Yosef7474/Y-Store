import React from 'react'
import { useEffect, useState } from 'react';
import Products from '../../public/products.json';
import { Link } from 'react-router-dom';

const ProductList = () => {

    return (
        <>
            <div className="product-list grid m-7 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols4- gap-6 p-4">
                {Products.map((product, index) => (
                    <Link key={index} to={`/Detail/${product.id}`}>
                        <div className="product-card bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.model} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.model}</h2>
                                <p>{product.id}</p>
                                {/* <p className="text-gray-700 mb-2">{product.description}</p> */}
                                <p className="text-gray-600 mb-1">Seller: {product.sellerName}</p>
                                <p className="text-gray-600 mb-1">Contact: {product.phoneNumber}</p>
                                <p className="text-gray-800 font-bold">Price: ${product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ProductList;