import "dotenv/config";
import { createPool } from "mysql2/promise";

//Objeto que crea consulta
export const pool = createPool({
  host: process.env.HOST,
  port: process.env.PORT_DB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
