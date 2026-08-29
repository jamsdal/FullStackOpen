const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, sum) => total+sum.likes,0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs[blogs.findIndex(blog => blog.likes === maxLikes)]
}

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((authors, blog) => {
    const author = blog.author
    if (authors[author]){
      authors[author] += 1
    } else {
      authors[author] = 1
    }
    return authors
  }, {})
  const maxBlogs = Math.max(...Object.values(authorCounts))
  const mostBlogsAuthor = Object.keys(authorCounts).find(author => authorCounts[author] === maxBlogs)
  return {
    author: mostBlogsAuthor,
    blogs: authorCounts[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  const likeCounts = blogs.reduce((authors, blog) => {
    const author = blog.author

    if (authors[author]) {
      authors[author]+=blog.likes
    } else {
      authors[author]=blog.likes
    }

    return authors
  }, {})

  return Object.entries(likeCounts).reduce(
    (most, [author, likes]) => likes > most.likes ? { author, likes } : most,
    { author: null, likes: 0 }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}