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

});

router.get('/:id/posts', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
