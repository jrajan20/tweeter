/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
/*const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];*/


$(function() {

  var $form = $('#compose-tweet');
  
  $form.on('submit', function (event) {
  	 let text = $('.text-box').val();
  	 let char = text.length;
 	console.log(char)
 	console.log(text)
 	event.preventDefault()
  if (text === null || text === ''){
  	$('.error-msg').text('Not a valid tweet! Please enter something!')
  	$('.error-msg').slideDown();
    

  } else if (char >140){
  
  	$('.error-msg').text('Character limit exceeded!');
    $('.error-msg').slideDown();
   
  	
  } else {
		$('.error-msg').hide();
   $.ajax('/tweets/', { method: 'POST', data : $(this).serialize()})
    .then( () => {
    	$('.text-box').text('');
    	loadTweets()
    	$(".text-box").focus( function(){ 
  			
        $('.error-msg').hide();

		  });
     });
    }

  });
  
  
 
});

function loadTweets() {

$.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
     
     renderTweets(tweets);
    });
}

function escape(str) {

  var para = document.createElement('p');
  para.appendChild(document.createTextNode(str));
  return para.innerHTML;
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    
    for ( let tweet of tweets){
    	console.log('abc');
    	let tweetText = createTweetElement(tweet);
    	
    	$('.tweet-container').prepend(tweetText);
    }
}

function createTweetElement(tweet) {
	
	return `
	      <article class = "tweet-display">
          	<header>
            	<img src= ${tweet.user.avatars.regular}>
            	<strong><span class = 'name'>${tweet.user.name}</span></strong>
            	<span class = 'handle'>${tweet.user.handle}</span>
          	</header>
          	<section class='tweet-box'>
            	<article>
            		<section><p id = 'user-tweet'>${escape(tweet.content.text)}</p></section>
            		<br>
            		<br>
           		 	<footer>
            		${tweet.created_at}
            		<span>
              		<i class="tiny material-icons">flag</i>
              		<i class="tiny material-icons">repeat</i>
              		<i class="tiny material-icons">thumb_up</i>
            	 	</span>  
              
            		</footer>

          		</article>
        	</section>
        </article>
 	
 	 `
                 
}


loadTweets();

//toggle compose button

  $('.new-tweet').hide();
  var toggleCompose = false;
  $('.compose-toggle').click(function(){
    toggleCompose = !(toggleCompose);
    if(toggleCompose === true){
      $('.new-tweet').slideDown();
      $('.text-box').focus( function(){
      $('.error-msg').hide();
      });
        
    } else{
      $('.new-tweet').slideUp();
      $('.error-msg').hide();
      
    }

  })




});



