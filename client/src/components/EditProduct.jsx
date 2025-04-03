import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import getBaseUrl from '../utils/baseUrl';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        phone: '',
        address: '',
        category: '',
        imageUrl: []
    });
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Get token helper function
    const getToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || 
        Cookies.getItem('token');
    };



    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = getToken();
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get( 
                    `${getBaseUrl()}/api/products/${id}`,
                     { headers: { Authorization: `Bearer ${token}` }
                });
                
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    phone: response.data.phone,
                    address: response.data.address,
                    category: response.data.category,
                    imageUrl: response.data.imageUrl || []
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image uploads
    const handleImageUpload = async (files) => {
    setUploading(true);
    try {
        const uploadedUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'marketplace');

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dmh8bkedu/image/upload",
                { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error("Image upload failed");

            const data = await response.json();
            uploadedUrls.push(data.secure_url);
        }
        return uploadedUrls;
    } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
    } finally {
        setUploading(false);
    }
};


    // Handle new image selection
    const handleNewImages = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 4) {
            alert('Maximum 4 images allowed');
            return;
        }
        
        try {
            const uploadedUrls = await handleImageUpload(files);
            setNewImages(prev => [...prev, ...uploadedUrls]);
        } catch (error) {
            alert('Failed to upload images');
        }
    };

    // Remove an image
    const handleRemoveImage = (index, isNew) => {
        if (isNew) {
            setNewImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setFormData(prev => ({
                ...prev,
                imageUrl: prev.imageUrl.filter((_, i) => i !== index)
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Combine existing and new images
            const updatedProduct = {
                ...formData,
                imageUrl: [...formData.imageUrl, ...newImages]
            };

            await axios.put(`${getBaseUrl()}/api/products/${id}`, updatedProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            localStorage.clear();


            navigate('/myproducts');
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error.response?.data?.message || error.message);
        }
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Loading product data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h2>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                    />
                </div>

                {/* Product Price */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price ($)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Product Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="computers">Computers</option>
                        <option value="phones & tablets">Phones & Tablets</option>
                        <option value="clothes & shoes">Clothes & shoes</option>
                        <option value="home">Home</option>
                        <option value="beauty">Beauty</option>
                        <option value="cars">Cars</option>
                        <option value="services">Services</option>
                        <option value="books">Books</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Contact Phone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Existing Images */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Current Images
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {formData.imageUrl.map((img, index) => (
                            <div key={`existing-${index}`} className="relative">
                                <img 
                                    src={img} 
                                    alt={`Product ${index + 1}`} 
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index, false)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Images */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add New Images
                    </label>
                    <input
                        type="file"
                        onChange={handleNewImages}
                        accept="image/*"
                        multiple
                        className="mb-2"
                        disabled={uploading || (formData.imageUrl.length + newImages.length) >= 4}
                    />
                    <p className="text-xs text-gray-500">
                        {4 - (formData.imageUrl.length + newImages.length)} images remaining (max 4 total)
                    </p>
                    
                    {uploading && <p className="text-blue-500 text-sm">Uploading images...</p>}
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                        {newImages.map((img, index) => (
                            <div key={`new-${index}`} className="relative">
                                <img 
                                    src={img} 
                                    alt={`New image ${index + 1}`} 
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index, true)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/myproducts')}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {uploading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;