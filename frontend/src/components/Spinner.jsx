import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Spinner = ({ message, height, width }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <ThreeCircles color='black' innerCircleColor='gray' width={width} height={height} ariaLabel='three-circles-rotating'  className='m-5'/>
        <p className='text-lg text-center px-2 mt-5'>{message}</p>
    </div>
  )
}

export default Spinner