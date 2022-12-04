import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  //Captura de errores de authRouter
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Solo mandamos el primer error - quitar [0] para retornar all errors
    return res.status(400).json({ errors: errors.array()[0] });
  }

  next();
};
