const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MockProfileSchema = new Schema({
  email: String,
  topics: [String] 
});

const MockProfile = mongoose.model('MockProfile', MockProfileSchema);
module.exports = MockProfile;
