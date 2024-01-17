import React, { useContext, useEffect, useState } from 'react'
import { DUMmy_POST } from './data'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {UserContext} from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'

const Dashboard = () => {

  const [posts,setPost] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const {id} = useParams()

  const navigate = useNavigate()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  //redirect to login page for any user who wan't sign in
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(() => {
    const getPost = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`http://localhost:5000/api/posts/user/${id}`,
        {withCredentials:true,headers:{Authorization:`Bearer${token}`}})
        setPost(response.data)
      }catch(error){
        console.log(error)
      }
    }
    getPost()
  },[id])

  if(!isLoading){
    return <Loader/>
  }

  return (
    <section className='dashboard'>
      {
        posts.length > 0 ? < div className='container dashboard__container'>
          {
            posts.map(post => {
              return <article key={post.id} className='dashboard__post'>
                <div className='dashboard__post-info'>
                  <div className='dashboard__post-thumbnail'>
                    <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className='dashboard__post-actions'>
                  <Link to={`posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id}/>
                </div>
              </article>
            })
          }
        </div> : <div className='center'></div>
      }
    </section>  
  )
}

export default Dashboard
