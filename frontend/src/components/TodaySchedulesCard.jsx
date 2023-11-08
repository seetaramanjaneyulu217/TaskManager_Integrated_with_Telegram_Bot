import { Dropdown } from 'antd'
import { CheckCircle, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const TodaySchedulesCard = ({ schedule }) => {

  const token = window.localStorage.getItem("token")
  const dispatch = useDispatch()

  const ellipsisItems = [
    {
      key: '1',
      label: (
        <Link rel="noopener noreferrer">
          <div className='flex gap-1 items-center text-blue-500'>
            <Pencil strokeWidth={0.75} />
            <h1 className='text-lg'>Edit</h1>
          </div>
        </Link>
      ),
    },

    {
      key: '2',
      label: (
        <Link rel="noopener noreferrer">
          <div className='flex gap-1 items-center text-red-500'>
            <Trash2 strokeWidth={0.75} />
            <h1 className='text-lg'>Delete</h1>
          </div>
        </Link>
      ),
    }
  ]

  const handleTaskDone = () => {

    dispatch({ type: 'loading', payload: true })
    const response = fetch('http://localhost:4000/user/today/mark-task-as-done', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId: schedule.id })
    })

    const result = response.then(response => response.json())
    result.then(result => {
      if (result.msg === 'Marked the task as done') {
        dispatch({ type: 'taskdone' })
        dispatch({ type: 'loading', payload: false })
        toast.success(result.msg, {
          position: 'top-right'
        })
      }

      else {
        dispatch({ type: 'loading', payload: false })
        toast.error(result.msg, {
          position: 'top-right'
        })
      }
    })
  }

  return (
    <>
      <div className='border-2 border-[#e1e2fa] rounded-xl shadow-lg shadow-[#e5e6f8] p-3 h-80 mr-16'>
        {/* For taskname */}
        <div className='mb-7'>
          <h1 className='flex flex-col'>
            <div className='flex justify-between'>
              <p className='text-lg font-semibold'>Taskname:</p>
              <Dropdown
                menu={{
                  items: ellipsisItems,
                }}
                placement="bottomLeft"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <button className='outline-none'>
                  <MoreVertical size={20} strokeWidth={2} className='cursor-pointer' />
                </button>
              </Dropdown>
            </div>
            <p className={`${schedule.taskname.length > 20 ? 'text-sm' : 'text-2xl'} text-orange-300 overflow-hidden break-words`}>{schedule.taskname[0].toUpperCase() + schedule.taskname.substring(1, schedule.taskname.length)}</p>
          </h1>
        </div>

        <div className='flex justify-between mb-7'>
          <h1 className='flex flex-col'><p className='font-semibold'>Start:</p>{schedule.starttime}</h1>
          <h1 className='flex flex-col'><p className='font-semibold'>End:</p>{schedule.endtime}</h1>
        </div>

        <div className='mb-5'><p className='font-semibold'>Priority:</p>{schedule.priority}</div>

        <div className='flex justify-end mr-3 pt-2'><CheckCircle onClick={handleTaskDone} strokeWidth={1.5} className='text-green-400 cursor-pointer' /></div>
      </div>
    </>
  )
}

export default TodaySchedulesCard