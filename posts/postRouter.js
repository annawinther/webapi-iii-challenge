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
        res.status(500).json({ message: 'error getting post with that id'})
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await postDb.remove(id);
        if( count > 0 ){
            res.status(200).json({ message: `post with id ${id} has been deleted `})
        } else {
            res.status(404).json({ message: 'The post with that id could not be found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error removing the post',
          });
    }
});

router.put('/:id', async (req, res) => {
    const postData = req.body;
    const id = req.params.id
    try {
        const post = await postDb.update(id, postData);
        if(post) {
            res.status(200).json(postData)
        } else {
            res.status(404).json({ message: 'The hub could not be found' });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Error updating the hub',
          });
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;