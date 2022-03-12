import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'

import { categories } from '../utils/data'
import logo from '../assets/insocial.png'

const isNotActiveStyle = 'flex items-center px-5 py-2 my-[0.5px] gap-3 text-xl text-gray-500 hover:text-black transition-all duration-200 ease-in-out capital'

const isActiveStyle = 'flex bg-gray-200 items-center px-5 py-2 my-[0.5px] gap-3 text-xl text-fuchsia-400 border-r-4 border-fuchsia-500 transition-all duration-200 ease-in-out capital hover:text-black'

const SideBar = ({ user, closeToggle }) => {
    const handleCloseSideBar = () => {
        if(closeToggle) closeToggle(false)
    }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
            <Link to='/' className='flex px-5 gap-2 my-8 pt-1 w-190 items-center' onClick={handleCloseSideBar} >
                <img src={logo} alt="insocial logo" className='w-full' />
            </Link>
            <div className='flex flex-col gap-5 mb-3'>
                <NavLink to='/' className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle } onClick={handleCloseSideBar}>
                    <FiHome />
                    Home
                </NavLink>
                <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
                {categories.sort((a,b) => a.name.localeCompare(b.name)).slice(0, categories.length - 1).map((category, i) => (
                    <NavLink to={`/category/${category.name}`} key={i} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle } onClick={handleCloseSideBar}>
                        <img src={category.image} alt={category.name} className='w-10 h-10 rounded-full shadow-sm object-cover' />
                        {category.name}
                    </NavLink>
                ))}
            </div>
        </div>
        {user && (
            <Link to={`user-profile/${user._id}`} className='flex my-5 mx-3 mb-6 gap-2 p-2 items-center bg-white rounded-lg shadow-lg' onClick={handleCloseSideBar}>
                <img src={user.image} alt='user-profile' className='w-10 h-10 rounded-full'/>
                <p>{user.userName}</p>
            </Link>
        )}
    </div>
  )
}

export default SideBar