//conectar DB MySQL a archivo
import { pool } from "./credentials.js";

const connect = async () => {
  try {
    const [rows] = await pool.query("SELECT 1+1 AS RESULT");
    console.log("Ready...");
    console.log(rows);
  } catch (err) {
    console.log("No se logro establecer una conexión con la DB");
    console.log(err);
  }
};

connect();
