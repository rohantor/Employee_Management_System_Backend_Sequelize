import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { Employee } from "./employee";

export const Role = db.define('Role', {
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
    tableName: 'role'
});

// Employee.hasOne(Role, { foreignKey: 'createdBy', sourceKey: 'id'})
// Role.belongsTo(Employee, { foreignKey: 'createdBy' })
// Role.belongsTo(Employee, { foreignKey: 'updatedBy', targetKey: 'id' })

// Role.belongsTo(Employee, { foreignKey: 'deletedBy', targetKey: 'id' })
// Role.belongsTo(Employee, { foreignKey: 'deletedAt', targetKey: 'id' })
