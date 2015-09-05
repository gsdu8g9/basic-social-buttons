(function(){
	'use strict';

	var settings = {
		description: false,
		image: false,
		url: false
	}
	
	var initBsb = function(){
		var buttonsContainer = document.querySelector('.bsb-buttons');

		for(var setting in settings) {
	        if (settings.hasOwnProperty(setting)) {
	        	settings[setting] = settings[setting] || buttonsContainer.getAttribute('data-' + setting) || false;
	        	settings[setting] = settings[setting] ? encodeURIComponent(settings[setting]) : false;
	        }
    	}

    	settings.url = settings.url || encodeURIComponent(window.location.href);

		if (settings.url) {
			var facebook = document.querySelector('.bsb-facebook a');
			var twitter = document.querySelector('.bsb-twitter a');
			var google = document.querySelector('.bsb-googleplus a');
			var pinrest = document.querySelector('.bsb-pinterest a');

			if(facebook !== null){
				facebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + settings.url);
			}

			if(twitter !== null){
				twitter.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + (settings.description ? settings.description : '') + '%20' + settings.url);
			}

			if(google !== null){
				google.setAttribute('href', 'https://plus.google.com/share?url=' + (settings.description ? settings.description : '') + '%20' + settings.url);
			}

			if(pinrest !== null){
				pinrest.setAttribute('href', 'http://pinterest.com/pin/create/button/?url=' + settings.url + ((settings.image) ? '&amp;media=' + settings.image : '') + (settings.description ? '&amp;description=' + settings.description : ''));
			}

			getFaceBookCount(settings.url, function(data){
				var counterContainer = document.querySelector('.bsb-facebook .bsb-share-counter');

				if(counterContainer !== null && 
				   data.length > 0 && 
				   data[0].share_count > 0){

				   	counterContainer.innerHTML = data[0].share_count;
					counterContainer.style.display = "block";
				}
			});	
		}
	};

	function httpGetAsync(theUrl, callback)	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	            callback(xmlHttp.responseText);
	    }
	    xmlHttp.open("GET", theUrl, true);
	    xmlHttp.send(null);
	}


	var getFaceBookCount = function(url, cb){		
		httpGetAsync('https://api.facebook.com/restserver.php?method=links.getStats&urls=' + url + '&format=json', 
					  function(data){
					  	if(cb)
					  		cb(JSON.parse(data));
					  });  
	};

	document.addEventListener('DOMContentLoaded', function(){
		initBsb();
	}, false);

})();
