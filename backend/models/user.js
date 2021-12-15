const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    role_id: { type: String, default: 'Klient' },
    invoice_data_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InvoiceData"
    }
  },
  {
    usePushEach: true,
    timestamps: true
  }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
