import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();
router.get('/test',test);  //HTTP GET requests are typically used to retrieve data from a server.
router.put('/update/:userId',verifyToken, updateUser);     //for update "updateUser function can be defined in the verifyUser.js"
                                                          //if the user can be verified (verifyToken) then the user can be updated ("updateUser" function can be defined in user.controller.js)
                                                          //HTTP PUT requests are typically used to completely replace the data at a specific resource. 

export default  router;

                     
