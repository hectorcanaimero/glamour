const express = require('express');
const router = express.Router();

const { origin } = require('../middleware/origin');
const { login, register } = require('../controlles/auth');


/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      tags:
 *        - Users
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: email
 *          in: formData
 *          required: true
 *          type: string
 *        - name: password
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     role:
 *                       type: string
 *                       description: Role.
 *                       example: user
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: web@condor.com.br
 *                     token:
 *                       type: string
 *                       description: The user's token.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY2ZWFjYzFlMTAwNDA4MzExOGM3YjIiLCJyb2xlIjoidXNlciIsI
 */
router.post('/login', login);
router.post('/register', register);

module.exports = router;