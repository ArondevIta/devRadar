const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')
const { findConnections } = require('../websocket')

module.exports = {
  async index(req, res){
    const dev = await Dev.find()
    return res.json(dev)
  },
  async store(req, res) {
    const { user_github, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({ user_github })
    
    if(!dev){
      const response = await axios.get(`https://api.github.com/users/${user_github}`)
      let { name = login, avatar_url, bio } = response.data
      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
      
      dev = await Dev.create({
        user_github,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        loc: location,
      })

      const sendSocketMessageTo = findConnections(
        {latitude,longitude},
        techsArray
      )
      console.log(sendSocketMessageTo)
  }
  
  return res.json(dev)
 }
}
