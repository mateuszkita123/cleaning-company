const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    authStrategy: {
      type: String,
      default: "local",
    },
    refreshToken: {
      type: [Session],
    },
    role_id: {
      type: String,
      default: 'Klient',
    },
    invoice_data_id: {
      type: Schema.Types.ObjectId,
      ref: "InvoiceData",
    }
  }
);

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
