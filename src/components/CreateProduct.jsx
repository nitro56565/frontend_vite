import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    setIsChecked(parseInt(value, 10) > 0);
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        name: productName,
        description: productDescription,
        categories: [productCategory],
        price: parseFloat(price),
        availability: {
          inStock: isChecked,
          quantity: parseInt(quantity, 10),
        },
        attributes: attributes.filter((attr) => attr.key && attr.value),
      };

      const response = await axios.post('https://ops.cloud.leadtorev.com/product-catalog/create', productData, {
        headers: {
          Authorization: 'mahesh',
        },
      });

      console.log(response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" text-white focus:ring-4 focus:outline-none focus:ring-blue-300 h-full font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-grey-200 dark:hover:bg-grey-300 dark:focus:ring-blue-800width- fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h1 className="text-lg font-semibold text-black mb-4">Create Product</h1>
        <div className="mb-4">
          <p className="mb-1 text-black">Product Name</p>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <p className="text-black mb-1">Product Description</p>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className='flex-auto'>
        <div className="flex-auto mb-4 display-flex">
          <p className="flex-auto text-black mb-1">Select Product Category</p>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="flex-auto display-flex w-full border rounded px-3 py-2"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Health & Personal Care">Health & Personal Care</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Automotive">Automotive</option>
            <option value="Beauty & Grooming">Beauty & Grooming</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>
        <div className="flex-auto	 mb-4">
          <p className="flex-auto	text-black mb-1">Availability</p>
          <div className='flex-auto	themeSwitcherTwo shadow-card relative inline-flex items-center justify-center rounded-md bg-[#D9D9D9] p-1 select-none'>
            <input
              type='checkbox'
              className='flex-auto sr-only'
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled
            />
            <span
              className={`flex items-center space-x-6 rounded py-2 px-18 text-sm font-medium ${
                isChecked ? 'text-primary bg-[#579DE3]' : 'text-body-color'
              }`}
              style={{ pointerEvents: 'none' }}
            >
              In-Stock
            </span>
            <span
              className={`flex items-center space-x-6 rounded py-2 px-18 text-sm font-medium ${
                !isChecked ? 'text-primary bg-[#579DE3]' : 'text-body-color'
              }`}
              style={{ pointerEvents: 'none' }}
            >
              Out-Stock
            </span>
          </div>
        </div>
        </div>
        <div className="mb-4">
          <p className="text-black mb-1">Price</p>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <p className="text-black mb-1">Quantity</p>
          <input
            type="text"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-black text-lg font-semibold mb-2">Attributes</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddAttribute}
          >
            Add Attribute
          </button>
          {attributes.map((attribute, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={attribute.key}
                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                placeholder="Key"
                className="w-1/3 border rounded px-3 py-2 mr-2"
              />
              <input
                type="text"
                value={attribute.value}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="w-1/3 border rounded px-3 py-2 mr-2"
              />
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRemoveAttribute(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
