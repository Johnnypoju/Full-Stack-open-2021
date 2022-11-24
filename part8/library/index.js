const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')
require('dotenv').config()

const { execute, subscribe } = require('graphql')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const typeDefs = require('./controllers/schema')
const resolvers = require('./controllers/resolvers')

JWT_SECRET = 'Joose on ihana'

MONGODB_URI = 'mongodb+srv://fullstack:Juubatuuba421_@cluster0.haiue.mongodb.net/library'

mongoose.connect(MONGODB_URI)
  .then(()=> {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)


  const schema = makeExecutableSchema({ typeDefs, resolvers})

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodeToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodeToken.id)
  
        return { currentUser }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async DrainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })

  const PORT = 4000

  httpServer.listen(PORT, () => 
    console.log(`Server is now running on http://localhost:${PORT}`)
  )

}

start()