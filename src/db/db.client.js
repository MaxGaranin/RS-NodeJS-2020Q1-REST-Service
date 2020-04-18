const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./../common/config');
const User = require('./../resources/users/user.model');
const Board = require('./../resources/boards/board.model');
const Task = require('./../resources/tasks/task.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'login2', password: 'password2' })
];

const boards = [...new Array(2)].map(
  (_, idx) => new Board({ title: `Board #${idx + 1}` })
);

const tasks = [...new Array(5)].map((_, idx) => {
  const oneOrZero = idx % 2;
  const boardId = boards[oneOrZero].id;
  return new Task({
    title: `Task #${idx + 1}`,
    order: idx + 1,
    boardId
  });
});

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('DB is connected!');
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = { users, boards, tasks, connectToDB };
