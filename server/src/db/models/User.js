import {DataTypes} from "sequelize";

export const UserModel = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
        {
            timestamps: false
        }
    );
};