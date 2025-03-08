import React from 'react';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </header>
  );
};

export default Header;