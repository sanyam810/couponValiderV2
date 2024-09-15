// App.tsx
import React from 'react';
import CouponList from "./CouponList";

const Coupon: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 ">
      <div className='mx-auto max-w-screen-xl'>
        <CouponList filter="all"/>
      </div>
    </div>
  );
};

export default Coupon;
