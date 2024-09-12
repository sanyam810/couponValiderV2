import { Separator } from "@radix-ui/react-separator";

interface NavProps {
  onFilterChange: (filter: 'all' | 'validated' | 'unvalidated') => void;
}

const Nav: React.FC<NavProps> = ({ onFilterChange }) => {
  return (
    <div className='flex flex-col text-black font-founders'>
      <div className='flex justify-between px-4 py-4 text-lg'>
        <div className='text-5xl'>
          COUPONS<br/>DASHBOARD  
        </div>
        <div className='flex space-x-10 font-bold underline text-xl cursor-pointer items-center mt-20'>
            <div onClick={() => onFilterChange('all')}>
            All Coupons
          </div>
          <div onClick={() => onFilterChange('validated')}>
            Validated Coupons
          </div>
          <div onClick={() => onFilterChange('unvalidated')}>
            Invalidated Coupons
          </div>
        </div>
      </div>

      <div className="mt-4 bg-black">
        <Separator />
      </div>
    </div>
  );
};

export default Nav;
