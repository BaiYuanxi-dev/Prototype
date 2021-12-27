import sequelize from 'sequelize';
import { dbInstance } from '../db/config.js';

export const Pages = dbInstance.define('pages', {
    pageId: {
        name: 'pageId',
        primaryKey: true,
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    projectId:{
        name: 'projectId',
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    pageText: {
        name: 'pageText',
        type: sequelize.DataTypes.STRING,
    },
},

);