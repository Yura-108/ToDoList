import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'Не является почтой').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Имя минимум 2 символа').isLength({min: 2}),
]

export const taskValidator = [
    body('title', 'Поле не должно быть пустым').isLength({min: 1}),
    body('description', 'Поле не должно быть пустым').isLength({min: 1}),
]