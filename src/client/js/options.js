$(document).on('ready', function() {
  console.log('sanity check!');
});
$('#start_analysis').on('click', function(e){
  e.preventDefault();
  startAnalysis();
});

$('#stop_analysis').on('click', function(e){
  e.preventDefault();
  stopAnalysisTimer();
})

function startAnalysis(){
  console.log('start');
  $.ajax({
    method: 'POST',
    url:'/sentiment',
    data: {
      hashtag: $('#sentiment').val()
    } 
  }).then(function(response) {
    console.log('start time');
    startAnalysisTimer();
  })
}

function getAnalysisData(){
  $.ajax({
    method: 'GET',
    url: '/sentimentTweets'
  }).then(function(response){
    console.log('sentiment', response);
  })
}

function startAnalysisTimer(){
  window.analysisTimer = setInterval(getAnalysisData, 2000);
}

function stopAnalysisTimer(){
  clearInterval(window.analysisTimer);
  $.ajax({
    method: 'GET',
    url: '/stoptweets'
  }).then(function(res){
    console.log('stopped stream');
  })
}
