import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate()

    if(!user) return null

  return (
      <nav className='flex gap-2 md:gap-5 w-full mt-5 mx-3 pb-7'>
          <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
              <FiSearch fontSize={21} className='ml-1' />
              <input type='text' onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' value={searchTerm} onFocus={() => navigate('/search')} className='p-2 w-full bg-white outline-none' />
          </div>
          <div className='flex items-center gap-3 mx-3'>
              <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                <img src={user.image} alt='user' className='w-20 h-15 rounded-lg' />
              </Link>
              <Link to='create-pin' className=' rounded-lg flex justify-center items-center hover:scale-110 duration-75 ease-in-out'>
                  <FiPlus fontSize={25} />
              </Link>
          </div>
      </nav>
  )
}

export default NavBar