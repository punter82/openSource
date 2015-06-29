Raphael.fn.pieChart = function(cx, cy, r, values, labels, stroke) {

    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(['M', cx, cy, 'L', x1, y1, 'A', r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, 'z']).attr(params);
    }
    var angle = 0,
        total = 0,
        process = function(j) {
            var value = values[j],
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

(function() {

    chrome.tabs.query({
        active: true
    }, function(tab) {
        console.log(chrome.downloads);
        chrome.downloads.search({},function(callback){
            console.log(callback);
        });
        chrome.storage.local.get('cache', function(data) {
            var tabId = tab[0].id,
                timing = data.cache['timing' + tabId],
                navigation = data.cache['navigation' + tabId],
                totalPageLoadInseconds = data.cache['pageLoadTime' + tabId],
                hostname = data.cache['hostname' + tabId],
                resources = data.cache['resources' + tabId],
                redirect = (timing.redirectEnd - timing.redirectStart),
                dns = (timing.domainLookupEnd - timing.domainLookupStart),
                unload = (timing.unloadEventEnd - timing.unloadEventStart),
                connection = (timing.connectEnd - timing.connectStart),
                reqresTime = (timing.responseStart - timing.requestStart),
                domLoad = (timing.domComplete - timing.domLoading),
                domContentLoad = (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart),
                loadEvent = (timing.loadEventEnd - timing.loadEventStart),
                totalPageLoad = totalPageLoadInseconds * 1000,
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
            document.getElementById('type').innerHTML = _getNavigationType(navigation.type);
            document.getElementById('redirect-count').innerHTML = navigation.redirectCount;

            Raphael('holder', 400, 400).pieChart(250, 250, 100, values, labels, '#f2f2f2');
            var ulJS = document.createElement('ul'),
                ulCSS = document.createElement('ul'),
                ulImg = document.createElement('ul'),
                internalJSCount = 0,
                externalJSCount = 0,
                internalCSSCount = 0,
                externalCSSCount = 0,
                internalImgCount = 0,
                externalImgCount = 0;
            resources.sort(function(a, b){return b.duration-a.duration});      
            for (k = 0; k < resources.length; k++) {
                var resource = resources[k],
                    resourceName = resource.name.substring(resource.name.lastIndexOf('/') + 1),
                    resourcePath = resource.name.replace(resourceName, ''),
                    li = document.createElement('li'),
                    titleCssLi = document.createElement('li'),
                    titleJSLi = document.createElement('li'),
                    titleImgLi = document.createElement('li'),
                    domain,
                    subDomain,
                    count;
                if (hostname.indexOf('/') !== -1) {
                    count = (hostname.substring(0, hostname.indexOf('/')).match(/\./g) || []).length;
                } else {
                    count = (hostname.match(/\./g) || []).length;
                }
                if (count > 1) {
                    subDomain = hostname.split('.')[hostname.split('.').length - 2] + '.' + hostname.split('.')[hostname.split('.').length - 1];
                }
                if (k === 0) {
                    titleCssLi.innerHTML = '<span class=" dobule-width table-cell">' + '<span class="name">Resource</span>' + '</span>' + '<span class="cssTime time table-cell name">' + 'Duration in ' + 'ms' + '</span> ' + '<span class="domain table-cell">' + 'Domain' + '</span>';
                    titleJSLi.innerHTML = '<span class=" dobule-width table-cell">' + '<span class="name">Resource</span>' + '</span>' + '<span class="jsTime time table-cell name">' + 'Duration in ' + 'ms' + '</span> ' + '<span class="domain table-cell">' + 'Domain' + '</span>';
                    titleImgLi.innerHTML = '<span class=" dobule-width table-cell">' + '<span class="name">Resource</span>' + '</span>' + '<span class="imgTime time table-cell name">' + 'Duration in ' + 'ms' + '</span> ' + '<span class="domain table-cell">' + 'Domain' + '</span>';
                    ulCSS.appendChild(titleCssLi);
                    ulJS.appendChild(titleJSLi);
                    ulImg.appendChild(titleImgLi);
                }
                if (resource.name.indexOf(hostname) !== -1) {
                    domain = 'Internal';
                    if (resource.initiatorType === 'link') {
                      internalCSSCount = internalCSSCount + 1;
                    }else if (resource.initiatorType === 'script') {
                      internalJSCount = internalJSCount + 1;
                    }else if (resource.initiatorType === 'img' || resource.initiatorType === 'css') {
                      internalImgCount = internalImgCount + 1;
                    }
                    resourcePath = resourcePath.substring(resourcePath.indexOf(hostname) + hostname.length);
                } else if (resource.name.indexOf(subDomain) !== -1) {
                    domain = 'Sub Domain';
                    if (resource.initiatorType === 'link') {
                      internalCSSCount = internalCSSCount + 1;
                    }else if (resource.initiatorType === 'script') {
                      internalJSCount = internalJSCount + 1;
                    }else if (resource.initiatorType === 'img' || resource.initiatorType === 'css') {
                      internalImgCount = internalImgCount + 1;
                    }
                } else {
                    domain = 'External';
                    if (resource.initiatorType === 'link') {
                      externalCSSCount = externalCSSCount + 1;
                    }else if (resource.initiatorType === 'script') {
                      externalJSCount = externalJSCount + 1;
                    }else if (resource.initiatorType === 'img' || resource.initiatorType === 'css') {
                      externalImgCount = externalImgCount + 1;
                    }
                }
                if (resource.initiatorType === 'link') {
                    li.innerHTML = '<span class="cssName table-cell dobule-width ">' + '<span class="name">' + resourceName + '</span>' + ' ( ' + resourcePath + ' ) ' + '</span> ';
                    li.innerHTML += '<span class="cssTime time table-cell">' + resource.duration.toFixed(1) + ' ms' + '</span> ';
                    li.innerHTML += '<span class="domain table-cell">' + domain + '</span> ';
                    ulCSS.appendChild(li);
                } else if (resource.initiatorType === 'script') {
                    li.innerHTML = '<span class="jsName table-cell dobule-width ">' + '<span class="name">' + resourceName + '</span>' + ' ( ' + resourcePath + ' ) ' + '</span> ';
                    li.innerHTML += '<span class="jsTime time table-cell">' + resource.duration.toFixed(1) + ' ms' + '</span> ';
                    li.innerHTML += '<span class="domain table-cell">' + domain + '</span> ';
                    ulJS.appendChild(li);
                } else if (resource.initiatorType === 'img' || resource.initiatorType === 'css') {
                    li.innerHTML = '<span class="imgName table-cell dobule-width ">' + '<span class="name">' + resourceName + '</span>' + ' ( ' + resourcePath + ' ) ' + '</span> ';
                    li.innerHTML += '<span class="imgTime time table-cell">' + resource.duration.toFixed(1) + ' ms' + '</span> ';
                    li.innerHTML += '<span class="domain table-cell">' + domain + '</span> ';
                    ulImg.appendChild(li);
                }

            }                  
            document.getElementById('js-info').appendChild(ulJS);
            document.getElementById('css-info').appendChild(ulCSS);
            document.getElementById('img-info').appendChild(ulImg);
      
            document.getElementById('externalJSCount').innerHTML = '[' + externalJSCount + ']';
            document.getElementById('externalCSSCount').innerHTML = '[' + externalCSSCount + ']';
            document.getElementById('externalImgCount').innerHTML = '[' + externalImgCount + ']';
      
            document.getElementById('internalJSCount').innerHTML = '[' + internalJSCount + ']';
            document.getElementById('internalCSSCount').innerHTML = '[' + internalCSSCount + ']';
            document.getElementById('internalImgCount').innerHTML = '[' + internalImgCount + ']';
           
            document.getElementById('jsCount').innerHTML = '[' + parseInt(externalJSCount+internalJSCount) + ']';
            document.getElementById('cssCount').innerHTML = '[' + parseInt(externalCSSCount+internalCSSCount) + ']';
            document.getElementById('imgCount').innerHTML = '[' + parseInt(externalImgCount+internalImgCount) + ']';
        });

        // get all the contents of the cuurent dom
        chrome.tabs.sendMessage(tab[0].id, {
                text: 'report_back'
            },
            function(domContent) {
                var tabDomContent = document.createElement('p'),
                    images, iframes, emptyImgSrcCount = 0,
                    emptyIframeCount = 0,
                    img = '',
                    iframe, y, z;
                tabDomContent.innerHTML = domContent;
                images = tabDomContent.getElementsByTagName('img')
                iframes = tabDomContent.getElementsByTagName('iframe');

                for (z = 0; z < images.length; z++) {
                    img = images[z];
                    if (img.getAttribute('src') === '' || img.getAttribute('src') === '#') {
                        emptyImgSrcCount++;
                    }
                }
                document.getElementById('empty-img-count').innerHTML = emptyImgSrcCount;
                document.getElementById('iframe-count').innerHTML = iframes.length;
                tabDomContent.innerHTML = '';
            }
        );
    });

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('a').addEventListener('click', function(event) {
            chrome.tabs.create({
                url: event.target.href
            });
        });
    });
})();