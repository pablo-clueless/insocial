import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate()

    if(!user) return null

  return (
      <nav className='flex gap-1 md:gap-3 w-full mt-5 mx-3 pb-7'>
          <div className='flex justify-start items-center w-4/5 px-2 rounded-md bg-white border-red border-2 outline-none focus-within:shadow-sm'>
              <FiSearch fontSize={21} className='ml-1' />
              <input type='text' onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' value={searchTerm} onFocus={() => navigate('/search')} className='p-2 w-full bg-white outline-none' />
          </div>
          <div className='flex items-center gap-3 mx-3'>
              <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                <img src={user.image} alt='user' className='w-15 h-15 rounded-full object-cover shadow-md border-[1px] border-fuchsia-500' />
              </Link>
              <Link to='create-pin'>
              <button type='button' className='w-20 bg-fuchsia-500 text-white px-2 py-1 border-[1px] border-transparent outline-none hover:bg-white hover:border-fuchsia-500 hover:border-[1px] hover:text-fuchsia-500 transition-all duration-500 ease-in-out'>
                Add Pin
              </button>
              </Link>
          </div>
      </nav>
  )
}

export default NavBar