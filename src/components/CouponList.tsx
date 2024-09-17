import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { FaClipboard } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard!');
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
};

interface Coupon {
  id: number;
  coupon: string;
  description?: string;
  company?: string;
  date: string;
  validated: boolean;
  source?: string;
}

interface CouponListProps {
  filter: 'all' | 'validated' | 'unvalidated';
}

const CouponList: React.FC<CouponListProps> = ({ filter }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [showTodayOnly, setShowTodayOnly] = useState<boolean>(false);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  const fetchCoupons = async (page: number, company = '',search='') => {
    try {
      const response = await axios.get(`http://localhost:8787/api/v1/coupons`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        params: { page, company,search },
      });

      if (Array.isArray(response.data.coupons) && response.data.totalPages) {
        setCoupons(response.data.coupons);
        setTotalPages(response.data.totalPages);
        setCompanyNames(response.data.companyNames || []);
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
    const delayDebounce = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    fetchCoupons(currentPage, selectedCompany,debouncedQuery);
  }, [currentPage, selectedCompany,debouncedQuery]);

  const handleButtonClick = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;

      const response = await axios.post(
        `http://localhost:8787/api/v1/validate`,
        { id, validated: newStatus },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setCoupons(coupons.map(coupon =>
          coupon.id === id ? { ...coupon, validated: newStatus } : coupon
        ));
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        setError(err.response?.data?.error || 'An unknown error occurred');
      } else if (err instanceof Error) {
        console.error('Error message:', err.message);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('An unknown error occurred');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(event.target.value);
    setCurrentPage(1); 
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const filteredCoupons = coupons.filter(coupon => {
    if (filter !== 'all') {
      return filter === 'validated' ? coupon.validated : !coupon.validated;
    }
    return true;
  }).filter(coupon => {
    if (showTodayOnly) {
      return isToday(coupon.date);
    }
    return true;
  });

  const handleTodayFilterChange = () => {
    setShowTodayOnly(!showTodayOnly);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {filter === 'all' ? 'All Coupons' : filter === 'validated' ? 'Validated Coupons' : 'Unvalidated Coupons'}
      </h1>
      
      {/* Company Filter Dropdown */}
      <div className="mb-4">
        {/* <label htmlFor="company-filter" className="block text-sm font-medium text-gray-700">
          Filter by Company
        </label> */}
        <select
          id="company-filter"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          <option value="">All Companies</option>
          {companyNames.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
          
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Coupons"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={showTodayOnly}
            onChange={handleTodayFilterChange}
          />
          <span className="ml-2">Show only coupons uploaded today</span>
        </label>
        <div className='mt-2 pt-1 bg-black'>
          <Separator />
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-2">
        {filteredCoupons.map(coupon => (
          <div key={coupon.id} className="eth-card shadow-md rounded-lg p-4 border border-gray-200 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
            <div>
              <div className='flex flex-row justify-between'>
                <div>
                  <p className="text-xl text-black font-semibold">{coupon.coupon}</p>
                </div>
                
                <div style={{ marginTop: '2px' }}>
                  <div className="flex items-center">
                    <button
                      onClick={() => copyToClipboard(coupon.coupon)}
                      className="text-xl ml-2 text-black hover:text-gray-900"
                      aria-label="Copy coupon code"
                    >
                      <FaClipboard />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className='mt-2 bg-black' style={{ paddingTop: '4px' }}>
                <Separator />
              </div>
              <div className='pt-2 text-sm text-black font-semibold'>
                <p>Company - {coupon.company || 'No company available'}</p>
                <p>Source - {coupon.source || 'No source available'}</p>
                <p>Description - {coupon.description || 'No description available'}</p>
                <p>Created At - {new Date(coupon.date).toLocaleDateString()}</p>
                <p className="font-bold">Validated: {coupon.validated ? 'Yes' : 'No'}</p>
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
          </div>
        ))}
      </div>

      
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
      <Toaster />
    </div>
  );
};

export default CouponList;
