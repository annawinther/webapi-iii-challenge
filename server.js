const express = require('express');
// const postsRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());

// server.use('/api/posts', postsRouter);
server.use('/api/posts', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
