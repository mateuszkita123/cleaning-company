const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: String,
    employee_id: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    }]
  },
  {
    usePushEach: true,
    timestamps: true
  }
);

module.exports = mongoose.model("Team", TeamSchema);
