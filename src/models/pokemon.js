/* Déclaration d'un model */
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define(
        'Pokemon',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utiliser les nombres entiers" },
                    notNull: { msg: "Ne doit pas être nulle" }
                }
            },

            cp: {
                type: DataTypes.INTEGER,
                allowNull: false
            },


            picture: {
                type: DataTypes.STRING,
                allowNull: false
            },

            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    this.setDataValue('types', types.join())
                }
            }

        },
        {
            timestamps: true,
            createdAt: 'created', //renommage de createdAt en created
            updatedAt: true // Date de mis à jour 
        }


    )
}