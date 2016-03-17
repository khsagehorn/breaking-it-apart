var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var twitterStreamChannels = require('twitter-stream-channels');
var twit = new twitterStreamChannels({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var channels = {
  'stream1': 'javascript',
  'stream2': 'css',
  'stream3': 'python',
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
  res.render('index', { title: 'Smashtag!', profile: req.user, tweets: tweets1, twitters: tweets2, testing: tweet3 })
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'What The F*!# Is This?', profile: req.user, tweets: tweets1, twitters: tweets2, testing: tweet3 })
});

router.get('/savedcharts', function(req, res, next) {
  res.render('savedcharts', { title: 'Profile', profile: req.user, tweets: tweets1, twitters: tweets2, testing: tweet3 })
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Get Started!!', profile: req.user, tweets: tweets1, twitters: tweets2, testing: tweet3 })
});

router.post('/charts', function(req, res, next) {
  tweet = req.body.twit;
  tweet2 = req.body.twit2;
  tweet3 = req.body.twit3;
  restart(tweet, tweet2, tweet3);
  // res.redirect('/charts')
});

router.get('/stoptweets', function(req, res, next){
  stopTweets();
})

router.get('/tweetsjson', function(req, res, next) {
  res.json({tweets: tweets1, twitters: tweets2, testing: tweet3});
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
  	console.log('>stream closed after 100 seconds');
}

// function restart (hashtag) {
//   client.currentstream.destroy();
//   tweets1 = [];
//   client.stream('statuses/filter', {track: hashtag}, function(stream) {
//     stream.on('data', function(tweet) {
//       console.log(tweet.text);
//       tweets1.push(tweet.text);
//     });
//
//     stream.on('error', function(error) {
//       throw error;
//     });
//     client.currentstream = stream;
//   });
// }
//



module.exports = router;
