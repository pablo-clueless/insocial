import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { client } from '../client'
import { searchQuery, feedQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
      if(categoryId) {
        setLoading(true)

        const query = searchQuery(categoryId)

        client.fetch(query).then((data) => {
          setPins(data)
          setLoading(false)
        })
      } else {
        setLoading(true)
        
        client.fetch(feedQuery).then((data) => {
          setPins(data)
          setLoading(false)
        })
      }
    },[categoryId])

    if(loading) return <Spinner message='We are adding new ideas to your feed!' />

    if(!pins?.length) return <div className='flex flex-col items-center justify-center relative top-72'>
      <h2 className='text-xl'>No pins found here. Wanna add yours?</h2>
      <Link to='/create-pin'>
        <button type='button' className='bg-fuchsia-500 text-white px-4 py-1 mt-10 border-[1px] border-transparent outline-none hover:bg-white hover:border-fuchsia-500 hover:border-[1px] hover:text-fuchsia-500 transition-all duration-500 ease-in-out'>
          Add Pins
        </button>
      </Link>
    </div>
    
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed