/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - activity
 *         - accessibility
 *         - type
 *         - participants
 *         - price
 *         - link
 *       properties:
 *         activity:
 *           type: string
 *           description: The title of activity
 *         accessibility:
 *           type: number
 *           description: The price of the activity
 *         type:
 *           type: string
 *           description: The price of the activity
 *         participants:
 *           type: number
 *           description: The price of the activity
 *         price:
 *           type: number
 *           description: The price of the activity
 *         link:
 *           type: string
 *           description: The price of the activity
 *       example:
 *         activity: Read a book
 *         accessibility: 2
 *         type: educational
 *         participants: 1
 *         price: 0
 *         link: ''
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         username: admin
 *         password: adminadmin
 *     Update-Activity:
 *       type: object
 *       properties:
 *         activity:
 *           type: string
 *           description: The title of activity
 *         accessibility:
 *           type: number
 *           description: The price of the activity
 *         type:
 *           type: string
 *           description: The price of the activity
 *         participants:
 *           type: number
 *           description: The price of the activity
 *         price:
 *           type: number
 *           description: The price of the activity
 *         link:
 *           type: string
 *           description: The price of the activity
 *       example:
 *         activity: Read a book
 *         accessibility: 2
 *         type: educational
 *         participants: 1
 *         price: 0
 *         link: ''
 */


/**
 * @swagger
 * tags:
 *   name: Activities
 * /activities:
 *   get:
 *     tags: [Activities]
 *     security:
 *       - Authorization: []
 *     summary: Get activities
 *     parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             default: 1
 *           description: Page number of the activities list
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *             default: 10
 *           description: Number of activities per page
 *     responses:
 *       200:
 *         description: Activities list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 5
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */

/**
 * @swagger
 * /token/admin:
 *   post:
 *     tags: [Login]
 *     summary: Login with role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Token created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */

/**
 * @swagger
 * /token/visitor:
 *   get:
 *     tags: [Login]
 *     summary: Login with role
 *     responses:
 *       200:
 *         description: Token created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     tags: [Activities]
 *     security:
 *       - Authorization: []
 *     summary: Post activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Activity created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request,Missing required fields.
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */

/**
 * @swagger
 * /activities/:id:
 *   delete:
 *     tags: [Activities]
 *     security:
 *       - Authorization: []
 *     summary: Delete activity
 *     responses:
 *       200:
 *         description: Activity deleted.
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */

/**
 * @swagger
 * /activities/:id:
 *   put:
 *     tags: [Activities]
 *     security:
 *       - Authorization: []
 *     summary: Update activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update-Activity'
 *     responses:
 *       200:
 *         description: Activity created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Update-Activity'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authentication error, token is expired or invalid.
 *       403:
 *         description: Authentication error, token is valid but the user does not have the required role.
 *       500:
 *         description: Server Error
 *
 */
