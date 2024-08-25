import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '../../api/menuApi';
import { SlArrowDown, SlArrowRight } from 'react-icons/sl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const MenuDetails = ({ onSelectMenu }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeButton, setActiveButton] = useState(null);

  const toggleMenu = (id) => {
    setExpandedMenus(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleMenuClick = (menu) => {
    const parent = data.find(item => item.id === menu.parent_id);
    onSelectMenu({
      menuId: menu.id,
      depth: menu.depth,
      parentName: parent ? parent.name : 'Root',
    });
  };

  const renderMenu = (menu) => (
    <li key={menu.id}>
      <div className="flex items-center cursor-pointer" onClick={() => toggleMenu(menu.id)}>
        {expandedMenus[menu.id] ? <SlArrowDown /> : <SlArrowRight />}
        <span className="ml-2" onClick={() => handleMenuClick(menu)}>{menu.name}</span>
      </div>
      {expandedMenus[menu.id] && menu.children && menu.children.length > 0 && (
        <ul className="pl-5">
          {menu.children.map(child => renderMenu(child))}
        </ul>
      )}
    </li>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menus</div>;
  if (!data || !Array.isArray(data)) return <div>No menus available</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="py-2 px-4 rounded flex items-center cursor-pointer">
        <FontAwesomeIcon icon={faBars} className="mr-2" />
        Menus
      </h2>
      
      <div className="flex justify-between mb-4">
        <button
          className={`py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${activeButton === 'expand' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-gray-900'}`}
          onClick={() => {
            setExpandedMenus(data.reduce((acc, menu) => ({ ...acc, [menu.id]: true }), {}));
            setActiveButton('expand');
          }}
        >
          Expand All
        </button>
        <button
          className={`py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${activeButton === 'collapse' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-gray-900'}`}
          onClick={() => {
            setExpandedMenus({});
            setActiveButton('collapse');
          }}
        >
          Collapse All
        </button>
      </div>
      <ul className="list-none pl-0">
        {data.map(menu => renderMenu(menu))}
      </ul>
    </div>
  );
};

export default MenuDetails;
