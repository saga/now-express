
import mysql from 'mysql';

export class Database {
    private pool: mysql.Pool;
    private closed?: boolean;

    init() {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            acquireTimeout: 60000,
            // below are for connection
            host: "ddddd.mysql.database.azure.com",
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: "blog",
            port: 3306,
            connectTimeout: 60000
        });
    }

    async insertList(sql, values) {
        //const sql = "INSERT INTO Test (name, email, n) VALUES ?";
        //const values = [
        //     ['demian', 'demian@gmail.com', 1],
        //     ['john', 'john@gmail.com', 2],
        //     ['mark', 'mark@gmail.com', 3],
        //     ['pete', 'pete@gmail.com', 4]
        // ];
        this.pool.getConnection(async (err, conn) => {
            if (err) {
                console.error(err);
                return;
            }
            try {
                await conn.query(sql, [values]);
            } catch (exception) {
                console.error(exception);
            } finally{
                conn.release();
            }
        });
    }

    async insert(sql: string) {
        this.pool.getConnection(async (err, conn) => {
            if (err) {
                console.error(err);
                return;
            }
            try {
                await conn.query(sql);
            } catch (exception) {
                console.error(exception);
            }
            finally{
                conn.release();
            }
        });
    }

    closeAllConnectionsInPool() {
        this.pool.end((err) => {
            if (err) {
                console.error(err);
            }
            // all connections in the pool have ended
            this.closed = true;
        });
    }
}
