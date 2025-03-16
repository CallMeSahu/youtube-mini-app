const express = require('express');
const axios = require('axios');
const Comment = require('../models/Comment');
const Log = require('../models/Log');
const router = express.Router();
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const VIDEO_ID = process.env.VIDEO_ID;

router.get('/', async (req, res) => {
    try {
        const videoData = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet',
                id: VIDEO_ID,
                key: YOUTUBE_API_KEY
            }
        });

        const video = videoData.data.items[0];
        const comments = await Comment.find({ videoId: VIDEO_ID });

        res.render('index', { video, comments });
    } catch (error) {
        res.status(500).send('Error fetching video details');
    }
});

router.post('/comment', async (req, res) => {
    const { username, text } = req.body;
    try {
        const newComment = new Comment({ videoId: VIDEO_ID, username, text });
        await newComment.save();

        await new Log({ action: 'Add Comment', details: `${username} commented: ${text}` }).save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error adding comment');
    }
});

router.delete('/comment/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await Comment.findByIdAndDelete(req.params.id);

        await new Log({ action: 'Delete Comment', details: `Comment by ${comment.username} deleted` }).save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting comment');
    }
});

module.exports = router;