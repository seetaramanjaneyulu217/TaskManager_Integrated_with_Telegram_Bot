import React, { useState } from 'react'
import { Button, Modal, TimePicker, Dropdown, Switch } from 'antd'
import { Plus, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { ClockLoader } from 'react-spinners'

const TodaySchedulesForm = () => {

    const token = window.localStorage.getItem("token")
    const isLoading = useSelector(state => state.isLoading)
    const remainder = useSelector(state => state.remainder)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    // const [onswitch, setOnSwitch] = useState(false)
    const [taskValues, setTaskValues] = useState({
        taskname: '',
        starttime: '',
        endtime: '',
        priority: 'Priority'
    })

    const priorityItems = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" onClick={() => setTaskValues({ ...taskValues, priority: 'High' })}>
                    <div className='flex gap-1 items-center'>
                        <h1 className='text-md'>High</h1>
                    </div>
                </Link>
            ),
        },

        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" onClick={() => setTaskValues({ ...taskValues, priority: 'Medium' })}>
                    <div className='flex gap-1 items-center'>
                        <h1 className='text-md'>Medium</h1>
                    </div>
                </Link>
            ),
        },

        {
            key: '3',
            label: (
                <Link rel="noopener noreferrer" onClick={() => setTaskValues({ ...taskValues, priority: 'Low' })}>
                    <div className='flex gap-1 items-center'>
                        <h1 className='text-md'>Low</h1>
                    </div>
                </Link>
            ),
        }
    ]

    const submitForm = () => {

        dispatch({ type: 'loading', payload: true })

        if (taskValues.endtime < new Date().getTime()) {

            dispatch({ type: 'loading', payload: false })

            toast.error('End time is less than the current time', {
                position: 'top-right'
            })

            return
        }

        setModalOpen(false)
        const starttime = taskValues.starttime.$H + ":" + (taskValues.starttime.$m < 10 ? `0${taskValues.starttime.$m}` : taskValues.starttime.$m) + " " + (taskValues.starttime.$H >= 12 ? 'PM' : 'AM')
        const endtime = taskValues.endtime.$H + ":" + (taskValues.endtime.$m < 10 ? `0${taskValues.endtime.$m}` : taskValues.endtime.$m) + " " + (taskValues.endtime.$H >= 12 ? 'PM' : 'AM')

        const finalTaskValues = {
            taskname: taskValues.taskname,
            starttime: starttime,
            endtime: endtime,
            priority: taskValues.priority
        }

        const response = fetch('http://localhost:4000/user/today/add-today-schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(finalTaskValues)
        })

        const result = response.then(response => response.json())
        result.then(result => {
            if (result.msg === 'Task added SuccessFully') {

                dispatch({ type: 'loading', payload: false })

                toast.success(result.msg, {
                    position: 'top-right'
                })

                dispatch({ type: 'taskadded' })
            }

            else {

                dispatch({ type: 'loading', payload: false })

                toast.error(result.msg, {
                    position: 'top-right'
                })
            }
        })
            .catch(error => {
                dispatch({ type: 'loading', payload: false })

                toast.error('Error', {
                    position: 'top-right'
                })
            })
    }


    const switchHandler = () => {

        fetch('http://localhost:4000/user/today/set-remainder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(result => {
            dispatch({ type: 'remainder', payload: result.remainder })
            if(result.msg === 'Remainder Set SuccessFully') {
                toast.success(result.msg, {
                    position: 'top-right'
                })
            }

            else {
                toast.error(result.msg, {
                    position: 'top-right'
                })
            }
        })
    }


    return (
        <>
            <div className={`${isLoading ? 'blur-md' : ''} flex justify-end pr-16 mt-20`}>

                <div className='flex items-center gap-12'>
                    <div className='flex items-center gap-2'>
                        <Switch checked={remainder} onChange={switchHandler} className='bg-gray-300' />
                        <p>Turn {remainder ? 'off' : 'on'} notificaions</p>
                    </div>
                    <Button className='flex items-center py-4 px-6 border-[#5398fb] bg-[#5398fb]' onClick={() => setModalOpen(true)}>
                        <Plus className='text-white' size={24} strokeWidth={1.25} />
                        <h1 className='text-white text-lg'>Add task</h1>
                    </Button>
                </div>

                <Modal
                    title="Add your task"
                    centered
                    open={modalOpen}
                    onOk={submitForm}
                    onCancel={() => setModalOpen(false)}
                    okButtonProps={{ style: { background: '#5398fb', borderColor: '#5398fb', color: 'white' } }}
                >
                    <div className="relative border-2 border-[#edeeff] rounded-xl mb-7 mt-7">
                        <input onChange={(e) => setTaskValues({ ...taskValues, taskname: e.target.value })} type="text" id="taskname" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-[#edeeff] dark:focus:border-[#91c4fb] focus:outline-none focus:ring-0 focus:border-[#91c4fb] peer" placeholder=" " />
                        <label htmlFor="taskname" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#91c4fb] peer-focus:dark:text-[#91c4fb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Taskname</label>
                    </div>

                    <div className='mb-7'>
                        <TimePicker.RangePicker onChange={(value) => setTaskValues({ ...taskValues, starttime: value[0], endtime: value[1] })} />
                    </div>

                    <Dropdown
                        menu={{
                            items: priorityItems,
                        }}
                        placement="bottomLeft"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <button className='flex items-center border-2 border-[#5398fb] bg-[#5398fb] text-white rounded-lg px-3 py-1'>{taskValues.priority}<ChevronDown strokeWidth={0.75} className='mt-0.5' /></button>
                    </Dropdown>
                </Modal>

                <ToastContainer />
            </div>

            <div>
                {isLoading && <ClockLoader size={70} color="#5398fb" speedMultiplier={0.8} cssOverride={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '47%' }} />}
            </div>
        </>
    )
}

export default TodaySchedulesForm