import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FiDownloadCloud, FiExternalLink } from 'react-icons/fi'

import { client, urlFor } from '../client'
import { pinDetailQuery, pinDetailMorePinQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  
  const { pinId } = useParams()

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)

    if(query) {
      client.fetch(query)
      .then(data => {
        setPinDetail(data[0])

        if(data[0]) {
          const query1 = pinDetailMorePinQuery(data[0])

          client.fetch(query1)
          .then(res => setPins(res))
        }
      })
    }
  }

  const addComment = () => {
    if(comment) {
      setAddingComment(true)

      client.patch(pinId)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [{
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }
      }])
      .commit()
      .then(() => {
        fetchPinDetails()
        setComment('')
        setAddingComment(false)
      })
    }
  }

  useEffect(() => {
    fetchPinDetails()
  },[pinId])

  if(!pinDetail) {
    return <Spinner message='Loading pin details...' />
  }

  return (
    <>
    <div className='flex xl:flex-row flex-col m-auto bg-white overflow-scroll' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className='flex justify-center items-center md:items-start flex-initial mb-5'>
        <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt='user-post' className='rounded-t-3xl rounded-b-lg hover:scale-[1.02] duration-500' />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a href={`${pinDetail?.image.asset.url}?dl=`} download onClick={(e) => e.stopPropagation()} className='bg-white w-10 h-10 flex items-center justify-center border-[1px] border-black rounded-full text-xl text-black opacity-75 hover:opacity-100 hover:shadow-md hover:scale-110 duration-500 ease-in-out'>
              <FiDownloadCloud />
            </a>
          </div>
          <a href={`${pinDetail.destination}`} target='_blank' rel='noreferrer' className='bg-white w-10 h-10 flex items-center justify-center border-[1px] border-black rounded-full text-xl text-black opacity-75 hover:opacity-100 hover:shadow-md hover:scale-110 duration-500 ease-in-out'>
            <FiExternalLink />
          </a>
          <p className='text-black text-2xl font-bold'>{pinDetail?.category}</p>
        </div>
        <div className='mt-5'>
          <h1 className='text-4xl text-bold break-words mt-3'>{pinDetail.title}</h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>
        <Link to={`user-profile/${pinDetail?.postedBy._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img src={pinDetail.postedBy.image} alt='user-profile' className='w-8 h-8 rounded-full object-cover' />
            <p className='font-semibold capitalize'>{pinDetail?.postedBy.userName}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto'>
          {pinDetail.comments?.map((comment, i) => (
            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
              <img src={comment.postedBy.image} alt='user-profile' className='w-10 h-10 rounded-full cursor-pointer' />
              <div className='flex flex-col'>
                <p className='font-bold'>{comment.postedBy.userName}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
          <Link to={`user-profile/${pinDetail?.postedBy._id}`}>
              <img src={pinDetail.postedBy.image} alt='user-profile' className='w-10 h-10 rounded-full cursor-pointer' />
          </Link>
          <input type='text' placeholder='Add a comment...' className='flex-1 outline-none text-base sm:text-xl border-[1px] border-fuchsia-500 p-2 focus:border-black focus:translate-y-2 transition-all duration-500 ease-in-out' value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type='button' onClick={addComment} className='bg-fuchsia-500 text-white px-4 py-2 border-[1px] border-transparent outline-none hover:bg-white hover:border-fuchsia-500 hover:border-[1px] hover:text-fuchsia-500 transition-all duration-500 ease-in-out'>
            {addingComment ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
    {pins?.length > 0 ? (
      <>
      <h2 className='text-center font-bold text-2xl mt-8 mb-4'>More like this</h2>
      <MasonryLayout pins={pins} />
      </>
    ): <Spinner message='Loading more pins...' />}
    </>
  )
}

export default PinDetail