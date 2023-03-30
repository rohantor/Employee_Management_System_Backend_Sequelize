import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { Role } from "./role";

export const Employee = db.define('Employee', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    location_Country:{
        type: DataTypes.STRING,
        allowNull: false,
         validate: { isIn: [['India', 'Canada']] }
    },
    location_City:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    reporting_manager:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    // createdBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true,
    //     }
    // },
    // updatedBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, validate: {
    //         notEmpty: true,
    //     }
    // },
    // deletedBy: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: null, validate: {
    //         notEmpty: true,
    //     }
    // },
    // deletedAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: null, validate: {
    //         notEmpty: true,
    //     }
    // }
}, {
    tableName: 'employees',
});

Employee.belongsTo(Role,{foreignKey:'role',targetKey: 'id'})
Employee.belongsTo(Employee, { foreignKey:'reporting_manager',targetKey: 'id'})
Employee.belongsTo(Employee, { foreignKey: 'createdBy', targetKey: 'id' })
Employee.belongsTo(Employee, { foreignKey: 'updatedBy', targetKey: 'id' })

Employee.belongsTo(Employee, { foreignKey: 'deletedBy', targetKey: 'id' })
Employee.belongsTo(Employee, { foreignKey: 'deletedAt', targetKey: 'id' })

