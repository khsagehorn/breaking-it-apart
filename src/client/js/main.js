// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  setInterval(getTweets, 2000);
  tweetGraph();
  tweetGraph2();
});

// function getTweets(){
//   $.ajax({
//     method: 'GET',
//     url: '/tweetsjson'
//   }).then(function(response) {
//     console.log(response);
//     var tweets = response.tweets;
//     var twitters = response.twitters;
//     $('#test').html('');
//     for (var i=0; i<tweets.length; i++) {
//       $(function () {
//           $('#test').highcharts({
//               chart: {
//                   plotBackgroundColor: null,
//                   plotBorderWidth: 0,
//                   plotShadow: false
//               },
//               title: {
//                   text: 'Javascript<br>VS.<br>Python',
//                   align: 'center',
//                   verticalAlign: 'middle',
//                   y: 40
//               },
//               credits: {
//                 enabled: false
//               },
//               tooltip: {
//                   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//               },
//               plotOptions: {
//                   pie: {
//                       dataLabels: {
//                           enabled: true,
//                           distance: -40,
//                           style: {
//                               fontWeight: 'bold',
//                               color: 'white',
//                               textShadow: '0px 1px 2px black'
//                           }
//                       },
//                       startAngle: -90,
//                       endAngle: 90,
//                       center: ['50%', '75%']
//                   }
//               },
//               series: [{
//                   type: 'pie',
//                   name: 'Javascript vs. Python',
//                   innerSize: '50%',
//                   data: [
//                       [tweets,   tweets.length],
//                       [twitters,  twitters.length],
//
//                       {
//                           name: 'Proprietary or Undetectable',
//                           y: 0.2,
//                           dataLabels: {
//                               enabled: false
//                           }
//                       }
//                   ]
//               }]
//           });
//         });
//       };
//     }
//   });
// }

function getTweets(){
  $.ajax({
    method: 'GET',
    url: '/tweetsjson'
  }).then(function(response) {
    console.log(response);
    var tweets = response.tweets;
    var twitters = response.twitters;
    $('#test').html('');
    $('#test2').html('');
    for (var i=0; i<tweets.length; i++) {
      $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
    }
    for(var j=0; j<twitters.length; j++) {
      $('#test2').append('<div class="tweetbox"><h3>'+twitters[j]+'</h3></div>');
    }
  });
}

function tweetGraph(){
  $(function () {
      $('#examplegraph').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: 'Javascript<br>VS.<br>Python',
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
                  ['Javascript',   70.0],
                  ['Python',  30.0],

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

  function tweetGraph2(){
    $(function () {
        $('#examplegraph2').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Javascript<br>VS.<br>Python',
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
                    ['Javascript',   70.0],
                    ['Python',  30.0],

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
