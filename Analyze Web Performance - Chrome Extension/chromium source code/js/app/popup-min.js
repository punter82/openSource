Raphael.fn.pieChart=function(a,b,c,d,e,f){function g(a,b,c,d,e,f){var g=a+c*Math.cos(-d*i),j=a+c*Math.cos(-e*i),k=b+c*Math.sin(-d*i),l=b+c*Math.sin(-e*i);return h.path(["M",a,b,"L",g,k,"A",c,c,0,+(e-d>180),0,j,l,"z"]).attr(f)}for(var h=this,i=Math.PI/180,j=this.set(),k=0,l=0,m=function(i){var m,n,o,p,q,r=d[i],s=360*r/l,t=500;m=s>180?0:s>135&&180>s?.025:s>90&&135>s?.05:s>45&&90>s?.075:s>15&&45>s?.1:.125,n=Raphael.hsb(m,.75,1),o=g(a,b,c,k,k+s,{fill:"90-"+n+"-"+n,stroke:f,"stroke-width":1}),o.node.id="pi"+i,p=h.text(250,120,e[i]).attr({fill:n,stroke:"none",opacity:0,"font-size":20}),p.node.id="txt"+i,q=document.getElementsByClassName("accordion")[0],o.mouseover(function(){o.stop().animate({transform:"s1.1 1.1 "+a+" "+b},t,"elastic"),p.stop().animate({opacity:1},t,"elastic"),q.className=q.className+" active",q.getElementsByTagName("li")[i].className=q.getElementsByTagName("li")[i].className+" active"}).mouseout(function(){var a;o.stop().animate({transform:""},t,"elastic"),p.stop().animate({opacity:0},0),a=q.className.substring(0,q.className.indexOf(" active")),q.className=a,a=q.getElementsByTagName("li")[i].className.substring(0,q.getElementsByTagName("li")[i].className.indexOf(" active")),q.getElementsByTagName("li")[i].className=a}),q.getElementsByTagName("li")[i].addEventListener("mouseover",function(){o.stop().animate({transform:"s1.1 1.1 "+a+" "+b},t,"elastic"),p.stop().animate({opacity:1},t,"elastic")}),q.getElementsByTagName("li")[i].addEventListener("mouseout",function(){o.stop().animate({transform:""},t,"elastic"),p.stop().animate({opacity:0},0)}),k+=s,j.push(o),j.push(p)},n=0,o=d.length;o>n;n++)l+=d[n];for(n=0;o>n;n++)m(n);return j},function(){chrome.tabs.query({active:!0},function(a){console.log(chrome.downloads),chrome.downloads.search({},function(a){console.log(a)}),chrome.storage.local.get("cache",function(b){var c=a[0].id,d=b.cache["timing"+c],e=b.cache["navigation"+c],f=b.cache["pageLoadTime"+c],g=b.cache["hostname"+c],h=b.cache["resources"+c],i=d.redirectEnd-d.redirectStart,j=d.domainLookupEnd-d.domainLookupStart,l=d.unloadEventEnd-d.unloadEventStart,m=d.connectEnd-d.connectStart,n=d.responseStart-d.requestStart,o=d.domComplete-d.domLoading,p=(d.domContentLoadedEventEnd-d.domContentLoadedEventStart,d.loadEventEnd-d.loadEventStart),q=1e3*f,r=[i/q,l/q,j/q,m/q,n/q,o/q,p/q],s=["Redirect : "+i/1e3+" seconds","Unload : "+l/1e3+" seconds","DNS : "+j/1e3+" seconds","Connection : "+m/1e3+" seconds","Response : "+n/1e3+" seconds","DOM load : "+o/1e3+" seconds","Load event : "+p/1e3+" seconds"],t=function(a){switch(a){case 0:return"New";case 1:return"Reload";case 2:return"Back/Forward";case 255:return"Undefined"}};document.getElementById("page-load-time").innerHTML=f,2>f?document.getElementById("time-symbol").innerHTML=" fast as a Lightning (Less than 2 seconds to load)":f>=2.01&&5>f?document.getElementById("time-symbol").innerHTML=" fast as a Horse (2 - 5 seconds to load)":f>=5.01&&8>f?document.getElementById("time-symbol").innerHTML=" slow as a Turtle (5 - 8 seconds to load)":f>=8.01&&(document.getElementById("time-symbol").innerHTML=" slow as a Snail (More than 8 seconds to load)"),document.getElementById("redirect-header").innerHTML=i/1e3,document.getElementById("unload-header").innerHTML=l/1e3,document.getElementById("dns-header").innerHTML=j/1e3,document.getElementById("connection-header").innerHTML=m/1e3,document.getElementById("request-header").innerHTML=n/1e3,document.getElementById("dom-content-load-header").innerHTML=o/1e3,document.getElementById("load-event-header").innerHTML=p/1e3,document.getElementById("type").innerHTML=t(e.type),document.getElementById("redirect-count").innerHTML=e.redirectCount,Raphael("holder",400,400).pieChart(250,250,100,r,s,"#f2f2f2");var u=document.createElement("ul"),v=document.createElement("ul"),w=document.createElement("ul"),x=0,y=0,z=0,A=0,B=0,C=0;for(h.sort(function(a,b){return b.duration-a.duration}),k=0;k<h.length;k++){var D,E,F,G=h[k],H=G.name.substring(G.name.lastIndexOf("/")+1),I=G.name.replace(H,""),J=document.createElement("li"),K=document.createElement("li"),L=document.createElement("li"),M=document.createElement("li");F=-1!==g.indexOf("/")?(g.substring(0,g.indexOf("/")).match(/\./g)||[]).length:(g.match(/\./g)||[]).length,F>1&&(E=g.split(".")[g.split(".").length-2]+"."+g.split(".")[g.split(".").length-1]),0===k&&(K.innerHTML='<span class=" dobule-width table-cell"><span class="name">Resource</span></span><span class="cssTime time table-cell name">Duration in ms</span> <span class="domain table-cell">Domain</span>',L.innerHTML='<span class=" dobule-width table-cell"><span class="name">Resource</span></span><span class="jsTime time table-cell name">Duration in ms</span> <span class="domain table-cell">Domain</span>',M.innerHTML='<span class=" dobule-width table-cell"><span class="name">Resource</span></span><span class="imgTime time table-cell name">Duration in ms</span> <span class="domain table-cell">Domain</span>',v.appendChild(K),u.appendChild(L),w.appendChild(M)),-1!==G.name.indexOf(g)?(D="Internal","link"===G.initiatorType?z+=1:"script"===G.initiatorType?x+=1:("img"===G.initiatorType||"css"===G.initiatorType)&&(B+=1),I=I.substring(I.indexOf(g)+g.length)):-1!==G.name.indexOf(E)?(D="Sub Domain","link"===G.initiatorType?z+=1:"script"===G.initiatorType?x+=1:("img"===G.initiatorType||"css"===G.initiatorType)&&(B+=1)):(D="External","link"===G.initiatorType?A+=1:"script"===G.initiatorType?y+=1:("img"===G.initiatorType||"css"===G.initiatorType)&&(C+=1)),"link"===G.initiatorType?(J.innerHTML='<span class="cssName table-cell dobule-width "><span class="name">'+H+"</span> ( "+I+" ) </span> ",J.innerHTML+='<span class="cssTime time table-cell">'+G.duration.toFixed(1)+" ms</span> ",J.innerHTML+='<span class="domain table-cell">'+D+"</span> ",v.appendChild(J)):"script"===G.initiatorType?(J.innerHTML='<span class="jsName table-cell dobule-width "><span class="name">'+H+"</span> ( "+I+" ) </span> ",J.innerHTML+='<span class="jsTime time table-cell">'+G.duration.toFixed(1)+" ms</span> ",J.innerHTML+='<span class="domain table-cell">'+D+"</span> ",u.appendChild(J)):("img"===G.initiatorType||"css"===G.initiatorType)&&(J.innerHTML='<span class="imgName table-cell dobule-width "><span class="name">'+H+"</span> ( "+I+" ) </span> ",J.innerHTML+='<span class="imgTime time table-cell">'+G.duration.toFixed(1)+" ms</span> ",J.innerHTML+='<span class="domain table-cell">'+D+"</span> ",w.appendChild(J))}document.getElementById("js-info").appendChild(u),document.getElementById("css-info").appendChild(v),document.getElementById("img-info").appendChild(w),document.getElementById("externalJSCount").innerHTML="["+y+"]",document.getElementById("externalCSSCount").innerHTML="["+A+"]",document.getElementById("externalImgCount").innerHTML="["+C+"]",document.getElementById("internalJSCount").innerHTML="["+x+"]",document.getElementById("internalCSSCount").innerHTML="["+z+"]",document.getElementById("internalImgCount").innerHTML="["+B+"]",document.getElementById("jsCount").innerHTML="["+parseInt(y+x)+"]",document.getElementById("cssCount").innerHTML="["+parseInt(A+z)+"]",document.getElementById("imgCount").innerHTML="["+parseInt(C+B)+"]"}),chrome.tabs.sendMessage(a[0].id,{text:"report_back"},function(a){var b,c,d,e=document.createElement("p"),f=0,g="";for(e.innerHTML=a,b=e.getElementsByTagName("img"),c=e.getElementsByTagName("iframe"),d=0;d<b.length;d++)g=b[d],(""===g.getAttribute("src")||"#"===g.getAttribute("src"))&&f++;document.getElementById("empty-img-count").innerHTML=f,document.getElementById("iframe-count").innerHTML=c.length,e.innerHTML=""})}),document.addEventListener("DOMContentLoaded",function(){document.querySelector("a").addEventListener("click",function(a){chrome.tabs.create({url:a.target.href})})})}();