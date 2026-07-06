const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
const pokemon = require('../models/pokemon')
const auth= require('../auth/auth')
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
      if(name.length<2){
        console.log('OK')
        const message = `le terme de recherche doit contenir au moins 2 charactères`
        return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({
        where:{
          name : {
            [Op.like] : `%${name}%`
          }
        },
        order : ['name'],
        limit : limit
      })
      .then(({count,rows})=> {
        const message = `il y a ${count} pokemons qui correspondent au terme de recherche`
        res.json({message , data : rows})
      })
    }
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch (error => {
        const message = "La liste n'a pas été recupéré. Réessayez dans quelques instant"
        res.status(500).json({message : message , data : error})
      })
  })
}