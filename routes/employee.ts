import express from "express";
import { createEmployee, getAllEmployees, getUserById, updateUser } from "../controllers/employee";
const UserPutBodyChecker = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (req.body.firstName &&
        req.body.lastName &&
        req.body.role &&
        req.body.joining_date &&
        req.body.location_City &&
        req.body.location_Country &&
        req.body.createdBy && req.body.updatedBy) {
        return next()
    }

    res.status(400).send("Parameters are missing or invalid")


}

const router = express.Router();

router.post('/', createEmployee) //Done
router.get('/', getAllEmployees) //Done
router.put('/:id', UserPutBodyChecker, updateUser) //Done
router.patch('/:id', updateUser)//Done
router.get('/:id', getUserById) //Done


export default router