import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
const DeletePost = () => {

  const navigate = useNavigate()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  //redirect to login page for any user who wan't sign in
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[])

  return (
    <div>
      
    </div>
  )
}

export default DeletePost
