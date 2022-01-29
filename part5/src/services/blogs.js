import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async (user) => {

  if (user === null){
    console.log('no user')
    const request = await axios.get(baseUrl)
    return request.data
  }
  else{
    const request = await axios.get(baseUrl, { headers : { Authorization : `Bearer ${user.token}` } })
    return request.data
  }
}

const createBlog = async (data, user) => {
  const request = await axios.post(baseUrl, data, { headers : { Authorization : `Bearer ${user.token}` } })
  return request.data
}

const increaseLikes = async (data, blogId, user) => {
  let tempURL = baseUrl+`/${blogId}`
  const request = await axios.put(tempURL, data, { headers : { Authorization : `Bearer ${user.token}` } })
  return request.data
}

const deleteBlog = async (blogId, user) => {
  let tempURL = baseUrl+`/${blogId}`
  //console.log(user.token)
  const request = await axios.delete(tempURL, { headers : { Authorization : `Bearer ${user.token}` } })
  return request.data
}

const exportObject = { getAll, createBlog, increaseLikes, deleteBlog }

export default exportObject