import {DataTypes} from "sequelize";

export const PhotoZoneModel = (sequelize) => {
    return  sequelize.define('PhotoZone', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        price_per_hour: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            timestamps: false
        }
    );
};