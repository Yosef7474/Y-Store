import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: null,
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.imageUrl);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    try {
const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      await axios.post('http://localhost:5000/api/products/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

return (
<>
<div className="max-w-md mx-auto mt-10">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Product Name:</label>
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
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Product Description:</label>
                        <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                        ></textarea>
                </div>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Product Price:</label>
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
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Product Image:</label>
                        <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="file"
                                id="image"
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.files[0] })}
                        />
                </div>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                        <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                id="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                        />
                </div>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
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
                <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                >
                        Add Product
                </button>
        </form>
</div>
</>
)
};

export default AddProduct;







// <div className="max-w-md mx-auto mt-10">
//             <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleChange}>
//                     <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Product Name:</label>
//                             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="productName" name="productName" 
//                             value={formdata.name}
//                             onChange={(e) => setFormData({ ...formdata, name: e.target.value })} required />
//                     </div>
//                     <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Product Description:</label>
//                             <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="productDescription" name="productDescription"
//                             value={formdata.description}
//                                 onChange={(e) => setFormData({ ...formdata, description: e.target.value })} required
//                             ></textarea>
//                     </div>
//                     <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Product Price:</label>
//                             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="productPrice" name="productPrice"
//                             value={formdata.price}
//                             onChange={(e) => setFormData({ ...formdata, price: e.target.value })}
//                             required />
//                     </div>
//                     <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">Product Image:</label>
//                             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="productImage" name="productImage" onChange={(e) => setFormData({ ...formdata, imageUrl: e.target.files[0] })} />
//                     </div>
//                     <div className='mb-4'>
//                         <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
//                         <input type="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id='phone' name='phoneNumber' 
//                         value={formdata.phone}
//                         onChange={(e) => setFormData({ ...formdata, phone: e.target.value })}
//                         required />
//                     </div>
//                 <div className='mb-4'>
//                         <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
//                         <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id='address' name='address'
//                         value={formdata.address}
//                         onChange={(e) => setFormData({ ...formdata, address: e.target.value })}
//                         required />
//                 </div>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Product</button>
//             </form>
//     </div>