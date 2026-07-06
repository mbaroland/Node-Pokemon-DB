const auth = require('../auth/auth')
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            
            if (pokemon === null) {

                const message = "le pokemon n'existe pas  "
                return res.status(404).json({ message })

            }
            const pokemonDeleted = pokemon;
            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                    res.json({ message, data: pokemonDeleted })
                })
        })
            .catch(error => {
                const message = "le pokemon n'a pas été supprimé "
                res.status(500).json({ message, data: error })
            })
    })
}