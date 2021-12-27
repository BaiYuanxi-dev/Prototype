import sequelize from 'sequelize';
import { dbInstance } from '../db/config.js';

export const Users = dbInstance.define('users', {
    username: {
        name: 'username',
        primaryKey: true,
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password:{
        name: 'password',
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps:false,
}
);
