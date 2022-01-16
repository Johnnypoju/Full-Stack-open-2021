import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (user) => {

  if (user === null){
    console.log("no user")
    const request = await axios.get(baseUrl)
    return request.data
  }
  else{
    const request = await axios.get(baseUrl, { headers : { Authorization : `Bearer ${user.token}`}})
    return request.data
  }
}

const createBlog = async (data, user) => {
  const request = await axios.post(baseUrl, data, { headers : { Authorization : `Bearer ${user.token}`}})
  return request.data
}

export default { getAll, createBlog }