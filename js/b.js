/*
** Copyright (C) 2011 Apple Inc.
** All rights reserved.
*/

 if(!window.its){window.its={}
}if(!its.files){its.files={}
}function _itsdlogHasClientLogger(a){return(window.its&&its.client&&its.client[a]&&(typeof(its.client[a])=="function"))
}function _itsdlogHasConsoleLogger(a){return(window.console&&console[a])
}function _itsdlogFunnel(b,c,a){if(!c){c="log"
}if(_itsdlogHasClientLogger(c)){return its.client[c](b,a)
}else{if(_itsdlogHasConsoleLogger(c)&&!a){return console[c](b)
}}}function itsdlog(a){return _itsdlogFunnel(a,"log")
}function itsdinfo(a){return _itsdlogFunnel(a,"info")
}function itsddebug(a){return _itsdlogFunnel(a,"debug")
}function itsdslog(a,b){return _itsdlogFunnel(a,b,true)
}function itsdalert(a){return alert(a)
}function bind(b,e){if(typeof e=="string"){e=b[e]
}var d=Array.prototype.slice,a=d.call(arguments,2);
return function c(){return e.apply(b,a.concat(d.call(arguments)))
}
}function bindAsEventListener(b,e){if(typeof e=="string"){e=b[e]
}var d=Array.prototype.slice,a=d.call(arguments,2);
return function c(f){return e.apply(b,[f].concat(a))
}
}function defer(a,c,b){if(!b){b=0
}setTimeout(bind(a,c),b)
}function defined(a){return typeof(window[a])!="undefined"
}function getGlobalConst(a){return defined(a)?window[a]:null
}function classNameForObject(a){if(a===null){return"null"
}var c=typeof(a);
if(c=="undefined"){return"undefined"
}if(c=="string"||a instanceof String){return"String"
}if(c=="number"||a instanceof Number){return"Number"
}if(a.constructor===Array){return"Array"
}if(c=="object"||c=="function"){if(a.klassName){return a.klassName
}var b=a.toString();
if(b=="[object Object]"){b=a.constructor.toString()
}if(b.indexOf("function ")===0){return b.replace("function ","").split("(")[0].toString()
}else{if(b.indexOf("[object ")===0){return b.replace("[object ","").replace("]","")
}else{if(b.indexOf("[object]")===0){return"object"
}}}}return"unknown"
}Class={create:function(a,b){return Class._create(a,b)
},createSubclass:function(a,c,b){return Class._create(a,b,c)
},_create:function(c,d,e){function a(){this.initialize.apply(this,arguments)
}if(e){var b=function(){};
b.prototype=e.prototype;
a.prototype=new b
}Class.extend(a.prototype,d);
if(!a.prototype.initialize){a.prototype.initialize=its.emptyFunction
}a.prototype.constructor=a;
a.klassName=c;
return a
},extend:function(c,b){for(var a in b){c[a]=b[a]
}}}; if(!window.its){window.its={}
}if(!window.its.client){window.its.client={}
}its.client.isRunning=defined("iTunes");
its.client.isTouchSupported=("createTouch" in document);
its.client.getPlistStringValueForKey=function(d,c){var a=d.getElementsByTagName("key");
for(var b=0;
a!=null&&b<a.length;
b++){if(a[b].textContent==c){if(a[b].nextElementSibling!=null&&a[b].nextElementSibling.nodeName=="string"){return a[b].nextElementSibling.textContent
}}}return null
};
its.client.isAuthDialog=function(a){return"authorization"==its.client.getPlistStringValueForKey(a,"kind")
};
its.client.isClientGreaterThanOrEqualToSpecifiedVersion=function(b){if(!its.client.isRunning){return true
}var a=its.client.version();
if(!a||!b){return"undefined"
}return its.string.compareNumerically(a,b)>=0
};
its.client.onscreenConsole=function itsClientOnscreenConsole(){if(window.ITSOnScreenConsole){return ITSOnScreenConsole.onScreenConsoleForObject("ITSClient")
}else{return null
}};
its.client._logFunnel=function _itsClientLogFunnel(c,d,b){if(!d){d="log"
}if((b||(its.x&&its.x.isIE&&its.x.isIE()))&&window.ITSOnScreenConsole){its.client.onscreenConsole().log(c,d)
}else{if(window.console){if(console[d]){return console[d](c)
}else{var a="Error: Attempt to log with unknown level: "+d+" with message: "+c;
if(console.error){console.error(a)
}else{if(console.log){console.log(a)
}}}}}};
its.client.log=function _itsClientLog(b,a){its.client._logFunnel(b,"log",a)
};
its.client.error=function _itsClientError(b,a){its.client._logFunnel(b,"error",a)
};
its.client.warn=function _itsClientWarn(b,a){its.client._logFunnel(b,"warn",a)
};
its.client.info=function _itsClientInfo(b,a){its.client._logFunnel(b,"info",a)
};
its.client.debug=function _itsClientDebug(c,b,a){if(a||its.dev){its.client._logFunnel(c,"debug",b)
}};
its.client.findChildElementNodeAtPosition=function(e,g){if(!e){return
}var a=e.childNodes.length;
if(g>=a){return
}var d=0;
for(var b=0;
b<a;
b++){var f=e.childNodes(b);
if(f.nodeType===Node.ELEMENT_NODE){if(d===g){return f
}else{d=d+1
}}}return null
};
its.client.findPositionChildElementNodeNamed=function(f,b){if(!f){return
}var a=f.childNodes.length;
if(a==0){return
}var e=0;
for(var d=0;
d<a;
d++){var g=f.childNodes(d);
if(g.nodeType===Node.ELEMENT_NODE){if(g.lastChild&&g.lastChild.textContent==b){return e
}else{e++
}}}return
}; if(!window.its){window.its={}
}if(!its.x){its.x={}
}if(!its.x.util){its.x.util={}
}if(!its.x.util.array){its.x.util.array={}
}its.x.uniqueGuid=1;
its.x.attachGuid=function itsXAttachGuid(a){if(!a.__guid){a.__guid=its.x.uniqueGuid++
}};
its.x.browserName=function itsXbrowserName(){if(its.x.isOpera()){return"opera"
}if(its.x.isKhtml()){return"khtml"
}if(its.x.isSafari()){return"safari"
}if(its.x.isChrome()){return"chrome"
}if(its.x.isWebKit()){return"webkit"
}if(its.x.isIE7()){return"ie7"
}if(its.x.isIE8()){return"ie8"
}if(its.x.isIE()){return"ie"
}if(its.x.isFirefox()){return"firefox"
}return"unknown"
};
its.x.initBrowserDetect=function itsXinitBrowserDetect(){if((typeof(its.x.initBrowserDetect.browser)==="undefined")||!(its.x.initBrowserDetect.browser)){var h=navigator;
var a=h.userAgent;
var f=h.appVersion;
var d=parseFloat(f);
var c={};
c.isOpera=(a.indexOf("Opera")>=0)?d:undefined;
c.isKhtml=(f.indexOf("Konqueror")>=0)?d:undefined;
c.isWebKit=parseFloat(a.split("WebKit/")[1])||undefined;
c.isChrome=parseFloat(a.split("Chrome/")[1])||undefined;
c.isFirefox=(/Firefox[\/\s](\d+\.\d+)/.test(a));
var b=Math.max(f.indexOf("WebKit"),f.indexOf("Safari"),0);
if(b&&!c.isChrome){c.isSafari=parseFloat(f.split("Version/")[1]);
if(!c.isSafari||parseFloat(f.substr(b+7))<=419.3){c.isSafari=2
}}if(document.all&&!c.isOpera){c.isIE=parseFloat(f.split("MSIE ")[1])||undefined;
var e=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
var g=-1;
if(e.exec(a)!=null){g=parseFloat(RegExp.$1)
}c.isIE7=(g>=7&&g<8);
c.isIE8=(g>=8&&g<9)
}its.x.initBrowserDetect.browser=c
}return its.x.initBrowserDetect.browser
};
its.x.isIE=function itsXisIE(){return its.x.initBrowserDetect().isIE
};
its.x.isIE7=function itsXisIE7(){return its.x.initBrowserDetect().isIE7
};
its.x.isIE8=function itsXisIE8(){return its.x.initBrowserDetect().isIE8
};
its.x.isOpera=function itsXisOpera(){return its.x.initBrowserDetect().isOpera
};
its.x.isKhtml=function itsXisKhtml(){return its.x.initBrowserDetect().isKhtml
};
its.x.isWebKit=function itsXisWebKit(){return its.x.initBrowserDetect().isWebKit
};
its.x.isChrome=function itsXisChrome(){return its.x.initBrowserDetect().isChrome
};
its.x.isSafari=function itsXisSafari(){return its.x.initBrowserDetect().isSafari
};
its.x.isFirefox=function itsXisFirefox(){return its.x.initBrowserDetect().isFirefox
};
if(!its.x.PLATFORMS){its.x.PLATFORMS={}
}its.x.PLATFORMS.Windows="Windows";
its.x.PLATFORMS.MacOS="MacOS";
its.x.PLATFORMS.Linux="Linux";
its.x.PLATFORMS.Unix="Unix";
its.x.__detectOS=function itsXdetectOS(){var a=undefined;
if(navigator.appVersion.indexOf("Win")!=-1){a=its.x.PLATFORMS.Windows
}else{if(navigator.appVersion.indexOf("Mac")!=-1){a=its.x.PLATFORMS.MacOS
}else{if(navigator.appVersion.indexOf("X11")!=-1){a=its.x.PLATFORMS.Unix
}else{if(navigator.appVersion.indexOf("Linux")!=-1){a=its.x.PLATFORMS.Linux
}}}}return a
};
its.x.isWindows=function itsXisWindows(){return its.x.__detectOS()==its.x.PLATFORMS.Windows
};
its.x.isMacOS=function itsXisMacOS(){return its.x.__detectOS()==its.x.PLATFORMS.MacOS
};
its.x.util.array.indexOf=function itsXUtilArrayIndexOf(d,b){var a=-1;
if(d.indexOf){a=d.indexOf(b)
}else{for(var c=0;
c<d.length&&a==-1;
c++){if(d[c]==b){a=c
}}}return a
};
its.x.util.array.shallowCopy=function itsXUtilArrayShallowCopy(a){return a.slice(0)
};
its.x.notifyOfDOMContentLoaded=function itsXnotifyOfDOMContentLoaded(a){var b=true;
if(its.x.isIE()){b=window.attachEvent("onload",a)
}else{document.addEventListener("DOMContentLoaded",a,false)
}return b
};
its.x.addEventListener=function itsXaddEventListener(b,a,c){if(b.addEventListener){b.addEventListener(a,c,false)
}else{if(b.attachEvent){b.attachEvent("on"+a,function(d){c.call(b,d)
})
}}};
function ITSEvent(a,b){this.eventName=a;
this.eventSource=b
}ITSEvent.prototype.preventDefault=function(){this._preventDefaultFlag=true
};
ITSEvent.prototype.shouldPreventDefault=function(){return this._preventDefaultFlag
};
its.x.extendWithEventDispatching=function itsXextendWithEventDispatching(a){if(!a.__eventToListenersMap){a.__eventToListenersMap={};
a.__additionalDispatchers=new Array();
Class.extend(a,its.x._ITSEventDispatcher)
}};
its.x._ITSEventDispatcher=function itsX_ITSEventDispatcher(){};
its.x._ITSEventDispatcher.itsAddEventListener=function itsX_ITSEventDispatcheritsAddEventListener(a,d){var b=false;
if(typeof(d)=="function"){var c=this.__eventToListenersMap[a];
if(!c){c=new Array();
this.__eventToListenersMap[a]=c
}if(its.x.util.array.indexOf(c,d)==-1){c.push(d);
b=true
}}return b
};
its.x._ITSEventDispatcher.itsRemoveEventListener=function itsX_ITSEventDispatcheritsRemoveEventListener(a,d){var c=this.__eventToListenersMap[a];
if(c){var b=its.x.util.array.indexOf(c,d);
if(b>=0){c.splice(b,1)
}}};
its.x._ITSEventDispatcher.itsHasEventListeners=function itsX_ITSEventDispatcheritsHasEventListeners(a){if(!a){throw (new Error("itsHasEventListeners called with null event"))
}var b=this.__eventToListenersMap[a.eventName];
return(b&&b.length)||(this.__additionalDispatchers&&this.__additionalDispatchers.length)
};
its.x._ITSEventDispatcher.itsDispatchEvent=function itsX_ITSEventDispatcheritsDispatchEvent(c){var d=this.__eventToListenersMap[c.eventName];
if(d){for(var a=0;
a<d.length;
a++){try{d[a].apply(this,arguments)
}catch(b){if(console&&console.error&&b.line&&b.sourceURL){console.error(b+"    See line "+b.line+" of "+b.sourceURL)
}}}}if(this.__additionalDispatchers.length>0){for(var a=0;
a<this.__additionalDispatchers.length;
a++){try{this.__additionalDispatchers[a].itsDispatchEvent(c)
}catch(b){if(console&&console.error&&b.line&&b.sourceURL){console.error(b+"    See line "+b.line+" of "+b.sourceURL)
}}}}};
its.x._ITSEventDispatcher.itsDelegateEvents=function itsX_ITSEventDispatcheritsDelegateEvents(a){its.x.extendWithEventDispatching(a);
this.__additionalDispatchers.push(a)
};
its.x.dynaLoadResourceFile=function itsDynaLoadResourceFile(c,h){var b=false;
if(its&&its.property&&its.property("DynaLoader.allowDynaLoading")){if(!its._dynaLoadedFiles){its._dynaLoadedFiles=[]
}if(c&&!its.contains(its._dynaLoadedFiles,c)){var i=null;
var g=null;
var j=null;
var i=document.getElementsByTagName("head");
if(i){g=i[0]
}if(g){j=g.firstChild
}if(j){its._dynaLoadedFiles.push(c);
var d=(its.contains(c,".js")||its.contains(c,".jsz"))?"js":"css";
var e=(d=="js")?"SCRIPT":"LINK";
var f=(d=="js")?"text/javascript":"text/css";
var k=document.createElement(e);
k.onload=k.onreadystatechange=h;
k.type=f;
if(d=="css"){k.rel="stylesheet";
k.href=c
}else{k.charset="utf-8";
k.src=c
}its.x.element.insertBeforeElement(j,k);
b=true
}else{if(window.console&&console.log){console.log("its.x.dynaLoadResourceFile: Waiting for DOM <head> section to be created before fetching resource: "+c);
window.setTimeout(function a(){its.x.dynaLoadResourceFile(c,h)
},200)
}}}else{if(c){b=true
}}}return b
}; if(!window.its){window.its={}
}if(!its.x){its.x={}
}if(!its.x.element){its.x.element={}
}its.x.element.logger=function itsXelementLogger(){if(its.x.element.loggerInstance){return its.x.element.loggerInstance
}else{if(window.ITSLogger){its.x.element.loggerInstance=new ITSLogger("ITSXBaseElement")
}}return its.x.element.loggerInstance
};
its.rootResourcesPathFromCssFilename=function itsRootResourcesPathFromCssFilename(d){var c=null;
for(var b=0;
!c&&(b<document.styleSheets.length);
b++){var e=document.styleSheets[b];
if(e.href){var a=e.href.indexOf("stylesheets/"+d);
if(a==-1){a=e.href.indexOf(d)
}if(a!=-1){c=e.href.substring(0,a)
}}}return c
};
its.imagesPath=function itsImagesPath(c){var b=null;
var a=its.rootResourcesPathFromCssFilename(c);
if(a){b=a+"images/"
}return b
};
its.x.uniquifyId=function itsXuniquifyId(b){var c=b;
var a=100;
do{c=b+"-"+a++
}while(document.getElementById(c));
return c
};
its.x.removeClassNames=function itsXremoveClassNames(b,c){for(var a=0;
a<b.length;
a++){its.x.element.removeClassName(b[a],c)
}};
its.x.element._printAll=function itsXPrivatePrintAll(){for(var e in its.x.element){var a=its.x.element[e];
var d=its.dev.parseFunctionArgsToArray(a);
var b=d.shift();
var c=d.join(", ");
console.log("Element.prototype."+e+"("+c+")")
}};
its.x.element.altTag=function itsXaltTag(a){return a.getAttribute("alt")
};
its.x.element.isOverflowing=function itsXisOverflowing(a){var b=its.x.element.getComputedStyleProperty(a,"overflow");
if(!b||b==="visible"){a.style.overflow="hidden"
}var c=a.clientWidth<a.scrollWidth||a.clientHeight<a.scrollHeight;
return c
};
its.x.element.isShowingEllipsis=function itsXisShowingEllipsis(a){var e=its.x.element.isOverflowing(a);
var d="ellipsis";
var c="532";
var b=its.webkitVersion();
if(its.webkitVersionCompare(b,c)>0){d=its.x.element.getComputedStyleProperty(a,"text-overflow")
}var f=(d=="ellipsis");
return e&&f
};
its.x.element.getAttributesStartingWith=function itsXgetAttributesStartingWith(d,a){var c=null;
for(var e=0;
e<d.attributes.length;
e++){var b=d.attributes.item(e).nodeName;
if(its.string.startsWith(b,a)){if(c==null){c=[]
}c.push(b)
}}return c
};
its.x.element.removeAttributes=function itsXremoveAttributes(a,c){if(c){for(var b=0;
b<c.length;
b++){a.removeAttribute(c[b])
}}};
its.x.element.removeAttributesStartingWith=function itsXremoveAttributesStartingWith(b,a){var c=its.x.element.getAttributesStartingWith(b,a);
its.x.element.removeAttributes(b,c)
};
its.x.element.getIntAttribute=function itsXgetIntAttribute(a,b){var c=a.getAttribute(b);
if(c!=null){c=its.string.toInt(c)
}return c
};
its.x.element.getBooleanAttribute=function itsXgetBooleanAttribute(a,b){var c=a.getAttribute(b);
if(c!=null){return"true"==c
}return false
};
its.x.element.getAttributeWithDefault=function itsXelementGetAttributeWithDefault(b,c,a){var d=b.getAttribute(c);
if(d===null||d===undefined){d=a
}return d
};
its.x.element.getAttributeValuesOfChildren=function itsXelementGetAttributeValuesOfChildren(b,d){var a=[];
for(var c=0;
c<b.children.length;
c++){var e=b.children[c].getAttribute(d);
if(e){a.push(e)
}}return a
};
its.x.element.hasClassName=function itsXhasClassName(a,b){return new RegExp("(?:^|\\s+)"+b+"(?:\\s+|$)").test(a.className)
};
its.x.element.hasClassNames=function itsXhasClassNames(a,c){for(var b=0;
b<c.length;
b++){if(!its.x.element.hasClassName(a,c[b])){return false
}}return true
};
its.x.element.addClassName=function itsXaddClassName(a,b){if(!its.isEmpty(its.string.trim(b))){if(!its.x.element.hasClassName(a,b)){if(a.className&&(a.className!="")){a.className=a.className+" "+b
}else{a.className=b
}}}};
its.x.element.classNameStartingWith=function itsXclassNameStartingWith(a,d){var c=its.x.element.classNamesStartingWith(a,d);
var b=c.length?c[0]:null;
return b
};
its.x.element.classNamesStartingWith=function itsXclassNamesStartingWith(a,e){var d=a.className.split(" ");
var c=[];
for(var b=0;
b<d.length;
b++){if(its.string.startsWith(d[b],e)){c.push(d[b])
}}return c
};
its.x.element.removeClassNamesStartingWith=function itsXremoveClassNamesStartingWith(a,d){var c=its.x.element.classNamesStartingWith(a,d);
if(c&&c.length){for(var b=0;
b<c.length;
b++){its.x.element.removeClassName(a,c[b])
}}};
its.x.element.removeClassName=function itsXremoveClassName(a,c){if(its.x.element.hasClassName(a,c)){var b=a.className;
a.className=its.string.trim(b.replace(new RegExp("(?:^|\\s+)"+c+"(?:\\s+|$)","g")," "))
}};
its.x.removeClassNames=function itsXremoveClassName(c,d,a){for(var b=0;
b<c.length;
b++){if(!a||(c[b]!=a)){its.x.element.removeClassName(c[b],d)
}}};
its.x.element.toggleClassName=function itsXtoggleClassName(a,b){its.x.element[its.x.element.hasClassName(a,b)?"removeClassName":"addClassName"](a,b)
};
its.x.element.replaceClassName=function itsXreplaceClassName(b,a,c){its.x.element.removeClassName(b,a);
its.x.element.addClassName(b,c)
};
its.x.element.getComputedStyleProperty=function itsXgetComputedStyleProperty(a,b){return getComputedStyle(a).getPropertyValue(b)
};
its.x.element.getPosition=function itsXgetPosition(c){var b=c;
var a=new Object();
a.left=a.top=0;
if(b.offsetParent){do{a.left+=b.offsetLeft;
a.top+=b.offsetTop
}while(b=b.offsetParent)
}b=c;
do{if(b===document.body){break
}a.left-=b.scrollLeft!=undefined?b.scrollLeft:0;
a.top-=b.scrollTop!=undefined?b.scrollTop:0
}while(b=b.parentNode);
a.right=a.left+c.offsetWidth;
a.bottom=a.top+c.offsetHeight;
return a
};
its.x.element.center=function itsXcenter(a,b){if(b=="fixed"){a.style.position="fixed"
}else{a.style.position="absolute"
}a.style.top="50%";
a.style.left="50%";
a.style.marginTop=0;
a.style.marginTop=-(its.x.element.offsetHeightPlusMargin(a)/2)+"px";
a.style.marginLeft=0;
a.style.marginLeft=-(its.x.element.offsetWidthPlusMargin(a)/2)+"px"
};
its.x.element.offsetWidthPlusMargin=function itsXoffsetWidthPlusMargin(a){return a.offsetWidth+its.x.element.marginWidth(a)
};
its.x.element.offsetWidthLessPadding=function itsXoffsetWidthLessPadding(a){return a.offsetWidth-its.x.element.paddingWidth(a)
};
its.x.element.usableContentWidth=function itsXusableContentWidth(a){return a.clientWidth-its.x.element.paddingWidth(a)
};
its.x.element.marginWidth=function itsXmarginWidth(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"margin-left"))+its.string.toInt(its.x.element.getComputedStyleProperty(a,"margin-right"))
};
its.x.element.paddingWidth=function itsXpaddingWidth(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"padding-left"))+its.string.toInt(its.x.element.getComputedStyleProperty(a,"padding-right"))
};
its.x.element.offsetHeightPlusMargin=function itsXoffsetHeightPlusMargin(a){return a.offsetHeight+its.x.element.marginHeight(a)
};
its.x.element.offsetHeightLessPadding=function itsXoffsetHeightLessPadding(a){return a.offsetHeight+its.x.element.paddingHeight(a)
};
its.x.element.marginHeight=function itsXmarginHeight(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"margin-top"))+its.string.toInt(its.x.element.getComputedStyleProperty(a,"margin-bottom"))
};
its.x.element.paddingHeight=function itsXpaddingHeight(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"padding-top"))+its.string.toInt(its.x.element.getComputedStyleProperty(a,"padding-bottom"))
};
its.x.element.lineCount=function itsXlineCount(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"height"))/its.string.toInt(its.x.element.getComputedStyleProperty(a,"line-height"))
};
its.x.element.webkitLineClamp=function itsXwebkitLineClamp(a){return its.string.toInt(its.x.element.getComputedStyleProperty(a,"-webkit-line-clamp"))
};
its.x.element.isMultiLineTruncated=function itsXisMultiLineTruncated(a){return its.x.element.webkitLineClamp(a)!=null&&a.clientHeight<a.scrollHeight
};
its.x.element.isMultiLineTruncatedK2=function itsXisMultiLineTruncatedK2(a){return its.x.element.webkitLineClamp(a)!=null&&a.clientHeight<a.scrollHeight
};
its.x.element.isVisible=function itsXisVisible(c,m){var d=c;
var f=true;
var j=null;
var h=null;
var a=null;
var g=null;
var e=its.x.element.logger();
var k=false;
var b=null;
while(f&&d){b=null;
j=getComputedStyle(d);
if(j){h=j.getPropertyValue("display");
a=j.getPropertyValue("visibility");
g=j.getPropertyValue("opacity");
if(h==="none"){b="display"
}else{if(a==="hidden"){b="visibility"
}else{if(g=="0"){b="opacity"
}}}if(b){f=false;
if(ITSLogger.level()==ITSLogger.DEBUG){var l=k?"ancestor.":"element.";
e.debug("isVisible: "+(l)+"notVisible due to "+b)
}}}d=m?d.parentNode:null;
if(d){k=true
}}return f
};
its.x.element.isOnscreen=function itsXisOnscreen(b){var a=its.x.element.isVisible(b);
var d=its.x.element.logger();
if(a){var c=false;
var l=b.getBoundingClientRect();
var h={top:l.top,bottom:l.bottom,left:l.left,right:l.right,width:l.width,height:l.height};
var f=b.parentNode;
var n=parseInt(b.getAttribute("width"),10);
var e=parseInt(b.getAttribute("height"),10);
if(n){h.width=n;
h.right=h.left+n
}if(e){h.height=e;
h.bottom=h.top+e
}while(a&&f&&!c&&its.x.element.isVisible(f)){var j=getComputedStyle(f);
if(j&&j.getPropertyValue("position")=="absolute"){c=true
}else{var m=f.getBoundingClientRect?f.getBoundingClientRect():null;
if(m){var k=!(its.geometry.doesRectIntersectRect(h,m));
if(k){if(f.style.overflow=="hidden"){a=false
}}if(!a){d.debug("isOnscreen: elementIsOnscreen = false due to child out of overflow:hidden ancestor")
}}f=f.parentNode
}}if(a){var g={top:0,bottom:window.innerHeight,left:0,right:window.innerWidth};
a=its.geometry.doesRectIntersectRect(h,g);
if(!a){d.debug("isOnscreen: elementIsOnscreen = false due to element being outside of window bounds")
}}}else{d.debug("isOnscreen: image.isVisible() = false")
}return a
};
its.x.element.rectString=function itsXrectString(b,c){var a=b.getBoundingClientRect();
if(!c){c=""
}else{c+=". "
}return c+b.tagName+" - left:"+a.left+", right:"+a.right+", top:"+a.top+", bottom:"+a.bottom
};
its.x.element.show=function itsXshow(b,c){b.style.display=c||"block";
var a=b;
setTimeout(function(){a.style.opacity="1"
},0)
};
its.x.element.hide=function itsXhide(b){var a=function(c){c.target.style.display="none";
c.target.removeEventListener("webkitTransitionEnd",a,false)
};
b.style.opacity="0";
if(its.x.element.getComputedStyleProperty(b,"-webkit-transition-duration")!=="0s"){b.addEventListener("webkitTransitionEnd",a,false)
}else{b.style.display="none"
}};
its.x.element.toggle=function itsXtoggle(a,b){var c=a.style.display=="none";
c?its.x.element.show(a,b):its.x.element.hide(a);
return c
};
its.x.element.moveChildToBottom=function itsXmoveChildToBottom(b,a){var c=b.children[a];
b.removeChild(c);
b.appendChild(c)
};
its.x.element.moveToBottom=function itsXmoveToBottom(a){var b=a.parentNode;
if(b){its.x.element.remove(a);
b.appendChild(a)
}};
its.x.element.insertBeforeElement=function itsXinsertBeforeElement(a,b){if(b&&a.parentNode){a.parentNode.insertBefore(b,a)
}};
its.x.element.insertAfter=function itsXinsertAfter(a,b){if(b&&a.parentNode){a.parentNode.insertBefore(b,a.nextSibling)
}};
its.x.element.remove=function itsXremove(a){if(a.parentNode){a.parentNode.removeChild(a)
}};
its.x.element.clear=function itsXclear(a){a.innerHTML=""
};
its.x.element.replace=function itsXreplace(a,b){if(a.parentNode){return a.parentNode.replaceChild(b,a)
}};
its.x.element.localSearch=function itsXlocalSearch(b,a){var d=b;
var c;
do{c=d.querySelectorAll(a);
d=d.parentNode
}while(d&&(d!=document)&&(c.length<1));
return c
};
its.x.element.elementOrAncestorByFunction=function itsXelementOrAncestorByFunction(a,b){while(a&&a!=document){if(b(a)){return a
}a=a.parentNode
}return null
};
its.x.element.parentByAttributeName=function itsXparentByAttributeName(b,a){return its.x.element.elementOrAncestorByFunction(b.parentNode,function(c){return c.hasAttribute(a)
})
};
its.x.element.parentByClassName=function itsXparentByClassName(a,b){return its.x.element.elementOrAncestorByFunction(a.parentNode,function(c){return its.x.element.hasClassName(c,b)
})
};
its.x.element.parentByTagName=function itsXparentByTagName(a,b){return its.x.element.elementOrAncestorByFunction(a.parentNode,function(c){return c.tagName.toLowerCase()===b.toLowerCase()
})
};
its.x.element.parentBySelector=function itsXparentBySelector(b,a){var d=document.querySelectorAll(a),c=d.length;
return its.x.element.elementOrAncestorByFunction(b,function(f){for(i=0;
i<c;
i++){if(d[i]===f){return true
}}return false
})
};
its.x.element.containsElement=function itsXcontainsElement(a,b){return its.x.element.elementOrAncestorByFunction(b,function(c){return c===a
})||false
};
its.x.element.itsInnerText=function itsXitsInnerText(a,b){var c=a.innerText;
if(its.isEmpty(c)&&(typeof(a.textContent)!="undefined")){c=a.textContent;
if(!b){c=its.string.trim(c)
}}return c
}; if(!window.its){window.its={}
}if(!its.x){its.x={}
}its.x.querySelectorAll=function itsXquerySelectorAll(a,b){return acme.query(b,a)
};
its.x.querySelector=function itsXquerySelector(a,c){var b=its.x.querySelectorAll(a,c);
return b&&(b.length>0)?b[0]:b
};
if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
dojo.require("dojo._base.lang")
}else{if(!this["acme"]&&!this["queryPortability"]){(function(){acme={trim:function(g){g=g.replace(/^\s+/,"");
for(var f=g.length-1;
f>=0;
f--){if(/\S/.test(g.charAt(f))){g=g.substring(0,f+1);
break
}}return g
},forEach:function(f,k,h){if(!f||!f.length){return
}for(var j=0,g=f.length;
j<g;
++j){k.call(h||window,f[j],j,f)
}},byId:function(g,f){if(typeof g=="string"){return(f||document).getElementById(g)
}else{return g
}},doc:document,NodeList:Array};
var e=navigator;
var a=e.userAgent;
var d=e.appVersion;
var c=parseFloat(d);
acme.isOpera=(a.indexOf("Opera")>=0)?c:undefined;
acme.isKhtml=(d.indexOf("Konqueror")>=0)?c:undefined;
acme.isWebKit=parseFloat(a.split("WebKit/")[1])||undefined;
acme.isChrome=parseFloat(a.split("Chrome/")[1])||undefined;
acme.isFirefox=(/Firefox[\/\s](\d+\.\d+)/.test(a));
var b=Math.max(d.indexOf("WebKit"),d.indexOf("Safari"),0);
if(b&&!acme.isChrome){acme.isSafari=parseFloat(d.split("Version/")[1]);
if(!acme.isSafari||parseFloat(d.substr(b+7))<=419.3){acme.isSafari=2
}}if(document.all&&!acme.isOpera){acme.isIE=parseFloat(d.split("MSIE ")[1])||undefined
}Array._wrap=function(f){return f
}
})()
}}(function(Z){var a=Z.trim;
var V=Z.forEach;
var N=Z._NodeListCtor=Z.NodeList;
var aa=function(){return Z.doc
};
var W=((Z.isWebKit||Z.isMozilla)&&((aa().compatMode)=="BackCompat"));
var K=!!aa().firstChild.children?"children":"childNodes";
var S=">~+";
var X=false;
var H=function(){return true
};
var m=function(ai){if(S.indexOf(ai.slice(-1))>=0){ai+=" * "
}else{ai+=" "
}var ac=function(aA,aB){return a(ai.slice(aA,aB))
};
var an=[];
var aj=-1,ag=-1,aq=-1,az=-1,d=-1,af=-1,ap=-1,av="",au="",ah;
var ao=0,ad=ai.length,ae=null,ay=null;
var am=function(){if(ap>=0){var aA=(ap==ao)?null:ac(ap,ao);
ae[(S.indexOf(aA)<0)?"tag":"oper"]=aA;
ap=-1
}};
var ax=function(){if(af>=0){ae.id=ac(af,ao).replace(/\\/g,"");
af=-1
}};
var al=function(){if(d>=0){ae.classes.push(ac(d+1,ao).replace(/\\/g,""));
d=-1
}};
var ar=function(){ax();
am();
al()
};
var at=function(){ar();
if(az>=0){ae.pseudos.push({name:ac(az+1,ao)})
}ae.loops=(ae.pseudos.length||ae.attrs.length||ae.classes.length);
ae.oquery=ae.query=ac(ah,ao);
ae.otag=ae.tag=(ae.oper)?null:(ae.tag||"*");
if(ae.tag){ae.tag=ae.tag.toUpperCase()
}if(an.length&&(an[an.length-1].oper)){ae.infixOper=an.pop();
ae.query=ae.infixOper.query+" "+ae.query
}an.push(ae);
ae=null
};
for(;
av=au,au=ai.charAt(ao),ao<ad;
ao++){if(av=="\\"){continue
}if(!ae){ah=ao;
ae={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return(X)?this.otag:this.tag
}};
ap=ao
}if(aj>=0){if(au=="]"){if(!ay.attr){ay.attr=ac(aj+1,ao)
}else{ay.matchFor=ac((aq||aj+1),ao)
}var aw=ay.matchFor;
if(aw){if((aw.charAt(0)=='"')||(aw.charAt(0)=="'")){ay.matchFor=aw.slice(1,-1)
}}ae.attrs.push(ay);
ay=null;
aj=aq=-1
}else{if(au=="="){var ak=("|~^$*".indexOf(av)>=0)?av:"";
ay.type=ak+au;
ay.attr=ac(aj+1,ao-ak.length);
aq=ao+1
}}}else{if(ag>=0){if(au==")"){if(az>=0){ay.value=ac(ag+1,ao)
}az=ag=-1
}}else{if(au=="#"){ar();
af=ao+1
}else{if(au=="."){ar();
d=ao
}else{if(au==":"){ar();
az=ao
}else{if(au=="["){ar();
aj=ao;
ay={}
}else{if(au=="("){if(az>=0){ay={name:ac(az+1,ao),value:null};
ae.pseudos.push(ay)
}ag=ao
}else{if((au==" ")&&(av!=au)){at()
}}}}}}}}}return an
};
var F=function(ac,d){if(!ac){return d
}if(!d){return ac
}return function(){return ac.apply(window,arguments)&&d.apply(window,arguments)
}
};
var k=function(ac,d){var ad=d||[];
if(ac){ad.push(ac)
}return ad
};
var Q=function(d){return(1==d.nodeType)
};
var r="";
var s=function(ac,d){if(!ac){return r
}if(d=="class"){return ac.className||r
}if(d=="for"){return ac.htmlFor||r
}if(d=="style"){return ac.style.cssText||r
}return(X?ac.getAttribute(d):ac.getAttribute(d,2))||r
};
var n={"*=":function(d,ac){return function(ad){return(s(ad,d).indexOf(ac)>=0)
}
},"^=":function(d,ac){return function(ad){return(s(ad,d).indexOf(ac)==0)
}
},"$=":function(d,ad){var ac=" "+ad;
return function(af){var ae=" "+s(af,d);
return(ae.lastIndexOf(ad)==(ae.length-ad.length))
}
},"~=":function(d,ad){var ac=" "+ad+" ";
return function(af){var ae=" "+s(af,d)+" ";
return(ae.indexOf(ac)>=0)
}
},"|=":function(d,ad){var ac=" "+ad+"-";
return function(af){var ae=" "+s(af,d);
return((ae==ad)||(ae.indexOf(ac)==0))
}
},"=":function(d,ac){return function(ad){return(s(ad,d)==ac)
}
}};
var f=(typeof aa().firstChild.nextElementSibling=="undefined");
var Y=!f?"nextElementSibling":"nextSibling";
var p=!f?"previousElementSibling":"previousSibling";
var e=(f?Q:H);
var l=function(d){while(d=d[p]){if(e(d)){return false
}}return true
};
var B=function(d){while(d=d[Y]){if(e(d)){return false
}}return true
};
var w=function(ag){var ad=ag.parentNode;
var af=0,ah=ad[K],ae=(ag._i||-1),ac=(ad._l||-1);
if(!ah){return -1
}var d=ah.length;
if(ac==d&&ae>=0&&ac>=0){return ae
}ad._l=d;
ae=-1;
for(var ai=ad.firstElementChild||ad.firstChild;
ai;
ai=ai[Y]){if(e(ai)){ai._i=++af;
if(ag===ai){ae=af
}}}return ae
};
var q=function(d){return !((w(d))%2)
};
var O=function(d){return((w(d))%2)
};
var ab={checked:function(d,ac){return function(ad){return !!("checked" in ad?ad.checked:ad.selected)
}
},"first-child":function(){return l
},"last-child":function(){return B
},"only-child":function(d,ac){return function(ad){if(!l(ad)){return false
}if(!B(ad)){return false
}return true
}
},empty:function(d,ac){return function(ag){var ah=ag.childNodes;
var ae=ag.childNodes.length;
for(var ad=ae-1;
ad>=0;
ad--){var af=ah[ad].nodeType;
if((af===1)||(af==3)){return false
}}return true
}
},contains:function(d,ad){var ac=ad.charAt(0);
if(ac=='"'||ac=="'"){ad=ad.slice(1,-1)
}return function(ae){return(ae.innerHTML.indexOf(ad)>=0)
}
},not:function(d,af){var ad=m(af)[0];
var ae={el:1};
if(ad.tag!="*"){ae.tag=1
}if(!ad.classes.length){ae.classes=1
}var ac=I(ad,ae);
return function(ag){return(!ac(ag))
}
},"nth-child":function(ac,af){var ah=parseInt;
if(af=="odd"){return O
}else{if(af=="even"){return q
}}if(af.indexOf("n")!=-1){var aj=af.split("n",2);
var ad=aj[0]?((aj[0]=="-")?-1:ah(aj[0])):1;
var ai=aj[1]?ah(aj[1]):0;
var ae=0,d=-1;
if(ad>0){if(ai<0){ai=(ai%ad)&&(ad+(ai%ad))
}else{if(ai>0){if(ai>=ad){ae=ai-ai%ad
}ai=ai%ad
}}}else{if(ad<0){ad*=-1;
if(ai>0){d=ai;
ai=ai%ad
}}}if(ad>0){return function(al){var ak=w(al);
return(ak>=ae)&&(d<0||ak<=d)&&((ak%ad)==ai)
}
}else{af=ai
}}var ag=ah(af);
return function(ak){return(w(ak)==ag)
}
}};
var U=(Z.isIE)?function(d){var ac=d.toLowerCase();
if(ac=="class"){d="className"
}return function(ad){return(X?ad.getAttribute(d):ad[d]||ad[ac])
}
}:function(d){return function(ac){return(ac&&ac.getAttribute&&ac.hasAttribute(d))
}
};
var I=function(ac,ad){if(!ac){return H
}ad=ad||{};
var d=null;
if(!("el" in ad)){d=F(d,Q)
}if(!("tag" in ad)){if(ac.tag!="*"){d=F(d,function(ae){return(ae&&(ae.tagName==ac.getTag()))
})
}}if(!("classes" in ad)){V(ac.classes,function(ag,af,ae){var ah=new RegExp("(?:^|\\s)"+ag+"(?:\\s|$)");
d=F(d,function(ai){return ah.test(ai.className)
});
d.count=af
})
}if(!("pseudos" in ad)){V(ac.pseudos,function(af){var ae=af.name;
if(ab[ae]){d=F(d,ab[ae](ae,af.value))
}})
}if(!("attrs" in ad)){V(ac.attrs,function(ae){var ag;
var af=ae.attr;
if(ae.type&&n[ae.type]){ag=n[ae.type](af,ae.matchFor)
}else{if(af.length){ag=U(af)
}}if(ag){d=F(d,ag)
}})
}if(!("id" in ad)){if(ac.id){d=F(d,function(ae){return(!!ae&&(ae.id==ac.id))
})
}}if(!d){if(!("default" in ad)){d=H
}}return d
};
var i=function(d){return function(ae,ac,ad){while(ae=ae[Y]){if(f&&(!Q(ae))){continue
}if((!ad||C(ae,ad))&&d(ae)){ac.push(ae)
}break
}return ac
}
};
var M=function(d){return function(ac,ad,ae){var af=ac[Y];
while(af){if(e(af)){if(ae&&!C(af,ae)){break
}if(d(af)){ad.push(af)
}}af=af[Y]
}return ad
}
};
var o=function(d){d=d||H;
return function(ad,ae,af){var ah,ac=0,ag=ad[K];
while(ah=ag[ac++]){if(e(ah)&&(!af||C(ah,af))&&(d(ah,ac))){ae.push(ah)
}}return ae
}
};
var E=function(ad,d){var ac=ad.parentNode;
while(ac){if(ac==d){break
}ac=ac.parentNode
}return !!ac
};
var u={};
var G=function(aj){var ae=u[aj.query];
if(ae){return ae
}var ah=aj.infixOper;
var ac=(ah?ah.oper:"");
var ag=I(aj,{el:1});
var ai=aj.tag;
var ad=("*"==ai);
var af=aa()["getElementsByClassName"];
if(!ac){if(aj.id){ag=(!aj.loops&&ad)?H:I(aj,{el:1,id:1});
ae=function(am,al){var an=Z.byId(aj.id,(am.ownerDocument||am));
if(!an||!ag(an)){return
}if(9==am.nodeType){return k(an,al)
}else{if(E(an,am)){return k(an,al)
}}}
}else{if(af&&/\{\s*\[native code\]\s*\}/.test(String(af))&&aj.classes.length&&!W){ag=I(aj,{el:1,classes:1,id:1});
var d=aj.classes.join(" ");
ae=function(an,am,ap){var ao=k(0,am),ar,al=0;
var aq=an.getElementsByClassName(d);
while((ar=aq[al++])){if(ag(ar,an)&&C(ar,ap)){ao.push(ar)
}}return ao
}
}else{if(!ad&&!aj.loops){ae=function(an,am,ap){var ao=k(0,am),ar,al=0;
var aq=an.getElementsByTagName(aj.getTag());
while((ar=aq[al++])){if(C(ar,ap)){ao.push(ar)
}}return ao
}
}else{ag=I(aj,{el:1,tag:1,id:1});
ae=function(an,am,ap){var ao=k(0,am),ar,al=0;
var aq=an.getElementsByTagName(aj.getTag());
while((ar=aq[al++])){if(ag(ar,an)&&C(ar,ap)){ao.push(ar)
}}return ao
}
}}}}else{var ak={el:1};
if(ad){ak.tag=1
}ag=I(aj,ak);
if("+"==ac){ae=i(ag)
}else{if("~"==ac){ae=M(ag)
}else{if(">"==ac){ae=o(ag)
}}}}return u[aj.query]=ae
};
var P=function(ah,am){var af=k(ah),ak,ai,ac,al=am.length,d,ag;
for(var ae=0;
ae<al;
ae++){ag=[];
ak=am[ae];
ai=af.length-1;
if(ai>0){d={};
ag.nozip=true
}var aj=G(ak);
for(var ad=0;
(ac=af[ad]);
ad++){aj(ac,ag,d)
}if(!ag.length){break
}af=ag
}return ag
};
var T={},h={};
var t=function(ac){var d=m(a(ac));
if(d.length==1){var ad=G(d[0]);
return function(ae){var af=ad(ae,new N());
if(af){af.nozip=true
}return af
}
}return function(ae){return P(ae,d)
}
};
var c=navigator.userAgent;
var b="WebKit/";
var z=(Z.isWebKit&&(c.indexOf(b)>0)&&(parseFloat(c.split(b)[1])>528));
var L=Z.isIE?"commentStrip":"nozip";
var v="querySelectorAll";
var j=(!!aa()[v]&&(!Z.isSafari||(Z.isSafari>3.1)||z));
var A=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var D=function(d,ae,ad,ac){return ad?(ae?ae+" ":"")+ad+(ac?" "+ac:""):d
};
var J=function(af,aj){af=af.replace(A,D);
if(j){var d=h[af];
if(d&&!aj){return d
}}var ah=T[af];
if(ah){return ah
}var ai=af.charAt(0);
var ae=(-1==af.indexOf(" "));
if((af.indexOf("#")>=0)&&(ae)){aj=true
}var ad=(j&&(!aj)&&(S.indexOf(ai)==-1)&&(!Z.isIE||(af.indexOf(":")==-1))&&(!(W&&(af.indexOf(".")>=0)))&&(af.indexOf(":contains")==-1)&&(af.indexOf(":checked")==-1)&&(af.indexOf("|=")==-1));
if(ad){var ag=(S.indexOf(af.charAt(af.length-1))>=0)?(af+" *"):af;
return h[af]=function(ak){try{if(!((9==ak.nodeType)||ae)){throw""
}var al=ak[v](ag);
al[L]=true;
return al
}catch(am){return J(af,true)(ak)
}}
}else{var ac=af.split(/\s*,\s*/);
return T[af]=((ac.length<2)?t(af):function(ak){var am=0,al=[],an;
while((an=ac[am++])){al=al.concat(t(an)(ak))
}return al
})
}};
var g=0;
var R=Z.isIE?function(d){if(X){return(d.getAttribute("_uid")||d.setAttribute("_uid",++g)||g)
}else{return d.uniqueID
}}:function(d){return(d._uid||(d._uid=++g))
};
var C=function(ac,d){if(!d){return 1
}var ad=R(ac);
if(!d[ad]){return d[ad]=1
}return 0
};
var y="_zipIdx";
var x=function(ac){if(ac&&ac.nozip){return(N._wrap)?N._wrap(ac):ac
}var ad=new N();
if(!ac||!ac.length){return ad
}if(ac[0]){ad.push(ac[0])
}if(ac.length<2){return ad
}g++;
if(Z.isIE&&X){var ae=g+"";
ac[0].setAttribute(y,ae);
for(var d=1,ag;
ag=ac[d];
d++){if(ac[d].getAttribute(y)!=ae){ad.push(ag)
}ag.setAttribute(y,ae)
}}else{if(Z.isIE&&ac.commentStrip){try{for(var d=1,ag;
ag=ac[d];
d++){if(Q(ag)){ad.push(ag)
}}}catch(af){}}else{if(ac[0]){ac[0][y]=g
}for(var d=1,ag;
ag=ac[d];
d++){if(ac[d][y]!=g){ad.push(ag)
}ag[y]=g
}}}return ad
};
Z.query=function(ae,ac){N=Z._NodeListCtor;
if(!ae){return new N()
}if(ae.constructor==N){return ae
}if(typeof ae!="string"){return new N(ae)
}if(typeof ac=="string"){ac=Z.byId(ac);
if(!ac){return new N()
}}ac=ac||aa();
var d=ac.ownerDocument||ac.documentElement;
X=(ac.contentType&&ac.contentType=="application/xml")||(Z.isOpera&&(ac.doctype||d.toString()=="[object XMLDocument]"))||(!!d)&&(Z.isIE?d.xml:(ac.xmlVersion||d.xmlVersion));
var ad=J(ae)(ac);
if(ad&&ad.nozip&&!N._wrap){return ad
}return x(ad)
};
Z.query.pseudos=ab;
Z._filterQueryResult=function(ac,ad){var af=new Z._NodeListCtor();
var ae=I(m(ad)[0]);
for(var d=0,ag;
ag=ac[d];
d++){if(ae(ag)){af.push(ag)
}}return af
}
})(this["queryPortability"]||this["acme"]||dojo); ITSSpriteAnimator.PLAYSTATE_STOPPED="stopped";
ITSSpriteAnimator.PLAYSTATE_PLAYING="playing";
ITSSpriteAnimator.PLAYSTATE_PAUSED="paused";
function ITSSpriteAnimator(b,d,a,f,e,c){this.anElement=b;
this.width=d;
this.frameCount=a;
this.totalMilliseconds=f;
this.loopInterval=e;
this.perFrameInterval=Math.round(this.loopInterval?this.loopInterval:(this.totalMilliseconds/this.frameCount));
this.currentFrameIndex=0;
this.ourTimer=null;
this.playState=ITSSpriteAnimator.PLAYSTATE_STOPPED;
this.animationName=c
}ITSSpriteAnimator.prototype.playState=function itsPlayState(){return this.playState
};
ITSSpriteAnimator.prototype.play=function itsSpriteAnimatorPlay(){if(this.playing!=ITSSpriteAnimator.PLAYSTATE_PLAYING){if(this.totalMilliseconds){this.playing=ITSSpriteAnimator.PLAYSTATE_PLAYING;
this.ourTimer=window.setInterval(bind(this,function a(){this.currentFrameIndex++;
if(this.currentFrameIndex>=this.frameCount){if(this.loopInterval){this.currentFrameIndex=0
}else{this.stop()
}}this.anElement.style.backgroundPosition="-"+this.currentFrameIndex*this.width+"px 0px"
}),this.perFrameInterval)
}}};
ITSSpriteAnimator.prototype.pause=function itsSpriteAnimatorPause(){this.playing=PLAYSTATE_PAUSED;
window.clearInterval(this.ourTimer)
};
ITSSpriteAnimator.prototype.stop=function itsSpriteAnimatorStop(){this.playing=ITSSpriteAnimator.PLAYSTATE_STOPPED;
window.clearInterval(this.ourTimer);
this.currentFrameIndex=0;
this.anElement.style.backgroundPosition="-"+this.currentFrameIndex*this.width+"px 0px"
}; if(!window.its){window.its={}
}if(!window.its.client){window.its.client={};
window.its.client.log=function(a){if(window.console&&console.log){console.log(a)
}}
}if(!window.ITSMetrics){window.ITSMetrics={}
}ITSMetrics.decodeMetricsPassThruParams=function(a){if(a==null){return null
}result=its.string.xmlUnescape(a);
var b=its.url.parseQueryParams(result);
its.client.log(b);
return b
};
ITSMetrics.encodeMetricsPassThruParams=function(e){if(e==null){return null
}var a="";
var b=0;
for(var c in e){var d=e[c];
if(b>0){a+="&"
}a+=c+="="+encodeURIComponent(d);
b++
}return its.string.xmlEscape(a)
};
ITSMetrics.omniturePageName=function(){return ITSMetrics.omniture&&ITSMetrics.omniture.pageName?ITSMetrics.omniture.pageName:null
};
ITSMetrics.processQueryParameterInfoInCurrentRequest=function(b){var i=its.url.queryParamsDict();
if(!its.isEmpty(i)){b.campaign=i.v0;
var a={};
var f=ITSMetrics.decodeMetricsPassThruParams(i["ign-mpt"]);
if(f){a=f
}var d=ITSMetrics.decodeMetricsPassThruParams(i["gc-mpt"]);
for(var h in d){if(d.hasOwnProperty(h)){a[h]=d[h]
}}for(var h in a){if(h.length>=1&&h.length<=3){var e=parseInt(h.substr(1));
if(!isNaN(e)){if(h[0]=="c"){b[("prop"+e)]=a[h]
}else{if(h[0]=="v"){b[("eVar"+e)]=a[h]
}}}}}var g=i["ign-msr"];
if(g){its.client.log("Found SEO Referrer: "+g);
var c=ITSMetrics._parseHostAndSearchTerm(g);
its.client.log("Referrer domain: "+c.hostname+", search term: "+c.searchTerm);
if(c.hostname&&c.hostname.indexOf("itunes.apple.com")){console.log("Setting seo referrer cookie: "+g);
its.cookies.set("seoReferrer",g,its.cookies.EXPIRE_ONE_DAY,null,"itunes.apple.com");
b.prop23=c.hostname;
b.eVar23=c.hostname;
b.prop24=c.searchTerm;
b.eVar24=c.searchTerm
}else{its.client.log("SEO Referrer's hostname is an SEO Page.  Ignoring")
}}}};
ITSMetrics.userAgentForMetrics=function(){var a=navigator.userAgent;
if(a.indexOf("\u5469")==0){a="iTunes Pre 9.2 (Windows Version Unknown)"
}return a
};
ITSMetrics._parseHostAndSearchTerm=function _parseHostAndSearchTerm(e){var d={};
var b=its.url.parseHostname(e);
var c=null;
var a=null;
if((b.indexOf("www.google.")>=0)||(b.indexOf(".ask.com")>=0)||(b=="www.bing.com")){c="q"
}else{if(b.indexOf(".yahoo.com")>=0){c="p"
}}if(c){a=its.url.queryParamValue(c,e);
if(a){d.searchTerm=a
}}d.hostname=b;
return d
}; if(!window.ITSMetrics){window.ITSMetrics={}
}ITSMetrics._shouldFakeUserAgentVersion=function _shouldFakeUserAgentVersion(){var a="MacAppStore/|CastleSettings/|iTunes Pre 9.";
var b=ITSMetrics.userAgentForMetrics();
var c=b&&b.match(a);
return c
};
ITSMetrics.createBaselineOmnitureObject=function(){var b="applesuperglobal";
var a=s_gi(b);
a.charSet="ISO-8859-1";
if(ITSMetrics.reportingSuite){a.hier5=ITSMetrics.reportingSuite
}a.trackDownloadLinks=false;
a.trackExternalLinks=false;
a.trackInlineStats=false;
a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls";
a.linkInternalFilters="javascript:,itunes,apple";
a.linkLeaveQueryString=false;
a.linkTrackVars="None";
a.linkTrackEvents="None";
a.usePlugins=true;
function c(d){if(ITSMetrics._shouldFakeUserAgentVersion()){d.apv=10
}if(!ITSMetrics.shouldTrackBrowserPlugins){d.plugins=""
}}a.doPlugins=c;
a.trackingServer="metrics.apple.com";
a.trackingServerSecure="securemetrics.apple.com";
a.dc="112";
a.pingImage=null;
return a
};
var s_code="",s_objectID;
function s_gi(h,j,y){var o="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s.an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(wd){var s=this,c=''+s_gi,a=c.indexOf(\"{\"),b=c.lastIndexOf(\"}\"),m;c=s_fe(a>0&&b>0?c.substring(a+1,b):0);if(wd&&wd.document&&c){wd.setTimeout('function s_sv(o,n,k){var v=o[k],i;if(v){if(typeof(v)==\"string\"||typeof(v)==\"number\")n[k]=v;else if (typeof(v)==\"array\"){n[k]=new Array;for(i=0;i<v.length;i++)s_sv(v,n[k],i)}else if (typeof(v)==\"object\"){n[k]=new Object;for(i in v)s_sv(v,n[k],i)}}}function s_si(t){var wd=window,s,i,j,c,a,b;wd.s_gi=new Function(\"un\",\"pg\",\"ss\",\"'+c+'\");wd.s=s_gi(\"'+s.oun+'\");s=wd.s;s.sa(\"'+s.un+'\");s.tfs=wd;s.pt(s.vl_g,\",\",\"vo1\",t);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3=\\'\\';if(t.m_l&&t.m_nl)for(i=0;i<t.m_nl.length;i++){n=t.m_nl[i];if(n){m=t[n];c=t[\"m_\"+n];if(m&&c){c=\"\"+c;if(c.indexOf(\"function\")>=0){a=c.indexOf(\"{\");b=c.lastIndexOf(\"}\");c=a>0&&b>0?c.substring(a+1,b):0;s[\"m_\"+n+\"_c\"]=c;if(m._e)s.loadModule(n);if(s[n])for(j=0;j<m._l.length;j++)s_sv(m,s[n],m._l[j])}}}}}var e,o,t;try{o=window.opener;if(o&&o.s_gi){t=o.s_gi(\"'+s.un+'\");if(t)s_si(t)}}catch(e){}',1)}};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedRequests=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.20.3/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if(t=='INPUT'&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1)):''};s.rq=function(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta='',q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}if((vo&&vo._t)||!s.m_m('d')){s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}ta=n?o.target:1;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",q=window,f=q.s_c_il,b=navigator,t=b.userAgent,r=b.appVersion,k=r.indexOf("MSIE "),d=t.indexOf("Netscape6/"),p,g,x;
if(h){h=h.toLowerCase();
if(f){for(g=0;
g<f.length;
g++){x=f[g];
if(!x._c||x._c=="s_c"){if(x.oun==h){return x
}else{if(x.fs&&x.sa&&x.fs(x.oun,h)){x.sa(h);
return x
}}}}}}q.s_an="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
q.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
q.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
q.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
q.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
q.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
q.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
q.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
o=s_d(o);
if(k>0){p=parseInt(g=r.substring(k+5));
if(p>3){p=parseFloat(g)
}}else{if(d>0){p=parseFloat(t.substring(d+10))
}else{p=parseFloat(r)
}}if(p>=5&&r.indexOf("Opera")<0&&t.indexOf("Opera")<0){q.s_c=new Function("un","pg","ss","var s=this;"+o);
return new s_c(h,j,y)
}else{x=new Function("un","pg","ss","var s=new Object;"+s_ft(o)+";return s")
}return x(h,j,y)
}; if(!window.ITSAkamaiMetrics){window.ITSAkamaiMetrics={}
}ITSAkamaiMetrics.HOSTNAME="metrics.itunes.apple.com.edgesuite.net";
ITSAkamaiMetrics.URL_PREFIX="http://"+ITSAkamaiMetrics.HOSTNAME;
ITSAkamaiMetrics.ping=function ping(b){var c=ITSAkamaiMetrics.URL_PREFIX+b;
var a=document.createElement("script");
a.setAttribute("src",c);
document.getElementsByTagName("body")[0].appendChild(a)
}; if(!window.its){window.its={}
}if(!its.useragent){its.useragent={}
}var DigitSplittingRegExp=/(\d+|\D+)/g;
var DigitMatchingRegexp=/\d/;
its.useragent.compareVersionStrings=function itsUserAgentCompareVersionStrings(g,f){if(!g){g=""
}if(!f){f=""
}var j=g.match(DigitSplittingRegExp);
var h=f.match(DigitSplittingRegExp);
var k=0;
var e=0;
do{var d=(j&&j[e])?1:0;
var c=(h&&h[e])?1:0;
if((d==0)||(c==0)){k=d-c;
break
}var b=j[e];
var a=h[e];
if(DigitMatchingRegexp.test(b.charAt(0))&&DigitMatchingRegexp.test(a.charAt(0))){k=parseInt(b)-parseInt(a)
}else{k=(b<a)?-1:((b>a)?1:0)
}e+=1
}while(k==0);
return k
};
its.useragent.versionMeetsMinRequirements=function itsUserAgentVersionMeetsMinRequirements(b,a){return its.useragent.compareVersionStrings(b,a)>=0
};
its.useragent.macOsVersion=function itsUserAgentMacOsVersion(b){if(!b){b=navigator.userAgent
}var a=b.match(/Mac OS X ([\d_\-\.]+)/);
return(a&&a.length>1)?a[1]:null
}; its.registerElementBinding=function itsRegisterElementBinding(d,a,b,e){var f=new _ITSBindingInfo(d,a,b,e);
var c=f.hashKey();
_itsControllersToBind[c]=f;
if(its._bindingPageLoaded){its._bindControllers()
}};

