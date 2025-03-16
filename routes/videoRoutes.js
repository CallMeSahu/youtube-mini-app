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

module.exports = router;