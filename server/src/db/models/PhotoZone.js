import {DataTypes} from "sequelize";

export const PhotoZoneModel = (sequelize) => {
    return  sequelize.define('PhotoZone', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        max_duration_hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_reservations_per_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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