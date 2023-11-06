import React, { useState } from 'react'
import { Button } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    otp: ''
  })

  const [openOTPForm, setopenOTPForm] = useState(false)
  const isLoading = useSelector(state => state.isLoading)

  const handleGetOTP = () => {

    dispatch({ type: 'loading', payload: true })

    const response = fetch('http://localhost:4000/user/sendotp', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails)
    })
    const result = response.then(response => response.json())
    result.then(result => {

      if (result.msg === 'Login SuccessFul') {

        toast.success(result.msg, {
          position: "top-right",
          transition: 'slide'
        })

        window.localStorage.setItem("token", result.token)

        setTimeout(() => {
          navigate('/')
        }, 1000)
      }

      else if (result.msg === 'Password invalid') {
        toast.error(result.msg, {
          position: "top-right",
          autoClose: 5000,
        })
      }

      else if (result.msg === 'OTP sent to your email') {
        toast.success(result.msg, {
          position: "top-right",
          autoClose: 5000,
        })
        setopenOTPForm(true)
      }

      else {
        toast.error(result.msg, {
          position: "top-right",
          autoClose: 5000,
        })
      }

      dispatch({ type: 'loading', payload: false })
    })
      .catch(error => {
        dispatch({ type: 'loading', payload: false })
        toast.error('Error in getting response', {
          position: "top-right",
          autoClose: 5000,
        })
      })
  }


  const handleLogin = () => {
    dispatch({ type: 'loading', payload: true })

    const response = fetch('http://localhost:4000/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails)
    })

    const result = response.then(response => response.json())
    result.then(response => {

      if (response.msg === 'Login SuccessFul') {

        dispatch({ type: 'loading', payload: false })
        toast.success(response.msg, {
          position: "top-right",
        })

        window.localStorage.setItem("token", response.token)

        setTimeout(() => {
          navigate('/')
        }, 2000)
      }

      else {
        dispatch({ type: 'loading', payload: false })
        toast.error(response.msg, {
          position: "top-right",
        })
      }
    })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='flex flex-col mr-5'>

      <div className='w-80 mb-7'>
        <h1 className='text-3xl text-[#5398fb]'>Login into DailyTask and handle your tasks</h1>
      </div>

      {/* Form for otp */}
      <div className={`${openOTPForm ? 'block' : 'hidden'}`}>
        <div className="relative border-2 border-[#edeeff] rounded-xl">
          <input onChange={(e) => setUserDetails({ ...userDetails, otp: e.target.value })} type="text" id="otp" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-[#edeeff] dark:focus:border-[#91c4fb] focus:outline-none focus:ring-0 focus:border-[#91c4fb] peer" placeholder=" " />
          <label htmlFor="otp" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#91c4fb] peer-focus:dark:text-[#91c4fb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">OTP</label>
        </div>

        <Button onClick={handleLogin} type='button' className='border-2 border-[#5398fb] bg-[#5398fb] mt-3 text-white rounded-lg w-28'>Verify OTP</Button>
      </div>

      {/* Form for user details */}
      <div className={`${openOTPForm ? 'hidden' : 'block'} flex flex-col gap-5`}>
        <div className="relative border-2 border-[#edeeff] rounded-xl">
          <input onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-[#edeeff] dark:focus:border-[#91c4fb] focus:outline-none focus:ring-0 focus:border-[#91c4fb] peer" placeholder=" " />
          <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#91c4fb] peer-focus:dark:text-[#91c4fb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>

        <div className="relative border-2 border-[#edeeff] rounded-xl">
          <input onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-[#edeeff] dark:focus:border-[#91c4fb] focus:outline-none focus:ring-0 focus:border-[#91c4fb] peer" placeholder=" " />
          <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#91c4fb] peer-focus:dark:text-[#91c4fb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        </div>
        <Button type='button' onClick={handleGetOTP} className='border-2 border-[#5398fb] bg-[#5398fb] mt-3 text-white rounded-lg w-28'>Login</Button>
      </div>

      <ToastContainer />
    </div>
  )
}

export default LoginForm