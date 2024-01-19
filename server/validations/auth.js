import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'Не является почтой').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Имя минимум 2 символа').isLength({min: 2}),
]