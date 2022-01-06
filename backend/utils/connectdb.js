const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || process.env.MONGO_DB_CONNECTION_STRING;

mongoose.connect(databaseUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));
