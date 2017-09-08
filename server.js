const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const Url = require('./db/models/url');
const app = express();
const database = 'mongodb://localhost/fupi-url';


app.set('PORT', process.env.PORT || 3001);

// TODO: Method with long as param, will save it into the db and output  short as response
app.get('/api', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to fupiURL'
  });
});

// TODO Will be called when the shorten button is clicked
app.get('/api/url/save', (req, res) => {
  mongoose.connect(database, { useMongoClient: true },  err => {
    if (err) {
      console.log(`Error establishing connection with mongoose to mongodb ${database}`);
    } else {
      const long = req.query.long;
      if (!long) {
        res.send({
          status: 500,
          message: 'Param needed. Use the form /api/url/save?<urlToBeShortened>',
        });
      } else {
        // TODO: Check if long already exists in db. If it does, look for the short and send it in the res
        // If long doesn't exist in the db, save it then send short in result
        Url.save((err, long) => {
          if (err) {
            res.json({
              status: 500,
              error: err,
              message: `Error saving url ${long}`,
            });
          } else {
            // Generate short form of url
            let short = shortid.generate();
            let url = new Url({ long: long, short: `fu.pi/${short}` });
            res.json({
              status: 200,
              url,
              message: `Saved url ${long} successfully with fu.pi/${short} url mapping`,
            });
          }
        });
      }
    }
  });
});

// Retrieve short url. long as param in query required
app.get('/api/url/get', (req, res) => {
  const long = req.query.long;
  if (!long) {
    res.json({
      status: 500,
      message: 'To retrieve the short form of a url, you must supply the long form.',
    });
  } else {
    mongoose.connection(database, { useMongoClient: true }, err => {
      if (err) {
        console.log(`Error establishing connection with mongoose to mongodb ${database}`);
      } else {
        Url.find({ long: long}, (err, url) => {
          if (err) {
            res.json({
              status: 404,
              error: err,
              message: `Error finding long url ${long}`
            });
          } else {
            res.json({
              status: 200,
              url
            });
          }
        });
      }
    });
  }
});


// Retrieve long url
// Will be called when one enters a short url in the browser bar
app.get('/api/fu.pi/:short', (req, res) => {
  const short = req.params.short;
  if (!short) {
    res.json({
      status: 500,
      message:'Supply short form of url'
    });
  } else {
    // Look for long form
    Url.find({ short: short}, (err, url) => {
      if (err) {
        res.json({
          status: 404,
          error: err,
          message: `Cannot find url shortfrom  fu.pi/${short}. Have you generated one already?`
        });
      } else {
        res.json({
          status: 200,
          url // { short, long }
        });
      }
    });
  }
});