const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()
const bookSchema = require('../models/bookSchema')
const authorSchema = require('../models/authorSchema')
const User = require('../models/userSchema')


const resolvers = {
    Query: {
      bookCount: async () => bookSchema.collection.countDocuments(),
      authorCount: async () => authorSchema.collection.countDocuments(),
      allBooks: async (root, args) => {
          if (args.author) {
              //filter books by author and genre 
              if (args.genre) {
                  return books.filter(book => args.author === book.author && book.genres.find((genre) => genre === args.genre))
              }
              //filter books by author
              else {
                  return books.filter(book => args.author === book.author)
              }
              
          }
          //filter books by genre
          else if (args.genre) {
              const books = await bookSchema.find({ genres: args.genre}).populate("author", {
                name:1,
                born: 1,
                bookCount: 1
              })
              console.log(books)
              return books
          }
          else {
              const books = await bookSchema.find({}).populate("author", {
                name: 1,
                born: 1,
                bookCount: 1
              })
              
              return books
          }
          
      },
      allAuthors: async () => await authorSchema.find({}),
      me: async (root,args, context) => {
        return context.currentUser
      }
          
      },
      Mutation: {
          addBook: async (root, args, context) =>  {
            let authorID = null
            const currentUser = context.currentUser
            let savedAuthor = ''
  
            if (!currentUser) {
              throw new AuthenticationError("Not authenticated")
            }
            const author = await authorSchema.findOne({ name: args.author})
              if (!author){
                  
                  const newAuthor = new authorSchema({ name: args.author, born: null, bookCount: 1 })
                  try {
                    savedAuthor = await newAuthor.save()
                  } catch (error) {
                    console.log(error)
                    if(error.errors.name.kind === "required") {
                      throw new UserInputError("Book creation failed, author name is required!")
                    }
                    if(error.errors.name.kind === "minlength"){
                      throw new UserInputError("Book creation failed, author name minimum length is 4 characters!")
                    }
                    
                  }
                  authorID = savedAuthor._id
  
              }
              else {
                authorID = author._id
                
                author.bookCount = author.bookCount+1
                await author.save()
              }
              
              const book = new bookSchema({ ...args, author: authorID })
              try {
                await book.save()
              } catch (error) {
                console.log(error)
                if ( error.code === 11000 ) {
                  throw new UserInputError("Book creation failed, book with the same title already exists!")
                }
              }
              
              const populatedBook = await book.populate("author", {
                name: 1,
                born: 1,
                bookCount: 1
              })

              pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook})
              
              return populatedBook
          },
          editAuthor: async (root, args, context) => {
              const currentUser = context.currentUser
              
              if (!currentUser) {
                throw new AuthenticationError("Not authenticated")
              }
              const author = await authorSchema.findOne({ name: args.name})
              author.born = args.born
              //console.log(args)
  
              if (!author) {
                  return null
              }
  
              return author.save()
          },
          createUser: async (root, args, context) => {
            const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
  
            return user.save()
              .catch(error => {
                throw new UserInputError(error.message, {
                  invalidArgs: args
                })
              })
          },
          login: async ( root, args ) => {
            const user = await User.findOne({ username: args.username })
  
            if ( !user || args.password !== 'secret') {
              throw new UserInputError("Incorrect credentials")
            }
  
            const userForToken = {
              username: user.username,
              id: user._id
            }
  
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
          }
      },
      Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
      }
    }

module.exports = resolvers