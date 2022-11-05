const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const addressSchema = new mongoose.Schema({
  address: {
    type: Object,
    required: true
  },
  placeId: {
    type: String,
    required: true,
    unique: true
  },
})

addressSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

addressSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Address', addressSchema)
