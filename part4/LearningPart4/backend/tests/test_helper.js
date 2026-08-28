const Note = require('../models/note')
const User = require('../models/user')

const testUsers = [
  {
    username: 'fakeuser1',
    name: 'Fake User1',
    passwordHash: 'fakehash1',
    notes: [],
    _id: '6a90eff2f1911528015c913b'
  },
  {
    username: 'fakeuser2',
    name: 'Fake User2',
    passwordHash: 'fakehash2',
    notes: [],
    _id: '6a90eff2f1911528015c913a'
  }
]

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    userId: testUsers[0]._id
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    userId: testUsers[1]._id
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  testUsers
}