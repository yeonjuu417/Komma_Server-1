import * as express from "express";
const router = express.Router();

const { usersController } = require('../controller');

// * POST /users/login
router.post('/login', usersController.login.post);
// * POST /users/logout
router.post('/logout', usersController.logout.post);
// * POST /users/signup
router.post('/signup', usersController.signup.post);
// * get /users/userinfo
router.get('/userinfo', usersController.userinfo.get);
// * get /users/userinfoup
router.put('/userinfoup', usersController.userinfoup.put);
// * get /users/songlist
router.get('/songlist', usersController.songlist.get);
// * post /users/saveplaylist
router.post('/saveplaylist', usersController.saveplaylist.post);
// * put /users/updateplaylist
router.post('/updateplaylist', usersController.updateplaylist.post);
// * delete /users/deleteplaylist
router.delete('/deleteplaylist', usersController.deleteplaylist.delete);

module.exports = router;
