
import { ProjectAllocation } from "../models/projectAllocations"
import { newDateTimeGenerator } from './helper'
import express from "express"
import { Project } from "../models/project"
import { Employee } from "../models/employee"
import { Role } from "../models/role"
export const getProjectAllocationById = async (req: express.Request, res: express.Response) => {
    try {
        const record = await ProjectAllocation.findAll(
            {
                attributes: [

                ],
                include: [
                    {
                        model: Project,
                        attributes: [
                            'name'
                        ]
                    }, {
                        model: Employee,
                        attributes: [
                            'firstName', 'lastName'
                        ]
                    },
                    {
                        model: Role,
                        attributes: [
                            'name'
                        ]
                    }
                ],


                // where:
                //     { 
                //         project_id: req.params.id 
                //     }

            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}

//Add Allocation
export const createProjectAllocation = async (req: express.Request, res: express.Response) => {

    try {
        const record = await ProjectAllocation.create({ ...req.body })
        return res.json({ msg: "Successfully allocated to project" })
    } catch (e: any) {
        if (e?.original?.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(500).json({ msg: "Role table does not have roleid provided", e })

        }
        res.status(500).json({ msg: "Failed to allocate", e })
    }

}

//Get Employees by pid

export const getEmployeesByProjectID = async (req: express.Request, res: express.Response) => {

    try {
        const record = await ProjectAllocation.findAll(
            {
                where:
                {
                    project_id: req.params.id
                },
                attributes: [

                ],

                include: [
                    {
                        model: Employee,
                        attributes: [
                            'firstName', 'lastName'
                        ]
                    },
                    {
                        model: Role,
                        attributes: [
                            'name'
                        ]
                    }
                ],
            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}
//Get All Allocation Details
export const getAllocations = async (req: express.Request, res: express.Response) => {

    try {
        const record = await ProjectAllocation.findAll({
            attributes: [
               
            ],
            include: [
                {
                    model: Employee,
                    attributes: [
                        'firstName', 'lastName'
                    ]
                },
                {
                    model: Role,
                    attributes: [
                        'name'
                    ]
                }, {
                    model: Project,
                    attributes: [
                        'name'
                    ]
                }
            ],
        })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}


//get employee allocation by employee id

export const getEmployeesAllocationByEmployeeID = async (req: express.Request, res: express.Response) => {

    try {
        const record = await ProjectAllocation.findAll(
            {
                where:
                {
                    emp_id: req.params.id
                }, attributes: [

                ],

                include: [

                    {
                        model: Project, attributes: [
                            'name'
                        ]
                    },

                    {
                        model: Role,
                        attributes: [
                            'name'
                        ]
                    }
                ],
            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}

//Employees by Role
export const getEmployeesByRole = async (req: express.Request, res: express.Response) => {
    try {
        const record = await ProjectAllocation.findAll(
            {
                where:
                {
                    project_role: req.params.id
                }, attributes: [],

                include: [
                    {
                        model: Employee,
                        attributes: [
                            'firstName', 'lastName'
                        ]
                    }, {
                        model: Project,
                        attributes: [
                            'name'
                        ]
                    },
                    {
                        model: Role,
                        attributes: ['name']
                    }
                ],
            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}
export const getEmployeesInProjectByRoleWithCount = async (req: express.Request, res: express.Response) => {
    try {
        const record = await ProjectAllocation.findAndCountAll(
            {
                where:
                {
                    project_role: req.params.roleid,
                    project_id: req.params.projectid
                }, attributes: [],

                include: [
                    {
                        model: Employee,
                        attributes: [
                            'firstName', 'lastName'
                        ]
                    }, {
                        model: Project,
                        attributes: [
                            'name'
                        ]
                    },
                    {
                        model: Role,
                        attributes: ['name']
                    }
                ],
            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}

//Delete Allocation
export const removeAllocation = async (req: express.Request, res: express.Response) => {
    try {
        const record = await ProjectAllocation.update({
            deletedBy: req.body.deletedBy, deletedAt: newDateTimeGenerator()
        },
            {
                where:
                {
                    project_id: req.body.project_id,
                    emp_id: req.body.emp_id,
                    deletedBy: null
                }
            })

        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project Allocation not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }
}