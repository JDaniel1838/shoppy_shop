import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    const tokenBearer = req.headers?.authorization;
    if (!tokenBearer) throw new Error("No existe el token de autenticación");

    let token = tokenBearer.split(" ")[1];

    //{ uid, iat, exp }= payload;
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid; //send uid to next middleware infoUser

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ myError: tokenVerificationErrors[err.message] });
  }
};
