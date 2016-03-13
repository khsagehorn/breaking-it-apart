var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
var tweets = []


client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    tweets.push(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter & Passport', profile: req.user, tweets: tweets })
});


module.exports = router;
