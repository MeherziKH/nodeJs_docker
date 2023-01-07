import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import {getAll, addUser, updateUser, deleteUser, getUserById } from '../controllers/user.js';
  
const router = express.Router();

router
  .route('/')
  .post(
    multer("image", 512 * 1024),
    body("username"),
    body("password").isLength({ min: 8 }),
    body("email"),
    addUser
  )
  .get(getAll);
 

  router
  .route("/:id")
  .put(
    multer("image", 512 * 1024),
    body("username"),
    body("password").isLength({ min: 8 }),
    body("email"),
    updateUser
  )
  .delete(deleteUser)
  .get(getUserById);


export default router;