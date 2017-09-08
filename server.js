const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const Url = require('./db/models/url');
const app = express();
const database = 'mongodb://localhost/fupi-url';


app.set('PORT', process.env.PORT || 3005);

app.get('/api', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to fupiURL'
  });
});

// Will be called when the shorten button is clicked
app.get('/api/url/save', (req, res) => {
  mongoose.connect(database, { useMongoClient: true },  err => {
    if (err) {
      console.log(`Error establishing connection with mongoose to mongodb ${database}`);
    } else {
      const long = req.query.long;
      if (!long) {
        res.send({
          status: 500,
          message: 'Param needed. Use the form /api/url/save?long=<urlToBeShortened>',
        });
      } else {
        Url.findOne({ long: long }, (err, url) => {
          if (err) {
            res.json({
              status: 404,
              error: err,
            });
          }
          // Can't find the entered url in the db, so generate the short form and save both
          else if (!url && !err || url === null) {
            // Generate short form of url
            let short = shortid.generate();
            let url = new Url({
              long: long,
              short: `fupi-${short}`
            });
            url.save((err, long) => {
              res.json({
                status: 200,
                url,
              });
            });
          } else if (url !== null) {
            // short url has already been generated, no need to generate & save again,  pass the url to the response
            res.json({
              status: 200, // 303: Resource Already exists?
              url,
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
    mongoose.connect(database, { useMongoClient: true }, err => {
      if (err) {
        console.log(`Error establishing connection with mongoose to mongodb ${database}`);
      } else {
        Url.findOne({ long: long }, (err, url) => {
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
// Redirect to long url in window.open
app.get('/api/url/:short', (req, res) => {
  const short = req.params.short;
  if (!short) {
    res.json({
      status: 500,
      message:'Supply short form of url'
    });
  } else if(short) {
    mongoose.connect(database, { useMongoClient: true }, err => {
      if (err) {
        console.log(`Error establishing connection with mongoose to mongodb ${database}`);
      } else {
        Url.findOne({ short: short }, (err, url) => {
          if (url !== null) {
            res.json({ status: 200, url }); // { short, long }
          } else if (err || url === null) {
            res.json({
              status: 404,
              error: err,
              message: `Cannot find long url from  fupi/${short}. Have you generated one already?`
            });
          }
        });
      }
    });
  } 
});

app.listen(app.get('PORT'), () => {
  console.log(`Server now listening at http://localhost:${app.get('PORT')}/api`);
});