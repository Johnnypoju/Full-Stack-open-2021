const mongoose = require('mongoose')
const supertest = require('supertest')
const list_helpers = require('../utils/list_helpers')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/entry')
const { info } = require('../utils/logger')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = list_helpers.initialBlog
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs contain id field', async () => {
    const response = await api.get ('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('add blog entries', async () => {

    const newEntry = {
        "title": "Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "url": "LOTR PWNS"
    }

    await api
        .post('/api/blogs')
        .send(newEntry)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map( r => r.title)
    const author = response.body.map( r => r.author)
    const url = response.body.map( r => r.url)
    expect(response.body).toHaveLength(list_helpers.initialBlog.length + 1)
    expect(title).toContainEqual('Lord of the Rings')
    expect(author).toContainEqual("J.R.R. Tolkien")
    expect(url).toContainEqual("LOTR PWNS")
    
})

test('add malformed entry', async () => {
    const noTitle = {
        "author": "J.R.R. Tolkien",
        "url": "LOTR PWNS"
    }
    const noUrl = {
        "title": "Lord of the Rings",
        "author": "J.R.R. Tolkien",
    }

    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

afterAll(() => {
    mongoose.connection.close()
})