import { Project } from "../models/project"
import * as express from "express"
export const createProject = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Project.create({ ...req.body })
        return res.json({ msg: "Successfully created a new Project" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Failed to create Project" })
    }
}
export const getAllProject = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Project.findAll({ order: [['id', 'DESC']] })
        return res.json(record)
    } catch (e) {
        res.status(500).json({ msg: "Failed to get Projects" })
    }
}
export const updateProject = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Project.update({ ...req.body }, { where: { id: req.params.id } })
        if (record[0] === 0) {

            return res.json({ msg: "Project not found" })
        }
        res.json({ msg: "Successfully updated Project " })
    } catch (e: any) {
        res.status(500).json({ msg: "Failed to update Project", error: e.errors[0].message })
    }
}
export const getProjectById = async (req: express.Request, res: express.Response) => {
    try {
        const record = await Project.findByPk(req.params.id)
        if (record) {

            return res.json(record)
        } else {
            res.json({ msg: "Project not found" })
        }
    } catch (e) {
        res.status(500).json({ msg: `Failed to get role with id ${req.params.id}`, })
    }
}