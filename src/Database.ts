
import mysql from 'mysql';

export class Database {
    private pool: mysql.Pool;

    init() {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            acquireTimeout: 60000,
            // below are for connection
            host: "ddddd.mysql.database.azure.com",
            user: "sagasw@ddddd",
            password: process.env.MYSQL_PASSWORD,
            database: "blog",
            port: 3306,
            connectTimeout: 60000
        });
    }

    async insert(sql: string) {
        this.pool.getConnection(async (err, conn) => {
            if (err) {
                console.error(err);
                return;
            }
            await conn.query(sql);
        });
    }
}
