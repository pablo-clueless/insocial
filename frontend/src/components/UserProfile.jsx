import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { FiLogOut } from 'react-icons/fi'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = 'https://source.unsplash.com/random/1600x900/?technology'

const client_id = import.meta.env.VITE_CLIENT_ID

const activeButtonStyles = 'bg-fuchsia-500 text-white font-bold mx-4 p-2 w-20 duration-700 ease-in-out outline-none hover:scale-[0.95]'
const notActiveButtonStyles = 'bg-gray-500 text-black font-bold mr-4 mx-4 p-2 w-20 duration-700 ease-in-out outline-none hover:scale-[0.95]'

const UserProfile = ({ }) => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeButton, setActiveButton] = useState('created')

  const navigate = useNavigate()
  const { userId } = useParams()

  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query)
    .then(data => setUser(data[0]))
  },[])

  useEffect(() => {
    if(text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
      .then(data => setPins(data))
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
      .then(data => setPins(data))
    }
  },[text, userId])

  const logout = () => {
    localStorage.clear()

    navigate('/')
  }
  
  if(!user) {
    return <Spinner message='Loading profile...' />
  }
  

  return (
    <div className='relative pb-2 h-full justify-center items-center pt-2'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} alt='banner' className='w-full h-370 2xl:h-510 shadow-lg object-cover' />
            <img src={user?.image} alt='user-pic' className='w-30 h-30 rounded-full -mt-10 shadow-xl object-cover' />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
            </h1>
            <div className='absoute top-0 z-1 right-0 p-2'>
              {userId === user?._id && (
                <GoogleLogout clientId={client_id} render={(renderProps) => (
                  <button type='button' className='bg-red-500 text-white flex justify-center items-center gap-3 p-3 m-5 cursor-pointer font-medium text-xl duration-700 ease-in-out outline-none hover:scale-[0.95]' onClick={renderProps.onClick} disabled={renderProps.disabled} >
                      <FiLogOut color='white' fontSize={21} />
                      Logout
                  </button>
              )} onLogoutSuccess={logout} cookiePolicy='single_host_origin' />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button type='button' onClick={e => {
              setText(e.target.textContent)
              setActiveButton('created')
            }} className={`${activeButton === 'created' ? activeButtonStyles : notActiveButtonStyles}`}>
              Created
            </button>
            <button type='button' onClick={e => {
              setText(e.target.textContent)
              setActiveButton('saved')
            }} className={`${activeButton === 'saved' ? activeButtonStyles : notActiveButtonStyles}`}>
              Saved
            </button>
          </div>

          {pins ? (
            <div className='px-2'>
              <MasonryLayout pins={pins} />
            </div>
          ): (
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No pins found.
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserProfile