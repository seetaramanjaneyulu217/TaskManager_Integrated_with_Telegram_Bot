import { User, LogOut } from 'lucide-react';

const itemslargeScreen = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer">
        <div className='flex gap-1 items-center'>
          <User size={20} strokeWidth={2} className='text-[#5398fb]' />
          <h1 className='text-md'>Profile</h1>
        </div>
      </a>
    ),
  },

  {
    key: '2',
    label: (
      <a rel="noopener noreferrer">
        <div className='flex gap-1 items-center'>
          <LogOut size={20} strokeWidth={1.5} className='text-[#5398fb]' />
          <h1 className='text-md'>LogOut</h1>
        </div>
      </a>
    ),
  }
];


export default itemslargeScreen