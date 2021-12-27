import sequelize from 'sequelize';
import { dbInstance } from '../db/config.js';

export const Layers = dbInstance.define('layers', {
        layerId: {
            name: 'layerId',
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.DataTypes.STRING,
            allowNull: false,
        },
        align: {
            name: 'align',
            type: sequelize.DataTypes.STRING,
        } ,
        bgColor: {
            name: 'bgColor',
            type: sequelize.DataTypes.STRING,
        },
        borderColor: {
            name: 'borderColor',
            type: sequelize.DataTypes.STRING,
        },
        borderWidth: {
            name: 'borderWidth',
            type: sequelize.DataTypes.INTEGER,
        },
        fontFamily: {
            name: 'fontFmily',
            type: sequelize.DataTypes.STRING,
        },
        fontSize: {
            name: 'fontSize',
            type: sequelize.DataTypes.INTEGER,
        },
        height: {
            name: 'height',
            type: sequelize.DataTypes.INTEGER,
        },
        shadowBlur: {
            name: 'shadowBlur',
            type: sequelize.DataTypes.INTEGER,
        },
        shadowColor: {
            name: 'shadowColor',
            type: sequelize.DataTypes.INTEGER,
        },
        shadowOffsetX: {
            name: 'shadowOffsetX',
            type: sequelize.DataTypes.INTEGER,
        },
        shadowOffsetY: {
            name: 'shadowOffsetY',
            type: sequelize.DataTypes.INTEGER,
        },
        text: {
            name: 'text',
            type: sequelize.DataTypes.STRING,
        },
        width: {
            name: 'width',
            type: sequelize.DataTypes.INTEGER,
        },
        x_co: {
            name: 'x_co',
            type: sequelize.DataTypes.INTEGER,
        },
        y_co: {
            name: 'y_co',
            type: sequelize.DataTypes.INTEGER,
        },

},
{
    timestamps: false,
}
)