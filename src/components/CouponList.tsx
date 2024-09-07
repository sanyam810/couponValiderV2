import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface Coupon {
  id: number;
  coupon: string;
  description?: string;
  company?: string;
  date: string; 
  validated: boolean;
}

const CouponList: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchCoupons = async (page: number) => {
    try {
      const response = await axios.get('https://zappbackend.sanyamsaini081.workers.dev/api/v1/coupons', {
        headers: {
          'Authorization': 'Bearer ff32892119b29704551ed019ee61217b141032d6e84ead8b4b95d0f30908df3c',
          'Content-Type': 'application/json'
        },
        params: { page } 
      });

      if (Array.isArray(response.data.coupons) && response.data.totalPages) {
        setCoupons(response.data.coupons);
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchCoupons(currentPage);
  }, [currentPage]);

  const handleButtonClick = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await axios.post('https://zappbackend.sanyamsaini081.workers.dev/api/v1/coupons/validate', 
        { id, validated: newStatus }, 
        {
          headers: {
            'Authorization': 'Bearer ff32892119b29704551ed019ee61217b141032d6e84ead8b4b95d0f30908df3c',
            'Content-Type': 'application/json'
          }
        }
      );
      
      
      setCoupons(coupons.map(coupon => 
        coupon.id === id ? { ...coupon, validated: newStatus } : coupon
      ));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>
      <ul className="space-y-4">
        {coupons.map(coupon => (
          <li key={coupon.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
            <div>
              <p className="text-xl text-black font-semibold">{coupon.coupon}</p>
              <div className='pt-2'>
                <Separator />
              </div>
              {/* <Separator /> */}
              <div className='pt-2 text-sm'>
                <p className="text-gray-700">Company: {coupon.company || 'No company available'}</p>
                <p className="text-gray-700">Description: {coupon.description || 'No description available'}</p>
                <p className="text-gray-700">Created At: {new Date(coupon.date).toLocaleDateString()}</p>
                <p className="text-gray-700 font-bold">Validated: {coupon.validated ? 'Yes' : 'No'}</p>
              </div>
              
            </div>
            <div className='pt-4'>
              <Button
                onClick={() => handleButtonClick(coupon.id, coupon.validated)}
                className={`bg-black text-white hover:bg-white hover:text-black border border-black`}
              >
                {coupon.validated ? 'Unvalidate' : 'Validate'}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="justify-center flex flex-col items-center mt-10">
        <div className='gap-6 flex'>
            <div>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Previous
                </Button>
            </div>
            <div>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Next
                </Button>
            </div>
        </div>
        <div className='pt-2 font-bold'>
            <span className="self-center">Page {currentPage} of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