its.bindToElements=function _itsBindToElements(a,c,e,b){a.__boundElements=c;
var d=c.length;
for(var f=0;
f<d;
f++){var j=null;
var h=c[f];
if(b){j=a
}else{function g(i){this.__domElement=i;
i.__controller=this;
this.constructor=a;
this.prototype=a.constructor.prototype;
a.apply(this,arguments)
}g.prototype=a.prototype;
j=new g(h)
}if(a.bindToElement){a.bindToElement(j,h,e,b)
}else{if(!b&&j.bindToElement){j.bindToElement(j,h,e,b)
}else{its.bindToElement(j,h,e,b)
}}}};
its.bindToElement=function _itsBindToElement(d,c,b,e){for(var a in b){var f=function(){var g=b[a];
if(e){its.x.addEventListener(c,a,function(){d[g](this)
})
}else{its.x.addEventListener(c,a,bind(d,g))
}};
f()
}};
its._bindControllers=function _itsBindControllers(){its._bindingPageLoaded=true;
for(var a in _itsControllersToBind){var c=_itsControllersToBind[a];
var b=its.x.querySelectorAll(document,c.selector);
if(b&&b.length){if(c.perElementControllerClass.bindToElements){c.perElementControllerClass.bindToElements(c.perElementControllerClass,b,bindingDict,isStaticBinding)
}else{its.bindToElements(c.perElementControllerClass,b,c.bindingDict,c.isStaticBinding)
}}else{if(its.dev){its.client.debug("WARNING: registerElementBinding()/bindToElements("+classNameForObject(c.perElementControllerClass)+", "+c.selector+"). No objects found matching that selector.")
}}}_itsControllersToBind={}
};
function _ITSBindingInfo(c,a,b,d){this.perElementControllerClass=c;
this.selector=a;
this.bindingDict=b;
this.isStaticBinding=d
}_ITSBindingInfo.prototype.hashKey=function _itsBindingInfoHashKey(){return classNameForObject(this.perElementControllerClass)+"_"+this.selector
};
var _itsControllersToBind={};
its.x.notifyOfDOMContentLoaded(its._bindControllers); if(!window.ITSMediaPlayer){window.ITSMediaPlayer={}
}if(!ITSMediaPlayer.events){ITSMediaPlayer.events={}
}its.x.extendWithEventDispatching(ITSMediaPlayer);
ITSMediaPlayer.events.PLAYBACK_STARTED="playbackStarted";
ITSMediaPlayer.events.PLAYBACK_PAUSED="playbackPaused";
ITSMediaPlayer.events.PLAYBACK_ENDED="playbackEnded";
ITSMediaPlayer.events.CAN_PLAY="canPlay";
ITSMediaPlayer._QUICK_TIME_PLAYER="quick-time";
ITSMediaPlayer._HTML5_AUDIO_PLAYER="html5-audio";
ITSMediaPlayer._ID="media-player";
ITSMediaPlayer._QUICK_TIME_VERSION_SUPPORTING_DOM_EVENTS=721;
ITSMediaPlayer._MIN_QUICK_TIME_VERSION_WIN_SETURL_BROKEN=766;
ITSMediaPlayer._MAX_QUICK_TIME_VERSION_WIN_SETURL_BROKEN=768;
ITSMediaPlayer._DEBUG=false;
ITSMediaPlayer._mediaPlayer="undefined";
ITSMediaPlayer._mediaPlayerTypeToUse="undefined";
ITSMediaPlayer._timers=new Array();
ITSMediaPlayer._qtVersion="undefined";
if(its.x.isWindows()&&its.x.isFirefox()){ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds=500
}else{ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds=1000
}ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds=50;
ITSMediaPlayer._clearTimers=function _clearTimers(){if(ITSMediaPlayer._timers){if(ITSMediaPlayer._DEBUG){console.log("clearing timers")
}for(var a=0;
a<ITSMediaPlayer._timers.length;
a++){clearTimeout(ITSMediaPlayer._timers[a])
}ITSMediaPlayer._timers=new Array()
}};
ITSMediaPlayer.shouldRecreateMediaPlayerToPlay=function shouldRecreateMediaPlayerToPlay(){if(ITSMediaPlayer.isQuickTimeBeingUsed()&&ITSMediaPlayer._quickTimeVersion()&&its.x.isWindows()&&(ITSMediaPlayer._quickTimeVersion()>=ITSMediaPlayer._MIN_QUICK_TIME_VERSION_WIN_SETURL_BROKEN&&ITSMediaPlayer._quickTimeVersion()<=ITSMediaPlayer._MAX_QUICK_TIME_VERSION_WIN_SETURL_BROKEN)){return true
}return false
};
ITSMediaPlayer.stop=function stop(){if(ITSMediaPlayer._played){ITSMediaPlayer._stopPlayTime=new Date().getTime();
ITSMediaPlayer._clearTimers();
var a=ITSMediaPlayer._mediaPlayer;
if(a){if(ITSMediaPlayer.isQuickTimeBeingUsed()){a.Stop()
}else{if(ITSMediaPlayer.isHtml5AudioTagBeingUsed()){ITSMediaPlayer._pausePlayTime=new Date().getTime();
a.pause();
a.src=""
}}}}};
ITSMediaPlayer._tryToPlay=function tryToPlay(){var a=ITSMediaPlayer._mediaPlayer;
var b=its.x.isWindows()&&its.x.isFirefox();
if((b&&(a._qtInitializationElapsedPollingMilliSeconds>=ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds))||(!b&&a.GetPluginStatus()=="Complete")){ITSMediaPlayer._internalCanPlayCallback();
ITSMediaPlayer._timers.push(window.setTimeout(ITSMediaPlayer._internalPlaybackEndedCallback,ITSMediaPlayer.durationInSeconds()*1000));
ITSMediaPlayer.reallyPlay()
}else{if(!a._qtInitializationElapsedPollingMilliSeconds){a._qtInitializationElapsedPollingMilliSeconds=0
}a._qtInitializationElapsedPollingMilliSeconds+=ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds;
if(a._qtInitializationElapsedPollingMilliSeconds<=ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds){ITSMediaPlayer._timers.push(window.setTimeout(ITSMediaPlayer._tryToPlay,ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds))
}}};
ITSMediaPlayer.play=function play(a){ITSMediaPlayer._played=true;
ITSMediaPlayer._clearTimers();
if(ITSMediaPlayer.shouldRecreateMediaPlayerToPlay()){ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl(a,false);
ITSMediaPlayer._tryToPlay()
}else{ITSMediaPlayer.reallyPlay(a)
}};
ITSMediaPlayer.reallyPlay=function reallyPlay(b){var f=ITSMediaPlayer._mediaPlayer;
if(f){ITSMediaPlayer._registerCallbacks();
if(ITSMediaPlayer.isQuickTimeBeingUsed()){if(b&&!ITSMediaPlayer.shouldRecreateMediaPlayerToPlay()){f.SetURL(b)
}var a=f.GetVolume();
f.SetVolume(0);
ITSMediaPlayer._startPlayTime=new Date().getTime();
f.Play();
if(a){if(ITSMediaPlayer._DEBUG){console.log(f.GetVolume())
}ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeInForQTPlayer(f,a,10)
},0))
}var e=f.GetDuration();
var d=f.GetTimeScale();
if(ITSMediaPlayer._DEBUG){console.log("duration: "+e);
console.log("timeScale: "+d)
}if(e&&d){var c=(((e/d)*1000)-4000);
if(c>0){if(ITSMediaPlayer._DEBUG){console.log(" fadeStart: "+c)
}ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForQTPlayer(f,10)
},c))
}}}else{if(ITSMediaPlayer.isHtml5AudioTagBeingUsed()){f.src=b;
its.x.addEventListener(f,"loadedmetadata",ITSMediaPlayer._startFadeOutForHTML5AudioPlayer);
ITSMediaPlayer._startLoadTimeHtml5=new Date().getTime();
f.load();
f.volume=0.1;
ITSMediaPlayer._startPlayTime=new Date().getTime();
f.play();
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeInForHTML5AudioPlayer(f,1,0.01)
},0))
}}}};
ITSMediaPlayer.durationInSeconds=function itsMediaPlayerDurationInSeconds(){var b=ITSMediaPlayer._mediaPlayer;
var a=0;
if(ITSMediaPlayer.isQuickTimeBeingUsed()){a=b.GetDuration()/b.GetTimeScale();
if(ITSMediaPlayer._DEBUG){its.client.debug("its-media-player: ITSMediaPlayer.QUICKTIME.durationInSeconds: "+Math.floor(Math.ceil(a)/60)+":"+((Math.round(Math.ceil(a)%60)<10)?"0"+Math.round(Math.ceil(a)%60):Math.round(Math.ceil(a)%60))+"sec")
}}else{if(ITSMediaPlayer.isHtml5AudioTagBeingUsed()){a=b.duration;
if(ITSMediaPlayer._DEBUG){its.client.debug("its-media-player: ITSMediaPlayer.HTML5.durationInSeconds: "+Math.floor(Math.ceil(a)/60)+":"+((Math.round(Math.ceil(a)%60)<10)?"0"+Math.round(Math.ceil(a)%60):Math.round(Math.ceil(a)%60))+"sec")
}}}return Math.ceil(a)
};
ITSMediaPlayer._startFadeOutForHTML5AudioPlayer=function _startFadeOutForHTML5AudioPlayer(a){var d=a.target;
var c=d.duration;
if(c){var b=((c*1000)-4000);
if(b>0){ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(d,0.1)
},b))
}}};
ITSMediaPlayer._setFadeInForHTML5AudioPlayer=function _setFadeInForHTML5AudioPlayer(d,a,c){var b=d.volume;
if((b+c)<a){d.volume=(b+c);
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeInForHTML5AudioPlayer(d,a,c)
},100))
}else{d.volume=a
}};
ITSMediaPlayer._setFadeOutForHTML5AudioPlayer=function _setFadeOutForHTML5AudioPlayer(c,b){var a=c.volume;
if(a){if((a-b)>b){c.volume=(a-b);
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(c,b)
},100))
}else{if(a>0.01){c.volume=a-0.01;
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(c,0.01)
},500))
}else{c.volume=0
}}}};
ITSMediaPlayer._setFadeInForQTPlayer=function _setFadeInForQTPlayer(d,a,c){var b=d.GetVolume();
if((b+c)<a){d.SetVolume(b+c);
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeInForQTPlayer(d,a,c)
},100))
}else{d.SetVolume(a)
}};
ITSMediaPlayer._setFadeOutForQTPlayer=function _setFadeOutForQTPlayer(c,b){var a=c.GetVolume();
if(a){if((a-b)>b){c.SetVolume(a-b);
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForQTPlayer(c,b)
},100))
}else{if(a>1){c.SetVolume(a-1);
ITSMediaPlayer._timers.push(setTimeout(function(){ITSMediaPlayer._setFadeOutForQTPlayer(c,1)
},500))
}else{c.SetVolume(0)
}}}};
ITSMediaPlayer._internalPlaybackStartedCallback=function _itsMediaPlayerInternalPlaybackStartedCallback(){if(ITSMediaPlayer.isHtml5AudioTagBeingUsed()){if(ITSMediaPlayer._DEBUG){console.log(new Date().getTime()-ITSMediaPlayer._startLoadTimeHtml5+"ms Elapsed time between internal Html5load request and playbackStarted callback")
}}if(ITSMediaPlayer._DEBUG){console.log(new Date().getTime()-ITSMediaPlayer._startPlayTime+"ms Elapsed time between client play request and playbackStarted callback")
}ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_STARTED,ITSMediaPlayer))
};
ITSMediaPlayer._internalCanPlayCallback=function _itsMediaPlayerInternalCanPlayCallback(){ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.CAN_PLAY,ITSMediaPlayer))
};
ITSMediaPlayer._internalPlaybackPausedCallback=function _itsMediaPlayerInternalPausedStartedCallback(){if(ITSMediaPlayer._DEBUG){console.log(new Date().getTime()-ITSMediaPlayer._pausePlayTime+"ms Elapsed time between client pause request and playbackPaused callback")
}ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_PAUSED,ITSMediaPlayer))
};
ITSMediaPlayer._internalPlaybackEndedCallback=function _itsMediaPlayerInternalPlaybackEndedCallback(){if(ITSMediaPlayer._DEBUG){console.log(new Date().getTime()-ITSMediaPlayer._stopPlayTime+"ms Elapsed time between client stop request and playbackEnded callback")
}ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_ENDED,ITSMediaPlayer))
};
ITSMediaPlayer._registerCallbacks=function _registerCallbacks(){var a=ITSMediaPlayer._mediaPlayer;
if(ITSMediaPlayer.isQuickTimeBeingUsed()){its.x.addEventListener(a,"qt_play",ITSMediaPlayer._internalPlaybackStartedCallback);
its.x.addEventListener(a,"qt_canplay",ITSMediaPlayer._internalCanPlayCallback);
its.x.addEventListener(a,"qt_pause",ITSMediaPlayer._internalPlaybackPausedCallback);
its.x.addEventListener(a,"qt_ended",ITSMediaPlayer._internalPlaybackEndedCallback)
}else{if(ITSMediaPlayer.isHtml5AudioTagBeingUsed()){its.x.addEventListener(a,"play",ITSMediaPlayer._internalPlaybackStartedCallback);
its.x.addEventListener(a,"canplay",ITSMediaPlayer._internalCanPlayCallback);
its.x.addEventListener(a,"pause",ITSMediaPlayer._internalPlaybackPausedCallback);
its.x.addEventListener(a,"ended",ITSMediaPlayer._internalPlaybackEndedCallback)
}}};
ITSMediaPlayer.insertMediaPlayer=function insertMediaPlayer(){ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl(null,false)
};
ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl=function insertMediaPlayerWithSpecifiedUrl(e,b){var d=false;
var c=document.getElementById("media-player-container");
if(!c){c=document.createElement("div");
c.id="media-player-container"
}else{d=true
}var a="";
if(ITSMediaPlayer._isHTML5AudioTagSupported()){ITSMediaPlayer._mediaPlayerTypeToUse=ITSMediaPlayer._HTML5_AUDIO_PLAYER;
a='<audio id="'+ITSMediaPlayer._ID+'" ';
if(e){a=a+'src="'+e+'" '
}else{a=a+'src="" '
}a=a+'hidden="true" ';
if(b){a=a+'autoplay = "true"'
}else{a=a+'autoplay = "false"'
}a=a+"></audio>";
c.innerHTML=a;
document.body.appendChild(c)
}else{if(ITSMediaPlayer._isQuickTimeSupported()){ITSMediaPlayer._mediaPlayerTypeToUse=ITSMediaPlayer._QUICK_TIME_PLAYER;
if(its.x.isIE()){a=a+'<object id="qt_event_source" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598"></object>';
a=a+'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"';
a=a+'codebase="http://www.apple.com/qtactivex/qtplugin.cab"';
a=a+'width="1" height="1" id="'+ITSMediaPlayer._ID+'" style="behavior:url(#qt_event_source);">';
if(e){a=a+'<param name="src" value="'+e+'"/>'
}else{a=a+'<param name="src" value=""/>'
}a=a+'<param name="controller" value="false" />';
if(b){a=a+'<param name="autoplay" value="true" />'
}else{a=a+'<param name="autoplay" value="false" />'
}a=a+'<param name="hide" value="true" />';
a=a+'<param name="EnableJavaScript" value="true" />';
a=a+'<param name="postdomevents" value="true"/>';
a=a+"</object>"
}else{a=a+'<object type="video/quicktime"';
if(e){a=a+'data="'+e+'"'
}else{a=a+'data=""'
}a=a+'width="1" height="1" id="'+ITSMediaPlayer._ID+'" style="behavior:url(#qt_event_source);">';
if(b){a=a+'<param name="autoplay" value="true" />'
}else{a=a+'<param name="autoplay" value="false" />'
}a=a+'<param name="controller" value="false" />';
a=a+'<param name="hide" value="true" />';
a=a+'<param name="EnableJavaScript" value="true" />';
a=a+'<param name="postdomevents" value="true"/>';
a=a+"</object>"
}c.innerHTML=a;
if(d===false){document.body.appendChild(c)
}}else{ITSMediaPlayer._mediaPlayerTypeToUse="undefined"
}}if(!ITSMediaPlayer._count){ITSMediaPlayer._count=0
}ITSMediaPlayer._mediaPlayer=document.getElementById(ITSMediaPlayer._ID)
};
ITSMediaPlayer.isQuickTimeBeingUsed=function isQuickTimeBeingUsed(){return ITSMediaPlayer._mediaPlayerTypeToUse===ITSMediaPlayer._QUICK_TIME_PLAYER
};
ITSMediaPlayer.isHtml5AudioTagBeingUsed=function isHtml5AudioTagBeingUsed(){return ITSMediaPlayer._mediaPlayerTypeToUse===ITSMediaPlayer._HTML5_AUDIO_PLAYER
};
ITSMediaPlayer.isAudioPreviewSupported=function isAudioPreviewSupported(){var a=ITSMediaPlayer._mediaPlayer;
return(a&&(ITSMediaPlayer._mediaPlayerTypeToUse!="undefined"))
};
ITSMediaPlayer._isQuickTimeSupported=function _isQuickTimeSupported(){return ITSMediaPlayer._canDetectPlugins()&&ITSMediaPlayer._detectQuickTime()
};
ITSMediaPlayer._isHTML5AudioTagSupported=function _isHTML5AudioTagSupported(){return false
};
ITSMediaPlayer.doesMediaPlayerSupportCallbacks=function doesMediaPlayerSupportCallbacks(){return ITSMediaPlayer.isHtml5AudioTagBeingUsed()||(ITSMediaPlayer._quickTimeVersion()&&ITSMediaPlayer._quickTimeVersion()>=ITSMediaPlayer._QUICK_TIME_VERSION_SUPPORTING_DOM_EVENTS)
};
ITSMediaPlayer._quickTimeVersion=function _quickTimeVersion(){if(ITSMediaPlayer._qtVersion==="undefined"){var g=new RegExp("([0-9]).([0-9]).([0-9])");
if(navigator.plugins&&navigator.plugins.length){for(var c=0;
c<navigator.plugins.length&&ITSMediaPlayer._qtVersion==="undefined";
c++){var b=navigator.plugins[c].name.match(/quicktime\D*([\.\d]*)/i);
if(b&&b[1]){var a=b[1];
if(a){a=g.exec(a);
var f=0,e=0,d=0;
if(RegExp.$1){f=parseInt(RegExp.$1)
}if(RegExp.$2){e=parseInt(RegExp.$2)
}if(RegExp.$3){d=parseInt(RegExp.$3)
}ITSMediaPlayer._qtVersion=(f*100)+(e*10)+d
}}}}else{if(typeof(execScript)!="undefined"){ieQTVersion=null;
execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion',"VBScript");
if(ieQTVersion){ITSMediaPlayer._qtVersion=(ieQTVersion>>16).toString(16)
}}}}return ITSMediaPlayer._qtVersion
};
ITSMediaPlayer.detectableWithVB=false;
ITSMediaPlayer._goURL=function _goURL(a){if(javascriptVersion1_1){window.location.replace(a)
}else{window.location=a
}return
};
ITSMediaPlayer._redirectCheck=function _redirectCheck(a,c,b){if(c&&((a&&b)||(!a&&!b))){ITSMediaPlayer._goURL(c);
return a
}else{return a
}};
ITSMediaPlayer._canDetectPlugins=function _canDetectPlugins(){if(ITSMediaPlayer.detectableWithVB||(navigator.plugins&&navigator.plugins.length>0)){return true
}else{return false
}};
ITSMediaPlayer._detectQuickTime=function _detectQuickTime(c,b){var a=ITSMediaPlayer._detectPlugin("QuickTime");
if(!a&&ITSMediaPlayer.detectableWithVB){a=detectQuickTimeActiveXControl()
}return ITSMediaPlayer._redirectCheck(a,c,b)
};
ITSMediaPlayer._detectPlugin=function _detectPlugin(){var c=ITSMediaPlayer._detectPlugin.arguments;
var b=false;
if(navigator.plugins&&navigator.plugins.length>0){var a=navigator.plugins.length;
for(pluginsArrayCounter=0;
pluginsArrayCounter<a;
pluginsArrayCounter++){var d=0;
for(namesCounter=0;
namesCounter<c.length;
namesCounter++){if((navigator.plugins[pluginsArrayCounter].name.indexOf(c[namesCounter])>=0)||(navigator.plugins[pluginsArrayCounter].description.indexOf(c[namesCounter])>=0)){d++
}}if(d==c.length){b=true;
break
}}}return b
};
ITSMediaPlayer.quicktimeVersionStringForReporting=function reportQuicktimePluginVersion(){var a=(ITSMediaPlayer._canDetectPlugins())?ITSMediaPlayer._quickTimeVersion():"unknown";
if("undefined"===a){a="not_installed"
}a="QT:"+a;
return a
};
if((navigator.userAgent.indexOf("MSIE")!=-1)&&(navigator.userAgent.indexOf("Win")!=-1)){document.writeln('<script language="VBscript">');
document.writeln("'do a one-time test for a version of VBScript that can handle this code");
document.writeln("ITSMediaPlayer.detectableWithVB = False");
document.writeln("If ScriptEngineMajorVersion >= 2 then");
document.writeln("  ITSMediaPlayer.detectableWithVB = True");
document.writeln("End If");
document.writeln("'this next function will detect most plugins");
document.writeln("Function detectActiveXControl(activeXControlName)");
document.writeln("  on error resume next");
document.writeln("  detectActiveXControl = False");
document.writeln("  If ITSMediaPlayer.detectableWithVB Then");
document.writeln("     detectActiveXControl = IsObject(CreateObject(activeXControlName))");
document.writeln("  End If");
document.writeln("End Function");
document.writeln("'and the following function handles QuickTime");
document.writeln("Function detectQuickTimeActiveXControl()");
document.writeln("  on error resume next");
document.writeln("  detectQuickTimeActiveXControl = False");
document.writeln("  If ITSMediaPlayer.detectableWithVB Then");
document.writeln("    detectQuickTimeActiveXControl = False");
document.writeln("    hasQuickTimeChecker = false");
document.writeln('    Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1")');
document.writeln("    If IsObject(hasQuickTimeChecker) Then");
document.writeln("      If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then ");
document.writeln("        detectQuickTimeActiveXControl = True");
document.writeln("      End If");
document.writeln("    End If");
document.writeln("  End If");
document.writeln("End Function");
document.writeln("<\/script>")
}; if(!window.its){window.its={}
}if(!window.webPreview){window.webPreview={}
}webPreview.domReady=function webPreviewDomReady(){if(getGlobalConst("_previewAllowed")){if(ITSMediaPlayer.isAudioPreviewSupported()){var a=its.x.querySelectorAll(document,".has-preview-capable-text");
if(a){for(var b=0;
b<a.length;
b++){var c=a[b];
c.innerHTML=c.getAttribute("preview-capable-text")
}}its.registerElementBinding(ITSPlayMusicController,"table.tracklist-table tbody tr[audio-preview-url] td div.circular-preview-control",{click:"togglePlayState",mousedown:"mousePressed"});
its.registerElementBinding(ITSPlayMusicController,"table.tracklist-table tbody tr[audio-preview-url]",{mouseover:"rowMouseIn",mouseout:"rowMouseOut"},true)
}its.registerElementBinding(ITSPlayVideoController,".w3h-video-social-preview-lockup",{click:"playVideo"})
}};
its.x.notifyOfDOMContentLoaded(webPreview.domReady);
ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX="foreground-image-";
ITSPlayMusicController.ACCESSIBILITY_FEATURE="preview";
ITSPlayMusicController.PLAYSTATE_STOPPED="stopped";
ITSPlayMusicController.PLAYSTATE_LOADING="loading";
ITSPlayMusicController.PLAYSTATE_PLAYING="playing";
ITSPlayMusicController.PLAYSTATE_PAUSED="paused";
ITSPlayMusicController.MOUSESTATE_DEFAULT="default";
ITSPlayMusicController.MOUSESTATE_HOVER="hover";
ITSPlayMusicController.MOUSESTATE_PRESSED="pressed";
ITSPlayMusicController.Events={PREVIEW_PLAYED:"ITSPlayMusicController.Events.PREVIEW_PLAYED"};
its.x.extendWithEventDispatching(ITSPlayMusicController);
function ITSPlayMusicController(b){this.centerStateIconDiv=its.x.querySelector(this.__domElement,"div.center-control-state");
this.playState=ITSPlayMusicController.PLAYSTATE_STOPPED;
this.mouseState=ITSPlayMusicController.MOUSESTATE_DEFAULT;
this.mediaURL=null;
this.progressMeter=null;
if(b.getAttribute("show-preview-control-always")){ITSPlayMusicController.rowMouseIn(its.x.element.parentByAttributeName(this.__domElement,"audio-preview-url"))
}var a=its.x.element.parentByAttributeName(b,"adam-id");
if(a){this.adamId=a.getAttribute("adam-id")
}}ITSPlayMusicController.rowMouseIn=function ITSPlayMusicControllerrowMouseIn(b){var a=its.x.querySelector(b,"td div.circular-preview-control");
if(a.__controller){a.__controller.setMouseState(ITSPlayMusicController.MOUSESTATE_HOVER)
}};
ITSPlayMusicController.rowMouseOut=function ITSPlayMusicControllerrowMouseOut(b){var a=its.x.querySelector(b,"td div.circular-preview-control");
if(a.__controller){a.__controller.setMouseState(ITSPlayMusicController.MOUSESTATE_DEFAULT)
}};
ITSPlayMusicController.prototype={togglePlayState:function ITSPlayMusicControllerTogglePlayState(a){if(this.playState!=ITSPlayMusicController.PLAYSTATE_STOPPED){this.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED)
}else{this.setPlayState(ITSPlayMusicController.PLAYSTATE_LOADING)
}},mousePressed:function ITSPlayMusicControllerMousePressed(a){this.setMouseState(ITSPlayMusicController.MOUSESTATE_PRESSED)
},playbackStarted:function ITSPlayMusicControllerPlaybackStarted(){this.setPlayState(ITSPlayMusicController.PLAYSTATE_PLAYING);
var a=new ITSEvent(ITSPlayMusicController.Events.PREVIEW_PLAYED,this);
a.adamId=this.adamId;
ITSPlayMusicController.itsDispatchEvent(a)
},playbackEnded:function ITSPlayMusicControllerPlaybackEnded(){this.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED)
},setPlayState:function ITSPlayMusicControllersetPlayState(b){if(this.playState!=b){this.playState=b;
if(this.playState==ITSPlayMusicController.PLAYSTATE_STOPPED){ITSMediaPlayer.stop();
ITSMediaPlayer.itsRemoveEventListener(ITSMediaPlayer.events.CAN_PLAY,this._playbackStartedCallback);
ITSMediaPlayer.itsRemoveEventListener(ITSMediaPlayer.events.PLAYBACK_ENDED,this._playbackEndedCallback);
if(ITSPlayMusicController.__activeTrack==this){ITSPlayMusicController.__activeTrack=null
}}else{if(this.playState==ITSPlayMusicController.PLAYSTATE_LOADING){var a=its.x.element.parentByTagName(this.__domElement,"tr");
if(ITSPlayMusicController.__activeTrack){var c=ITSPlayMusicController.__activeTrack;
c.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED)
}ITSPlayMusicController.__activeTrack=this;
this._playbackStartedCallback=bind(this,this.playbackStarted);
this._playbackEndedCallback=bind(this,this.playbackEnded);
ITSMediaPlayer.itsAddEventListener(ITSMediaPlayer.events.CAN_PLAY,this._playbackStartedCallback);
ITSMediaPlayer.itsAddEventListener(ITSMediaPlayer.events.PLAYBACK_ENDED,this._playbackEndedCallback);
this.mediaURL=a.getAttribute("audio-preview-url");
ITSMediaPlayer.play(this.mediaURL);
if(!ITSMediaPlayer.doesMediaPlayerSupportCallbacks){this.playbackStarted()
}}else{if(this.playState==ITSPlayMusicController.PLAYSTATE_PLAYING){}else{if(this.playState==ITSPlayMusicController.PLAYSTATE_PAUSED){}}}}this.setImagesFromState()
}},setMouseState:function ITSPlayMusicControllersetMouseState(a){if(this.mouseState!=a){this.mouseState=a;
this.setImagesFromState()
}},setImagesFromState:function ITSPlayMusicControllersetImagesFromState(){this.showOrHideControl();
var a=this.playState+"_"+this.mouseState;
var c=ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX+this.playState+"-"+this.mouseState;
if(this.playState==ITSPlayMusicController.PLAYSTATE_STOPPED){if(this.progressMeter){this.progressMeter.stop()
}}else{if(this.playState==ITSPlayMusicController.PLAYSTATE_PLAYING){if(!this.progressMeter){var b=ITSMediaPlayer.durationInSeconds();
this.progressMeter=new ITSSpriteAnimator(this.__domElement,21,101,ITSMediaPlayer.durationInSeconds()*1000,0,this.mediaURL)
}this.progressMeter.play()
}}var d=its.x.element.classNameStartingWith(this.centerStateIconDiv,ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX);
its.x.element.replaceClassName(this.centerStateIconDiv,d,c);
this.centerStateIconDiv.title=ITSPlayMusicController.ACCESSIBILITY_FEATURE+" "+this.playState
},showOrHideControl:function ITSPlayMusicControllershowOrHideControl(){if((this.playState!=ITSPlayMusicController.PLAYSTATE_STOPPED)||(this.mouseState!=ITSPlayMusicController.MOUSESTATE_DEFAULT)){this.__domElement.style.visibility="visible"
}else{if(!this.__domElement.getAttribute("show-preview-control-always")){this.__domElement.style.visibility="hidden"
}}}};
function ITSPlayVideoController(a){this.init(a)
}ITSPlayVideoController.prototype={MAX_WIDTH:416,init:function(a){var b=document.createElement("video");
this.supportsVideoTag=!(typeof(b.canPlayType)=="undefined"||b.canPlayType("video/mp4")=="")&&!its.x.isChrome();
this.container=its.x.querySelector(a,".w3h-video-container");
this.videoWrapper=its.x.querySelector(this.container,".video-wrapper");
this.video=its.x.querySelector(this.videoWrapper,"video");
this.videoScreen=its.x.querySelector(this.videoWrapper,"div.video-screen");
this.videoPoster=its.x.querySelector(this.container,"div.video-poster");
this.constrainVideoWidth()
},constrainVideoWidth:function(){var d=parseInt(this.videoWrapper.getAttribute("video-width"));
var a=parseInt(this.videoWrapper.getAttribute("video-height"));
var c=d/a;
var e=this.videoWrapper.getAttribute("max-width")||this.MAX_WIDTH;
var b=Math.floor(e/c);
this.newWidth=e;
this.newHeight=b;
this.ratio=c;
if(this.video.style){this.video.style.width=e+"px";
this.video.style.height=b+"px"
}var f=its.x.querySelector(this.videoPoster,"img");
f.style.width=e+"px";
f.style.height=b+"px";
this.videoScreen.style.width=e+"px";
this.videoScreen.style.height=b+"px";
this.container.style.width=e+"px"
},playVideo:function ITSPlayVideoControllerPlayVideo(){if(this.supportsVideoTag){this.playHtml5Video()
}else{this.playQuickTimeVideo()
}},playHtml5Video:function ITSPlayVideoControllerPlayHtml5Video(){var a=this;
this.videoPoster.style.opacity="0";
window.setTimeout(function(){a.videoPoster.style.display="none";
a.videoScreen.style.display="none"
},300);
this.video.play()
},playQuickTimeVideo:function ITSPlayVideoControllerPlayQuickTimeVideo(){this.videoPoster.style.display="none";
this.videoScreen.style.display="none";
var a=this.newHeight+15;
var c=this.newWidth;
var h=this.videoWrapper.getAttribute("poster");
var d=document.getElementsByTagName("source")[0];
var e=d.getAttribute("src");
var f="tofit";
var g='<object width="'+c+'" height="'+a+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" scale="'+f+'"> <param name="src" value="'+e+'"> <param name="autoplay" value="true"> <param name="poster" value="'+h+'"> <param name="controller" value="true"> <param name="scale" value="'+f+'"> <embed src="'+e+'" width="'+c+'" height="'+a+'" scale="'+f+'" controller="true" autoplay="true" poster="'+h+'" pluginspage="http://www.apple.com/quicktime/download/"> </embed> </object>';
var b=document.createElement("div");
b.innerHTML=g;
if(this.video.parentNode){this.video.parentNode.appendChild(b);
this.video.parentNode.removeChild(this.video)
}else{this.videoWrapper.appendChild(b)
}this.videoWrapper.style.height=a+"px";
if(its.x.element.hasClassName(document.body,"social-preview")){twttr.remote.ui("resizeFrame",document.body.offsetHeight)
}}}; (function(a){jQuery.fn.AppGallery=function(g){var f={content:".content",control:".control",control_cap:".control_cap",scroll:".scroll",scroll_cap:".scroll_cap",image_wrapper:"img"};
if(g){jQuery.extend(f,g)
}var e;
var d;
var c=jQuery.browser.webkit;
var i=function(o,k){this.willScroll=false;
var p=function(q){q.append('<div id="scroller_'+k+'" class="'+j(f.control)+'"><div class="'+j(f.control_cap)+'"><div class="'+j(f.scroll)+'"><div class="'+j(f.scroll_cap)+'"></div></div></div></div>')
};
var j=function(q){return q.replace(/(\.|#)/g,"")
};
this.container=jQuery(o);
this.content=new b(jQuery(f.content,this.container),this.container);
var l=this.container.attr("num-items");
if(l){this.container.addClass("items"+l)
}if(this.container.width()<this.content.width){if(l>1){var n=jQuery("div:first-child",this.container).get(0);
jQuery(n).css({width:this.content.width+"px"}).addClass("image-wrapper");
if(!c){p(this.container);
var m={orientation:"horizontal",track_wrapper:jQuery("#scroller_"+k),track_well:"null",track_well_cap:"null",track_thumb:jQuery(".scroll",this.container),track_thumb_cap:jQuery(".scroll_cap",this.container),content_wrapper:this.container,content:jQuery(".image-wrapper",this.container)};
jQuery(this.container).is_scrollable(m)
}}}};
var b=function(l,k){this.position_images=function(q){var o=0;
var p;
jQuery.each(this.images,function(r,s){o+=s.get_dimensions().width
});
l.css({left:q,width:o})
};
var m=function(t){var s=[];
var p=0;
var q=0;
var o,r;
jQuery.each(t,function(u,v){o=new h(v);
r=o.get_dimensions();
s[s.length]=o;
if(r.height>p){p=r.height
}q+=r.width
});
return{image_list:s,tallest:p,width:q}
};
var n=function(o){};
var j=function(p,q){var o;
jQuery.each(p,function(r,s){o=s.get_height();
if(q<=o){return
}s.set_y(q-o)
})
};
this.get_view_width=function(){return k.width()
};
this.images_meta=m(jQuery(f.image_wrapper,l));
this.images=this.images_meta.image_list;
this.height=this.images_meta.tallest;
this.width=this.images_meta.width;
n(this.height);
j(this.images,this.height);
if(k&&!c){jQuery(k.get(0)).css({"overflow-x":"hidden",padding:"0"})
}};
var h=function(j){var k=jQuery(j);
this.get_dimensions=function(){return{width:k.outerWidth(true),height:k.height()}
};
this.get_height=function(){return jQuery("img",k).height()
};
this.set_x=function(l){k.css({left:l+"px"})
};
this.set_y=function(l){}
};
return this.each(function(j,k){d=new i(k,j)
})
}
})();
jQuery(window).load(function(){jQuery(".screenshots .content").AppGallery({content:"div:first",image_wrapper:".lockup"})
}); (function(){jQuery.fn.Pill=function(e){var d={toggleDiv:"div.screenshots div.content",toggleButtons:"div.screenshots div.pill a"};
if(e){jQuery.extend(d,e)
}var c;
var b=function(f){jQuery(f).each(function(h,g){if(h<1){jQuery(g).addClass("first active");
a();
if(jQuery(document.body).hasClass("social-preview")){twttr.remote.ui("resizeFrame",jQuery(document.body).height())
}}jQuery(g).click(function(j){j.preventDefault();
j.stopPropagation();
if(!jQuery(this).hasClass("active")){var i=jQuery(this);
jQuery(d.toggleDiv).each(function(){jQuery(this).toggle()
});
jQuery(d.toggleButtons).each(function(){jQuery(this).removeClass("active")
});
jQuery(this).addClass("active")
}})
})
};
var a=function(){jQuery(d.toggleDiv).each(function(f,g){if(f>0){jQuery(g).addClass("ipad")
}})
};
c=new b(this);
return this
}
})();
jQuery(window).load(function(){jQuery("body.software #main #content div.center-stack div.screenshots > div.title > div.pill > a").Pill()
}); (function(){jQuery.fn.Hud=function(h){var e={table_row:"tr.podcast-episode",scroller:".scroller",hide_hud:"#hide_hud",hud_close_link:"a.close_link",hud_content_wrapper:"div.content_wrapper",hud_content:"div.content",hud_title:"h2",hud_release_date_label:"span.release_date_label",hud_release_date_value:"span.release_date_value",hud_description:"p.description",left_offset:321,top_offset:12,fade_duration:300};
if(h){jQuery.extend(e,h)
}var d=this;
var l=null;
var i=null;
var a=false;
var k=function(n){jQuery(n).each(function(p,o){var q=null;
q=f(o);
jQuery(o).click(function(){m(this,q)
})
})
};
var m=function(o,n){if(o!=null&&n!=null){var p=jQuery(o).offset();
if(d.hud){jQuery(d.hud).css({top:parseInt(p.top-e.top_offset)+"px",left:parseInt(p.left-e.left_offset)+"px"})
}else{jQuery("body").append('<div id="hide_hud"></div><div id="description_hud"><a class="close_link" href="#">Close</a><div class="scroller"><div class="track_well"><div class="track_well_cap"><div class="track_thumb"><div class="track_thumb_cap"></div></div></div></div></div><div class="content_wrapper"><div class="content"><h2></h2><p class="release_date"><span class="release_date_label"></span><span class="release_date_value"></span></p><p class="description"></p></div></div></div>');
d.hud=jQuery("#description_hud")[0];
jQuery(d.hud).css({top:parseInt(p.top-e.top_offset)+"px",left:parseInt(p.left-e.left_offset)+"px"});
jQuery(d.hud).find(e.hud_close_link).click(function(){c();
return false
});
jQuery(e.hide_hud).click(function(){c();
return false
})
}g(n)
}};
var c=function(){if(d.hud){b();
if(its.x.isIE()){jQuery(d.hud).css({display:"none"});
jQuery(e.hide_hud).hide()
}else{jQuery(d.hud).fadeOut(e.fade_duration,function(){jQuery(e.hide_hud).hide()
})
}}};
var g=function(o){if(d.hud&&o){var n=window["__desc_popup_d_"+o];
if(n!=null){jQuery(d.hud).find(e.hud_title).html(n.title);
jQuery(d.hud).find(e.hud_release_date_label).html(n.release_date_label);
jQuery(d.hud).find(e.hud_release_date_value).html(n.release_date);
jQuery(d.hud).find(e.hud_description).html(n.description)
}if(its.x.isIE()){jQuery(d.hud).css({display:"block"});
if(!its.x.isSafari()){j()
}jQuery(e.hide_hud).show()
}else{jQuery(d.hud).fadeIn(e.fade_duration,function(){if(!its.x.isSafari()){j()
}jQuery(e.hide_hud).show()
})
}}};
var f=function(n){if(n){return jQuery(n).parents(e.table_row).attr("adam-id")
}};
var j=function(){this.scroll=jQuery(d.hud).find(e.hud_content).height()-jQuery(d.hud).find(e.hud_content_wrapper).height();
if(this.scroll>0){jQuery(e.hud_content_wrapper).css({"overflow-y":"hidden"});
jQuery(e.scroller).css({left:"auto"});
jQuery(d.hud).is_scrollable({track_wrapper:e.scroller})
}};
var b=function(){if(this.scroll>0){jQuery(e.scroller).css({left:"-9999px"});
jQuery(e.scroller+" .track_thumb").css({top:"0"});
jQuery(e.hud_content).css({top:"0"})
}};
l=new k(this);
return this
}
})();
jQuery(document).ready(function(){var a={};
a.table_row=jQuery("body").hasClass("tv")?"tr.tv-episode":"tr.podcast-episode";
jQuery("#main #content .track-list table tr td span.episode-info").Hud(a)
}); (function(){jQuery.fn.is_scrollable=function(h){var g={orientation:"vertical",track_wrapper:".track_wrapper",track_well:".track_well",track_well_cap:".track_well_cap",track_thumb:".track_thumb",track_thumb_cap:".track_thumb_cap",content_wrapper:".content_wrapper",content:".content",image_cap_size:5};
if(h){jQuery.extend(g,h)
}var i=new c(this,g);
var j=new d(this,g,i);
var f=new e(this,g,j);
return this
};
var c=function(g,f){var i=jQuery(f.content_wrapper,g);
var h=jQuery(f.content,i);
this.get_wrapper_height=function(){return i.height()
};
this.get_wrapper_width=function(){return i.width()
};
this.get_content_height=function(){return h.height()
};
this.get_content_width=function(){return h.width()
};
this.set_top=function(j){h.css({top:j+"px"})
};
this.set_left=function(j){h.css({left:j+"px"})
}
};
var d=function(k,B,x){var w=this;
var u=B.track_wrapper?jQuery(B.track_wrapper,k):null;
var j=B.track_well?jQuery(B.track_well,u):null;
var v=B.track_well_cap?jQuery(B.track_well_cap,j):null;
var A=B.track_thumb?jQuery(B.track_thumb,j):null;
var p=B.track_thumb_cap?jQuery(B.track_thumb_cap,A):null;
var y=0;
this.track_wrapper=u;
this.is_target=function(D){return A.get(0)==D||p.get(0)==D
};
this.get_scroll_position=function(){return y
};
this.set_scroll_position=function(D){y=D
};
this.get_scroll_left=function(){return A.offset().left
};
var q=function(D){A.css({left:D+"%"})
};
this.get_scroll_top=function(){return A.offset().top
};
var z=function(D){if(D>100){D=100
}if(D<0){D=0
}A.css({top:D+"%"})
};
var h=function(){return A.width()
};
var s=function(){return A.outerHeight(true)
};
var r=function(){return parseFloat(A.css("width"))
};
var t=function(D){if(D>100){D=100
}if(D<-1.5){D=0
}A.css({width:D+"%"})
};
var C=function(){return parseFloat(A.css("height"))
};
var n=function(D){if(D>100){D=100
}if(D<-1.5){D=0
}A.css({height:D+"%"})
};
var g=function(){return u.offset().left
};
var f=function(){return u.offset().top
};
var o=function(){return u.outerWidth(true)
};
var i=function(){return u.outerHeight(true)
};
var l=function(){if(B.orientation=="vertical"){var E=B.image_cap_size;
var D=j.height()-(E*2);
j.css({height:D+"px"});
v.css({top:E+"px"});
p.css({top:(-1*E)+"px"})
}else{}y=m(B.orientation).min
};
var m=function(E){var F,D;
if(E=="vertical"){F=f();
D=(F+i())-s()
}else{F=g();
D=(F+o())-h()
}w.range={min:F,max:D};
return w.range
};
this.set_scroll=function(G){var D=this.range?this.range:m(B.orientation);
this.set_scroll_position(G);
var E,H;
var F=(100*(G-D.min))/(D.max-D.min);
if(B.orientation=="vertical"){E=((100-C())*(G-D.min))/(D.max-D.min);
z(E);
H=(F*(x.get_wrapper_height()-x.get_content_height()))/100;
x.set_top(H)
}else{E=((100-r())*(G-D.min))/(D.max-D.min);
q(E);
H=(F*(x.get_wrapper_width()-x.get_content_width()))/100;
x.set_left(H)
}};
l();
if(B.orientation=="vertical"){n((100*x.get_wrapper_height())/x.get_content_height())
}else{t((100*x.get_wrapper_width())/x.get_content_width())
}};
var e=function(f,g,i){var m=false;
var h={x:0,y:0};
var n=0;
var k=Math;
var j=i.range;
var l=function(o){if(o.wheelDelta){return k.abs(o.wheelDeltaY/o.wheelDeltaX)<=0.5
}else{return o.axis==1
}};
jQuery(f).bind({content_select:function(o){if(!m){return
}o.deselect()
},mousewheel:function(s){var o=i.get_scroll_position();
var r=l(s.originalEvent);
if(r){var t=s.detail?s.detail*(-120):s.wheelDelta;
var p=s.detail?k.round(3*(t/-120)):k.round(0.3*(t/-120));
if(p!=0){var q=o+p;
if(q>j.max){q=j.max
}if(q<j.min){q=j.min
}i.set_scroll(q)
}}}});
jQuery(i.track_wrapper).bind({click:function(p){var o=g.orientation=="vertical"?p.pageY:p.pageX;
if(o>j.max){o=j.max
}if(o<j.min){o=j.min
}console.log(p.pageX,h.x);
i.set_scroll(o)
}});
jQuery(document).bind({mousedown:function(o){if(m){m=false;
return
}if(!i.is_target(o.target)){return
}m=true;
h.x=o.pageX-i.get_scroll_left();
h.y=o.pageY-i.get_scroll_top()
},mouseup:function(o){m=false
},mousemove:function(p){if(!m){return
}var o=g.orientation=="vertical"?p.pageY-h.y:p.pageX-h.x;
if(o>j.max){o=j.max
}if(o<j.min){o=j.min
}i.set_scroll(o)
}})
};
jQuery.event.special.content_select={setup:function(g,f){jQuery(this).data("content_selected",false);
jQuery(this).bind("mouseup",jQuery.event.special.content_select.handler);
jQuery(this).bind("mousedown",jQuery.event.special.content_select.handler);
jQuery(this).bind("mousemove",jQuery.event.special.content_select.handler);
jQuery.event.special.content_select.scope=this
},teardown:function(f){jQuery(this).unbind("mouseup",jQuery.event.special.content_select.handler);
jQuery(this).unbind("mousedown",jQuery.event.special.content_select.handler);
jQuery(this).unbind("mousemove",jQuery.event.special.content_select.handler)
},handler:function(f){var g=jQuery.event.special.content_select.get_selected_text();
if(g){jQuery(this).data("content_selected",true);
f.type="content_select";
f.text=g;
f.deselect=jQuery.event.special.content_select.deselect;
jQuery.event.handle.apply(this,arguments)
}},deselect:function(){if(window.getSelection){window.getSelection().removeAllRanges()
}else{if(document.selection){document.selection.empty()
}else{if(document.getSelection){document.getSelection().removeAllRanges()
}}}},get_selected_text:function(){var f="";
if(window.getSelection){f=window.getSelection()
}else{if(document.getSelection){f=document.getSelection()
}else{if(document.selection){f=document.selection.createRange().text
}}}return f
}};
var a=["DOMMouseScroll","mousewheel"];
$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var f=a.length;
f;
){this.addEventListener(a[--f],b,false)
}}else{this.onmousewheel=b
}},teardown:function(){if(this.removeEventListener){for(var f=a.length;
f;
){this.removeEventListener(a[--f],b,false)
}}else{this.onmousewheel=null
}}};
$.fn.extend({mousewheel:function(f){return f?this.bind("mousewheel",f):this.trigger("mousewheel")
},unmousewheel:function(f){return this.unbind("mousewheel",f)
}});
var b=function(h){var f=[].slice.call(arguments,1),i=0,g=true;
h=$.event.fix(h||window.event);
h.type="mousewheel";
if(h.wheelDelta){i=h.wheelDelta/120
}if(h.detail){i=-h.detail/3
}f.unshift(h,i);
return $.event.handle.apply(this,f)
}
})(); (function(){jQuery.fn.Truncate=function(e){var c={maxHeight:54};
if(e){jQuery.extend(c,e)
}var d;
var b=function(f){jQuery(f).each(function(j,h){var l=jQuery(h);
if(jQuery(l).height()>c.maxHeight){var k=jQuery(l).parent("div.product-review");
var g=jQuery(k).attr("more-text")||"More";
jQuery(l).addClass("truncate").css({height:c.maxHeight+"px"});
jQuery(l).parent("div.product-review").append('<a href="#" class="more-link">...'+g+"</a>");
a(jQuery(l).siblings("a.more-link"))
}})
};
var a=function(f){if(f){jQuery(f).click(function(g){g.preventDefault();
jQuery(this).siblings("p.truncate").each(function(j,h){jQuery(h).css({height:"auto"});
jQuery(h).removeClass("truncate")
});
jQuery(this).remove()
})
}};
d=new b(this);
return this
}
})();
jQuery(window).load(function(){if(jQuery("body").hasClass("preorder")){jQuery("body.preorder #main #content div.center-stack div.product-review > p").Truncate({maxHeight:540})
}else{if(jQuery("body").hasClass("ebook")){jQuery("body.ebook #main #content div.center-stack div.product-review > p").Truncate({maxHeight:180})
}else{jQuery("body.software #main #content div.center-stack div.product-review > p").Truncate()
}}}); if(!window.its){window.its={}
}if(!its.detect){its.detect={}
}its.detect.ITUNES_INSTALLED_COOKIE_NAME="iTunesPresent";
its.detect.LAUNCH_STORE_QP="ls";
its.detect._shouldAutolaunch=false;
its.detect.init=function itsDetectInit(){var a=its.url.originalLocationQueryParams[its.detect.LAUNCH_STORE_QP];
if(!a||(a=="")){a=its.url.originalLocationHashAnchorParams[its.detect.LAUNCH_STORE_QP]
}if(!a||(a=="")){a=its.cookies.get(its.detect.LAUNCH_STORE_QP)
}if(a){a=a.toLowerCase();
its.detect._shouldAutolaunch=(a=="1")||(a=="true")
}its.cookies.remove(its.detect.LAUNCH_STORE_QP)
};
its.detect.init();
its.detect.itunesDetected=function itsDetectItunesDetected(){return(its.cookies.get(its.detect.ITUNES_INSTALLED_COOKIE_NAME)||(navigator.userAgent.indexOf("Macintosh")!=-1)||(its.x.isIE()&&its.detect.iTunesActiveXComponentInstalled())||(its.x.isSafari()&&(window.location.href.indexOf("volume.itunes.apple.com")>-1))||(its.x.isSafari()&&(window.location.href.indexOf("mint.itunes.apple.com")>-1))||(its.x.isSafari()&&(window.location.href.indexOf("vpp.itunes.apple.com")>-1))||((its.x.isFirefox()||its.x.isSafari()||its.x.isChrome())&&its.detect.iTunesMozillaPluginDetected()))
};
its.detect.userOverrideSetItunesInstalled=function itsDetectUserOverrideSetItunesInstalled(){its.cookies.set(its.detect.ITUNES_INSTALLED_COOKIE_NAME,"1",99999999,"/",null)
};
its.detect.macAppStoreDetected=function itsDetectMacAppStoreDetected(){return(its.useragent.versionMeetsMinRequirements(its.useragent.macOsVersion(),"10_6_6")||(its.x.isFirefox()&&its.useragent.versionMeetsMinRequirements(its.useragent.macOsVersion(),"10.6")))
};
its.detect.currentPageIsMacAppStore=function itsDetectCurrentPageIsMacAppStore(){return((window.location.href.indexOf("/mac-app/")>0)||(its.url.originalLocationQueryParams.mt=="12"))
};
its.detect.iTunesActiveXComponentInstalled=function itsDetectITunesActiveXComponentInstalled(){var b=document.getElementById("iTunesDetectorIE");
var a=false;
if((b!=null)&&(typeof(b)!="undefined")){if(typeof(b.IsITMSHandlerAvailable)!="undefined"){a=b.IsITMSHandlerAvailable;
dbg(typeof(b.IsITMSHandlerAvailable))
}if((a==null)||(typeof(a)=="undefined")){a=false
}}info("IE ActiveXControl present: "+a);
return a
};
its.detect.iTunesMozillaPluginDetected=function itsDetectITunesMozillaPluginDetected(){var a=false;
if(navigator.plugins&&navigator.plugins.length>0){for(var b=0;
b<navigator.plugins.length;
b++){var c=navigator.plugins[b];
var d=c.name;
if(d.indexOf("iTunes Application Detector")>-1){a=true
}}}info("FF plugin detected: "+a);
return a
};
its.detect.shouldAutolaunch=function itsDetectshouldAutolaunch(){return its.detect._shouldAutolaunch
};
its.detect.openItunes=function itsDetectOpenItunes(c){if(!c){c=window.location.href
}var b=its.detect.currentPageIsMacAppStore()||(its.url.queryParamValue("mt",c)=="12");
var a=b?its.detect.macAppStoreDetected():its.detect.itunesDetected();
if(a){c=c.replace(/^http/,b?"macappstore":"itms");
var d=c.indexOf("#");
if(d>-1){c=c.substring(0,d)
}if(c.indexOf("payPalMIPReturn")===-1&&c.indexOf("firstGateReturn")===-1&&c.indexOf("payclickSignUpReturn")===-1&&c.indexOf("payclickBillingReturn")===-1){var e=(c.indexOf("?")===-1)?"?":"&";
var g=its.cookies.get("a");
if(g){c+=e+"affC="+its.detect.encodedQueryParameter(g);
e="&"
}if(document.referrer){var f=its.detect.encodedQueryParameter(document.referrer);
if((c.length+f.length)<400){dbg("openItunes: Attaching "+document.referrer);
c+=e+"ign-msr="+f
}}}}else{c=itms.PageData.itunesDownloadUrl
}dbg("openItunes: "+c);
if(window.location.href!=c){setTimeout(function(){window.location.href=c
},1);
if(b){setTimeout(function(){window.location.href=c
},2000)
}}return false
};
its.detect.encodedQueryParameter=function itsDetectEncodedQueryParameter(b){var a=encodeURIComponent(b);
if(its.x.isIE()){a=encodeURIComponent(a)
}return a
};
function dbg(a){}function info(a){}; var deviceDetect=function(){var a=navigator.userAgent;
switch(true){case (-1!=a.indexOf("iPhone")):setViewport("iphone");
setTouchEvents();
jQuery("html").addClass("iphone");
jQuery("body").addClass("iphone");
break;
case (-1!=a.indexOf("iPod")):setViewport("iphone");
setTouchEvents();
jQuery("html").addClass("iphone");
jQuery("body").addClass("iphone");
break;
case (-1!=a.indexOf("iPad")):setViewport("ipad");
setTouchEvents();
jQuery("html").addClass("ipad");
jQuery("body").addClass("ipad");
break;
default:return;
break
}};
var setTouchEvents=function(){jQuery(document).ready(function(){jQuery("div.bottom-content a").each(function(a,b){b.addEventListener("touchstart",function(){},false)
})
})
};
var setViewport=function(a){if(a){var b=a!="ipad"?jQuery('<meta name = "viewport" content = "width = 320,initial-scale = 1.0,minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no">'):jQuery('<meta name = "viewport" content = "initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no">');
jQuery("head").append(b);
window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,1)
},0)
})
}}; var itms=function(){return{replaceClass:function(b,a,c){if(!c){c=""
}dbg("Replacing "+a+" with "+c);
b.className=b.className.replace(a,c);
return false
},PageData:{itunesDetectedCallback:function(b,a){if(b){if(a){document.getElementsByTagName("body")[0].className+=" launching-itunes"
}else{document.getElementsByTagName("body")[0].className+=" no-action"
}setTimeout(function(){var d=document.getElementsByTagName("body")[0].className;
if(!d.match("ebook")){d=d.replace(/ itunes-detected/,"")
}d=d.replace(/ launching-itunes/,"");
document.getElementsByTagName("body")[0].className=d;
var c=document.getElementById("status").getElementsByTagName("span");
for(i=0;
i<c.length;
i++){if(c[i].className=="spinner"){c[i].className="no-spinner"
}}},10000);
document.getElementsByTagName("body")[0].className+=" itunes-detected"
}else{document.getElementsByTagName("body")[0].className+=" itunes-not-detected"
}},itunesDownloadUrl:"http://apple.com/itunes/download",itunesDetectorElement:document.getElementById("iTunesDetectorIE"),macAppStoreDetectedCallback:function(b,a){if(b){document.getElementsByTagName("body")[0].className+=" mac-app-store-detected"
}else{document.getElementsByTagName("body")[0].className+=" mac-app-store-not-detected"
}},macAppStoreDownloadUrl:"http://www.apple.com/mac/app-store/"}}
}();
function detectAndOpenItunes(d){if((-1<navigator.userAgent.indexOf("iPhone"))||(-1<navigator.userAgent.indexOf("iPod"))&&(-1<window.location.href.indexOf("ign-iphone"))){d=window.location.href;
var b="ign-iphone=1";
if(!d.indexOf(b)){var e=(d.indexOf("?")===-1)?"?":"&";
d+=e+b
}if(window.location.href!=d){setTimeout(function(){window.location.href=d
},1)
}return false
}var c=its.detect.itunesDetected();
var a=its.detect.shouldAutolaunch();
itms.PageData.itunesDetectedCallback(c,a);
ITSAkamaiMetrics.ping("/itunespreview/itunes/browser:"+its.x.browserName()+"/installed:"+c+"/autolaunch:"+a);
if(c&&a){return its.detect.openItunes(d)
}else{return true
}}function detectAndOpenMacAppStore(c){var b=its.detect.macAppStoreDetected();
var a=its.detect.shouldAutolaunch();
itms.PageData.macAppStoreDetectedCallback(b,a);
if(b&&a){return its.detect.openItunes(c)
}return true
}var Tracklist={toHover:"div.track-list tbody tr",url:null,isSocial:null,init:function(){this.url=this.getURL();
this.isSocial=document.body.className.match(/song/);
if(this.toHover){try{this.elements=its.x.querySelectorAll(document,this.toHover);
this.elementsInit()
}catch(a){this.elements=its.x.querySelectorAll(document,this.toHover);
this.elementsInit()
}}},getURL:function(){var a="[\\?&]i=([^&#]*)";
var c=new RegExp(a);
var b=c.exec(window.location.href);
if(b){return b[1]
}},elementsInit:function(){if(this.elements&&this.elements.length>0){var c=this.elements;
if(this.url){var b=false
}else{var b=true
}var a=this;
acme.forEach(c,function(e){var d=a.previousRow(e);
if(!b&&(e.getAttribute("adam-id")==a.url)){e.className=e.className+" selected";
b=true;
if(a.isSocial==null){its.x.addEventListener(e,"mouseout",function(){this.className=this.className.replace("selected","");
return false
})
}}its.x.addEventListener(e,"mouseover",function(f){if(d){d.className=d.className+" borderless"
}return false
});
its.x.addEventListener(e,"mouseout",function(f){if(d){d.className=d.className.replace("borderless","")
}return false
})
})
}},previousRow:function(a){if(a){p=a;
do{p=p.previousSibling
}while(p&&p.nodeType!=1);
return p
}},domready:function(){var a=this;
try{window.attachEvent("onload",function(){if(a.init){a.init()
}},false)
}catch(b){if(typeof(window.addEventListener)=="function"){document.addEventListener("DOMContentLoaded",function(){if(a.init){a.init()
}},false)
}else{window.onload=function(){if(a.init()){a.init()
}}
}}}};
Tracklist.domready(); (function(a){var b=54;
a.fn.willTruncate=function(h){var g=b;
if(h>0){g=h
}var f,d,c,e;
return this.each(function(){f=a(this);
if(f.height()>g){d=f.parent();
c=d.attr("more-text")||"More";
f.addClass("truncate");
d.append('<a href="#" class="more-link">...'+c+"</a>");
e=f.siblings("a.more-link");
e.click(function(){jQuery(this).siblings(".truncate").removeClass("truncate");
a(this).remove();
if(jQuery(document.body).hasClass("social-preview")){twttr.remote.ui("resizeFrame",jQuery(document.body).height())
}return false
})
}})
}
})(jQuery);
jQuery(document).ready(function(){var a=jQuery("[will-truncate-max-height]");
a.willTruncate(a.attr("will-truncate-max-height"))
}); (function(a){a.fn.TVRating=function(){return this.each(function(){var e=jQuery(this);
var c=e.attr("rating-id");
var d=e.attr("rating-system");
var b=d+"-"+c;
e.addClass(b)
})
}
})(jQuery);
jQuery(document).ready(function(){if(jQuery.browser.msie){jQuery("span.content-rating").TVRating()
}}); (function(a){a.fn.LockupLink=function(){return this.each(function(){var b=jQuery(this).attr("href");
jQuery(this).click(function(){window.location=b
},true)
})
}
})(jQuery);
jQuery(document).ready(function(){if(jQuery.browser.msie&&jQuery.browser.version<8){jQuery("a.artwork-link").LockupLink()
}}); jQuery(document).ready(function(){init_nav()
});
(function(l,e){var h=4,b="Previous Tab",f="Next Tab",o=/'s* celebrity playlist/i,p,k=[],d={},n,j=0,g=0;
l.init_nav=function(){p=jQuery(".stack-section");
n=jQuery(".tabs-control");
for(var r=0,q=p.length;
r<q;
r++){var s=p[r];
if(r===0){s.style.display="block"
}else{s.style.display="none"
}k[r]=jQuery(".blurbs-title",s).get(0)
}if(p.length>1){m()
}};
var c=function(){for(var r=0,q=p.length;
r<q;
r++){p[r].style.display="none"
}};
var i=function(s,t,r,u,v){var q=document.createElement("a");
q.className="button "+t;
q.innerHTML=s;
q.href="#";
q.onclick=function(w){if(u===false){a(p[r]);
j=r;
c();
p[r].style.display="block";
g+=v;
m()
}w.returnValue=false;
return false
};
return q
};
var a=function(q){jQuery("#left-stack .lockup .list li span.price").html(jQuery("div.price",q).html());
jQuery("#left-stack .lockup div.artwork img.artwork").get(0).src=jQuery("div.artwork img.artwork",q).get(0).src
};
var m=function(){h=k.length<h?k.length:h;
var q=g*h,s=k.length,r=j,z=h*10;
if(n[r]===e){return
}n[r].innerHTML="";
var v=(h);
for(var t=0;
t<v;
t++){if(k[t+q]===e){break
}var x=p[t+q],u=document.createElement("a"),w=document.createElement("span");
d[k[t+q].innerHTML.split(o).join("")]={section:x,index:t+q};
u.className="tab";
u.style.zIndex=z;
z-=10;
if(t===0){u.className+=" first"
}if(t+g*h===j){u.style.zIndex=99999;
u.className+=" active";
if(t<v-1){u.className+=" shadower"
}}u.href="#";
u.onclick=function(B){var A=jQuery("span",this).get(0).innerHTML;
a(d[A].section);
j=d[A].index;
c();
d[A].section.style.display="block";
m();
if(B&&B.returnValue){B.returnValue=false
}return false
};
w.innerHTML=k[t+q].innerHTML.split(o).join("");
u.appendChild(w);
n[r].appendChild(u)
}if(h!==k.length){var y;
if(q+h<s){y="next";
is_disabled=false
}else{is_disabled=true;
y="next disabled"
}n[r].appendChild(i(f,y,q+h,is_disabled,1));
if(q===0){is_disabled=true;
y="prev disabled"
}else{is_disabled=false;
y="prev"
}n[r].appendChild(i(b,y,q,is_disabled,-1))
}if(jQuery(n[r]).eq(0).height()>jQuery(n[r].children[0]).outerHeight()){h--;
m()
}}
})(window);