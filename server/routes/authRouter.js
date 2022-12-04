import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import { requireRefreshToken } from "../middlewares/requiredRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

//Validaciones con Express-Validator
router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/refresh", requireRefreshToken, refreshToken);

//Ruta protegida - Necesitan un token valido para acceder
router.get("/user_data", requireToken, infoUser);

router.get("/logout", logout);

export default router;
