const addressRouter = require('express').Router()
const Address = require('../models/address')

addressRouter.post('/', async (request, response) => {
  console.log(request.body)
  for (let i in request.body) {
    const checkAddress = await Address.findOne({ placeId: request.body[i].id})
    if (checkAddress === null) {
      if (request.body[i].jobDone) delete request.body[i].jobDone
      if (request.body[i].orderTime) delete request.body[i].orderTime
      const newAddress = new Address({
        address: request.body[i],
        placeId: request.body[i].id
      })
      newAddress.save()
    }
  }
  response.status(201).json('thanks')
})

module.exports = addressRouter
