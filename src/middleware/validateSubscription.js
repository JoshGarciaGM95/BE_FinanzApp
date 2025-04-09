const { body, param, validationResult } = require('express-validator');

const validateSubscription = [
    body('user_id').isInt().withMessage('El ID de usuario debe ser un número entero.'),
    body('plan_id').isInt().withMessage('El ID de plan debe ser un número entero.'),
    body('start_date').isISO8601().withMessage('La fecha de inicio no es válida.'),
    body('end_date').isISO8601().withMessage('La fecha de finalización no es válida.'),
    body('status').isIn(['active', 'expired', 'cancelled']).withMessage('Valor no valido para status'),
    body('payment_method').isIn(['card', 'cash', 'transfer']).withMessage('valor no valido para payment_method'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateSubscription
}