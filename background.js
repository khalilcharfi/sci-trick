// Copyright (c) 2014 Allan Costa.

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('test' + tab.url);
 	url = tab.url;
    if(url.indexOf('ieeexplore.ieee.org') >= 0 && url.indexOf('sci-hub') == -1 && changeInfo.status == "loading") {
	console.log('url to be updated ' + tab.url );
        chrome.tabs.update(tabId, {url: url.replace('ieeexplore.ieee.org','ieeexplore.ieee.org.sci-hub.io')});

    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var arr = tab.url.split('/');
  arr[2] = arr[2] + ".sci-hub.io";
  var new_url = arr.join('/');

  console.log('Redirecting ' + tab.url + ' to ' + new_url);

  chrome.tabs.update(tab.id, {url: new_url});
});
