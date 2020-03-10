
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

            // release the connection in the end
            conn.release();
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
