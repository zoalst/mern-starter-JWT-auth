import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);


// User auth routes
router.route('/register').post(UserController.register);

router.route('/login').post(UserController.login);

router.route('/updateUserInfo').post(UserController.updateUserInfo);

export default router;
