import React, { useState } from 'react'
import { Button, Input, Modal, TimePicker, Dropdown } from 'antd'
import { Plus, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'

const TodaySchedulesForm = () => {

    const token = window.localStorage.getItem("token")
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
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

        if (taskValues.endtime < new Date().getTime()) {
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
                toast.success(result.msg, {
                    position: 'top-right'
                })

                dispatch({ type: 'taskadded', payload: true })
            }

            else {
                toast.error(result.msg, {
                    position: 'top-right'
                })
            }
        })
    }


    return (
        <div className='flex justify-end pr-16 mt-20'>

            <Button className='flex items-center py-4 px-6 border-[#5398fb] bg-[#5398fb]' onClick={() => setModalOpen(true)}>
                <Plus className='text-white' size={24} strokeWidth={1.25} />
                <h1 className='text-white text-lg'>Add task</h1>
            </Button>

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
    )
}

export default TodaySchedulesForm