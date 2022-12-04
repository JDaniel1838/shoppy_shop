import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15; //Time valid for Token

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (err) {
    console.log(err);
  }
};

export const generateTokenRefresh = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30; //30 días

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFREST, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (err) {
    console.log(err);
  }
};

//Posibles errores
export const tokenVerificationErrors = {
  "jwt malformed": "Formato de Token no valido",
  "invalid signature": "La firma del Token no es valida",
  "jwt expired": "Token expirado",
  "invalid token": "Token no valido",
  "No Bearer": "Formato de autenticación del token invalido",
  "jwt must be provided": "Token es requerido",
};
