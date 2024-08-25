import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '../../api/menuApi';

const MenuList = ({ setSelectedMenuId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (id) => {
    setExpandedMenus(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderMenu = (menu) => (
    <li key={menu.id}>
      <div className="flex items-center cursor-pointer" onClick={() => toggleMenu(menu.id)}>
        <span>{expandedMenus[menu.id] ? '▼' : '▶'}</span>
        <span className="ml-2" onClick={() => setSelectedMenuId(menu.id)}>{menu.name}</span>
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

  // Ensure data is defined and is an array
  if (!data || !Array.isArray(data)) return <div>No menus available</div>;

  console.log('Fetched data:', data);

  return (
    <ul className="list-none pl-0">
      {data.map(menu => renderMenu(menu))}
    </ul>
  );
};

export default MenuList;
