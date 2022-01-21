const InvoiceData = require("./models/invoiceData");

const invoicesData = [
  {
    company_name: "Firma123",
    company_vat_number: "64569607",
    company_address: "05-500 Warszawa, Szkolna 5/1",
    company_phone: "+48 132 321 123",
    company_email: "firma123@test.com",
    first_name: "Adam",
    last_name: "Kowalski"
  },
  {
    company_name: "NowaFirma",
    company_vat_number: "12345676",
    company_address: "01-525 Kalisz, Leśna 1/15",
    company_phone: "+48 123 123 123",
    company_email: "nowafirma@test.com",
    first_name: "Marian",
    last_name: "Nowak"
  }
]

function seedDB() {
  InvoiceData.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed invoices data!");
    invoicesData.forEach(function (seed) {
      InvoiceData.create(seed, function (err, invoiceData) {
        if (err) {
          console.log(err)
        } else {
          console.log("added a data");
        }
      });
    });
  });
}

module.exports = seedDB;
