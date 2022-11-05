require('dotenv').config()

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
const PORT = process.env.PORT
const SSLPORT = process.env.SSLPORT
const GEOAPIFY_TOKEN = process.env.GEOAPIFY_TOKEN
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TESTS
    : process.env.MONGODB_URI

module.exports = { MAPBOX_TOKEN, PORT, SSLPORT, GEOAPIFY_TOKEN, MONGODB_URI }
