import express, { Router } from "express";
const router = express.Router();
import controller from "../Controller/user.controller";
import authorization from "../middleware/user.auth";
// import swaggerUi from "swagger-ui-express";
// import swaggerJSdoc from "swagger-jsdoc";
// const option = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "NODE API MODULE PROJECT",
//       version: "1.2.2",
//     },
//     servers: [
//       {
//         url: `http://localhost: ${process.env.PORT}`,
//       },
//     ],
//   },
//   apis: ['./routes/*.ts'],
// };
// const swaggerDocument = swaggerJSdoc(option);
// router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/**
 * @swagger
 *   components:
 *     schema:
 *       user:
 *         properties:
 *           _id:
 *             type: string
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           password:
 *             type: number
 *           status:
 *             type: string
 *           email:
 *             type: string
 */

router.post("/user/signUp", controller.signup);
/**
 * @swagger
 * /newUser/signUp:
 *        post:
 *           summary: This api is used for signup
 *           description: This api is used for signup
 *           requestBody:
 *             required: true
 *             
 *           responses:
 *                '201':
 *      
 *                      content:
 *                        application/json:
 *                          schema:
 *                            $ref: '#components/schema/user'
 */

router.post("/user/login", authorization, controller.login);   
/**
 * @swagger
 * /user/login:
 *        post:
 *           summary: This api is used for login
 *           description: This api is used for login
 *           responses:
 *                200:
 *                      description: To login User
 *                      content:
 *                           application/json:
 *                             schema:
 *                                    
 *                                  $ref: '#components/schema/user'
 */
router.get("/allUsers", controller.getAllUser);
/**
 * @swagger
 * /allUsers:
 *        get:
 *           summary: This api is used for to getting all users profile
 *           description: This api is used for getuserprofile
 *           responses:
 *                200:
 *                      description: To getuserprofile User
 *                      content:
 *                           application/json:
 *                             schema:
 *           
 *                                  $ref: '#components/schema/user'
 */
router.get("/user", authorization, controller.getUserDetails);
/**
 * @swagger
 * /user/details:
 *        get:
 *           summary: This api is used for getuserprofile
 *           description: This api is used for getuserprofile
 *           responses:
 *                200:
 *                      description: To getuserprofile User
 *                      content:
 *                           application/json:
 *                             schema:
 *
 *                                  $ref: '#components/schema/user'
 */

router.delete("/user", authorization, controller.deleteUser);
/**
 * @swagger
 * /user/delete:
 *        post:
 *           summary: This api is used for deleteuserprofile
 *           description: This api is used for deleteuserprofile
 *           responses:
 *                200:
 *                      description: To deleteuserprofile User
 *                      content:
 *                           application/json:
 *                             schema:
 *                                
 *                                  $ref: '#components/schema/user'
 */
router.put("/user", authorization, controller.updateUser);
/**
 * @swagger
 * /user/update:
 *        put:
 *           summary: This api is used for updateprofile
 *           description: This api is used for updateprofile
 * 
 *           responses:
 *                200:
 *                      description: To updateprofile User
 *                      content:
 *                           application/json:
 *                             schema:
 *                                  $ref: '#components/schema/user'
 */
router.patch("/user/deactivate", authorization, controller.deactivate);
/**
 * @swagger
 * /user/deactivate:
 *     post:
 *       summary: API deactivate your profile
 *       description: Deactivate Profile
 *       responses:
 *            200:
 *              description: To check
 */
router.patch("/user/reactivate", authorization, controller.reactivate);
/**
 * @swagger
 * /user/reactivate:
 *     post:
 *       summary: API reactivate your profile 
 *       description: Reactivate Profile
 *       responses:
 *            200:
 *              description: To check
 */
export default router; 
