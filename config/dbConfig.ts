 const Config= {
  HOST: 'localhost',
  USER: process.env.USERNAME,
  PASSWORD: "root",
  DB: "EmployeeManager",
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
export default Config;