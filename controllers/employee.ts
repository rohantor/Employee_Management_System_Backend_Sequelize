import { Request, Response } from "express";
import { Employee } from "../models/employee";
import { Order, Sequelize } from "sequelize";
import { Role } from "../models/role";
import { db } from "../config";

export const createEmployee = async (req: Request, res: Response) => {


    try {
        const record = await Employee.create({ ...req.body })
        return res.json({ msg: "Successfully created a new employee" })
    } catch (e: any) {
        if (e?.original?.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(500).json({ msg: "Role table does not have roleid provided", e })

        }
        res.status(500).json({ msg: "Failed to create user", e })
    }
}
export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        console.log(req.query)
        const { limit, offset } = req.query
        const _limit = parseInt(limit as string) && parseInt(limit as string) > 0 ? parseInt(limit as string) : 100
        const _offset = parseInt(offset as string) && parseInt(offset as string) > 0 ? parseInt(offset as string) : 0
        console.log("Limit ", _limit, "  offset", _offset)


        const record = await Employee.findAll(
            {
                attributes: (
                    req.query.group && [
                        (req.query.group) as string,
                        [db.fn('COUNT', db.col('user.createdBy')), 'count']]) || ['id', 'firstName', 'lastName', 'role', 'joining_date', 'location_Country', 'location_City', 'reporting_manager', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
                order: [[req.query.orderBy as string || 'id', req.query.order as string || 'ASC']],
                limit: _limit,
                offset: _offset,
                include: [
                    {
                        model: Role,
                        attributes: ['name']

                    }
                ],
                group: req.query.group && [(req.query.group) as string],
            })
        return res.json(record)
    } catch (e) {
        res.status(500).json({ msg: "Failed to get users", e })
    }
}
export const getUserById = async (req: Request, res: Response) => {
    try {
        const record = await Employee.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: Role,
                        attributes: [
                            ['name', 'role']]
                    }

                ],
                attributes: [
                    'firstName',
                    'lastName',
                    'joining_date',
                    'location_Country',
                    'location_City',
                    'reporting_manager',
                    'createdBy',
                    'updatedBy',
                    'createdAt',
                    'updatedAt'
                    // , [Sequelize.literal('"Role"."role"'), 'role'],
                ]
            })
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "User not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: "Failed to get user", e })
    }

}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const record = await Employee.update({ ...req.body }, { where: { id: req.params.id } })
        if (record[0] === 0) {

            return res.json({ msg: "User not found" })
        }
        res.json({ msg: "Successfully updated user " })

    } catch (e: any) {
        res.status(500).json({ msg: "Failed to update a user", error: e.errors[0].message, })
    }
}