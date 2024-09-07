// App.tsx
import React from 'react';
import CouponList from "./components/CouponList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 ">
      <div className='mx-auto max-w-screen-xl'>
        <CouponList />
      </div>
    </div>
  );
};

export default App;
