const mongoose = require("mongoose");

const InvoiceDataSchema = new mongoose.Schema(
  {
    company_name: String,
    company_vat_number: String,
    company_address: String,
    company_phone: String,
    company_email: String,
    first_name: String,
    last_name: String,
  },
  {
    usePushEach: true,
    timestamps: true
  }
);

module.exports = mongoose.model("InvoiceData", InvoiceDataSchema);
