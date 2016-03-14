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
  'stream1': ['javascript'],
  'stream2': ['css'],
};

var tweets1 = [];
var tweets2 = [];
var tweet = channels.stream1[0];
var tweet2 = channels.stream2[0];
console.log(tweet);
console.log(tweet2);

var stream = twit.streamChannels({track: channels});
stream.on('channels/stream1', function(tweet){
  tweets1.push(tweet.text);
  console.log(tweet.text);
})
stream.on('channels/stream2', function(tweet){
  tweets2.push(tweet.text);
  console.log(tweet.text);
})

// client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//     tweets1.push(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
//   client.currentstream = stream;
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Break It Apart!!', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/tweets', function(req, res, next) {
  res.render('tweets', { title: 'Twitter & Passport', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Twitter & Passport', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.post('/charts', function(req, res, next) {
  tweet = req.body.twit;
  tweet2 = req.body.twit2
  restart(tweet, tweet2);
  res.redirect('/charts')
});

router.get('/tweetsjson', function(req, res, next) {
  res.json({tweets: tweets1, twitters: tweets2});
})

// router.get('/tweetsjson2', function(req, res, next) {
//   res.json({twitters: tweets2});
// })

function restart(hashtag, hashtag2) {
  setTimeout(function(){
    stream.stop();//closes the stream connected to Twitter
  	console.log('>stream closed after 100 seconds');
  },100000);
  tweets1 = [];
  tweets2 = [];
  var stream = twit.streamChannels({track: channels});
  stream.on('channels/stream1', function(tweet){
    tweets1.push(tweet.text);
    console.log(tweet.text);

  })
  stream.on('channels/stream2', function(tweet){
    tweets2.push(tweet.text);
    console.log(tweet.text);
  })
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
// function restart2 (hashtag) {
//   client.currentstream.destroy();
//   tweets2 = [];
//   client.stream('statuses/filter', {track: hashtag}, function(stream) {
//     stream.on('data', function(tweet) {
//       console.log(tweet.text);
//       tweets2.push(tweet.text);
//     });
//
//     stream.on('error', function(error) {
//       throw error;
//     });
//     client.currentstream = stream;
//   });
// }


module.exports = router;
