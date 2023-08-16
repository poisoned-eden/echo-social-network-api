const { connect, connection } = require('mongoose');

// TODO: edit db name
const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString);

module.exports = connection;
