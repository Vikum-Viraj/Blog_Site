import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail1 from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className='post-detail'>
      <div className='container post-detail__container'>
        <div className='post-detail__header'>
          <PostAuthor/>
          <div className='post-detail__buttons'>
            <Link to={"/posts/asjhbd/edit"} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/hjhhs/delete`} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className='post-detail__thumbnail'>
          <img src={Thumbnail1} alt=''/>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, harum. 
          Beatae, itaque totam ut veniam facilis velit assumenda, fugiat quos libero 
          unde harum! Natus cupiditate excepturi eaque, cumque ab assumenda!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores aliquam
          iure veritatis amet voluptates et, ea, consectetur accusantium nemo
          doloremque animi illo nobis optio cumque. Rerum vitae error maiores magnam.
        </p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt error veritatis
        non omnis dolor corrupti, architecto sed iusto ea temporibus voluptatibus obcaecati 
        impedit quaerat quibusdam explicabo perferendis expedita illo voluptatum!
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum consequatur 
        rem maiores pariatur sapiente, vero tempore nisi obcaecati in temporibus, unde 
        nobis laborum facere dolore illum eum eius quod! Labore!
      </p>
      </div>
    </section>
  )
}

export default PostDetail
