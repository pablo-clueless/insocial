import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import { client } from '../client'

import shareVideo from '../assets/share.mp4'
import inscoial from '../assets/insocial.png'

const client_id = import.meta.env.VITE_CLIENT_ID

const Login = () => {
    const navigate = useNavigate()

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj))

        const { name, googleId, imageUrl } = response.profileObj

        const doc = {
            _id: googleId,
            _type:'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        })
    }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video src={shareVideo} type='video/mp4' loop controls={false} muted autoPlay className='w-full h-full object-cover' />
            <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={inscoial} alt="inscoial logo" />
                </div>
                <div className='shadow-2xl'>
                    <GoogleLogin clientId={client_id} render={(renderProps) => (
                        <button type='button' className='bg-mainColor flex justify-center items-center p-3 m-5 cursor-pointer font-medium text-xl duration-700 ease-in-out outline-none hover:scale-[1.05]' onClick={renderProps.onClick} disabled={renderProps.disabled} >
                            <FcGoogle className='mr-4' />
                            Sign in with Google
                        </button>
                    )} onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy='single_host_origin' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login