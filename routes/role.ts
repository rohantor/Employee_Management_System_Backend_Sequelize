import express from "express";
import { Role } from "../models/role";
import { createRole, getAllRole, getRoleById, updateRole } from "../controllers/role";


const router = express.Router();

const RolePutBodyChecker = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.name && req.body.createdBy && req.body.updatedBy) {
        return next()
    }
    res.status(400).send("Parameters are missing or invalid")
}
router.post('/', createRole) //Done
router.get('/', getAllRole)  //Done
router.put('/:id', RolePutBodyChecker, updateRole) //Done
router.patch('/:id', updateRole) //Done
router.get('/:id', getRoleById) //Done
export default router