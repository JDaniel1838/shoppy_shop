import { pool } from "../database/credentials.js";
import bcryptjs from "bcryptjs";
import { generateToken, generateTokenRefresh } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  let { password, phoneNumber, names, lastName, address } = req.body;
  try {
    try {
      const salt = await bcryptjs.genSaltSync(10);
      password = await bcryptjs.hash(password, salt);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error al encriptar la contraseña." });
    }

    const [result] = await pool.query(
      "INSERT INTO users(phone_number,name_user,last_name,address_user,password) VALUES (?,?,?,?,?)",
      [phoneNumber, names, lastName, address, password]
    );

    const { token, expiresIn } = generateToken(result.insertId);
    generateTokenRefresh(result.insertId, res);

    return res.status(201).json({
      message: "Registro de usuario exitoso",
      id: result.insertId,
      phoneNumber,
      token,
      expiresIn,
    });
  } catch (err) {
    console.log(err); // -Ver que pasa
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Este numero telefónico ya se encuentra registrado." });
    } else {
      return res
        .status(500)
        .json({ error: "Error al insertar en la base de datos." });
    }
  }
};

const comparePassword = async (clientPassword, passwordDB) =>
  await bcryptjs.compare(clientPassword, passwordDB);

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    console.log(`Esto es lo que veo :${phoneNumber} - ${password}`);

    const [result] = await pool.query(
      "SELECT * FROM users WHERE phone_number = ? LIMIT 1",
      [phoneNumber]
    );

    //User Not Found
    if (result.length === 0)
      return res.status(403).json({ error: "Numero telefónico no encontrado" });

    const userData = result[0];
    //Password Not Equals
    const passwordEqual = await comparePassword(password, userData["password"]);
    if (!passwordEqual) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }

    //Generate token with JWT
    const { token, expiresIn } = generateToken(userData["id"]);

    //crear cookie inalcanzable para el frontend -  vive en el intercambio HTTP
    generateTokenRefresh(userData["id"], res);

    return res.json({
      ok: "login",
      token,
      expiresIn,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al iniciar sesión",
      data: error,
    });
  }
};

export const infoUser = async (req, res) => {
  try {
    //Información de usuario si el token enviado es valido
    const [user] = await pool.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [req.uid]
    );

    const userData = user[0];

    return res.json({
      phoneNumber: userData.phone_number,
      userNames: userData.names,
      lastName: userData.last_name,
      address: userData.address,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error al obtener datos del usuario con el token enviado",
    });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Error al obtener validar refresh token",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true, status: "logout" });
};
