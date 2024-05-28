import express from 'express';   //signup api 
import { google, signin, signup } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/signup',signup);
router.post('/signin',signin);  //signin function is executed to handle the request.
router.post('/google',google);
export default router;         