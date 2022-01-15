const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    service_address: String,
    service_area: Number,
    service_unit_price: Number,
    status: {
      type: String,
      default: 'CREATED',
    },
    description: String,
    teams_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    }
  },
  {
    usePushEach: true,
    timestamps: true
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
