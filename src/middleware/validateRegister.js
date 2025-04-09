const { body, param, validationResult } = require('express-validator');

const valildateRegister = [
    body('name').isString().notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('confirmedPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }
    ),
    body('confirmedEmail')
        .custom((value, { req }) => {
            if (value !== req.body.email) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }
    ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];