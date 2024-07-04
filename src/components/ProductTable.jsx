import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setEditModalOpen(false);
  };

  const openDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteProductId(null);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ops.cloud.leadtorev.com/product-catalog/get/all', {
          headers: {
            Authorization: 'mahesh',
          },
        });
        setProducts(response.data.data);
        const totalPages = Math.ceil(response.data.data.length / productsPerPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [productsPerPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h1 className='text-2xl font-black text-[#1D4A5D]'>Product Catalogue</h1>
        <button
          className="bg-black-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={openCreateModal}
        >
          + Create Product
        </button>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <CreateProduct onClose={closeCreateModal} />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <EditProduct product={editProduct} onClose={closeEditModal} />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <DeleteProduct productId={deleteProductId} onClose={closeDeleteModal} />
          </div>
        </div>
      )}

      <table className="border border-slate-950 mt-4 w-full">
        <thead>
          <tr className='bg-[#D3D3D3]'>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Product Id</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Product Name</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Category</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Availability</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Price</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Quantity</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Edit</th>
            <th className="border border-slate-950 text-black font-bold px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id}>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product._id}</td>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product.name}</td>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product.categories[0]}</td>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product.availability.inStock ? 'No' : 'Yes'}</td>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product.price}</td>
              <td className={`border border-slate-950 px-4 py-2 text-black ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>{product.availability.quantity}</td>
              <td className={`border border-slate-950 px-4 py-2 ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded mr-2"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
              </td>
              <td className={`border border-slate-950 px-4 py-2 ${index % 2 === 0 ? 'bg-white' : 'bg-[#71A0F8]'}`}>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  onClick={() => openDeleteModal(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2 ${
              currentPage === index + 1 ? 'bg-blue-600' : ''
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductTable;
