import * as express from "express";
const router = express.Router();

import { playlistController } from '../controllers';
import checkToken from "../middleware/CheckToken";

// * get /users/songlist
router.get('/songlist', playlistController.songlist);
// * post /users/saveplaylist
router.post('/saveplaylist', checkToken, playlistController.saveplaylist);
// * put /users/updateplaylist
router.post('/updateplaylist', checkToken, playlistController.updateplaylisttitle);
// * delete /users/deleteplaylist
router.post('/deleteplaylist', checkToken, playlistController.deleteplaylist);

module.exports = router;
