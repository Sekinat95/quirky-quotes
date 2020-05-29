const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

router.get('/all', (req, res) => {
  Quote.find().then((result) => {
    res.render('quotes', {
      quotes: result
    })
  })
})

//post a quote
router.post('/quote', (req, res) => {
  const { quote, author } = req.body;
  console.log(req.body)
    const newQuote = new Quote({
      quote,
      author
    });
    newQuote.save()
      .then(quote => {
        req.flash('success_msg', 'quote posted')
        res.render('admin')
      })
      .catch(err => console.log(err))

  
  
})

module.exports = router;