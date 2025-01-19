const express = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @typedef {object} PostRequest
 * @property {string} title.required - Title
 * @property {string} content.required - Content
 */

/**
 * POST /api/posts
 * @summary Create a new post
 * @tags Posts
 * @param {PostRequest} request.body.required - Post info
 * @return {object} 201 - Post created successfully
 * @return {object} 500 - Server error
 */
router.post('/', authMiddleware, PostController.createPost);

/**
 * GET /api/posts
 * @summary Get all posts
 * @tags Posts
 * @return {object} 200 - List of posts
 * @return {object} 500 - Server error
 */
router.get('/', authMiddleware, PostController.getPosts);

/**
 * GET /api/posts/{id}
 * @summary Get a post by ID
 * @tags Posts
 * @param {string} id.path.required - Post ID
 * @return {object} 200 - Post data
 * @return {object} 404 - Post not found
 * @return {object} 500 - Server error
 */
router.get('/:id', authMiddleware, PostController.getPostById);

/**
 * PUT /api/posts/{id}
 * @summary Update a post by ID
 * @tags Posts
 * @param {string} id.path.required - Post ID
 * @param {PostRequest} request.body.required - Post info
 * @return {object} 200 - Post updated successfully
 * @return {object} 404 - Post not found
 * @return {object} 500 - Server error
 */
router.put('/:id', authMiddleware, PostController.updatePostById);

/**
 * DELETE /api/posts/{id}
 * @summary Delete a post by ID
 * @tags Posts
 * @param {string} id.path.required - Post ID
 * @return {object} 200 - Post deleted successfully
 * @return {object} 404 - Post not found
 * @return {object} 500 - Server error
 */
router.delete('/:id', authMiddleware, PostController.deletePostById);

module.exports = router;
