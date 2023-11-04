import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

const HomePage = () => {
   const { auth } = useContext(AppContext)
   return (
      <div className='h-full f-center'>
         <h1 className='text-4xl font-bold f-center'>Xin chào {auth?.name}</h1>
      </div>
   )
}

export default HomePage