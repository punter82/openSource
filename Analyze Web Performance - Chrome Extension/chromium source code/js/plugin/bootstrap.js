var message = chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension';
var performance = '';
chrome[message].onMessage.addListener(
    function(request, sender, sendResponse) {
        // This cache stores page load time for each tab.
        chrome.storage.local.get('cache', function(data) {
            if (!data.cache) data.cache = {};
            data.cache['timing' + sender.tab.id] = request.timing;
            data.cache['navigation' + sender.tab.id] = request.navigation;
            data.cache['pageLoadTime' + sender.tab.id] = request.time;
            data.cache['hostname' + sender.tab.id] = request.hostname;
            data.cache['resources' + sender.tab.id] = request.resources;
            chrome.storage.local.set(data);
        });

        if (request.time < 2.00) {
            chrome.browserAction.setIcon({
                path: 'icons/lightning.png',
                tabId: sender.tab.id
            });
        } else if (request.time >= 2.00 && request.time < 5.00) {
            chrome.browserAction.setIcon({
                path: 'icons/horse.png',
                tabId: sender.tab.id
            });
        } else if (request.time >= 5.00 && request.time < 8.00) {
            chrome.browserAction.setIcon({
                path: 'icons/turtle.png',
                tabId: sender.tab.id
            });
        } else if (request.time >= 8.00) {
            chrome.browserAction.setIcon({
                path: 'icons/snail.png',
                tabId: sender.tab.id
            });
        }
        //Example code to change color and display text 
        chrome.browserAction.setBadgeBackgroundColor({
            color: '#000'
        });
        chrome.browserAction.setBadgeText({
            text: request.time.toFixed(1) + 's',
            tabId: sender.tab.id
        });
        // Below code - Demo purpose only
        //chrome.tts.speak('Page load time is '+ request.time.toFixed(1) + ' seconds.');
    }
);

// cache removal
chrome.tabs.onRemoved.addListener(function(tabId) {
    chrome.storage.local.get('cache', function(data) {
        //alert('tab removed');
        if (data.cache) delete data.cache['timing' + tabId];
        if (data.cache) delete data.cache['navigation' + tabId];
        if (data.cache) delete data.cache['pageLoadTime' + tabId];
        if (data.cache) delete data.cache['hostname' + tabId];
        if (data.cache) delete data.cache['resources' + tabId];
        chrome.storage.local.set(data);
    });
});