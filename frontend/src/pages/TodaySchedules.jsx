import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import doneimage from '../assets/Done.jpg'
import TodaySchedulesCard from '../components/TodaySchedulesCard';
import TodaySchedulesForm from '../components/TodaySchedulesForm';
import { useSelector } from 'react-redux';

const TodaySchedules = () => {

    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()
    const taskadded = useSelector(state => state.taskadded)
    const [todaySchedules, setTodaySchedules] = useState([])

    const fetchTodaysSchedules = () => {

        const response = fetch('http://localhost:4000/user/today/get-today-schedules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        const result = response.then(response => response.json())
        result.then(result => {
            if (result.msg === 'Unauthorized') {
                navigate('/')
            }

            else if (result.msg === 'Error while getting your tasks') {
                toast.error(result.msg, {
                    position: 'top-right'
                })
            }

            else {
                setTodaySchedules(result.todaySchedules)
            }
        })
    }

    useEffect(() => {
        fetchTodaysSchedules()
    }, [taskadded])

    return (
        <div className='bg-[#fbf9f9] h-screen'>
            <Header />

            <div>
                <TodaySchedulesForm />

                {
                    todaySchedules.length === 0
                        ? (
                            <div className='flex justify-center items-center mt-8 gap-32'>
                                <img src={doneimage} height={400} width={400} className='rounded-full shadow-2xl shadow-[#d6e6ff]' />
                                <h1 className='text-5xl text-[#667177] w-96'>No tasks Scheduled for now!</h1>
                            </div>
                        )
                        : (
                            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-12 py-5'>
                                {
                                    todaySchedules.map(schedule => {
                                        return (
                                            <TodaySchedulesCard schedule={schedule} />
                                        )
                                    })
                                }
                            </div>
                        )
                }
            </div>

            <ToastContainer />
        </div>
    )
}

export default TodaySchedules