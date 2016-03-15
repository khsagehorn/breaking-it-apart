// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  setInterval(getTweets, 2000);
  var tweets;
  var twitters;
});



function getTweets(){
  $.ajax({
    method: 'GET',
    url: '/tweetsjson'
  }).then(function(response) {
    console.log(response);
    tweets = response.tweets.length;
    twitters = response.twitters.length;
    $('#test').html('');
    $('#test2').html('');
    console.log(tweets, twitters);
    tweetGraph();
    // for (var i=0; i<tweets.length; i++) {
    //   $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
    // }
    // for(var j=0; j<twitters.length; j++) {
    //   $('#test2').append('<div class="tweetbox"><h3>'+twitters[j]+'</h3></div>');
    // }
  });
};

function tweetGraph(){
  $(function () {
      $('#examplegraph').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: 'Yours<br>VS.<br>Theirs',
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
              name: 'Javascript vs. Python',
              innerSize: '50%',
              data: [
                  ['Yours', tweets],
                  ['Theirs', twitters],

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
  };
