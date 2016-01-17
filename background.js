// Copyright (c) 2014 Allan Costa.

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Redirecting ' + tab.url );
    if(tab.url.indexOf('ieeexplore.ieee.org') != 0 && changeInfo.status == "loading") {
        chrome.tabs.update(tabId, {url: tab.url.replace('ieeexplore.ieee.org','ieeexplore.ieee.org.sci-hub.io')});
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var arr = tab.url.split('/');
  arr[2] = arr[2] + ".sci-hub.io";
  var new_url = arr.join('/');

  console.log('Redirecting ' + tab.url + ' to ' + new_url);

  chrome.tabs.update(tab.id, {url: new_url});
});
