var { ToggleButton } = require("sdk/ui/button/toggle")
    , tabs = require( "sdk/tabs" )
    , currentTab
    , panels = require( 'sdk/panel' )
    , self = require("sdk/self")
    , button = ToggleButton({
        id: "performance-extension",
        label: "Performance Extension",
        icon: "./images/speed.png",
        onClick: handleClick
    })
    ;
tabs.on("load", changeIcon);
function handleClick( state ) {
    var panel = panels.Panel({
        contentURL: self.data.url( './popup.html' ),
        onHide: handleHide,
        position: button,
        width: 770,
        height: 425,
    });
    panel.show();
    panel.port.emit('domData',domObj);
}

function handleHide() {
  button.state( 'window', {checked: false} );
}

function changeIcon( tab ){
    currentTab = tab;
    tab.attach({
        contentScriptFile: self.data.url("./js/content-script.js")
    })
    .port.on("performance/timing", function( timing ) {

        var pageLoadTime
            , start
            , pageLoadTimeStr
            ;

        if ( timing.loadEventEnd > 0 ) {

            start = timing.redirectStart == 0 ? timing.fetchStart : timing.redirectStart;
            pageLoadTime = ( timing.loadEventEnd - start ) / 1000;
            pageLoadTimeStr = ( Math.round( pageLoadTime * 10 ) / 10 ).toString() + 's';
            button.badge = pageLoadTimeStr;
            button.badgeColor = "#000000";

            if ( pageLoadTime < 2.00 ) {
                button.icon = './images/lightning.png';
            } else if ( pageLoadTime >= 2.00 && pageLoadTime < 5.00 ) {
                button.icon = './images/horse.png';
            } else if ( pageLoadTime >= 5.00 && pageLoadTime < 8.00 ) {
                button.icon = './images/turtle.png';
            } else if ( pageLoadTime >= 8.00 ) {
                button.icon = './images/snail.png';
            }
        }

    })
    .on("dom", function( perfObj ) {

        domObj = perfObj;

    });
}