$(document).on('ready', function() {
  console.log('sanity check!');
});

$('#submit_form').on('click', function(e){
  e.preventDefault();
  var payload = {
    twit: $('#twit').val(),
    twit2: $('#twit2').val(),
    twit3: $('#twit3').val()
  };
  console.log('payload', payload);
  $.ajax({
    method: 'POST',
    url: '/stream',
    data: payload
  }).then(function(response) {
    startTimer();
  });
});

function startTimer() {
  window.tweetTimer = setInterval(getTweets, 2000);
}

function stopTimer(){
  clearInterval(window.tweetTimer);
}


function getTweets(){
  $.ajax({
    method: 'GET',
    url: '/tweetsjson'
  }).then(function(response) {
    console.log(response);
    var tweets = response.tweets.length;
    var twitters = response.twitters.length;
    var testing = response.testing.length;
    var total = tweets+twitters+testing;
    $('#tweet1').html(tweets);
    $('#tweet2').html(twitters);
    $('#tweet3').html(testing);
    $('#total').html('Total: '+total);
    console.log(tweets, twitters, testing);
    tweetGraph(tweets, twitters, testing, response.channels);
    randomTweets(response);
    // for (var i=0; i<tweets.length; i++) {
    //   $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
    // }
    // for(var j=0; j<twitters.length; j++) {
    //   $('#test2').append('<div class="tweetbox"><h3>'+twitters[j]+'</h3></div>');
    // }
  });
}

function tweetGraph(tweets, twitters, testing, channels){
  $(function () {
      $('#examplegraph').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: channels.stream1+' vs.<br>'+channels.stream2+' vs.<br>'+channels.stream3,
              align: 'center',
              verticalAlign: 'middle',
              y: 40
          },
          credits: {
            enabled: false
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            series: {
              animation: false
            },
              pie: {
                  dataLabels: {
                      enabled: true,
                      distance: -40,
                      style: {
                          fontWeight: 'bold',
                          color: 'white',
                          textShadow: '0px 1px 2px black'
                      }
                  },
                  startAngle: -90,
                  endAngle: 90,
                  center: ['50%', '75%']
              }
          },
          series: [{
              type: 'pie',
              name: '#Hashtags',
              innerSize: '50%',
              data: [
                  [channels.stream1, tweets],
                  [channels.stream2, twitters],
                  [channels.stream3, testing],

                  {
                      name: 'Proprietary or Undetectable',
                      y: 0.2,
                      dataLabels: {
                          enabled: false
                      }
                  }
              ]
          }]
      });
    });
  }

function randomTweets(input) {
  console.log('input', input);
  var random1 = input.tweets[Math.floor(Math.random()*input.tweets.length)] || '';
  var random2 = input.twitters[Math.floor(Math.random()*input.twitters.length)] || '';
  var random3 = input.testing[Math.floor(Math.random()*input.testing.length)] || '';
  console.log('random1', random1);
  console.log('random2', random2);
  console.log('random3', random3);
  $('#tweets').html('');
  $('#tweets').append('<div class="col-xs-4"><h3>#'+input.channels.stream1+'</h3><p class="tweetbox">'+random1+'</p></div>');
  $('#tweets').append('<div class="col-xs-4"><h3>#'+input.channels.stream2+'</h3><p class="tweetbox">'+random2+'</p></div>');
  $('#tweets').append('<div class="col-xs-4"><h3>#'+input.channels.stream3+'</h3><p class="tweetbox">'+random3+'</p></div>');
}