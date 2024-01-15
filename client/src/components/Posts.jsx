import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import {DUMmy_POST} from '../pages/data'
import Loader from './Loader'
import axios from 'axios'

const Posts = () => {

  const [posts, setPots] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`http://localhost:5000/api/posts`)
        setPots(response?.data)
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }

    fetchPosts()
  },[])
  

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className='posts'>
      {posts.length > 0 ? <div className='container posts__container'>
        {
          posts.map(({_id:id,thumbnail,category,title,description,creator,createdAt}) =>
          <PostItem
            key={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            postId={id}
            createdAt={createdAt}
            description={description}
            creator={creator} />
          )
        }
      </div>:<h2 className='center'>No posts found</h2>}
    </section>
  )
}

export default Posts
