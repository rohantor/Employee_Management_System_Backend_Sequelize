import * as express from 'express'
import EmployeeRouter from './employee'
import RoleRouter from './role'
import ProjectRouter from './project'
import ProjectAllocationRouter from './projectAllocations'

export const router = express.Router()

router.use('/role',RoleRouter) 
router.use('/employee',EmployeeRouter) 
router.use('/project',ProjectRouter) 
router.use('/allocations', ProjectAllocationRouter)



