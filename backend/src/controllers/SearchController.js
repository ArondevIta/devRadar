const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
  async index(req, res){
    // busca devs em um raio de 10km e filtra por tecnologias
    const { latitude, longitude, techs } = req.query
    const techsArray = parseStringAsArray(techs)
    console.log(techsArray)
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      loc:{
        $near: {
          $geometry:{
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000,
        }
      }
    })
  
    return res.json(devs)
  }
}
