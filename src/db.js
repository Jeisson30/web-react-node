import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'samuel0930',
    port: 3306,
    database: 'usuarios'
})
