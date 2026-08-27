const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const blogs = await helper.blogsInDb()
  assert(blogs[0].id)
})

test('a new blog can be added', async () => {
  const newBlog = { title: 'Add new', author: 'James Daley', url: 'example.com', likes: 10}
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('like returns 0 if not sent', async () => {
  const newBlog = { title: 'Add new', author: 'James Daley', url: 'example.com' }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('returns status 400 Bad Request if missing title', async () => {
  const newBlog = { author: 'James Daley', url: 'example.com', likes: 10}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('returns status 400 Bad Request if missing url', async () => {
  const newBlog = { title:"Add new", author: 'James Daley', likes: 10}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})