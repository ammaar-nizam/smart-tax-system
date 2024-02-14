const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const businessCustomerRoute = require('./routes/businessCustomer');
const taxPayerRoute = require('./routes/taxPayer');
const registrationRoute = require('./routes/registration');
const roleRoute = require('./routes/role');

const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/admins", adminRoute);
app.use("/api/business-customers", businessCustomerRoute);
app.use("/api/tax-payers", taxPayerRoute);
app.use("/api/registrations", registrationRoute);
app.use("/api/roles", roleRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});