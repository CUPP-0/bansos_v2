import mysql from 'mysql2/promise';
const g=globalThis as unknown as {pool?:mysql.Pool};
export const pool=g.pool??mysql.createPool({host:process.env.DB_HOST,port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:true,connectionLimit:10,decimalNumbers:true});
if(process.env.NODE_ENV!=='production')g.pool=pool;
export async function query<T=any>(sql:string,values:any[]=[]){const [rows]=await pool.execute(sql,values);return rows as T[];}