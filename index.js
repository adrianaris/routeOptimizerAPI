const app = require('./app')
const http = require('http')
const https = require('https')
const fs = require('fs')
const config = require('./utils/config')
const logger = require('./utils/logger')

http.createServer(app)
  .listen(config.PORT, () => {
    logger(`Server is running on port ${config.PORT}`)
  })

https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  },
  app)
  .listen(config.SSLPORT, () => {
    logger(`Server is running on port ${config.SSLPORT}`)
  })

setInterval(() => {
  http.get('http://foxinc-optimizerapi.herokuapp.com/')
}, 300000)
