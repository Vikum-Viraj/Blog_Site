import React, { useRef } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { FaAngleDoubleDown } from "react-icons/fa";
import Footer from "./Footer"

const Layout = () => {

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div>
      <button 
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        marginTop: '2rem',
        color: 'white',
        marginLeft: '95%',
        backgroundColor: '#252542',
        padding: '1.8rem 0.8rem',
        borderRadius: '2rem',
        cursor:'pointer'
      }}>
        <FaAngleDoubleDown />
      </button>

      <Header />
      <Outlet />

      <div ref={ref}>
      <Footer/>
      </div>
      
    </div>
  )
}

export default Layout
