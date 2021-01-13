import * as express from "express";
const router = express.Router();

import { usersController } from '../controllers';

// * POST /users/login
router.post('/login', usersController.login);
// * POST /users/logout
router.post('/logout', usersController.logout);
// * POST /users/signup
router.post('/signin', usersController.signin);
// * get /users/userinfo
router.get('/userinfo', usersController.userinfo);
// * get /users/userinfoup
router.put('/userinfoup', usersController.userinfoup);
// * get /users/songlist
router.get('/songlist', usersController.songlist);
// * post /users/saveplaylist
router.post('/saveplaylist', usersController.saveplaylist);
// * put /users/updateplaylist
router.post('/updateplaylist', usersController.updateplaylisttitle);
// * delete /users/deleteplaylist
router.post('/deleteplaylist', usersController.deleteplaylist);

module.exports = router;
