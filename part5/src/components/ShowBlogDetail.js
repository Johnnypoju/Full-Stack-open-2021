import React, { useState } from 'react'

const BlogDetails = ({ blog, likeIncrease, deleteBlog }) => {

  const [likes, setLikes] = useState(blog.likes)

  const moreLikes = async (event) => {

    likeIncrease({
      userId: blog.userId._id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
    setLikes(likes + 1 )
  }

  const handleDeletion = async (event) => {
    deleteBlog(blog.id)
  }

  return (

    <p>
        Url: {blog.url}<br></br>
        likes: {blog.likes} <button onClick={moreLikes} >Likes</button><br></br>
        User: {blog.userId.name}<br></br>
      <button onClick={handleDeletion}>Delete entry</button>
    </p>

  )
}

export default BlogDetails