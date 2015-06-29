(function() {
    /*
    * measurePageLoadTime is a function to 
    */
    var measurePageLoadTime = function measurePageLoadTime() {
        var timingAPI = window.performance.timing
            , timing = {  
                          connectEnd                  : timingAPI.connectEnd,
                          connectStart                : timingAPI.connectStart,
                          domComplete                 : timingAPI.domComplete,
                          domContentLoadedEventEnd    : timingAPI.domContentLoadedEventEnd,
                          domContentLoadedEventStart  : timingAPI.domContentLoadedEventStart,
                          domInteractive              : timingAPI.domInteractive,
                          domLoading                  : timingAPI.domLoading, 
                          domainLookupEnd             : timingAPI.domainLookupEnd,
                          domainLookupStart           : timingAPI.domainLookupStart,
                          fetchStart                  : timingAPI.fetchStart,
                          loadEventEnd                : timingAPI.loadEventEnd,
                          loadEventStart              : timingAPI.loadEventStart,
                          navigationStart             : timingAPI.navigationStart, 
                          redirectEnd                 : timingAPI.redirectEnd, 
                          redirectStart               : timingAPI.redirectStart,
                          requestStart                : timingAPI.requestStart, 
                          responseEnd                 : timingAPI.responseEnd,
                          responseStart               : timingAPI.responseStart,
                          secureConnectionStart       : timingAPI.secureConnectionStart,
                          unloadEventEnd              : timingAPI.unloadEventEnd,
                          unloadEventStart            : timingAPI.unloadEventStart
                       } // window's performance.timing object
            , navigationAPI = window.performance.navigation
            , navigation = { 
                              redirectCount : navigationAPI.redirectCount,
                              type          : navigationAPI.type 
                           }
            , resourcesAPI = window.performance.getEntries()
            , resources = []
            , hostname = window.location.hostname
            , pageLoadTime
            , message
            , start
            ;

        for (var i = 0; i < resourcesAPI.length; i++) {
          resources.push( {
                            initiatorType : resourcesAPI[i].initiatorType,
                            name          : resourcesAPI[i].name,
                            duration      : resourcesAPI[i].duration
                          } );
        };

        if (timing.loadEventEnd > 0) {
            // if redirectStart is zero use fetchStart as starting point
            start = timing.redirectStart == 0 ? timing.fetchStart : timing.redirectStart;
            // Page load time
            pageLoadTime = (timing.loadEventEnd - start) / 1000;
            message = chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension';
            //set details to chrome's message data attribute
            chrome[message].sendMessage({
                navigation: navigation,
                time: pageLoadTime,
                timing: timing,
                hostname: hostname,
                resources: resources
            });
        }
    };

    (function check() {

        (document.readyState == 'complete') ? measurePageLoadTime(): setTimeout(check, 150);

    })();

    /* Listen for messages */
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        /* If the received message has the expected format... */
        if (msg.text && (msg.text == 'report_back')) {
            /* Call the specified callback, passing 
               the web-pages DOM content as argument */
            sendResponse(document.all[0].outerHTML);
        }
    });
})();