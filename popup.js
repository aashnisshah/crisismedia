var settings = {
	api_key: '',
	base_url: 'http://api.crisis.net/item?location=',
	base_url_distance: '&distance=',
	base_url_center: '&apikey=',
	geoip_api: 'http://freegeoip.net/json/',
}

document.addEventListener('DOMContentLoaded', function() {
	// get location
	GET_IP(settings.geoip_api, getNews);
});

/* this function performs the get IP call
*/
function GET_IP(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();
	xhr.onload = function() {
	    var json = xhr.responseText;                         // Response
	    json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
	    json = JSON.parse(json);
		callback(json);
	};
}

/* this function performs the get news call
*/
function GET_NEWS(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();
	xhr.onload = function() {
	    var json = xhr.responseText;                         // Response
	    json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
	    json = JSON.parse(json);
		callback(json);
	};
}

/* get news for specific location
*/
function getNews(data) {
	var time = new Date().getTime();
	time = Math.floor(time / 1000);
	var url = settings.base_url + data.longitude + ',' + data.latitude + 
				settings.distance + '10' + settings.base_url_center + settings.api_key;
	GET_NEWS(url, display);
}

/* process and display information on the
 * html page
 */
function display(posts) {
	var articlesDiv = document.getElementById('articles');

	for(post in posts.data) {
		var newPostDiv = document.createElement('div');
		newPostDiv.className = 'list-group';

		var postTitle = document.createElement('h2');
		postTitle.innerText = posts.data[post].content;
		postTitle.className = 'article-name';

		var postContent = document.createElement('p');
		postContent.innerText = posts.data[post].author.name;

		newPostDiv.appendChild(postTitle);
		newPostDiv.appendChild(postContent);
		articlesDiv.appendChild(newPostDiv);
	}
}

/* this eventListener allows us to create a new tab when we click on 
 * a link in a chrome extension 
 */
window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
