import mysql, {
  Connection,
  ConnectionOptions,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';

type QueryValues = Array<string | number | null>;

export class MySQL {
  private static instance: MySQL;

  static getInstance(): MySQL {
    if (!MySQL.instance) {
      MySQL.instance = new this();
    }

    return MySQL.instance;
  }

  private connection: Connection;

  private constructor() {
    const connectionOptions: ConnectionOptions = {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    };

    this.connection = mysql.createConnection(connectionOptions);
  }

  private queryPromise<T extends QueryResult>(sql: string, values?: QueryValues): Promise<T> {
    return new Promise((resolve, reject) => {
      this.connection.query<T>(sql, values, (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }

  queryRows<T>(sql: string, values?: QueryValues): Promise<Array<RowDataPacket & T>> {
    return this.queryPromise<Array<RowDataPacket & T>>(sql, values);
  }

  queryResult(sql: string, values?: QueryValues): Promise<ResultSetHeader> {
    return this.queryPromise<ResultSetHeader>(sql, values);
  }

  queryResults(sql: string, values?: QueryValues): Promise<Array<ResultSetHeader>> {
    return this.queryPromise<Array<ResultSetHeader>>(sql, values);
  }
}
