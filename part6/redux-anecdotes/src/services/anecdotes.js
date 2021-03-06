import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes:0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const editAnecdote = async (content, id, votes) => {
    const tempUrl = baseUrl + '/' + id
    const response = await axios.put(tempUrl, { content: content, id: id,  votes: votes})
    return response.data
}

export default { getAll, createNew, editAnecdote }