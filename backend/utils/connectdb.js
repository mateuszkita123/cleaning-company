const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}

mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || process.env.MONGO_DB_CONNECTION_STRING;

mongoose.connect(databaseUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));
