/* eslint-disable no-unused-vars */
const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./middlewares/logger.middleware');
const { connectToDB } = require('./db/db.client');

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  })
  .on('uncaughtException', (error, origin) => {
    logger.error(`Сaptured uncaught exception: ${error.message}`);
    process.exitCode = 1;
  });

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
