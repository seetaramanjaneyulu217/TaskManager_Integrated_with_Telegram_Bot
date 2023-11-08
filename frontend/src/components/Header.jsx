import React from 'react'
import { UserCircle, Menu, CalendarDays, Clock3, User, LogOut, KeyRound } from 'lucide-react';
import { Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Header = () => {

    const token = window.localStorage.getItem("token")
    const location = useLocation()
    const navigate = useNavigate()

    const logoutHandler = () => {
        window.localStorage.removeItem("token")
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const itemslargeScreen = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" to="/your-profile">
                    <div className='flex gap-1 items-center'>
                        <User size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Profile</h1>
                    </div>
                </Link>
            ),
        },

        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" onClick={logoutHandler}>
                    <div className='flex gap-1 items-center'>
                        <LogOut size={20} strokeWidth={1.5} className='text-[#5398fb]' />
                        <h1 className='text-md'>LogOut</h1>
                    </div>
                </Link>
            ),
        }
    ];

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
                <Link rel="noopener noreferrer">
                    <div className='flex gap-1 items-center'>
                        <CalendarDays size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Calenders</h1>
                    </div>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer">
                    <div className='flex gap-1 items-center'>
                        <Clock3 size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Today's Schedules</h1>
                    </div>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link rel="noopener noreferrer" to='/your-profile'>
                    <div className='flex gap-1 items-center'>
                        <User size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Profile</h1>
                    </div>
                </Link>
            ),
        },

        {
            key: '4',
            label: (
                <Link rel="noopener noreferrer" onClick={logoutHandler}>
                    <div className='flex gap-1 items-center'>
                        <LogOut size={20} strokeWidth={1.5} className='text-[#5398fb]' />
                        <h1 className='text-md'>LogOut</h1>
                    </div>
                </Link>
            ),
        }
    ];
    const filteredItems = token ? itemssmallScreen : itemssmallScreen.slice(0, 2)
    const finalItems = token ? itemssmallScreen : [...filteredItems, loginLabel]

    return (
        <>
            <div className='flex justify-between px-16 py-9'>
                {/* For app heading */}
                <div className='cursor-pointer' onClick={() => navigate('/')} >
                    <h1 className='text-4xl text-[#7471fc]'>DailyTask</h1>
                </div>

                {/* For other things */}
                <div className='hidden md:flex gap-20 items-center'>

                    <div className={`${location.pathname === '/your-todays-schedules' ? 'border-2 border-[#5398fb] bg-[#5398fb] text-white rounded-lg px-3 py-1' : ''} flex gap-1 items-center cursor-pointer`} onClick={() => navigate('/your-todays-schedules')}>
                        <Clock3 size={20} strokeWidth={2} className={`${location.pathname === '/your-todays-schedules' ? 'text-white' : 'text-[#5398fb]'}`} />
                        <h1 className='text-md'>Today's Schedules</h1>
                    </div>

                    <div className={`${location.pathname === '/your-calenders' ? 'underline' : ''} flex gap-1 items-center cursor-pointer`} onClick={() => navigate('/your-calenders')}>
                        <CalendarDays size={20} strokeWidth={2} className={`${location.pathname === '/your-calenders' ? 'text-white' : 'text-[#5398fb]'}`} />
                        <h1 className='text-md'>Calenders</h1>
                    </div>

                    {
                        token
                            ? (
                                <div>
                                    <Dropdown
                                        menu={{
                                            items: itemslargeScreen,
                                        }}
                                        placement="bottomLeft"
                                        arrow={{
                                            pointAtCenter: true,
                                        }}
                                    >
                                        <button className='outline-none'>
                                            <UserCircle size={34} strokeWidth={2} className='text-[#5398fb] cursor-pointer' />
                                        </button>
                                    </Dropdown>
                                </div>
                            )
                            : (
                                <div>
                                    <button onClick={() => navigate('/login')} className='border-2 border-[#5398fb] bg-[#5398fb] text-white rounded-lg px-5 py-1'>Login</button>
                                </div>
                            )
                    }
                </div>

                {/* Dropdown for small screens */}
                <Dropdown
                    menu={{
                        items: finalItems,
                    }}
                    placement="bottomLeft"
                    arrow={{
                        pointAtCenter: true,
                    }}
                >
                    <button className='outline-none md:hidden'>
                        <Menu size={28} strokeWidth={1} className='cursor-pointer' />
                    </button>
                </Dropdown>
            </div>
        </>
    )
}

export default Header