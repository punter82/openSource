Raphael.fn.pieChart = function( cx, cy, r, values, labels, stroke ) {

    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    function sector( cx, cy, r, startAngle, endAngle, params ) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path( ['M', cx, cy, 'L', x1, y1, 'A', r, r, 0, +( endAngle - startAngle > 180 ), 0, x2, y2, 'z'] ).attr( params );
    }
    var angle = 0,
        total = 0,
        process = function( j ) {
            var value = values[ j ],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                start, color, ms = 500,
                p, txt, accordionNode;
            if (angleplus > 180) {

                start = 0;

            } else if (angleplus > 135 && angleplus < 180) {

                start = 0.025;

            } else if (angleplus > 90 && angleplus < 135) {

                start = 0.05;

            } else if (angleplus > 45 && angleplus < 90) {

                start = 0.075;

            } else if (angleplus > 15 && angleplus < 45) {

                start = 0.1;

            } else {

                start = 0.125;

            }

            color = Raphael.hsb(start, .75, 1);

            p = sector(cx, cy, r, angle, angle + angleplus, {
                fill: '90-' + color + '-' + color,
                stroke: stroke,
                'stroke-width': 1
            });
            p.node.id = 'pi' + j;
            txt = paper.text(250, 120, labels[j]).attr({
                fill: color,
                stroke: 'none',
                opacity: 0,
                'font-size': 20
            });
            txt.node.id = 'txt' + j;
            accordionNode = document.getElementsByClassName('accordion')[0];

            p.mouseover(function() {
                p.stop().animate({
                    transform: 's1.1 1.1 ' + cx + ' ' + cy
                }, ms, 'elastic');
                txt.stop().animate({
                    opacity: 1
                }, ms, 'elastic');
                accordionNode.className = accordionNode.className + " active"
                accordionNode.getElementsByTagName('li')[j].className = accordionNode.getElementsByTagName('li')[j].className + " active"
            }).mouseout(function() {
                var retainClasses;
                p.stop().animate({
                    transform: ''
                }, ms, 'elastic');
                txt.stop().animate({
                    opacity: 0
                }, 0);
                retainClasses = accordionNode.className.substring(0, accordionNode.className.indexOf(' active'));
                accordionNode.className = retainClasses;
                retainClasses = accordionNode.getElementsByTagName('li')[j].className.substring(0, accordionNode.getElementsByTagName('li')[j].className.indexOf(' active'));
                accordionNode.getElementsByTagName('li')[j].className = retainClasses;
            });

            accordionNode.getElementsByTagName('li')[j].addEventListener('mouseover', function(event) {
                p.stop().animate({
                    transform: 's1.1 1.1 ' + cx + ' ' + cy
                }, ms, 'elastic');
                txt.stop().animate({
                    opacity: 1
                }, ms, 'elastic');
            });
            accordionNode.getElementsByTagName('li')[j].addEventListener('mouseout', function(event) {
                p.stop().animate({
                    transform: ''
                }, ms, 'elastic');
                txt.stop().animate({
                    opacity: 0
                }, 0);
            });
            angle += angleplus;

            chart.push(p);
            chart.push(txt);
        };

    for (var i = 0, ii = values.length; i < ii; i++) {

        total += values[i];

    }

    for (i = 0; i < ii; i++) {

        process(i);

    }

    return chart;

};

addon.port.on("domData", function( domObj ) {

    var timing = domObj.timing,
        redirect = (timing.redirectEnd - timing.redirectStart),
        dns = (timing.domainLookupEnd - timing.domainLookupStart),
        unload = (timing.unloadEventEnd - timing.unloadEventStart),
        connection = (timing.connectEnd - timing.connectStart),
        reqresTime = (timing.responseStart - timing.requestStart),
        domLoad = (timing.domComplete - timing.domLoading),
        domContentLoad = (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart),
        loadEvent = (timing.loadEventEnd - timing.loadEventStart),
        start = timing.redirectStart == 0 ? timing.fetchStart : timing.redirectStart;
        totalPageLoadInseconds = ( timing.loadEventEnd - start )/1000;
        totalPageLoad = ( timing.loadEventEnd - start ),
        values = [
            (redirect / totalPageLoad), (unload / totalPageLoad), (dns / totalPageLoad), (connection / totalPageLoad), (reqresTime / totalPageLoad), (domLoad / totalPageLoad), (loadEvent / totalPageLoad),
        ],
        labels = [
            'Redirect : ' + redirect / 1000 + ' seconds',
            'Unload : ' + unload / 1000 + ' seconds',
            'DNS : ' + dns / 1000 + ' seconds',
            'Connection : ' + connection / 1000 + ' seconds',
            'Response : ' + reqresTime / 1000 + ' seconds',
            'DOM load : ' + domLoad / 1000 + ' seconds',
            'Load event : ' + loadEvent / 1000 + ' seconds'
        ],
        _getNavigationType = function _getNavigationType(type) {

            switch (type) {

                case 0:
                    return 'New';

                case 1:
                    return 'Reload';

                case 2:
                    return 'Back/Forward';

                case 255:
                    return 'Undefined';

            }
        };

    document.getElementById('page-load-time').innerHTML = totalPageLoadInseconds;

    if (totalPageLoadInseconds < 2.00) {
        document.getElementById('time-symbol').innerHTML = ' fast as a Lightning (Less than 2 seconds to load)';
    } else if (totalPageLoadInseconds >= 2.01 && totalPageLoadInseconds < 5.00) {
        document.getElementById('time-symbol').innerHTML = ' fast as a Horse (2 - 5 seconds to load)';
    } else if (totalPageLoadInseconds >= 5.01 && totalPageLoadInseconds < 8.00) {
        document.getElementById('time-symbol').innerHTML = ' slow as a Turtle (5 - 8 seconds to load)';
    } else if (totalPageLoadInseconds >= 8.01) {
        document.getElementById('time-symbol').innerHTML = ' slow as a Snail (More than 8 seconds to load)';
    }

    document.getElementById('redirect-header').innerHTML = redirect / 1000;
    document.getElementById('unload-header').innerHTML = unload / 1000;
    document.getElementById('dns-header').innerHTML = dns / 1000;
    document.getElementById('connection-header').innerHTML = connection / 1000;
    document.getElementById('request-header').innerHTML = reqresTime / 1000;
    document.getElementById('dom-content-load-header').innerHTML = domLoad / 1000;
    document.getElementById('load-event-header').innerHTML = loadEvent / 1000;
    // document.getElementById('type').innerHTML = _getNavigationType(navigation.type);
    // document.getElementById('redirect-count').innerHTML = navigation.redirectCount;

    Raphael('holder', 400, 400).pieChart(250, 250, 100, values, labels, '#f2f2f2');

});