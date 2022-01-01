import sequelize from 'sequelize';
import {
    dbInstance
} from '../db/config.js';

export const Projects = dbInstance.define('projects', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        name: 'title',
        type: sequelize.DataTypes.STRING,
    },
    img: {
        name: 'img',
        type: sequelize.DataTypes.STRING
    },
    desc: {
        name: 'desc',
        type: sequelize.DataTypes.STRING
    },
}, );