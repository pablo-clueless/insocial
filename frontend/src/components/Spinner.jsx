import React from 'react'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'

const Spinner = ({ message, height, width }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        {/* <ThreeCircles color='fuchsia' innerCircleColor='black' width={width} height={height} ariaLabel='three-circles-rotating'  className='m-5'/> */}
        <ThreeDots color='fuchsia' height={height} width={width} ariaLabel='three-dots-loading' />
        <p className='text-lg text-center px-2 mt-5'>{message}</p>
    </div>
  )
}

export default Spinner