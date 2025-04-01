import express from "express";
import {signUp} from "../controller/userController.js";
const userApi = express.Router();


userApi.post('/signup',signUp);

export default userApi;