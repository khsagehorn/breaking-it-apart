var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var knex = require('../../../db/knex');
var request = require('request');
var alchemyKey = process.env.ALCHEMY_API;
var twitterStreamChannels = require('twitter-stream-channels');
var twit = new twitterStreamChannels({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var channels = {
  'stream1': '',
  'stream2': '',
  'stream3': '',
};

var tweets1 = [];
var tweets2 = [];
var tweets3 = [];
var tweet = channels.stream1;
var tweet2 = channels.stream2;
var tweet3 = channels.stream3;
console.log(tweet);
console.log(tweet2);
var stream;

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Smashtag!',
    profile: req.user,
    tweets: tweets1,
    twitters: tweets2,
    testing: tweet3
  })
});

router.get('/business', function(req, res, next) {
  res.render('business', {
    title: 'More Options!',
    profile: req.user,
    tweets: tweets1,
    twitters: tweets2,
    testing: tweet3
  })
});

router.post('/sentiment', function(req, res) {
  var sampleText = req.body.text;
  request({
    method: 'GET',
    url: 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?text='
          + sampleText + '&apikey='+alchemyKey+'&outputMode=json'
  }, function(err, response) {
    if(err){
      console.log('err', err);
      res.json(err);
    } else {
      res.json(response);
    }
  })
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'What The F*!# Is This?',
    profile: req.user,
    tweets: tweets1,
    twitters: tweets2,
    testing: tweet3
  })
});

router.get('/savedcharts/:id', function(req, res, next) {
  console.log(req.user);
  var id = req.user.id;
  knex('saved_hashes').select().where('user_id', id)
  .then(function(hashes){
    res.render('savedcharts', {
      profile: req.user,
      hashes: hashes
    });
  })
  .catch(function(err){
    res.status(500);
    res.render('error', {message: 'There was an error'});
  })
});

router.get('/charts', function(req, res, next) {
  res.render('charts', {
    title: 'Get Started!!',
    profile: req.user,
    tweets: tweets1,
    twitters: tweets2,
    testing: tweet3
  })
});

// router.post('/charts', function(req, res, next) {
//   tweet = req.body.twit;
//   tweet2 = req.body.twit2;
//   tweet3 = req.body.twit3;
//   restart(tweet, tweet2, tweet3);
//   // res.redirect('/charts')
// });

router.post('/stream', function(req, res, next) {
  tweet = req.body.twit;
  tweet2 = req.body.twit2;
  tweet3 = req.body.twit3;

  if (req.user){
    console.log('test');
    knex('saved_hashes').insert({
      hash1: req.body.twit,
      hash2: req.body.twit2,
      hash3: req.body.twit3,
      user_id: req.user.id
      })
     .then(function(data){
      console.log(data);
     })
     .catch(function(err){
      console.log(err)
     })
    }

  restart(tweet, tweet2, tweet3);

  res.redirect('/charts');
});

router.get('/stoptweets', function(req, res, next){
  if (stream){
    stopTweets();
  } else {
    res.redirect('/charts');
  }
})

router.get('/tweetsjson', function(req, res, next) {
  res.json({
    tweets: tweets1,
    twitters: tweets2,
    testing: tweets3,
    channels: channels
  });
})

function restart(hashtag, hashtag2, hashtag3) {
  if(stream) {
    stream.stop();
  }
  tweets1 = [];
  tweets2 = [];
  tweets3 = [];
  channels = {
    'stream1': hashtag,
    'stream2': hashtag2,
    'stream3': hashtag3
  };

  stream = twit.streamChannels({track: channels});
  stream.on('channels/stream1', function(tweet){
    if(tweet.text){
      tweets1.push(tweet.text);
    }
    console.log(tweet.text);

  })
  stream.on('channels/stream2', function(tweet){
    if(tweet.text){
      tweets2.push(tweet.text);
    }
    console.log(tweet.text);
  })
  stream.on('channels/stream3', function(tweet){
    if(tweet.text){
      tweets3.push(tweet.text);
    }
    console.log(tweet.text);
  })

}

function stopTweets() {
    stream.stop();
  	console.log('>stream closed');
}



module.exports = router;
