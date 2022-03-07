import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUpload, FiTrash } from 'react-icons/fi'

import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(false)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)

  const navigate = useNavigate()

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0]

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false)
      setLoading(true)

      client.assets
      .upload('image', e.target.files[0], { contentType: type, filename: name })
      .then(doc => {
        setImageAsset(doc)
        setLoading(false)
      }).catch(err => console.log(`image upload error ${err}`))
    } else {
      setWrongImageType(true)
    }
  }

  const savePin = () => {
    if(title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        },
        category,
      }
      console.log(doc)

      // client.create(doc)
      // .then(() => navigate('/'))
    } else {
      setFields(true)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields</p>
      )}
      {/* image upload */}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner message='Creating your pin, please hold on.' height={100} width={100} />}
            {wrongImageType && <p className='text-red-500 text-xl'>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div 
                className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <FiUpload />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    Use high-quality JPG, SVG, PNG, GIF or TIFF.
                  </p>
                </div>
                <input type="file" name="upload-image" id="" onChange={uploadImage} className='w-0 h-0' />
              </label>
            ) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url} alt="uploaded image" className='h-full w-full' />
                <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-white text-xl cursor-pointer outline-none hover:shadow-md transition-full duration-500 ease-in-out' onClick={() => {
                  setImageAsset(null)
                }} >
                  <FiTrash />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Form upload */}
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add your title' className='outline-none text-xl sm:text-2xl font-bold border-2 border-fuchsia-500 p-2 rounded-md focus:border-black focus:translate-y-2 transition-all duration-500 ease-in-out' />
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img src={user?.image} alt="user-profile" className='w-10 h-10 rounded-full' />
              <p className='font-bold'>{user?.userName}</p>
            </div>
          )}
          <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder='What is your image about?' className='outline-none text-base sm:text-lg font-bold border-2 border-fuchsia-500 p-2 rounded-md focus:border-black focus:translate-y-2 transition-all duration-500 ease-in-out' />

          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='Add a destination link' className='outline-none text-base sm:text-lg font-bold border-2 border-fuchsia-500 p-2 rounded-md focus:border-black focus:translate-y-2 transition-all duration-500 ease-in-out' />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold e text-lg sm:text-lg'>Choose pin category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-4/5 text-base border-2 border-fuchsia-500 p-2 rounded-md cursor-pointer focus:border-black focus:translate-y-2 transition-all duration-500 ease-in-out'>
                <option value="other" className='bg-white'>Select Category</option>
                {categories.sort((a, b) => a.name.localeCompare(b.name)).map((category, i) => (
                  <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name} key={i}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-end items-end mt-5'>
              <button type='button' onClick={savePin} className='bg-fuchsia-500 text-white font-bold px-4 py-2 rounded-lg border-2 outline-none hover:bg-white hover:border-fuchsia-500 hover:border-2 hover:text-fuchsia-500 transition-all duration-500 ease-in-out'>
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin