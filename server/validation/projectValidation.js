
const { body } = require('express-validator');

const validateProjectCreation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('client')
    .notEmpty()
    .withMessage('Client information is required'),
  
  body('budget')
    .isNumeric()
    .withMessage('Budget must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  
  body('deadline')
    .isISO8601()
    .withMessage('Deadline must be a valid date'),
  
  body('status')
    .optional()
    .isIn(['draft', 'active', 'completed', 'cancelled'])
    .withMessage('Status must be one of: draft, active, completed, cancelled')
];

const validateProjectUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('budget')
    .optional()
    .isNumeric()
    .withMessage('Budget must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  
  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Deadline must be a valid date'),
  
  body('status')
    .optional()
    .isIn(['draft', 'active', 'completed', 'cancelled'])
    .withMessage('Status must be one of: draft, active, completed, cancelled'),
  
  body('progress')
    .optional()
    .isNumeric()
    .withMessage('Progress must be a number')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
];

module.exports = {
  validateProjectCreation,
  validateProjectUpdate
};
