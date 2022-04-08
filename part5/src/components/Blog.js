import React, { useEffect } from 'react'
import Togglable from './Togglable'
import ShowBlogDetail from './ShowBlogDetail'

const Blog = ({ blog, likeIncrease, deleteBlog }) => {

  useEffect(() => {

  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontFamily: 'Times New Roman'
  }


  return (
    <li style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='asd'>
        <ShowBlogDetail blog={blog} likeIncrease={likeIncrease} deleteBlog={deleteBlog} />
      </Togglable>
    </li>
  )

}

export default Blog