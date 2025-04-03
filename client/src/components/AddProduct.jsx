import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import getBaseUrl from '../utils/baseUrl';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    phone: '',
    address: '',
    category: ''
  });
  const [images, setImages] = useState([]);
  const [imageQuality, setImageQuality] = useState(70)
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();


   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('You can upload maximum 4 images');
      return;
    }
    setImages(files);
  };

  // compress image--------------------------------
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 800;
          const maxHeight = 600;
          
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to compressed JPEG (adjust quality)
          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }));
            },
            'image/jpeg',
            imageQuality / 100
          );
        };
      };
    });
  };





// upload image --------------------------------------
const uploadImagesToCloudinary = async (files) => {
  const uploadedUrls = [];
  
  for (const file of files) {
    try {
      // Compress image before upload (implement compressImage function if needed)
      const compressedFile = await compressImage(file);
      
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', 'marketplace');
      
      // Upload image using fetch
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmh8bkedu/image/upload",
        { method: "POST", body: formData }
      );
      
      const data = await response.json(); // Ensure response is parsed properly
      
      if (!data.secure_url) {
        throw new Error('Image upload failed');
      }
      
      uploadedUrls.push(data.secure_url);
    } catch (err) {
      console.error('Error uploading image:', err);
      throw new Error(`Failed to upload ${file.name}: ${err.message}`);
    }
  }
  
  return uploadedUrls;
};
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (images.length === 0) {
        throw new Error('Please select at least one image');
      }

      // Upload all images to Cloudinary
      const imageUrls = await uploadImagesToCloudinary(images);
      
      // Prepare product data with all images in imageUrl array
      const productData = {
        ...formData,
        imageUrl: imageUrls // Store all image URLs here
      };

      // Get token from cookies
      const getToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || 
        Cookies.getItem('token');
    };
      // const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || 
      // Cookies.getItem('token');
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Send to backend
      const response = await axios.post(
        `${getBaseUrl()}/api/products/add`,
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Product added:', response.data);
      alert('Product added successfully!');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Error:', err.response?.data || err);
      alert(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Product Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Product Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Product Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        {/* Product Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Product Category:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="computers">Computers</option>
            <option value="phones & tablets">Phones & tablets</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
            <option value="cars">Cars</option>
            <option value="services">Services</option>
            <option value="books">Books</option>
            <option value="others">Others</option>

          </select>
        </div>

        {/* Product Images */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
            Product Images (Max 4):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            id="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
          />
          {images.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              {images.length} image(s) selected
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;