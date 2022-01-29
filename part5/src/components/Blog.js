import React, { useEffect, useState } from 'react'


const Blog = ({ blog, likeIncrease, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  useEffect(() => {

  })

  const changeVisibility = async () => {
    setBlogVisible(!blogVisible)
  }

  const moreLikes = async (event) => {

    likeIncrease({
      user: blog.userId._id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
    setLikes(likes + 1 )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontFamily: 'Times New Roman'
  }

  const handleDeletion = async (event) => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={changeVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <p onClick={changeVisibility}>{blog.title} {blog.author}</p>
      Url: {blog.url}<br></br>
      likes: {blog.likes} <button onClick={moreLikes} >Likes</button><br></br>
      User: {blog.userId.name}<br></br>
        <button onClick={handleDeletion}>Delete entry</button>
      </div>
    </div>
  )

}

export default Blog