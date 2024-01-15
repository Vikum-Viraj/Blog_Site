import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import Thumbnail1 from '../images/blog22.jpg'
import { UserContext } from '../context/userContext'
import DeletePost from './DeletePost'
import Loader from '../components/Loader'
import axios from 'axios'

const PostDetail = () => {

  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext)

  useEffect(() => {

    const getPost = async() => {
      try{
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
        setPost(response?.data)
      
      }catch(error){
        setError(error)
      }
    }
    setIsLoading(false)
    getPost()
  })

  if(isLoading){
    return <Loader/>
  }
  return (
    <section className='post-detail'>
      {error && <p className='error'>{error}</p>}
      {post &&
        <div className='container post-detail__container'>
          <div className='post-detail__header'>
            <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
            {currentUser?.id == post?.creator &&
              <div className='post-detail__buttons'>
                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                <DeletePost postId={id} />
              </div>
            }
          </div>
          <h1>{post.title}</h1>
          <div className='post-detail__thumbnail'>
            <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt='' />
          </div>
          <p dangerouslySetInnerHTML={{__html:post.description}}></p>
        </div>
      }
    </section>
  )
}

export default PostDetail
