const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    is_b2b: Boolean,
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

module.exports = mongoose.model("Invoice", InvoiceSchema);
