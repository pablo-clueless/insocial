import React, { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { client } from '../client'
import { FiMenu, FiXCircle } from 'react-icons/fi'

import { userQuery } from '../utils/data'
import { SideBar, UserProfile } from '../components/index'
import Pins from './Pins'
import logo from '../assets/insocial.png'
import { fetchUser } from '../utils/fetchUser'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [user, setUser] = useState(null)

  const scrollRef = useRef(null)

  const userData  = fetchUser()

  useEffect(() => {
    const query = userQuery(userData?.googleId)

    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  },[])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  },[])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen pt-2 transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row px-1 py-3'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <FiMenu fontSize={35} strokeWidth={1} className='cursor-pointer' onClick={() => setToggleSideBar(true)} />
          <Link to='/'>
            <img src={logo} alt='insocial logo' className='w-30 h-9' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='user image' className='w-10 h-10 rounded-full' />
          </Link>
        </div>
          {toggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <FiXCircle fontSize={30} strokeWidth={1} className='cursor-pointer' onClick={() => setToggleSideBar(false)} />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSideBar} />
          </div>
          )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home