const mongoose = require('mongoose')
const pointScheema = require('../models/utils/PointScheema')

const DevScheema = new mongoose.Schema({
  name: String,
  user_github: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  loc:{
    type: pointScheema,
    index: '2dsphere'
  }
})

module.exports = mongoose.model('Dev', DevScheema)
