import React, { useState } from 'react'
import { DUMmy_POST } from './data'
import PostItem from '../components/PostItem'

const CategoryPost = () => {

  const [posts,setPost] = useState(DUMmy_POST)

  return (
    <section >
    {posts.length > 0 ? <div className='container posts__container'>
      {
        posts.map(({id,thumbnail,category,title,desc,authorID}) =>
        <PostItem
        key={id}
        thumbnail={thumbnail}
        category={category}
        title={title}
        postId={id}
        description={desc}
        authorID={authorID} />
        )
      }
    </div>:<div><h2>No post found</h2></div>}
  </section>
  )
}

export default CategoryPost
