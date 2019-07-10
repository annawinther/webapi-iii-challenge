const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const userData = req.body;
    try{
        const user = await userDb.insert(userData);
        res.status(201).json(userData)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding the user',
          });
    }
});

router.post('/:id/posts', validateUserId, async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    try {
      const user = await postDb.getById(id);
      if (!user) {
        return res.status(404).json({
          message: "User does not exist"
        });
      }
  
      if (!text) {
        res.status(400).json({
          message: "Text is required"
        });
      } else {
        const newPost = await postDb.insert({
          user_id: id,
          text
        });
        res.status(201).json(newPost);
      }
    } catch (err) {
      res.status(500).json({
        message: err.toString()
      });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error getting all users"})
    }
});

router.get('/:id', validateUserId,  async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userDb.getById(id)
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user with that is not found ' });
        }
    } catch (error){
        res.status(500).json({ message: 'error getting user with that id'})
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const userId = req.params.id;
    try {
        const userPost = await userDb.getUserPosts(userId);
        if(userPost.length > 0){
            res.status(200).json(userPost);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error){
        res.status(500).json({
            message: 'could not get the posts from this user'
        })
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    const id = req.params.id;
    try {
        const count = await userDb.remove(id);
        if( count > 0 ){
            res.status(200).json({ message: `user with id ${id} has been deleted `})
        } else {
            res.status(404).json({ message: 'The user with that id could not be found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error removing the user',
          });
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    const userData = req.body;
    const id = req.params.id
    try {
        const user = await userDb.update(id, userData);
        if(user) {
            res.status(200).json(userData)
        } else {
            res.status(404).json({ message: 'The user could not be found' });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Error updating the user',
          });
    }
});

//custom middleware

async function validateUserId(req, res, next) {
    const { id } = req.params;
    const user = await userDb.getById(id);
    try{ 
        if (user) {
        req.user = user;
        next();
        } else {
            res.status(400).json({ message: "user not found" })
        }
    } catch (error){
        res.status(500).json({ message: 'unable to process request' })
    }
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
