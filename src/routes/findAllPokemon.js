const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
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