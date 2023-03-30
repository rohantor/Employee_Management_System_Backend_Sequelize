import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { Employee } from "./employee";
import { Project } from "./project";
import { Role } from "./role";

export const ProjectAllocation = db.define('ProjectAllocation', {
    // Model attributes are defined here
    emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    project_role:{
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: 'projectAllocations',
});
ProjectAllocation.belongsTo(Employee,{foreignKey:'emp_id',targetKey:'id'})
ProjectAllocation.belongsTo(Project, { foreignKey:'project_id',targetKey:'id'})

ProjectAllocation.belongsTo(Role, { foreignKey:'project_role',targetKey:'id'})