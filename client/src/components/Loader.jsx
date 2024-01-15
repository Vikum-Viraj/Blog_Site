import React from 'react'
import LoadingGif from '../images/LoadingGif.gif'

const Loader = () => {
  return (
    <div className='loader'>
        <div className='loader_image'>
            <img src={LoadingGif} alt='loading'/>
        </div>
    </div>
  )
}

export default Loader
