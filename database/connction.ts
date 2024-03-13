import mysql from "mysql2/promise.js";

// export const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   port: parseInt(process.env.DB_PORT!),
//   waitForConnections: true,
//   connectionLimit: 5,
//   queueLimit: 0,
//   keepAliveInitialDelay: 0,
//   enableKeepAlive: true,
// });
export const pool = mysql.createPool({
  host: "localhost",
  password: "Password#1",
  user: "root",
  database: "pharmacy",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  keepAliveInitialDelay: 0,
  enableKeepAlive: true,
});
