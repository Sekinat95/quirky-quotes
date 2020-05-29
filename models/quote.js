const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Quote = mongoose.model('Quotes', QuoteSchema);

module.exports = Quote;