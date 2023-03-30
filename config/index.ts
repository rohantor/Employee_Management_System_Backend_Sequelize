import { Dialect, OperatorsAliases, Sequelize } from 'sequelize'
import dbConfig from './dbConfig';

export const db = new Sequelize(dbConfig.DB as string, dbConfig.USER as string, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }


});
