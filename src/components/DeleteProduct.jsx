import React from 'react';
import axios from 'axios';

function DeleteProduct({ productId, onClose }) {
  const handleDelete = async () => {
    try {
      console.log('Deleting product with ID:', productId);

      const response = await axios.delete(`https://ops.cloud.leadtorev.com/product-catalog/delete/?id=${productId}`, {
        headers: {
          Authorization: 'mahesh',
        },
      });

      console.log('Delete response:', response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <h1 className="text-lg text-black font-semibold mb-4">Delete Product</h1>
      <p className="text-black mb-4">Are you sure you want to delete this product?</p>
      <div className="flex justify-between">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
