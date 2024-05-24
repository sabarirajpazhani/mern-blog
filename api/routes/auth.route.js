import express from 'express';   //signup api 
import { signin, signup } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/signup',signup);
router.post('/signin',signin);  //signin function is executed to handle the request.
export default router;         