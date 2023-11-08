import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import TodaySchedules from './pages/TodaySchedules'
import Calenders from './pages/Calenders'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/your-profile' element={<Profile/>} />
      <Route path='/your-todays-schedules' element={<TodaySchedules/>} />
      <Route path='/your-calenders' element={<Calenders/>} />
    </Routes>
  )
}

export default App