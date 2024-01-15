import React, { useEffect, useState } from 'react'
import { DUMmy_POST } from './data'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AuthorPost = () => {

  const [posts, setPots] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const {id} = useParams()

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`http://localhost:5000/api/posts/user/${id}`)
        setPots(response?.data)
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }

    fetchPosts()
  },[id])
  

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

export default AuthorPost
