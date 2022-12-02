const axios = require('axios')
const config = require('../utils/config')

/**
 * https://docs.mapbox.com/api/navigation/optimization/?utm_source=mapboxcom&utm_medium=pricing#problem-documents
 * POST req with json formated problem
 * @param {
 *  "version": 1,
 *  "locations": [...],
 *  "vehicles": [...],
 *  "services": [...],
 *  "shipments": [...]
 *} problem 
 *
 * "locations": [
 *    {
 *        "name": "123 Address Street",
 *        "coordinates": [ -122.1234, 37.812 ],
 *    }
 * ]
 *
 * "vehicles": [
 *     {
 *         "name": "truck-1",
 *         "routing_profile": "mapbox/driving",
 *         "start_location": "warehouse",
 *         "end_location": "warehouse",
 *         "capacities": {
 *             "volume": 3000,
 *             "weight": 1000,
 *             "boxes": 100
 *         },
 *         "capabilities": [
 *             "ladder",
 *             "refrigeration"
 *         ],
 *         "earliest_start": "2022-05-31T09:00:00Z",
 *         "latest_end": "2022-05-31T19:00:00Z",
 *         "breaks": [
 *             {
 *                 "earliest_start": "2022-05-31T12:00Z",
 *                 "latest_end": "2022-05-31T13:00Z",
 *                 "duration": 1800
 *             }
 *         ]
 *     }
 * ]
 * 
 * "services": [
 *     {
 *         "name": "work-order-1234",
 *         "location": "123 address street",
 *         "duration": 300,
 *         "requirements": [
 *             "ladder"
 *         ],
 *         "service_times": [
 *             {
 *                 "earliest": "2022-05-31T13:00Z",
 *                 "latest": "2022-05-31T14:00Z",
 *                 "type": "soft"
 *             }
 *         ]
 *     }
 * ]
 * 
 * "shipments": [
 *   {
 *       "name": "order-1234",
 *       "from": "warehouse",
 *       "to": "123 address street",
 *       "size": {
 *           "weight": 30,
 *           "volume": 100,
 *           "boxes": 3
 *       },
 *       "requirements": [
 *     {
 *           "refrigeration"
 *            },
 *       ]
 *       "max_transit_time": 600,
 *       "pickup_duration": 60,
 *       "dropoff_duration": 60,
 *       "pickup_times": [
 *           {
 *               "earliest": "2022-05-31T09:15Z",
 *               "latest": "2022-05-31T09:30Z",
 *               "type": "strict"
 *           }
 *       ],
 *       "dropoff_times": [
 *           {
 *               "earliest": "2022-05-31T10:15Z",
 *               "latest": "2022-05-31T10:30Z",
 *               "type": "soft_end"
 *           }
 *       ]
 *   }
 * ]
 * 
 * "options": {
 *     "objectives": ["min-schedule-completion-time"]
 * }
 **/
const submitProblem = async problem => {
    const mapboxUrl = `https://api.mapbox.com/optimized-trips/v2` +
        `&access_token=${config.MAPBOX_TOKEN}`
    

    try {
        const response = await axios.post(mapboxUrl, problem)
        console.log(response)
        console.log('Job status: ' + response.data.status)
        if (response.data.status === 'ok') {
            const solution = await getSolution(response.data.id)
            return solution
        }
    } catch (error) {
        throw error
    }
}

// GET request with id param of the problem
const getSolution = async problemID => {
    const mapboxUrl = `https://api.mapbox.com/optimized-trips/v2/` +
        `${problemID}` +
        `&access_token=${config.MAPBOX_TOKEN}`
    
    try {
        const RETRIES = 50
        await delay(3)
        for (let i = 0; i < RETRIES; i++) {
            const response = await axios.get(mapboxUrl, { timeout: 1000 })
            if (response.status === 200) {
                return response
            } else if (response.status === 202) {
                console.log('solution not ready', + i)
            }
            await delay(10)
        }
    } catch (error) {
        console.error(error)
        throw error
    }

}

// GET request without the id
const getListOfSubmitedProblems = async () => {
    
}

const delay = (s) => new Promise(resolve => setTimeout(resolve, s*1000))

module.exports = submitProblem
