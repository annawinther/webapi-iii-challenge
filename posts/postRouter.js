const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error getting all posts"})
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postDb.getById(id)
        if (post) {
            res.status(200).json(post);
          } else {
            res.status(404).json({ message: 'post with that is not found ' });
          }
    } catch (error){
        res.status(500).json({ message: "error getting post with that id"})
    }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;