import * as express from "express";
const router = express.Router();

import { usersController } from '../controllers';
import checkToken from "../middleware/CheckToken";

// * POST /users/login
router.post('/login', usersController.login);
// * POST /users/logout
router.post('/logout', usersController.logout);
// * POST /users/signup
router.post('/signup', usersController.signup);
// * get /users/userinfo
router.get('/userinfo', checkToken, usersController.userinfo);
// * post /users/userinfoup
router.post('/userinfoup', checkToken, usersController.userinfoup);

module.exports = router;
