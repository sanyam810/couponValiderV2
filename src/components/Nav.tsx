import React, { useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavProps {
  onFilterChange: (filter: 'all' | 'validated' | 'unvalidated') => void;
}

const Nav: React.FC<NavProps> = ({ onFilterChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="font-founders text-black">
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 py-4 text-lg">
        <div className="text-4xl sm:text-5xl">
          COUPONS<br />DASHBOARD
        </div>
        {/* Mobile menu button */}
        <div className="sm:hidden cursor-pointer text-xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-10 font-semibold underline pt-8 text-xl cursor-pointer items-center mt-10">
          <div onClick={() => onFilterChange('all')}>All Coupons</div>
          <div onClick={() => onFilterChange('validated')}>Validated Coupons</div>
          <div onClick={() => onFilterChange('unvalidated')}>Invalidated Coupons</div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col space-y-4 sm:hidden px-4 py-4 text-xl font-bold underline">
          <div onClick={() => { onFilterChange('all'); toggleMenu(); }}>All Coupons</div>
          <div onClick={() => { onFilterChange('validated'); toggleMenu(); }}>Validated Coupons</div>
          <div onClick={() => { onFilterChange('unvalidated'); toggleMenu(); }}>Invalidated Coupons</div>
        </div>
      )}

      {/* Separator */}
      <div className="mt-4 bg-black">
        <Separator />
      </div>
    </div>
  );
};

export default Nav;
