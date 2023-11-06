import React from 'react'
import LoginForm from '../components/LoginForm'
import loginimage from '../assets/login.jpg'
import { ClockLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const Login = () => {

    const isLoading = useSelector(state => state.isLoading)

    return (
        <>
            <div className={`${isLoading ? 'blur-md' : ''} flex justify-center items-center mt-32`}>
                <div className='flex items-center border-2 border-[#edeeff] px-9 py-11 rounded-2xl shadow-2xl shadow-[#edeeff]'>
                    <LoginForm />

                    {/* For image */}
                    <div className=''>
                        <img src={loginimage} alt='loginimage' className='h-[390px] w-[450px]' />
                    </div>
                </div>
            </div>

            <div>
                {isLoading && <ClockLoader size={70} color="#5398fb" speedMultiplier={0.8} cssOverride={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '47%' }} />}
            </div>
        </>
    )
}

export default Login