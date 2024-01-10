import React, { useState } from 'react'
import PostItem from '../components/PostItem'
import {DUMmy_POST} from '../pages/data'


const Posts = () => {

  const [posts, setPots] = useState(DUMmy_POST)

  return (
    <section className='posts'>
     <div className='container posts__container'>
     { posts.length > 0 ? posts.map(({id, thumbnail, category, title, desc, authorID}) =>
          <PostItem
            key={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            postId={id}
            description={desc}
            authorID={authorID} />
        )
      :<h2 className='center'>No post found</h2>}</div>
    </section>
  )
}

export default Posts
