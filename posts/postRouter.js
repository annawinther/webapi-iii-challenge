const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "error getting all posts"})
    }
});

router.get('/:id', validatePostId, async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postDb.getById(id)
        res.status(200).json(post);  
    } catch (error){
        res.status(500).json({ message: 'error getting post with that id'})
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    const id = req.params.id;
    try {
        const count = await postDb.remove(id);    
        res.status(200).json({ message: `post with id ${id} has been deleted `})

    } catch (error) {
        res.status(500).json({
            message: 'Error removing the post',
          });
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    const postData = req.body;
    const id = req.params.id
    try {
        const post = await postDb.update(id, postData);
        res.status(200).json(postData)

    } catch(error) {
        res.status(500).json({
            message: 'Error updating the hub',
          });
    }
});

// custom middleware

async function validatePostId(req, res, next) {
    const { id } = req.params;
    const post = await postDb.getById(id);
    if(post){
        req.post = post;
        next();
    } else {
        res.status(400).json({ message: "post not found" })
    } 
};

module.exports = router;