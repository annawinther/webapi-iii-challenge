const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    try {
        const newPost = await postDb.insert({
            user_id: id,
            text
        });
        res.status(201).json(newPost);
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
        res.status(500).json({ message: "error getting all users"})
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userDb.getById(id)
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({ message: 'error getting user with that id'})
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const userId = req.params.id;
    try {
        const userPost = await userDb.getUserPosts(userId);
        res.status(200).json(userPost); 

    } catch (error){
        res.status(500).json({
            message: 'could not get the posts from this user'
        })
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userDb.remove(id);
            res.status(200).json({ message: `user with id ${id} has been deleted `})
    } catch (error) {
        res.status(500).json({
            message: 'Error removing the user',
          });
    }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
    const userData = req.body;
    const id = req.params.id
    try {
        const user = await userDb.update(id, userData);
         res.status(200).json(userData)
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

    if (user) {
    req.user = user;
    next();
    } else {
        res.status(400).json({ message: "user not found" })
    }
};

function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name){
        res.status(400).json({ message: "missing required name field" })
    } else {
        next()
    }
};

 function validatePost(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.text){
        res.status(400).json({ message: "missing required text field" })
    } else {
        next()
    }
};

module.exports = router;
