import {DataTypes} from "sequelize";

export const LocationModel = (sequelize) => {
    return sequelize.define('Location', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
    });
};