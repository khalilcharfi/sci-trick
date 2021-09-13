// Copyright (c) 2016 H@mdi & KC.
var Website = ["ieeexplore.iee",
 "link.springer", 
 "sciencedirect", 
 "dl.acm", 
 "onlinelibrary.wiley",
 "jama.jamanetwork",
 "cpr.sagepub",
 "cnu.sagepub.com", 
 "ehjcimaging.oxfordjournals", 
 "europace.oxfordjournals.org",
 "tandfonline.com", 
 "biomet.oxfordjournals", 
 "online.liebertpub",
 "nejm.org"];
 
var Button_state = ["Sci-trick [enabled]", "Sci-trick [disabled]", "icon/enabled.png", "icon/disabled.png"]

function CheckWebsite(tab, changeInfo) {
    var arr = tab.url.split("/");
    for (i = 0; i < Website.length; i++)
        if (arr[2].indexOf(Website[i]) >= 0 && -1 == arr[2].indexOf("sci-hub") && "loading" == changeInfo.status) return !0
}

function initializeDefaultValues() {
    console.log("value : " + localStorage.getItem('state'));
    null === localStorage.getItem("state") && localStorage.setItem("state", 1);
    1 == localStorage.getItem("state") ? (chrome.browserAction.setIcon(
        {
            path: Button_state[2]
        }), chrome.browserAction.setTitle(
        {
            title: Button_state[0]
        })) : (chrome.browserAction.setIcon(
        {
            path: Button_state[3]
        }), chrome.browserAction.setTitle(
        {
            title: Button_state[1]
        }));
}

function ButtonState() {
    0 == localStorage.getItem("state") ? (localStorage.setItem("state", 1), chrome.browserAction.setIcon(
        {
            path: Button_state[2]
        }), chrome.browserAction.setTitle(
        {
            title: Button_state[0]
        })) : (localStorage.setItem("state", 0), chrome.browserAction.setIcon(
        {
            path: Button_state[3]
        }), chrome.browserAction.setTitle(
        {
            title: Button_state[1]
        }));
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (1 == localStorage.getItem("state")) {
        origin_url = tab.url;
        var arr = origin_url.split("/");
        if (CheckWebsite(tab, changeInfo)) {
            arr[2] = arr[2] + ".sci-hub.se";
            var new_url = arr.join("/");
         chrome.tabs.update(tab.id, {url: new_url});
        }
    }

});
chrome.browserAction.onClicked.addListener(function (e) {
    ButtonState()
}), chrome.runtime.onInstalled.addListener(function (e) {
    initializeDefaultValues()
});
