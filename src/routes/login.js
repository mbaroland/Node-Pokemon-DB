const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            // une promesse pour décrypter le mot de passe  
            .then(user => {
                if (!user) {
                    const message = `l'utilisateur n'existe pas.`
                    return res.status(404).json({ message })
                }
                return bcrypt.compare(req.body.password, user.password)

                    .then(isPasswordValid => {

                        if (!isPasswordValid) {
                            const message = `Mot de passe est incorrect`
                            return res.status(401).json({ message })
                        }
                        // jwt 

                        const token = jwt.sign(
                            { userId: user.id },
                            privateKey,
                            { expiresIn: '24h' }
                        )
                        const message = `L'utilisateur a été conecté avec succès`
                        return res.json({ message, data: user, token })
                    })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instant `
                return res.status(500).json({ message, data: error })
            }


            )
    })
}