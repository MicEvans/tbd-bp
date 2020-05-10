// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
//
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg

console.log('Youtube.js is working');



$(document).ready(function () {
  
  var key = 'AIzaSyD1gUivzx6Li7wAoRLvzq3gpi2i-hboArw';
  var playlistId = 'PLTzRFr8g1XSyzsZ74FQr_3FYjmJBU3_ff'; //'PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB';
  var channelId = 'UCnxGkOGNMqQEUMvroOWps6Q';
  var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  var testURL = 'https://www.googleapis.com/youtube/v3/search';
  
  var testOptions = {
    part: 'snippet,id',
    key: key,
    maxResults: 20,
    channelId: channelId,
    order: 'date'
  }
  
  var options = {
    part: 'snippet',
    key: key,
    maxResults: 20,
    playlistId: playlistId
  }
  
  loadVids();
  
  function loadVids() {
    $.getJSON(t estURL, testOptions, function (data) {
      var id = data.items[0].id.videoId;
      // var id = data.items[0].snippet.resourceId.videoId;
      mainVid(id);
      resultsLoop(data);
    });
  }
  
  function mainVid(id) {
    $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
  }
  
  
  function resultsLoop(data) {
    
    $.each(data.items, function (i, item) {
      
      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.id.videoId;
      
      
      
      $('#videos').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
    });
  }
  
  // CLICK EVENT
  $('#videos').on('click', 'article', function () {
    var id = $(this).attr('data-key');
    mainVid(id);
  });
  
  
});
