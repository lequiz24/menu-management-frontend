import React, { useState } from 'react';
import Sidebar from '../components/organisms/Sidebar';
import MenuDetails from '../components/organisms/MenuDetails';
import MenuForm from '../components/organisms/MenuForm';

const HomePage = () => {
  const [showMenus, setShowMenus] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = () => {
    setShowMenus(true);
    console.log('Menu button clicked, showMenus:', true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onMenuClick={handleMenuClick} />
      <div className="flex-1 flex">
        {showMenus && (
          <div className="w-1/3 p-4">
            <MenuDetails onSelectMenu={setSelectedMenu} />
          </div>
        )}
        <div className="w-1/3 p-4">
          <MenuForm selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
