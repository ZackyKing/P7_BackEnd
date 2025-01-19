const Post = require('../models/post');

class PostController {
    async createPost(req, res) {
        const { title, content } = req.body;
        const userId = req.user.id;

        try {
            const newPost = new Post({
                title,
                content,
                userId,
            });
            await newPost.save();
            res.status(201).json({ message: 'Post created successfully', data: newPost });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async getPosts(req, res) {
        const userId = req.user.id;
        try {
            const posts = await Post.find({ userId });
            res.status(200).json({ data: posts });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async getPostById(req, res) {
        const { id } = req.params;
        try {
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ data: post });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async updatePostById(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;

        try {
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { title, content },
                { new: true }
            );
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post updated successfully', data: updatedPost });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    async deletePostById(req, res) {
        const { id } = req.params;
        try {
            const deletedPost = await Post.findByIdAndDelete(id);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new PostController();
