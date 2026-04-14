import { body,validationResult } from 'express-validator';

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const createProductValidator = [
    body('title')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Title must be between 2 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    body('priceAmount')
        .isFloat({ gt: 0 })
        .withMessage('Price amount must be a positive number'),
    body('priceCurrency')
        .isIn(['USD', 'EUR', 'GBP', 'INR', 'JPY'])
        .withMessage('Invalid currency'),
    validateRequest
];