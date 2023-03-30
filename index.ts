import  express from 'express'
import dotenv from 'dotenv'

import { db } from './config'
import { AddressInfo } from 'net'
import { Employee } from './models/employee'
import { Project } from './models/project'
import { Role } from './models/role'
import { ProjectAllocation } from './models/projectAllocations'
import { router } from './routes'
import ProjectAllocationRouter from './routes/projectAllocations'
dotenv.config()
const app = express()

db.sync().then(() => {
    
        // (async()=>{
        //     await Role.sync()
        //     await Project.sync()
        //     await Employee.sync()
        //     await ProjectAllocation.sync()

        // })()
    console.log("connect to db")
    
}).catch(err => console.log(err))
app.use(express.json())
// app.use(cors())

app.use(router)


app.get('*', (req:express.Request, res:express.Response) => {
    res.status(404).send("Page Not Found")
})
const server = app.listen(process.env.PORT, () => {
    const { port, address, family } = server.address() as AddressInfo
    console.log('server listening on port', address, port, family)
})

