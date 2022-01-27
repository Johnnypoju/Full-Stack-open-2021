import React from 'react'
import blogService from ''




const createBlog = ({
    handleBlogCreation,
    handleTitleChange,
    handleUrlChange,
    handleAuthorChange,
    user,
    title,
    author,
    url
}) => {

    
    return (
    <p>
    <h2>Create new Blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title 
            <input
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}/>
        </div>
        <div>
          Author 
            <input
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}/>
        </div>
        <div>
          URL 
            <input
              type="text"
              value={url}
              name="URL"
              onChange={handleUrlChange}/>
        </div>
        <button type="submit">Create</button>
      </form>
      </p>
    )
}

export default createBlog