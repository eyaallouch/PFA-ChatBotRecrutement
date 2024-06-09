const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const CandidateModel = mongoose.model('log_reg_formcandidate', CandidateSchema);

module.exports = CandidateModel;
