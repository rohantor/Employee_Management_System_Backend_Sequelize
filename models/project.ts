import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { Employee } from "./employee";

export const Project = db.define('Project', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    start:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    estimate:{
        type: DataTypes.DATE,
        allowNull:true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false, validate: {
            notEmpty: true,
        }
    },
    deletedBy: {
        type: DataTypes.INTEGER,
        defaultValue: null, validate: {
            notEmpty: true,
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null, validate: {
            notEmpty: true,
        }
    }
}, {
    tableName: 'project'
});
Project.belongsTo(Employee, { foreignKey: 'createdBy', targetKey: 'id' })
Project.belongsTo(Employee, { foreignKey: 'updatedBy', targetKey: 'id' })
Project.belongsTo(Employee, { foreignKey: 'deletedBy', targetKey: 'id' })

// Role.hasMany(User)