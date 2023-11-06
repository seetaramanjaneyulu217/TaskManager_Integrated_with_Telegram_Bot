import { CalendarDays, Clock3, User, LogOut, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
const login = false

const loginLabel = {
  key: '3',
  label: (
    <Link rel="noopener noreferrer" to='/login'>
      <div className='flex gap-1 items-center'>
        <KeyRound size={20} strokeWidth={2} className='text-[#5398fb]' />
        <h1 className='text-md'>Login</h1>
      </div>
    </Link>
  )
}


const itemssmallScreen = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer">
        <div className='flex gap-1 items-center'>
          <CalendarDays size={20} strokeWidth={2} className='text-[#5398fb]' />
          <h1 className='text-md'>Calenders</h1>
        </div>
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer">
        <div className='flex gap-1 items-center'>
          <Clock3 size={20} strokeWidth={2} className='text-[#5398fb]' />
          <h1 className='text-md'>Today's Schedules</h1>
        </div>
      </a>
    ),
  },
  {
    key: '3',
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
    key: '4',
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

const filteredItems = login ? itemssmallScreen : itemssmallScreen.slice(0, 2)
filteredItems.push(loginLabel)

export default filteredItems