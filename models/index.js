const config = require("../configs/db.config")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,config.USER,config.PASSWORD,{
        host:config.HOST,
        dialect: config.dialect,
        operatorAlias:false,
        pool:{
            max: config.pool.max,
            min: config.pool.max,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        },
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model") (sequelize, Sequelize);
db.role = require("../models/role.model") (sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through:"user_role",
    foreignKey:"roleId",
    otherKey:"userId"
});
//one to Many
db.user.belongsToMany(db.role,{
    through:"user_role",
    foreignKey:"userId",
    otherKey:"roleId"
});

db.ROLES = ['user', 'admin', "moderator"];
module.exports = db;
