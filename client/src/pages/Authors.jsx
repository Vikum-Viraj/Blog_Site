import React, { useEffect, useState } from 'react'

import Avatar1 from '../images/avatar1.jpg'
import Avatar2 from '../images/avatar2.jpg'
import Avatar3 from '../images/avatar3.jpg'
import Avatar4 from '../images/avatar4.jpg'
import Avatar5 from '../images/avatar5.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

// const authorData = [
//   { id: 1, avatar: Avatar1, name: 'Earnest father', posts: 3 },
//   { id: 2, avatar: Avatar2, name: 'Henry gavin', posts: 2 },
//   { id: 3, avatar: Avatar3, name: 'kevin bell', posts: 4 },
//   { id: 4, avatar: Avatar4, name: 'nick fury', posts: 5 },
//   { id: 5, avatar: Avatar5, name: 'miki mouse', posts: 6 },
// ]

const Authors = () => {

  const [authors, setAuthors] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  //api for get users
  useEffect(() => {
    const getAuthors = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`http://localhost:5000/api/users`)
        setAuthors(response.data)

      }catch(error){
        console.log(error)
      }
      setIsLoading(false)
    }
    getAuthors()
  },[])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className='authors'>
      {authors.length > 0 ? <div className='container authors__container'>
        {
          authors.map(({_id:id,avatar,name,posts}) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className='author__avatar'>
              <img src={`http://localhost:5000/uploads/${avatar}`} alt={`Image of ${name}`}/>
              </div>
              <div className='author__info'>
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <div className='center'>No user found</div>
      }
    </section>
  )
}

export default Authors
