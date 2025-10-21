import {DataTypes} from "sequelize";

export const ReservationModel = (sequelize) => {
    return  sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration_hours: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
        {
            timestamps: false
        }
    );
};