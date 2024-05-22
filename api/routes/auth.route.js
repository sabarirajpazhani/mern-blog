import express from 'express';   //signup api 
import { signup } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/signup',signup);
export default router;         