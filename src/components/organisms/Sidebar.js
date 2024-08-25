import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDatabase, faUsers, faCogs, faClipboardList, faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onMenuClick }) => (
  <div className="w-60 h-full bg-gray-900 rounded-2xl p-4 flex-shrink-0">
    <ul className="text-white">
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faCode} className="mr-2" />
        Systems
      </li>
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faDatabase} className="mr-2" />
        System Code
      </li>
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faUsers} className="mr-2" />
        Properties
      </li>
      
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center cursor-pointer" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} className="mr-2" />
        Menu
      </li>
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faCogs} className="mr-2" />
        User and Group
      </li>
      <li className="py-2 px-4 hover:bg-green-500 rounded flex items-center" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
        Competition
      </li>
    </ul>
  </div>
);

export default Sidebar;
