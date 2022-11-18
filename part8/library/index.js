const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const authorSchema = require('./models/authorSchema')
const bookSchema = require('./models/bookSchema')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')

const MONGODB_URI= 'mongodb+srv://fullstack:Juubatuuba421_@cluster0.haiue.mongodb.net/library'

const JWT_SECRET = 'Joose on ihana'

mongoose.connect(MONGODB_URI)
  .then(()=> {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User  
  }

  type Mutation {
    addBook(
        title: String!
        published: String
        author: String!
        genres: [String]
    ): Book
    editAuthor(
        name: String!
        born: String!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

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
            return books.filter(book => book.genres.find((genre) => genre === args.genre))
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
          if (!currentUser) {
            throw new AuthenticationError("Not authenticated")
          }
          const author = await authorSchema.findOne({ name: args.author})
            if (!author){
                
                const newAuthor = new authorSchema({ name: args.author, born: null, bookCount: 1 })
                try {
                  const savedAuthor = await newAuthor.save()
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
            
            return populatedBook
        },
        editAuthor: async (root, args) => {
            const currentUser = context.currentUser
            if (!currentUser) {
              throw new AuthenticationError("Not authenticated")
            }
            const author = await authorSchema.findOne({ name: args.name})
            author.born = args.born
            console.log(args)

            if (!author) {
                return null
            }

            return author.save()
        },
        createUser: async (root, args) => {
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

          return { value: jwt.sign(userForToken, JWT_SECRET)}
        }
    }
  }


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodeToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodeToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
