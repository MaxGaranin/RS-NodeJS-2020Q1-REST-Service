/* eslint-disable no-unused-vars */
/* eslint-disable no-process-exit */
const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  })
  .on('uncaughtException', (error, origin) => {
    logger.error(`Сaptured uncaught exception: ${error.message}`);
    const { exit } = process;
    exit(1);
  });
