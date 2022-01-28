import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/CreateBlog'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    //check if user is logged in
    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)
      
      setUser(user)
      //Fetch blogs for current user
      blogService.getAll(user).then(userBlogs =>
        setBlogs( userBlogs )
      )
      
    }
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()
    try {
      setBlogs([])
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.getAll(user).then(userBlogs => 
        setBlogs( userBlogs ))
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setMessageType('error')
      console.log("test")
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType('')
      }, 5000)
      }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const blogCreation = async (blogObject) => {
    await blogService.createBlog(blogObject, user)
  }

  const increaseLikes = async (blogObject, blogId) => {
    await blogService.increaseLikes(blogObject, blogId, user)
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
        <form onSubmit={handleLogin}>
              <div>
                username
                  <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                /> 
              </div>
              <div>
                password
                  <input
                  type="text"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit">login</button>
            </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} has logged in. <br></br><button onClick={handleLogout}>logout</button></p>
      <p>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={blogCreation} />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeIncrease={increaseLikes} />
      )}
      </p>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} messageType={messageType}/>
      {user === null ?
        loginForm() :
        blogForm()}
      <br></br>
      
    </div>
  )
 
      }

export default App