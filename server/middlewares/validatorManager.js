import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  //Captura de errores de authRouter
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Solo mandamos el primer error - quitar [0] para retornar all errors
    return res.status(400).json({ errors: errors.array()[0] });
  }

  next();
};

export const bodyRegisterValidator = [
  body("phoneNumber", "Numero telefónico no valido")
    .trim()
    .isNumeric()
    .isLength({ min: 10, max: 10 }),

  body("names", "Nombre de usuario no valido").trim().isLength({ max: 90 }),
  /* .matches("/^([A-Z]{1}[a-zñáéíóú]+[s]*)+$/"), */

  body("lastName", "Apellidos no validos").trim().isLength({ max: 110 }),

  body("address", "Domicilio no valido").trim().isLength({ max: 190 }),

  body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
  body("password", "Formato de password incorrecta").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }

      return value;
    }
  ),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("phoneNumber", "Formato de numero telefónico incorrecto")
    .trim()
    .isNumeric()
    .isLength({ min: 10, max: 10 }),
  body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];
