const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGO_URL = "mongodb+srv://vinayrajput7499_db_user:GzWizVV8UuTrqebR@cluster0.pdlvwd5.mongodb.net/Rydex";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("SUCCESS: Mongoose connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAIL: Mongoose connection error:", err.message);
    process.exit(1);
  });
