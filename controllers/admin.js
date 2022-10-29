const adminRouter = require('express').Router()

adminRouter.get('/health', async (request, response) => {
    response.send('ok')
})

adminRouter.get('/', async (request, response) => {
    response.send("Hello")
})

module.exports = adminRouter
