import React from 'react'
import { CalendarDays, Clock3, UserCircle, Menu } from 'lucide-react';
import { Dropdown } from 'antd';
import itemssmallScreen from '../exports/HeaderSmallScreenDropDownItems'
import itemslargeScreen from '../exports/HeaderLargeScreenDropDownItems'
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()

    return (
        <>
            <div className='flex justify-between px-16 py-9'>
                {/* For app heading */}
                <div>
                    <h1 className='text-4xl text-[#7471fc]'>DailyTask</h1>
                </div>

                {/* For other things */}
                <div className='hidden md:flex gap-20 items-center'>
                    <div className='flex gap-1 items-center'>
                        <CalendarDays size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Calenders</h1>
                    </div>

                    <div className='flex gap-1 items-center'>
                        <Clock3 size={20} strokeWidth={2} className='text-[#5398fb]' />
                        <h1 className='text-md'>Today's Schedules</h1>
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
                                    <button onClick={ () => navigate('/login') } className='border-2 border-[#5398fb] bg-[#5398fb] text-white rounded-lg px-5 py-1'>Login</button>
                                </div>
                            )
                    }
                </div>

                {/* Dropdown for small screens */}
                <Dropdown
                    menu={{
                        items: itemssmallScreen,
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