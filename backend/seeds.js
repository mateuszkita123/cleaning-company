const InvoiceData = require("./models/invoiceData");

const data = [
  {
    company_name: "Firma123",
    company_vat_number: "64569607",
    company_address: "05-500 Warszawa, Szkolna 5/1",
    company_phone: "+48 132 321 123",
    company_email: "firma123@test.com",
    first_name: "Adam",
    last_name: "Kowalski"
  }
]

function seedDB() {
  InvoiceData.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed invoices data!");
    data.forEach(function (seed) {
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
