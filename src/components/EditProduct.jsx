import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProduct({ product, onClose }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.name || '');
      setProductDescription(product.description || '');
      setProductCategory(product.categories && product.categories.length > 0 ? product.categories[0] : 'Electronics');
      setPrice(product.price || '');
      setQuantity(product.availability?.quantity || '');
      setIsChecked(product.availability?.inStock || false);
      setAttributes(product.attributes || [{ key: '', value: '' }]);
    }
  }, [product]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index, field) => (e) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = e.target.value;
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

      const response = await axios.put(
        `https://ops.cloud.leadtorev.com/product-catalog/update/?id=${product._id}`,
        productData,
        {
          headers: {
            Authorization: 'mahesh',
          },
        }
      );

      console.log('Update response:', response.data.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-lg text-black font-semibold mb-4">Edit Product</h1>
        <div className="mb-4">
          <p className="text-black mb-1">Product Name</p>
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
        <div className="mb-4">
          <p className="text-black mb-1">Product Category</p>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
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
        <div className="mb-4">
          <p className="text-black mb-1">Availability</p>
          <div className='themeSwitcherTwo shadow-card relative inline-flex items-center justify-center rounded-md bg-[#D9D9D9] p-1'>
            <input
              type='checkbox'
              className='sr-only'
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span
              className={`flex items-center space-x-6 rounded py-2 px-18 text-sm font-medium ${
                isChecked ? 'text-primary bg-[#579DE3]' : 'text-body-color'
              }`}
            >
              In-Stock
            </span>
            <span
              className={`flex items-center space-x-6 rounded py-2 px-18 text-sm font-medium ${
                !isChecked ? 'text-primary bg-[#579DE3]' : 'text-body-color'
              }`}
            >
              Out-Stock
            </span>
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
                onChange={handleAttributeChange(index, 'key')}
                placeholder="Key"
                className="w-1/3 border rounded px-3 py-2 mr-2"
              />
              <input
                type="text"
                value={attribute.value}
                onChange={handleAttributeChange(index, 'value')}
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
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
