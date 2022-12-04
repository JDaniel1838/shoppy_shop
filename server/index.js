import express from "express";
import "dotenv/config";
import cors from "cors";
import "./database/connectDB.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
app.use(cors(whiteList));

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

//Ejemplo para mostrar código frontEnd
app.use(express.static("server/public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Ready");
  console.log(`Corriendo en: http://localhost:${PORT}`);
});
