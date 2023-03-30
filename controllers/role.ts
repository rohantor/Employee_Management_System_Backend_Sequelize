import { Role } from "../models/role"
import * as express from "express"
export const createRole = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Role.create({ ...req.body })
        return res.json({ msg: "Successfully created a new role" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Failed to create role" })
    }
}
export const getAllRole = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Role.findAll({ order: [['id', 'DESC']] })
        return res.json(record)
    } catch (e) {
        res.status(500).json({ msg: "Failed to get roles" })
    }
}
export const updateRole = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Role.update({ ...req.body }, { where: { id: req.params.id } })
        if (record[0] === 0) {

            return res.json({ msg: "Role not found" })
        }
        res.json({ msg: "Successfully updated role " })
    } catch (e:any) {
        res.status(500).json({ msg: "Failed to update role" ,error:e.errors[0].message})
    }
}
export const getRoleById = async (req: express.Request, res: express.Response)=>{
    try {
        const record = await Role.findByPk(req.params.id)
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Role not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: `Failed to get role with id ${req.params.id}`, })
    }  
}