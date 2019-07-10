const express = require('express');
const userDb = require('./userDb');
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

router.post('/:id/posts', async (req, res) => {

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

router.get('/:id', async (req, res) => {
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

router.get('/:id/posts', async (req, res) => {

});

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
