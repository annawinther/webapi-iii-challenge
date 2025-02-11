const express = require('express');
const postsRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());

server.use(logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', userRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to ${req.url} at ${Date.now()}`);
  next();
};

module.exports = server;
