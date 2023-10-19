import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddEmp from './components/AddEmp'
import ShowEmp from './components/ShowEmp'

const WebRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/addemp' element={<AddEmp/>} />
        <Route path='/showemp' element={<ShowEmp/>} />
    </Routes>
    </>
  )
}

export default WebRoutes