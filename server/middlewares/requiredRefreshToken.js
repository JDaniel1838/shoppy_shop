import { tokenVerificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies?.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe refresh token");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFREST);
    req.uid = uid; //send uid to next middleware infoUser

    next();
  } catch (err) {
    console.log(err);

    return res
      .status(401)
      .send({ myError: tokenVerificationErrors[err.message] });
  }
};
