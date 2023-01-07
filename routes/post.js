import express from 'express';
import { body }from 'express-validator';
import multer from '../middlewares/multer-config.js'; 

import { addPost, getAll , updatePost, deletePost, getUser} from '../controllers/post.js';
  
const router = express.Router();

router
.route('/')
.post(
  multer("image", 512 * 1024),
  body("title"),
  body("description"),
  body("owner"),
  addPost
)
.get(getAll);
 

router
  .route('/:id')
  .put(
    multer("image", 512 * 1024),
    body("title"),
    body("description"),
    updatePost
  )
  .delete(deletePost)
  .get(getUser);


export default router;