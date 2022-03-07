import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

    if(loading) return <Spinner message='We are adding new ideas to your feed!' height={200} width={200} />

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed