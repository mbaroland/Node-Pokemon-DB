const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const app = express()

const port = 3000

app.use(bodyParser.json())


sequelize.initDb()

// 
require('./src/routes/findAllPokemon')(app)

require('./src/routes/findPokemonByPk')(app)

require('./src/routes/createPokemon')(app)

require('./src/routes/updatePokemon')(app)

require('./src/routes/deletePokemon')(app)

require('./src/routes/login')(app)


//Gestion des erreur 404

app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée"
    res.status(404).json(message)
} )

app.listen(port, ()=> console.log(`Votre appli a bien démaré sur le http://localhost:${port}`))