const app = require('./App')
const http = require('http')
const config = require('../../Weeklyrecipes/weeklyrecipesfrontend/utils/config')
const logger = require('../../Weeklyrecipes/weeklyrecipesfrontend/utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})