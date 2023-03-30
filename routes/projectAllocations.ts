import express from "express";
import { createProjectAllocation, getEmployeesAllocationByEmployeeID, getEmployeesByRole, getEmployeesByProjectID, removeAllocation,  getEmployeesInProjectByRoleWithCount, getAllocations } from "../controllers/projectAllocations";

const router = express.Router();
export  default router;


router.post('/', createProjectAllocation) 
router.get('/', getAllocations)
router.get('/project/:id', getEmployeesByProjectID) 
router.get('/employee/:id', getEmployeesAllocationByEmployeeID) 
router.patch('/', removeAllocation)
router.get('/role/:id', getEmployeesByRole)
router.get('/:roleid/:projectid', getEmployeesInProjectByRoleWithCount)
router.delete('/', removeAllocation)