const adminRouter = require('express').Router()

adminRouter.get('/health', async (request, response) => {
    response.send('ok')
})

module.exports = adminRouter
