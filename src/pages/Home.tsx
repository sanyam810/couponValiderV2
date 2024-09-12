import React, { useState } from 'react';
import CouponList from "../components/CouponList";
import Nav from "../components/Nav";

export const Home = () => {
  const [filter, setFilter] = useState<'all' | 'validated' | 'unvalidated'>('all');

  const handleFilterChange = (newFilter: 'all' | 'validated' | 'unvalidated') => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100">
      <div className='mx-auto max-w-screen-xl'>
        <Nav onFilterChange={handleFilterChange} />
        <CouponList filter={filter} />
      </div>
    </div>
  );
};

export default Home;
