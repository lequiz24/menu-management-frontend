import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuForm = ({ selectedMenu }) => {
  const [name, setName] = useState('');
  const [menuId, setMenuId] = useState(null);
  const [parentName, setParentName] = useState('');
  const [order, setOrder] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedMenu) {
      setMenuId(selectedMenu.menuId);
      setParentName(selectedMenu.parentName);
      setOrder(selectedMenu.order || 0);
    }
  }, [selectedMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parent_id: menuId, order }),
    });

    if (response.ok) {
      setSuccess(true);
      toast.success('Menu saved successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Menu ID</label>
          <input type="text" value={menuId || ''} readOnly className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Parent Name</label>
          <input type="text" value={parentName} readOnly className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Depth</label>
          <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Order" className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Menu Name" className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
       
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MenuForm;
