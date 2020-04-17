/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const logger = require('./common/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  const { method, url, params, body } = req;
  logger.info(
    `${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(body)}`
  );
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((req, res, next) => {
  next(createError(HttpStatus.NOT_FOUND));
});

app.use((error, req, res, next) => {
  logger.error(`${error.status}: ${error.message}`);
  res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json({ message: error.message });
});

module.exports = app;
