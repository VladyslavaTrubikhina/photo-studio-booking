import {Sequelize} from "sequelize";

// Check https://sequelize.org/ for the Getting Started
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

// TODO create your tables here, see https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition

// TODO export your own functions here