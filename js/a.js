/*
** Copyright (C) 2011 Apple Inc.
** All rights reserved.
*/

 if(!window.its){window.its={}
}its.currentTime=function currentTime(){return new Date().getTime()
};
its.isDefined=function isDefined(a){return typeof(a)!="undefined"
};
its.isDefinedNonNull=function isDefinedNonNull(a){return(its.isDefined(a)&&(a!=null))
};
its.isDefinedNonNullNonEmpty=function isDefinedNonNull(a){return(its.isDefined(a)&&(a!=null)&&(a!=""))
};
its.isFunction=function isFunction(a){return typeof a==="function"
};
its.isNumber=function isNumber(a){return typeof a=="number"
};
its.isString=function isString(a){return((typeof a=="string")||(a instanceof String))
};
its.isElement=function isElement(a){return a&&a.nodeType==1
};
its.isArray=function isArray(a){return a&&a.constructor===Array
};
its.toArray=function itsToArray(a){var c=[];
if(its.isDefinedNonNull(a.length)){for(var b=0;
b<a.length;
b++){c[b]=a[b]
}}return c
};
its.isEmpty=function itsIsEmpty(a){var b=true;
if(its.isDefinedNonNull(a)){if(its.isString(a)&&(a!="")){b=false
}else{if(its.isArray(a)&&(a.length>0)){b=false
}else{for(var c in a){if(a.hasOwnProperty(c)){b=false;
break
}}}}}return b
};
its.contains=function contains(b,a){var c=false;
if((its.isDefinedNonNull(b)&&its.isDefinedNonNull(a))&&((its.isString(b)&&its.isString(a)&&(b.indexOf(a)!=-1))||(its.isArray(b)&&(b.indexOf(a)!=-1))||its.isDefinedNonNull(b[a]))){c=true
}return c
};
its.webkitVersion=function webkitVersion(){var d=navigator.userAgent;
var c=/AppleWebKit\/([\d.]+)/;
var a=c.exec(d);
var b;
if(a){b=a[1]
}else{var e=/^iTunes\/10\.4 \(Windows;.+AppleWebKit\/$/;
if(e.exec(d)){b="533.21.1"
}else{if(window.console){console.error("Unable to determine WebKit version from user agent: "+d)
}b="0"
}}return b
};
its.webkitVersionCompare=function itsWebkitVersionCompare(b,h){var d=0;
var c=0;
var g=b.split(".");
var a=h.split(".");
while((g[c]||a[c])&&(d==0)){var e=g[c]?its.string.toInt(g[c]):0;
var f=a[c]?its.string.toInt(a[c]):0;
if(e<f){d=-1
}else{if(e>f){d=1
}}c++
}return d
};
its.poseAs=function(a,c,d){var b=a[c];
a[c]=(function(){var e=[b,arguments];
return d.apply(this,e)
})
};
its.emptyFunction=function itsEmptyFunction(){};
if(!window.its.element){window.its.element={}
}its.element.createElementsFromString=function itsElementCreateElementsFromString(e){var c=document.createElement("div");
c.innerHTML=e;
var b=c.children;
var a=[];
for(var d=0;
d<b.length;
d++){a.push(b[d])
}return a
};
its.element.createElementFromString=function itsElementCreateElementFromString(b){var a=its.element.createElementsFromString(b);
return(a&&a.length>0)?a[0]:null
};
if(!window.its.geometry){window.its.geometry={}
}its.geometry.doesRectIntersectRect=function itsGeometryDoesRectIntersectRect(b,a){var c=true;
if((b.right)<a.left){c=false
}else{if((b.left)>a.right){c=false
}else{if((b.bottom)<a.top){c=false
}else{if((b.top)>a.bottom){c=false
}}}}return c
};
if(!window.its.array){window.its.array={}
}its.array.arrayOfPrimitivesAsSet=function itsArrayOfPrimitivesAsSet(d){if(d==null){return null
}var c={};
for(var b=0;
b<d.length;
b++){var a=d[b];
switch(typeof a){case"boolean":case"number":case"string":c[a]=true;
break;
default:throw"its.array.asSet: array contains non primitive element"
}}return c
};
if(!window.its.string){window.its.string={}
}its.string.startsWith=function itsStringStartsWith(d,a,b){var c=false;
if(d){if(b){d=d.toLowerCase();
a=a.toLowerCase()
}c=(d.indexOf(a)===0)
}return c
};
its.string.endsWith=function itsStringEndsWith(e,a,b){var c=false;
if(e){if(b){e=e.toLowerCase();
a=a.toLowerCase()
}var d=e.length-a.length;
c=(d>=0&&e.lastIndexOf(a)===d)
}return c
};
its.string.pad=function pad(c,g,d){var b=c+="";
d=d||"0";
if(b.length<g){var f=g-b.length;
var a=[];
for(var e=f;
e>0;
e--){a.push(d)
}b=a.join("")+b
}return b
};
its.string.replaceAll=function itsStringReplaceAll(f,b,a,c){b=b.replace(/([.?*+^$[\]\\(){}-])/g,"\\$1");
var e="g";
if(c){e+="i"
}var d=new RegExp(b,e);
return f.replace(d,a)
};
its.string.whitespace="\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u3000\u2028\u2029\u200B";
its.string._whitespaceTrimStartRegex=new RegExp("^["+its.string.whitespace+"]+");
its.string._whitespaceTrimEndRegex=new RegExp("["+its.string.whitespace+"]+$");
its.string.trim=function itsStringTrim(e,b,a){var f=null;
if(e){if(!a&&(!b||(b==its.string.whitespace))&&e.trim){f=e.trim()
}else{var d=null;
var c=null;
var h=null;
if(its.isDefinedNonNull(b)){d="["+b+"]";
c=new RegExp("^"+d+"+");
h=new RegExp(d+"+$")
}else{d=its.string.whitespace;
c=its.string._whitespaceTrimStartRegex;
h=its.string._whitespaceTrimEndRegex
}var g=e.replace(c,"");
f=g.replace(h,"")
}}return f
};
its.string.splitTrimmed=function itsStringSplitTrimmed(c,e,a){var d=c.split(e);
if(d){for(var b=0;
b<d.length;
b++){d[b]=its.string.trim(d[b],a)
}}return d
};
its.string.xmlEscape=function xmlEscape(c){var b=String.fromCharCode(38);
return c.replace(/&/g,b+"amp;").replace(/</g,b+"lt;").replace(/>/g,b+"gt;").replace(/&quot;/g,b+"quot;").replace(/&apos;/g,b+"apos;")
};
its.string.xmlUnescape=function xmlUnescape(a){return a.replace(/&apos;/g,String.fromCharCode(39)).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")
};
its.string.htmlUnescape=function htmlUnescape(c){var a=document.createElement("textarea");
a.innerHTML=c.replace(/</g,"&lt;").replace(/>/g,"&gt;");
var b=a.value;
a.remove();
return b
};
its.string.urlDecode=function urlDecode(b){var a=b;
if(b){a=b.replace(/\+/g," ");
a=decodeURIComponent(a)
}return a
};
var _dateExpression=new RegExp("^([0-9]{4}/[0-9]{2}/[0-9]{2})/(.*)");
its.string.compare=function itsCompareStrings(n,m,f,k){var e=null;
var g=1;
if(f){g=-1
}var d=_dateExpression.exec(n);
var b=_dateExpression.exec(m);
if(d&&b){if(d[1]==b[1]){n=d[2];
m=b[2]
}else{e=d[1]>b[1]?1:-1;
if(k){g=-1
}}}if(!e){var p=parseFloat(n);
var o=parseFloat(m);
if(!isNaN(p)&&!isNaN(o)&&(p!=o)){e=p-o
}else{var c=n.toLowerCase();
var a=m.toLowerCase();
if(c<a){e=-1
}else{if(c>a){e=1
}else{e=0;
for(var j=0;
!e&&(j<n.length);
j++){var l=n.charAt(j);
var h=m.charAt(j);
if(l<h){e=1
}else{if(l>h){e=-1
}}}}}}}e*=g;
return e
};
its.string.compareNumerically=function(k,j){if(!k&&!j){return 0
}else{if(!k){return -1
}else{if(!j){return 1
}}}var c="0123456789";
var i=0;
var h=0;
while(i<k.length||h<j.length){var g=k[i];
var f=j[h];
if(!f){return 1
}if(!g){return -1
}var d=c.indexOf(g)>=0;
var e=c.indexOf(f)>=0;
if(d&&e){var b=its.string._getNumberFromBeginningOfString(k,i);
var a=its.string._getNumberFromBeginningOfString(j,h);
if(parseInt(b,10)<parseInt(a,10)){return -1
}if(parseInt(b,10)>parseInt(a,10)){return 1
}i+=b.length;
h+=a.length
}else{if(g<f){return -1
}if(g>f){return 1
}i++;
h++
}}return 0
};
its.string._getNumberFromBeginningOfString=function(a,d){var c="0123456789";
for(var b=d;
b<a.length;
b++){if(c.indexOf(a[b])<0){break
}}return a.substring(d,b)
};
its.string.toInt=function toInt(a){return parseInt(a,10)
};
its.string.isJson=function itsStringIsJson(a){var b=false;
if(!its.isEmpty(a)){var c=a.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
b=(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(c)
}return b
};
its.string.evalJson=function itsStringEvalJson(aString){try{if(its.string.isJson(aString)){return eval("("+aString+")")
}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+aString)
};
if(!window.its.reflect){window.its.reflect={}
}its.reflect.keys=function keys(a){var b=[];
for(var c in a){if(!its.isFunction(a[c])){b.push(c)
}}return b
};
its.reflect.values=function values(a){var b=[];
for(var d in a){var c=a[d];
if(!its.isFunction(c)){b.push(c)
}}return b
};
its.reflect.methods=function methods(a){var b=[];
for(var d in a){var c=a[d];
if(its.isFunction(c)){b.push(c)
}}return b
};
if(!window.its.url){window.its.url={}
}its.url.queryParamsDict=function itsUrlQueryParamsDict(b){var a=null;
var c=null;
if(!b){c=window.location.search
}else{var d=b.indexOf("?");
if(d>=0){c=b.substring(d)
}}if(c){a=its.url.parseQueryParams(c)
}else{a={}
}return a
};
its.url.queryParamValue=function itsUrlQueryParamValue(b,a){var c=its.url.queryParamsDict(a);
return c[b]
};
its.url.parseQueryParams=function parseQueryParams(g,c){var f={};
if(g!=null&&g.length>0){if(g.charAt(0)==="?"){g=g.substr(1)
}var b=g.indexOf("#");
if(b!==-1){g=g.substr(0,b)
}var e=g.split("&");
for(var a=0;
a<e.length;
a++){var d=e[a].split("=");
if(d.length==2){var h=d[1];
if(!c){h=its.string.urlDecode(h)
}f[d[0]]=h
}}}return f
};
its.url.parseHashAnchorParams=function itsUrlParseHashAnchorParams(e){var b={};
if(!e){e=window.location.hash
}if(e!=null&&e.length>0){if(e.charAt(0)==="#"){e=e.substr(1)
}var f=e.split(";");
for(var c=0;
c<f.length;
c++){var d=f[c].split("=");
if(d.length==2){var a=its.string.urlDecode(d[1]);
b[d[0]]=a
}else{b[f[c]]=""
}}}return b
};
its.url.parseHostname=function parseHostname(c){var a="";
if(c){c=c.toString();
if(c&&(c.indexOf("://")>0)){var b=c.indexOf("://")+3;
var d=c.indexOf("/",b);
if(d===-1){d=c.length
}a=c.substring(b,d)
}}return a
};
its.url.finalPathComponent=function itsUrlfinalPathComponent(b){var a="";
if(b){b=b.toString();
if(b&&(b!="")){var c=b.lastIndexOf("/");
if((c==(b.length-1))&&(c>0)){var c=b.lastIndexOf(c-1)
}if(c!=(b.length-1)){a=b.substring(c+1)
}if((c=a.lastIndexOf("/"))!=-1){a=a.substring(0,c)
}if((c=a.lastIndexOf("?"))!=-1){a=a.substring(0,c)
}}}return a
};
its.url.buildUrlFromMap=function(d){var b=[];
for(var a in d){if(d.hasOwnProperty(a)){var c=d[a];
if(typeof(c)!="undefined"&&c!=null){b.push(a+"="+encodeURIComponent(c))
}}}return b.join("&")
};
its.url.appendUrlParameter=function appendUrlParameter(b,a,c){var d={};
d[a]=c;
return its.url.appendUrlParameters(b,d)
};
its.url.appendUrlParameters=function appendUrlParameters(b,c){if(!c){return b
}var a=(b.indexOf("?")===-1)?"?":"&";
var d=its.url.buildUrlFromMap(c);
b+=a+d;
return b
};
its.url.baseUrl=function baseUrl(b){var a=b.indexOf("?");
if(a===-1){a=b.indexOf("#");
if(a===-1){return b
}}return b.substring(0,a)
};
its.url.originalLocationQueryParams=its.url.queryParamsDict();
its.url.originalLocationHashAnchorParams=its.url.parseHashAnchorParams();
its.url.formRedirect=function itsUrlFormRedirect(d,c,b){var a=document.createElement("form");
a.method=b?"post":"get";
a.target=d;
a.action=c;
document.body.appendChild(a);
a.submit()
};
its.url.openExternalUrl=function itsOpenExternalUrl(b,d){var c=document.createElement("a");
c.setAttribute("href",b);
if(d=="main"){c.setAttribute("target",d)
}else{c.setAttribute("target","_blank")
}var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
c.dispatchEvent(a)
};
if(!window.its.cookies){window.its.cookies={}
}its.cookies.EXPIRE_NOW=-1;
its.cookies.EXPIRE_SESSION=null;
its.cookies.EXPIRE_ONE_SECOND=1;
its.cookies.EXPIRE_ONE_MINUTE=its.cookies.EXPIRE_ONE_SECOND*60;
its.cookies.EXPIRE_ONE_HOUR=its.cookies.EXPIRE_ONE_MINUTE*60;
its.cookies.EXPIRE_ONE_DAY=its.cookies.EXPIRE_ONE_HOUR*24;
its.cookies.EXPIRE_ONE_WEEK=its.cookies.EXPIRE_ONE_DAY*7;
its.cookies.EXPIRE_ONE_MONTH=its.cookies.EXPIRE_ONE_DAY*31;
its.cookies.EXPIRE_ONE_YEAR=its.cookies.EXPIRE_ONE_DAY*365;
its.cookies.EXPIRE_ONE_SIDEREAL_YEAR=its.cookies.EXPIRE_ONE_DAY*365.25;
its.cookies.set=function itsCookiesSet(e,d,a,c,b){if(d){d=escape(d)
}return its.cookies.setUnescaped(e,d,a,c,b)
};
its.cookies.get=function itsCookiesGet(b){var a=its.cookies.getUnescaped(b);
if(a){a=unescape(a)
}return a
};
its.cookies.setUnescaped=function itsCookiesSetUnescaped(e,b,g,i,d){var a="";
var f="";
if(g){var c=new Date();
c.setTime(c.getTime()+(g*1000));
a=c.toUTCString()
}if(!i){i="/"
}if(d){f=" domain="+d
}var h=e+"="+b+"; expires="+a+"; path="+i+";"+f;
its.cookies._debugAndUnitTestLastRawSetCookieString=h;
document.cookie=h
};
its.cookies.getUnescaped=function itsCookiesGetUnescaped(h){var e=its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride||its.cookies._cookie();
if(e&&h){its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride=null;
var d=e.split(";");
var a=null;
for(var c=(d.length-1);
!a&&(c>=0);
c--){var b=d[c];
var g=b.indexOf("=");
if(g>0){if(g+1==b.length){a=""
}else{var f=its.string.trim(b.substring(0,g));
if(f==h){its.cookies._debugAndUnitTestLastRawGetCookieString=b;
a=its.string.trim(b.substring(g+1))
}}}}}return a
};
its.cookies._cookie=function _cookie(){return document.cookie
};
its.cookies.remove=function itsCookiesRemove(b,a){return its.cookies.setUnescaped(b,"",its.cookies.EXPIRE_NOW,null,a)
};
if(typeof(iTSLocalization)=="undefined"){iTSLocalization=new Object()
}iTSLocalization.hasLocalizedValue=function(a){for(attrname in iTSLocalization._strings){if(iTSLocalization._strings[attrname][a]!=null){var b=iTSLocalization._strings[attrname][a]
}}return its.isDefined(b)
};
iTSLocalization.localize=function localize(b,a){for(attrname in iTSLocalization._strings){if(iTSLocalization._strings[attrname][b]!=null){var c=iTSLocalization._strings[attrname][b]
}}if(!c){return b
}if(a){c=iTSLocalization.replaceTokens(c,a)
}return c
};
its.loc=iTSLocalization.localize;
iTSLocalization.localizeWithParameter=function localize(a,c,b){var d={};
d[c]=b;
return iTSLocalization.localize(a,d)
};
iTSLocalization.replaceTokens=function localize(c,a){if(a){for(property in a){var b="@@"+property+"@@";
c=c.replace(new RegExp(b,"g"),""+a[property])
}}return c
};
iTSLocalization.localizedResourceUrlForPath=function localizedUrlForPath(a){var b=iTSLocalization.localize(a);
return"http://ax.phobos.apple.com.edgesuite.net"+b
};
its.isXMLResponse=function(a){return(a&&its.string.startsWith(a.getResponseHeader("content-type"),"text/xml"))
};
its.notifications={_listeners:{},subscribe:function(a,c){var b=this._listeners[a];
if(!b){this._listeners[a]=b=[]
}b.push(c)
},unsubscribe:function(b,d){var c=this._listeners[b];
if(!c){return
}var a=c.indexOf(d);
if(a>=0){c.splice(a,1)
}},publish:function(a,b){this._sendNotification(this._listeners[a],b)
},remove:function(a){var b=this._listeners[a];
if(!b){return
}delete this._listeners[a]
},_sendNotification:function(d,c){if(!d){return
}for(var b=0,a=d.length;
b<a;
b++){if(d[b]){d[b](c)
}}}};
its.plistDictGetValue=function plistDictGetValue(g,d){if(!g){return
}var a=g.childNodes.length;
var e=null;
for(var b=0;
b<a;
b++){var f=g.childNodes[b];
if(f.nodeType===Node.ELEMENT_NODE){if(e){if(f.nodeName==="array"||f.nodeName==="dict"){return f
}return f.textContent
}if(f.nodeName==="key"&&f.textContent===d){e=f
}}}};
its.plistDictRemoveValue=function plistDictRemoveValue(h,e){if(!h){return
}var b=h.childNodes.length;
var f=null;
var a=null;
for(var d=0;
d<b;
d++){var g=h.childNodes[d];
if(g.nodeType===Node.ELEMENT_NODE){if(f){a=g;
break
}if(g.nodeName==="key"&&g.textContent===e){f=g
}}}if(f&&a){h.removeChild(f);
h.removeChild(a)
}}; /*
 * jQuery JavaScript Library v1.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://docs.jquery.com/License
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Jan 13 15:23:05 2010 -0500
 */
(function(aL,I){function ae(){if(!af.isReady){try{J.documentElement.doScroll("left")
}catch(c){setTimeout(ae,1);
return
}af.ready()
}}function n(s,c){c.src?af.ajax({url:c.src,async:false,dataType:"script"}):af.globalEval(c.text||c.textContent||c.innerHTML||"");
c.parentNode&&c.parentNode.removeChild(c)
}function aY(s,c,L,G,H,A){var w=s.length;
if(typeof c==="object"){for(var K in c){aY(s,K,c[K],G,H,L)
}return s
}if(L!==I){G=!A&&G&&af.isFunction(L);
for(K=0;
K<w;
K++){H(s[K],c,G?L.call(s[K],K,H(s[K],c)):L,A)
}return s
}return w?H(s[0],c):null
}function aA(){return(new Date).getTime()
}function aR(){return false
}function ax(){return true
}function z(s,c,w){w[0].type=s;

return af.event.handle.apply(c,w)
}function m(O){var M=true,L=[],H=[],K=arguments,G,A,s,c,w,P=af.extend({},af.data(this,"events").live);
for(c in P){A=P[c];
if(A.live===O.type||A.altLive&&af.inArray(O.type,A.altLive)>-1){G=A.data;
G.beforeFilter&&G.beforeFilter[O.type]&&!G.beforeFilter[O.type](O)||H.push(A.selector)
}else{delete P[c]
}}G=af(O.target).closest(H,O.currentTarget);
w=0;
for(l=G.length;
w<l;
w++){for(c in P){A=P[c];
s=G[w].elem;
H=null;
if(G[w].selector===A.selector){if(A.live==="mouseenter"||A.live==="mouseleave"){H=af(O.relatedTarget).closest(A.selector)[0]
}if(!H||H!==s){L.push({elem:s,fn:A})
}}}}w=0;
for(l=L.length;
w<l;
w++){G=L[w];
O.currentTarget=G.elem;
O.data=G.fn.data;
if(G.fn.apply(G.elem,K)===false){M=false;
break
}}return M
}function bf(s,c){return["live",s,c.replace(/\./g,"`").replace(/ /g,"&")].join(".")
}function a0(c){return !c||!c.parentNode||c.parentNode.nodeType===11
}function aM(s,c){var w=0;
c.each(function(){if(this.nodeName===(s[w]&&s[w].nodeName)){var H=af.data(s[w++]),K=af.data(this,H);
if(H=H&&H.events){delete K.handle;
K.events={};
for(var G in H){for(var A in H[G]){af.event.add(this,G,H[G][A],H[G][A].data)
}}}}})
}function ai(s,c,H){var A,G,w;
if(s.length===1&&typeof s[0]==="string"&&s[0].length<512&&s[0].indexOf("<option")<0){G=true;
if(w=af.fragments[s[0]]){if(w!==1){A=w
}}}if(!A){c=c&&c[0]?c[0].ownerDocument||c[0]:J;
A=c.createDocumentFragment();
af.clean(s,c,A,H)
}if(G){af.fragments[s[0]]=w?A:1
}return{fragment:A,cacheable:G}
}function aq(s){for(var c=0,A,w;
(A=s[c])!=null;
c++){if(!af.noData[A.nodeName.toLowerCase()]&&(w=A[aE])){delete af.cache[w]
}}}function az(s,c){var w={};
af.each(D.concat.apply([],D.slice(0,c)),function(){w[this]=s
});
return w
}function p(c){return"scrollTo" in c&&c.document?c:c.nodeType===9?c.defaultView||c.parentWindow:false
}var af=function(s,c){return new af.fn.init(s,c)
},bg=aL.jQuery,a1=aL.$,J=aL.document,ap,aN=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,aj=/^.[^:#\[\.,]*$/,E=/\S/,q=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,d=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,av=navigator.userAgent,b=false,at=[],ay,S=Object.prototype.toString,u=Object.prototype.hasOwnProperty,g=Array.prototype.push,ar=Array.prototype.slice,ao=Array.prototype.indexOf;
af.fn=af.prototype={init:function(s,c){var A,w;
if(!s){return this
}if(s.nodeType){this.context=this[0]=s;
this.length=1;
return this
}if(typeof s==="string"){if((A=aN.exec(s))&&(A[1]||!c)){if(A[1]){w=c?c.ownerDocument||c:J;
if(s=d.exec(s)){if(af.isPlainObject(c)){s=[J.createElement(s[1])];
af.fn.attr.call(s,c,true)
}else{s=[w.createElement(s[1])]
}}else{s=ai([A[1]],[w]);
s=(s.cacheable?s.fragment.cloneNode(true):s.fragment).childNodes
}}else{if(c=J.getElementById(A[2])){if(c.id!==A[2]){return ap.find(s)
}this.length=1;
this[0]=c
}this.context=J;
this.selector=s;
return this
}}else{if(!c&&/^\w+$/.test(s)){this.selector=s;
this.context=J;
s=J.getElementsByTagName(s)
}else{return !c||c.jquery?(c||ap).find(s):af(c).find(s)
}}}else{if(af.isFunction(s)){return ap.ready(s)
}}if(s.selector!==I){this.selector=s.selector;
this.context=s.context
}return af.isArray(s)?this.setArray(s):af.makeArray(s,this)
},selector:"",jquery:"1.4",length:0,size:function(){return this.length
},toArray:function(){return ar.call(this,0)
},get:function(c){return c==null?this.toArray():c<0?this.slice(c)[0]:this[c]
},pushStack:function(s,c,w){s=af(s||null);
s.prevObject=this;
s.context=this.context;
if(c==="find"){s.selector=this.selector+(this.selector?" ":"")+w
}else{if(c){s.selector=this.selector+"."+c+"("+w+")"
}}return s
},setArray:function(c){this.length=0;
g.apply(this,c);
return this
},each:function(s,c){return af.each(this,s,c)
},ready:function(c){af.bindReady();
if(af.isReady){c.call(J,af)
}else{at&&at.push(c)
}return this
},eq:function(c){return c===-1?this.slice(c):this.slice(c,+c+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(ar.apply(this,arguments),"slice",ar.call(arguments).join(","))
},map:function(c){return this.pushStack(af.map(this,function(s,w){return c.call(s,w,s)
}))
},end:function(){return this.prevObject||af(null)
},push:g,sort:[].sort,splice:[].splice};
af.fn.init.prototype=af.fn;
af.extend=af.fn.extend=function(){var s=arguments[0]||{},c=1,L=arguments.length,G=false,H,A,w,K;
if(typeof s==="boolean"){G=s;
s=arguments[1]||{};
c=2
}if(typeof s!=="object"&&!af.isFunction(s)){s={}
}if(L===c){s=this;
--c
}for(;
c<L;
c++){if((H=arguments[c])!=null){for(A in H){w=s[A];
K=H[A];
if(s!==K){if(G&&K&&(af.isPlainObject(K)||af.isArray(K))){w=w&&(af.isPlainObject(w)||af.isArray(w))?w:af.isArray(K)?[]:{};
s[A]=af.extend(G,w,K)
}else{if(K!==I){s[A]=K
}}}}}}return s
};
af.extend({noConflict:function(c){aL.$=a1;
if(c){aL.jQuery=bg
}return af
},isReady:false,ready:function(){if(!af.isReady){if(!J.body){return setTimeout(af.ready,13)
}af.isReady=true;
if(at){for(var s,c=0;
s=at[c++];
){s.call(J,af)
}at=null
}af.fn.triggerHandler&&af(J).triggerHandler("ready")
}},bindReady:function(){if(!b){b=true;
if(J.readyState==="complete"){return af.ready()
}if(J.addEventListener){J.addEventListener("DOMContentLoaded",ay,false);
aL.addEventListener("load",af.ready,false)
}else{if(J.attachEvent){J.attachEvent("onreadystatechange",ay);
aL.attachEvent("onload",af.ready);
var s=false;
try{s=aL.frameElement==null
}catch(c){}J.documentElement.doScroll&&s&&ae()
}}}},isFunction:function(c){return S.call(c)==="[object Function]"
},isArray:function(c){return S.call(c)==="[object Array]"
},isPlainObject:function(s){if(!s||S.call(s)!=="[object Object]"||s.nodeType||s.setInterval){return false
}if(s.constructor&&!u.call(s,"constructor")&&!u.call(s.constructor.prototype,"isPrototypeOf")){return false
}var c;
for(c in s){}return c===I||u.call(s,c)
},isEmptyObject:function(s){for(var c in s){return false
}return true
},noop:function(){},globalEval:function(s){if(s&&E.test(s)){var c=J.getElementsByTagName("head")[0]||J.documentElement,w=J.createElement("script");
w.type="text/javascript";
if(af.support.scriptEval){w.appendChild(J.createTextNode(s))
}else{w.text=s
}c.insertBefore(w,c.firstChild);
c.removeChild(w)
}},nodeName:function(s,c){return s.nodeName&&s.nodeName.toUpperCase()===c.toUpperCase()
},each:function(s,c,K){var G,H=0,A=s.length,w=A===I||af.isFunction(s);
if(K){if(w){for(G in s){if(c.apply(s[G],K)===false){break
}}}else{for(;
H<A;
){if(c.apply(s[H++],K)===false){break
}}}}else{if(w){for(G in s){if(c.call(s[G],G,s[G])===false){break
}}}else{for(K=s[0];
H<A&&c.call(K,H,K)!==false;
K=s[++H]){}}}return s
},trim:function(c){return(c||"").replace(q,"")
},makeArray:function(s,c){c=c||[];
if(s!=null){s.length==null||typeof s==="string"||af.isFunction(s)||typeof s!=="function"&&s.setInterval?g.call(c,s):af.merge(c,s)
}return c
},inArray:function(s,c){if(c.indexOf){return c.indexOf(s)
}for(var A=0,w=c.length;
A<w;
A++){if(c[A]===s){return A
}}return -1
},merge:function(s,c){var G=s.length,w=0;
if(typeof c.length==="number"){for(var A=c.length;
w<A;
w++){s[G++]=c[w]
}}else{for(;
c[w]!==I;
){s[G++]=c[w++]
}}s.length=G;
return s
},grep:function(s,c,H){for(var A=[],G=0,w=s.length;
G<w;
G++){!H!==!c(s[G],G)&&A.push(s[G])
}return A
},map:function(s,c,K){for(var G=[],H,A=0,w=s.length;
A<w;
A++){H=c(s[A],A,K);
if(H!=null){G[G.length]=H
}}return G.concat.apply([],G)
},guid:1,proxy:function(s,c,w){if(arguments.length===2){if(typeof c==="string"){w=s;
s=w[c];
c=I
}else{if(c&&!af.isFunction(c)){w=c;
c=I
}}}if(!c&&s){c=function(){return s.apply(w||this,arguments)
}
}if(s){c.guid=s.guid=s.guid||c.guid||af.guid++
}return c
},uaMatch:function(s){var c={browser:""};
s=s.toLowerCase();
if(/webkit/.test(s)){c={browser:"webkit",version:/webkit[\/ ]([\w.]+)/}
}else{if(/opera/.test(s)){c={browser:"opera",version:/version/.test(s)?/version[\/ ]([\w.]+)/:/opera[\/ ]([\w.]+)/}
}else{if(/msie/.test(s)){c={browser:"msie",version:/msie ([\w.]+)/}
}else{if(/mozilla/.test(s)&&!/compatible/.test(s)){c={browser:"mozilla",version:/rv:([\w.]+)/}
}}}}c.version=(c.version&&c.version.exec(s)||[0,"0"])[1];
return c
},browser:{}});
av=af.uaMatch(av);
if(av.browser){af.browser[av.browser]=true;
af.browser.version=av.version
}if(af.browser.webkit){af.browser.safari=true
}if(ao){af.inArray=function(s,c){return ao.call(c,s)
}
}ap=af(J);
if(J.addEventListener){ay=function(){J.removeEventListener("DOMContentLoaded",ay,false);
af.ready()
}
}else{if(J.attachEvent){ay=function(){if(J.readyState==="complete"){J.detachEvent("onreadystatechange",ay);
af.ready()
}}
}}if(ao){af.inArray=function(s,c){return ao.call(c,s)
}
}(function(){af.support={};
var s=J.documentElement,c=J.createElement("script"),L=J.createElement("div"),G="script"+aA();
L.style.display="none";
L.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var H=L.getElementsByTagName("*"),A=L.getElementsByTagName("a")[0];
if(!(!H||!H.length||!A)){af.support={leadingWhitespace:L.firstChild.nodeType===3,tbody:!L.getElementsByTagName("tbody").length,htmlSerialize:!!L.getElementsByTagName("link").length,style:/red/.test(A.getAttribute("style")),hrefNormalized:A.getAttribute("href")==="/a",opacity:/^0.55$/.test(A.style.opacity),cssFloat:!!A.style.cssFloat,checkOn:L.getElementsByTagName("input")[0].value==="on",optSelected:J.createElement("select").appendChild(J.createElement("option")).selected,scriptEval:false,noCloneEvent:true,boxModel:null};
c.type="text/javascript";
try{c.appendChild(J.createTextNode("window."+G+"=1;"))
}catch(w){}s.insertBefore(c,s.firstChild);
if(aL[G]){af.support.scriptEval=true;
delete aL[G]
}s.removeChild(c);
if(L.attachEvent&&L.fireEvent){L.attachEvent("onclick",function K(){af.support.noCloneEvent=false;
L.detachEvent("onclick",K)
});
L.cloneNode(true).fireEvent("onclick")
}af(function(){var M=J.createElement("div");
M.style.width=M.style.paddingLeft="1px";
J.body.appendChild(M);
af.boxModel=af.support.boxModel=M.offsetWidth===2;
J.body.removeChild(M).style.display="none"
});
s=function(O){var M=J.createElement("div");
O="on"+O;
var P=O in M;
if(!P){M.setAttribute(O,"return;");
P=typeof M[O]==="function"
}return P
};
af.support.submitBubbles=s("submit");
af.support.changeBubbles=s("change");
s=c=L=H=A=null
}})();
af.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};
var aE="jQuery"+aA(),a4=0,a3={},aP={};
af.extend({cache:{},expando:aE,noData:{embed:true,object:true,applet:true},data:function(s,c,G){if(!(s.nodeName&&af.noData[s.nodeName.toLowerCase()])){s=s==aL?a3:s;
var w=s[aE],A=af.cache;
if(!c&&!w){return null
}w||(w=++a4);
if(typeof c==="object"){s[aE]=w;
A=A[w]=af.extend(true,{},c)
}else{A=A[w]?A[w]:typeof G==="undefined"?aP:(A[w]={})
}if(G!==I){s[aE]=w;
A[c]=G
}return typeof c==="string"?A[c]:A
}},removeData:function(s,c){if(!(s.nodeName&&af.noData[s.nodeName.toLowerCase()])){s=s==aL?a3:s;
var H=s[aE],A=af.cache,G=A[H];
if(c){if(G){delete G[c];
af.isEmptyObject(G)&&af.removeData(s)
}}else{try{delete s[aE]
}catch(w){s.removeAttribute&&s.removeAttribute(aE)
}delete A[H]
}}}});
af.fn.extend({data:function(s,c){if(typeof s==="undefined"&&this.length){return af.data(this[0])
}else{if(typeof s==="object"){return this.each(function(){af.data(this,s)
})
}}var A=s.split(".");
A[1]=A[1]?"."+A[1]:"";
if(c===I){var w=this.triggerHandler("getData"+A[1]+"!",[A[0]]);
if(w===I&&this.length){w=af.data(this[0],s)
}return w===I&&A[1]?this.data(A[0]):w
}else{return this.trigger("setData"+A[1]+"!",[A[0],c]).each(function(){af.data(this,s,c)
})
}},removeData:function(c){return this.each(function(){af.removeData(this,c)
})
}});
af.extend({queue:function(s,c,A){if(s){c=(c||"fx")+"queue";
var w=af.data(s,c);
if(!A){return w||[]
}if(!w||af.isArray(A)){w=af.data(s,c,af.makeArray(A))
}else{w.push(A)
}return w
}},dequeue:function(s,c){c=c||"fx";
var A=af.queue(s,c),w=A.shift();
if(w==="inprogress"){w=A.shift()
}if(w){c==="fx"&&A.unshift("inprogress");
w.call(s,function(){af.dequeue(s,c)
})
}}});
af.fn.extend({queue:function(s,c){if(typeof s!=="string"){c=s;
s="fx"
}if(c===I){return af.queue(this[0],s)
}return this.each(function(){var w=af.queue(this,s,c);
s==="fx"&&w[0]!=="inprogress"&&af.dequeue(this,s)
})
},dequeue:function(c){return this.each(function(){af.dequeue(this,c)
})
},delay:function(s,c){s=af.fx?af.fx.speeds[s]||s:s;
c=c||"fx";
return this.queue(c,function(){var w=this;
setTimeout(function(){af.dequeue(w,c)
},s)
})
},clearQueue:function(c){return this.queue(c||"fx",[])
}});
var aO=/[\n\t]/g,a7=/\s+/,al=/\r/g,F=/href|src|style/,r=/(button|input)/i,e=/(button|input|object|select|textarea)/i,a5=/^(a|area)$/i,a8=/radio|checkbox/;
af.fn.extend({attr:function(s,c){return aY(this,s,c,true,af.attr)
},removeAttr:function(c){return this.each(function(){af.attr(this,c,"");
this.nodeType===1&&this.removeAttribute(c)
})
},addClass:function(s){if(af.isFunction(s)){return this.each(function(M){var O=af(this);
O.addClass(s.call(this,M,O.attr("class")))
})
}if(s&&typeof s==="string"){for(var c=(s||"").split(a7),L=0,G=this.length;
L<G;
L++){var H=this[L];
if(H.nodeType===1){if(H.className){for(var A=" "+H.className+" ",w=0,K=c.length;
w<K;
w++){if(A.indexOf(" "+c[w]+" ")<0){H.className+=" "+c[w]
}}}else{H.className=s
}}}}return this
},removeClass:function(s){if(af.isFunction(s)){return this.each(function(M){var O=af(this);
O.removeClass(s.call(this,M,O.attr("class")))
})
}if(s&&typeof s==="string"||s===I){for(var c=(s||"").split(a7),L=0,G=this.length;
L<G;
L++){var H=this[L];
if(H.nodeType===1&&H.className){if(s){for(var A=(" "+H.className+" ").replace(aO," "),w=0,K=c.length;
w<K;
w++){A=A.replace(" "+c[w]+" "," ")
}H.className=A.substring(1,A.length-1)
}else{H.className=""
}}}}return this
},toggleClass:function(s,c){var A=typeof s,w=typeof c==="boolean";
if(af.isFunction(s)){return this.each(function(H){var G=af(this);
G.toggleClass(s.call(this,H,G.attr("class"),c),c)
})
}return this.each(function(){if(A==="string"){for(var L,H=0,G=af(this),M=c,K=s.split(a7);
L=K[H++];
){M=w?M:!G.hasClass(L);
G[M?"addClass":"removeClass"](L)
}}else{if(A==="undefined"||A==="boolean"){this.className&&af.data(this,"__className__",this.className);
this.className=this.className||s===false?"":af.data(this,"__className__")||""
}}})
},hasClass:function(s){s=" "+s+" ";
for(var c=0,w=this.length;
c<w;
c++){if((" "+this[c].className+" ").replace(aO," ").indexOf(s)>-1){return true
}}return false
},val:function(s){if(s===I){var c=this[0];
if(c){if(af.nodeName(c,"option")){return(c.attributes.value||{}).specified?c.value:c.text
}if(af.nodeName(c,"select")){var L=c.selectedIndex,G=[],H=c.options;
c=c.type==="select-one";
if(L<0){return null
}var A=c?L:0;
for(L=c?L+1:H.length;
A<L;
A++){var w=H[A];
if(w.selected){s=af(w).val();
if(c){return s
}G.push(s)
}}return G
}if(a8.test(c.type)&&!af.support.checkOn){return c.getAttribute("value")===null?"on":c.value
}return(c.value||"").replace(al,"")
}return I
}var K=af.isFunction(s);
return this.each(function(O){var Q=af(this),M=s;
if(this.nodeType===1){if(K){M=s.call(this,O,Q.val())
}if(typeof M==="number"){M+=""
}if(af.isArray(M)&&a8.test(this.type)){this.checked=af.inArray(Q.val(),M)>=0
}else{if(af.nodeName(this,"select")){var P=af.makeArray(M);
af("option",this).each(function(){this.selected=af.inArray(af(this).val(),P)>=0
});
if(!P.length){this.selectedIndex=-1
}}else{this.value=M
}}}})
}});
af.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(s,c,H,A){if(!s||s.nodeType===3||s.nodeType===8){return I
}if(A&&c in af.attrFn){return af(s)[c](H)
}A=s.nodeType!==1||!af.isXMLDoc(s);
var G=H!==I;
c=A&&af.props[c]||c;
if(s.nodeType===1){var w=F.test(c);
if(c in s&&A&&!w){if(G){if(c==="type"&&r.test(s.nodeName)&&s.parentNode){throw"type property can't be changed"
}s[c]=H
}if(af.nodeName(s,"form")&&s.getAttributeNode(c)){return s.getAttributeNode(c).nodeValue
}if(c==="tabIndex"){return(c=s.getAttributeNode("tabIndex"))&&c.specified?c.value:e.test(s.nodeName)||a5.test(s.nodeName)&&s.href?0:I
}return s[c]
}if(!af.support.style&&A&&c==="style"){if(G){s.style.cssText=""+H
}return s.style.cssText
}G&&s.setAttribute(c,""+H);
s=!af.support.hrefNormalized&&A&&w?s.getAttribute(c,2):s.getAttribute(c);
return s===null?I:s
}return af.style(s,c,H)
}});
var aJ=function(c){return c.replace(/[^\w\s\.\|`]/g,function(s){return"\\"+s
})
};
af.event={add:function(P,O,L,H){if(!(P.nodeType===3||P.nodeType===8)){if(P.setInterval&&P!==aL&&!P.frameElement){P=aL
}if(!L.guid){L.guid=af.guid++
}if(H!==I){L=af.proxy(L);
L.data=H
}var K=af.data(P,"events")||af.data(P,"events",{}),G=af.data(P,"handle"),A;
if(!G){A=function(){return typeof af!=="undefined"&&!af.event.triggered?af.event.handle.apply(A.elem,arguments):I
};
G=af.data(P,"handle",A)
}if(G){G.elem=P;
O=O.split(/\s+/);
for(var s,c=0;
s=O[c++];
){var w=s.split(".");
s=w.shift();
L.type=w.slice(0).sort().join(".");
var Q=K[s],M=this.special[s]||{};
if(!Q){Q=K[s]={};
if(!M.setup||M.setup.call(P,H,w,L)===false){if(P.addEventListener){P.addEventListener(s,G,false)
}else{P.attachEvent&&P.attachEvent("on"+s,G)
}}}if(M.add){if((w=M.add.call(P,L,H,w,Q))&&af.isFunction(w)){w.guid=w.guid||L.guid;
L=w
}}Q[L.guid]=L;
this.global[s]=true
}P=null
}}},global:{},remove:function(Q,P,M){if(!(Q.nodeType===3||Q.nodeType===8)){var K=af.data(Q,"events"),L,H,G;
if(K){if(P===I||typeof P==="string"&&P.charAt(0)==="."){for(H in K){this.remove(Q,H+(P||""))
}}else{if(P.type){M=P.handler;
P=P.type
}P=P.split(/\s+/);
for(var w=0;
H=P[w++];
){var s=H.split(".");
H=s.shift();
var A=!s.length,R=af.map(s.slice(0).sort(),aJ);
R=new RegExp("(^|\\.)"+R.join("\\.(?:.*\\.)?")+"(\\.|$)");
var O=this.special[H]||{};
if(K[H]){if(M){G=K[H][M.guid];
delete K[H][M.guid]
}else{for(var c in K[H]){if(A||R.test(K[H][c].type)){delete K[H][c]
}}}O.remove&&O.remove.call(Q,s,G);
for(L in K[H]){break
}if(!L){if(!O.teardown||O.teardown.call(Q,s)===false){if(Q.removeEventListener){Q.removeEventListener(H,af.data(Q,"handle"),false)
}else{Q.detachEvent&&Q.detachEvent("on"+H,af.data(Q,"handle"))
}}L=null;
delete K[H]
}}}}for(L in K){break
}if(!L){if(c=af.data(Q,"handle")){c.elem=null
}af.removeData(Q,"events");
af.removeData(Q,"handle")
}}}},trigger:function(O,M,L,H){var K=O.type||O;
if(!H){O=typeof O==="object"?O[aE]?O:af.extend(af.Event(K),O):af.Event(K);
if(K.indexOf("!")>=0){O.type=K=K.slice(0,-1);
O.exclusive=true
}if(!L){O.stopPropagation();
this.global[K]&&af.each(af.cache,function(){this.events&&this.events[K]&&af.event.trigger(O,M,this.handle.elem)
})
}if(!L||L.nodeType===3||L.nodeType===8){return I
}O.result=I;
O.target=L;
M=af.makeArray(M);
M.unshift(O)
}O.currentTarget=L;
var G=af.data(L,"handle");
G&&G.apply(L,M);
var A,s;
try{if(!(L&&L.nodeName&&af.noData[L.nodeName.toLowerCase()])){A=L[K];
s=L["on"+K]
}}catch(c){}G=af.nodeName(L,"a")&&K==="click";
if(!H&&A&&!O.isDefaultPrevented()&&!G){this.triggered=true;
try{L[K]()
}catch(w){}}else{if(s&&L["on"+K].apply(L,M)===false){O.result=false
}}this.triggered=false;
if(!O.isPropagationStopped()){(L=L.parentNode||L.ownerDocument)&&af.event.trigger(O,M,L,true)
}},handle:function(s){var c,H;
s=arguments[0]=af.event.fix(s||aL.event);
s.currentTarget=this;
H=s.type.split(".");
s.type=H.shift();
c=!H.length&&!s.exclusive;
var A=new RegExp("(^|\\.)"+H.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)");
H=(af.data(this,"events")||{})[s.type];
for(var G in H){var w=H[G];
if(c||A.test(w.type)){s.handler=w;
s.data=w.data;
w=w.apply(this,arguments);
if(w!==I){s.result=w;
if(w===false){s.preventDefault();
s.stopPropagation()
}}if(s.isImmediatePropagationStopped()){break
}}}return s.result
},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(s){if(s[aE]){return s
}var c=s;
s=af.Event(c);
for(var A=this.props.length,w;
A;
){w=this.props[--A];
s[w]=c[w]
}if(!s.target){s.target=s.srcElement||J
}if(s.target.nodeType===3){s.target=s.target.parentNode
}if(!s.relatedTarget&&s.fromElement){s.relatedTarget=s.fromElement===s.target?s.toElement:s.fromElement
}if(s.pageX==null&&s.clientX!=null){c=J.documentElement;
A=J.body;
s.pageX=s.clientX+(c&&c.scrollLeft||A&&A.scrollLeft||0)-(c&&c.clientLeft||A&&A.clientLeft||0);
s.pageY=s.clientY+(c&&c.scrollTop||A&&A.scrollTop||0)-(c&&c.clientTop||A&&A.clientTop||0)
}if(!s.which&&(s.charCode||s.charCode===0?s.charCode:s.keyCode)){s.which=s.charCode||s.keyCode
}if(!s.metaKey&&s.ctrlKey){s.metaKey=s.ctrlKey
}if(!s.which&&s.button!==I){s.which=s.button&1?1:s.button&2?3:s.button&4?2:0
}return s
},guid:100000000,proxy:af.proxy,special:{ready:{setup:af.bindReady,teardown:af.noop},live:{add:function(s,c){af.extend(s,c||{});
s.guid+=c.selector+c.live;
af.event.add(this,c.live,m,c)
},remove:function(s){if(s.length){var c=0,w=new RegExp("(^|\\.)"+s[0]+"(\\.|$)");
af.each(af.data(this,"events").live||{},function(){w.test(this.type)&&c++
});
c<1&&af.event.remove(this,s[0],m)
}},special:{}},beforeunload:{setup:function(s,c,w){if(this.setInterval){this.onbeforeunload=w
}return false
},teardown:function(s,c){if(this.onbeforeunload===c){this.onbeforeunload=null
}}}}};
af.Event=function(c){if(!this.preventDefault){return new af.Event(c)
}if(c&&c.type){this.originalEvent=c;
this.type=c.type
}else{this.type=c
}this.timeStamp=aA();
this[aE]=true
};
af.Event.prototype={preventDefault:function(){this.isDefaultPrevented=ax;
var c=this.originalEvent;
if(c){c.preventDefault&&c.preventDefault();
c.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=ax;
var c=this.originalEvent;
if(c){c.stopPropagation&&c.stopPropagation();
c.cancelBubble=true
}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ax;
this.stopPropagation()
},isDefaultPrevented:aR,isPropagationStopped:aR,isImmediatePropagationStopped:aR};
var aU=function(s){for(var c=s.relatedTarget;
c&&c!==this;
){try{c=c.parentNode
}catch(w){break
}}if(c!==this){s.type=s.data;
af.event.handle.apply(this,arguments)
}},aD=function(c){c.type=c.data;
af.event.handle.apply(this,arguments)
};
af.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(s,c){af.event.special[s]={setup:function(w){af.event.add(this,c,w&&w.selector?aD:aU,s)
},teardown:function(w){af.event.remove(this,c,w&&w.selector?aD:aU)
}}
});
if(!af.support.submitBubbles){af.event.special.submit={setup:function(s,c,w){if(this.nodeName.toLowerCase()!=="form"){af.event.add(this,"click.specialSubmit."+w.guid,function(G){var H=G.target,A=H.type;
if((A==="submit"||A==="image")&&af(H).closest("form").length){return z("submit",this,arguments)
}});
af.event.add(this,"keypress.specialSubmit."+w.guid,function(G){var H=G.target,A=H.type;
if((A==="text"||A==="password")&&af(H).closest("form").length&&G.keyCode===13){return z("submit",this,arguments)
}})
}else{return false
}},remove:function(s,c){af.event.remove(this,"click.specialSubmit"+(c?"."+c.guid:""));
af.event.remove(this,"keypress.specialSubmit"+(c?"."+c.guid:""))
}}
}if(!af.support.changeBubbles){var aT=/textarea|input|select/i;
function ac(s){var c=s.type,w=s.value;
if(c==="radio"||c==="checkbox"){w=s.checked
}else{if(c==="select-multiple"){w=s.selectedIndex>-1?af.map(s.options,function(A){return A.selected
}).join("-"):""
}else{if(s.nodeName.toLowerCase()==="select"){w=s.selectedIndex
}}}return w
}function aC(s,c){var G=s.target,w,A;
if(!(!aT.test(G.nodeName)||G.readOnly)){w=af.data(G,"_change_data");
A=ac(G);
if(A!==w){if(s.type!=="focusout"||G.type!=="radio"){af.data(G,"_change_data",A)
}if(G.type!=="select"&&(w!=null||A)){s.type="change";
return af.event.trigger(s,c,this)
}}}}af.event.special.change={filters:{focusout:aC,click:function(s){var c=s.target,w=c.type;
if(w==="radio"||w==="checkbox"||c.nodeName.toLowerCase()==="select"){return aC.call(this,s)
}},keydown:function(s){var c=s.target,w=c.type;
if(s.keyCode===13&&c.nodeName.toLowerCase()!=="textarea"||s.keyCode===32&&(w==="checkbox"||w==="radio")||w==="select-multiple"){return aC.call(this,s)
}},beforeactivate:function(c){c=c.target;
c.nodeName.toLowerCase()==="input"&&c.type==="radio"&&af.data(c,"_change_data",ac(c))
}},setup:function(s,c,A){for(var w in an){af.event.add(this,w+".specialChange."+A.guid,an[w])
}return aT.test(this.nodeName)
},remove:function(s,c){for(var w in an){af.event.remove(this,w+".specialChange"+(c?"."+c.guid:""),an[w])
}return aT.test(this.nodeName)
}};
var an=af.event.special.change.filters
}J.addEventListener&&af.each({focus:"focusin",blur:"focusout"},function(s,c){function w(A){A=af.event.fix(A);
A.type=c;
return af.event.handle.call(this,A)
}af.event.special[c]={setup:function(){this.addEventListener(s,w,true)
},teardown:function(){this.removeEventListener(s,w,true)
}}
});
af.each(["bind","one"],function(s,c){af.fn[c]=function(K,G,H){if(typeof K==="object"){for(var A in K){this[c](A,G,K[A],H)
}return this
}if(af.isFunction(G)){thisObject=H;
H=G;
G=I
}var w=c==="one"?af.proxy(H,function(L){af(this).unbind(L,w);
return H.apply(this,arguments)
}):H;
return K==="unload"&&c!=="one"?this.one(K,G,H,thisObject):this.each(function(){af.event.add(this,K,w,G)
})
}
});
af.fn.extend({unbind:function(s,c){if(typeof s==="object"&&!s.preventDefault){for(var w in s){this.unbind(w,s[w])
}return this
}return this.each(function(){af.event.remove(this,s,c)
})
},trigger:function(s,c){return this.each(function(){af.event.trigger(s,c,this)
})
},triggerHandler:function(s,c){if(this[0]){s=af.Event(s);
s.preventDefault();
s.stopPropagation();
af.event.trigger(s,c,this[0]);
return s.result
}},toggle:function(s){for(var c=arguments,w=1;
w<c.length;
){af.proxy(s,c[w++])
}return this.click(af.proxy(s,function(A){var G=(af.data(this,"lastToggle"+s.guid)||0)%w;
af.data(this,"lastToggle"+s.guid,G+1);
A.preventDefault();
return c[G].apply(this,arguments)||false
}))
},hover:function(s,c){return this.mouseenter(s).mouseleave(c||s)
},live:function(s,c,w){if(af.isFunction(c)){w=c;
c=I
}af(this.context).bind(bf(s,this.selector),{data:c,selector:this.selector,live:s},w);
return this
},die:function(s,c){af(this.context).unbind(bf(s,this.selector),c?{guid:c.guid+this.selector+s}:null);
return this
}});
af.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(s,c){af.fn[c]=function(w){return w?this.bind(c,w):this.trigger(c)
};
if(af.attrFn){af.attrFn[c]=true
}});
aL.attachEvent&&!aL.addEventListener&&aL.attachEvent("onunload",function(){for(var s in af.cache){if(af.cache[s].handle){try{af.event.remove(af.cache[s].handle.elem)
}catch(c){}}}});
(function(){function Y(ba){for(var ab="",aa,Z=0;
ba[Z];
Z++){aa=ba[Z];
if(aa.nodeType===3||aa.nodeType===4){ab+=aa.nodeValue
}else{if(aa.nodeType!==8){ab+=Y(aa.childNodes)
}}}return ab
}function W(bh,bb,ba,ab,Z,aa){Z=0;
for(var bj=ab.length;
Z<bj;
Z++){var bk=ab[Z];
if(bk){bk=bk[bh];
for(var bi=false;
bk;
){if(bk.sizcache===ba){bi=ab[bk.sizset];
break
}if(bk.nodeType===1&&!aa){bk.sizcache=ba;
bk.sizset=Z
}if(bk.nodeName.toLowerCase()===bb){bi=bk;
break
}bk=bk[bh]
}ab[Z]=bi
}}}function V(bh,bb,ba,ab,Z,aa){Z=0;
for(var bj=ab.length;
Z<bj;
Z++){var bk=ab[Z];
if(bk){bk=bk[bh];
for(var bi=false;
bk;
){if(bk.sizcache===ba){bi=ab[bk.sizset];
break
}if(bk.nodeType===1){if(!aa){bk.sizcache=ba;
bk.sizset=Z
}if(typeof bb!=="string"){if(bk===bb){bi=true;
break
}}else{if(L.filter(bb,[bk]).length>0){bi=bk;
break
}}}bk=bk[bh]
}ab[Z]=bi
}}}var T=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,U=0,R=Object.prototype.toString,Q=false,M=true;
[0,0].sort(function(){M=false;
return 0
});
var L=function(bi,bh,ba,ab){ba=ba||[];
var Z=bh=bh||J;
if(bh.nodeType!==1&&bh.nodeType!==9){return[]
}if(!bi||typeof bi!=="string"){return ba
}for(var aa=[],bn,bo,bk,bb,bm=true,bj=s(bh),bl=bi;
(T.exec(""),bn=T.exec(bl))!==null;
){bl=bn[3];
aa.push(bn[1]);
if(bn[2]){bb=bn[3];
break
}}if(aa.length>1&&A.exec(bi)){if(aa.length===2&&O.relative[aa[0]]){bo=P(aa[0]+aa[1],bh)
}else{for(bo=O.relative[aa[0]]?[bh]:L(aa.shift(),bh);
aa.length;
){bi=aa.shift();
if(O.relative[bi]){bi+=aa.shift()
}bo=P(bi,bo)
}}}else{if(!ab&&aa.length>1&&bh.nodeType===9&&!bj&&O.match.ID.test(aa[0])&&!O.match.ID.test(aa[aa.length-1])){bn=L.find(aa.shift(),bh,bj);
bh=bn.expr?L.filter(bn.expr,bn.set)[0]:bn.set[0]
}if(bh){bn=ab?{expr:aa.pop(),set:K(ab)}:L.find(aa.pop(),aa.length===1&&(aa[0]==="~"||aa[0]==="+")&&bh.parentNode?bh.parentNode:bh,bj);
bo=bn.expr?L.filter(bn.expr,bn.set):bn.set;
if(aa.length>0){bk=K(bo)
}else{bm=false
}for(;
aa.length;
){var bp=aa.pop();
bn=bp;
if(O.relative[bp]){bn=aa.pop()
}else{bp=""
}if(bn==null){bn=bh
}O.relative[bp](bk,bn,bj)
}}else{bk=[]
}}bk||(bk=bo);
if(!bk){throw"Syntax error, unrecognized expression: "+(bp||bi)
}if(R.call(bk)==="[object Array]"){if(bm){if(bh&&bh.nodeType===1){for(bi=0;
bk[bi]!=null;
bi++){if(bk[bi]&&(bk[bi]===true||bk[bi].nodeType===1&&w(bh,bk[bi]))){ba.push(bo[bi])
}}}else{for(bi=0;
bk[bi]!=null;
bi++){bk[bi]&&bk[bi].nodeType===1&&ba.push(bo[bi])
}}}else{ba.push.apply(ba,bk)
}}else{K(bk,ba)
}if(bb){L(bb,Z,ba,ab);
L.uniqueSort(ba)
}return ba
};
L.uniqueSort=function(aa){if(G){Q=M;
aa.sort(G);
if(Q){for(var Z=1;
Z<aa.length;
Z++){aa[Z]===aa[Z-1]&&aa.splice(Z--,1)
}}}return aa
};
L.matches=function(aa,Z){return L(aa,null,null,Z)
};
L.find=function(bh,bb,ba){var ab,Z;
if(!bh){return[]
}for(var aa=0,bj=O.order.length;
aa<bj;
aa++){var bk=O.order[aa];
if(Z=O.leftMatch[bk].exec(bh)){var bi=Z[1];
Z.splice(1,1);
if(bi.substr(bi.length-1)!=="\\"){Z[1]=(Z[1]||"").replace(/\\/g,"");
ab=O.find[bk](Z,bb,ba);
if(ab!=null){bh=bh.replace(O.match[bk],"");
break
}}}}ab||(ab=bb.getElementsByTagName("*"));
return{set:ab,expr:bh}
};
L.filter=function(bj,bi,bb,ba){for(var Z=bj,aa=[],bp=bi,bq,bl,bh=bi&&bi[0]&&s(bi[0]);
bj&&bi.length;
){for(var bo in O.filter){if((bq=O.leftMatch[bo].exec(bj))!=null&&bq[2]){var bk=O.filter[bo],bn,br;
br=bq[1];
bl=false;
bq.splice(1,1);
if(br.substr(br.length-1)!=="\\"){if(bp===aa){aa=[]
}if(O.preFilter[bo]){if(bq=O.preFilter[bo](bq,bp,bb,aa,ba,bh)){if(bq===true){continue
}}else{bl=bn=true
}}if(bq){for(var ab=0;
(br=bp[ab])!=null;
ab++){if(br){bn=bk(br,bq,ab,bp);
var bm=ba^!!bn;
if(bb&&bn!=null){if(bm){bl=true
}else{bp[ab]=false
}}else{if(bm){aa.push(br);
bl=true
}}}}}if(bn!==I){bb||(bp=aa);
bj=bj.replace(O.match[bo],"");
if(!bl){return[]
}break
}}}}if(bj===Z){if(bl==null){throw"Syntax error, unrecognized expression: "+bj
}else{break
}}Z=bj
}return bp
};
var O=L.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(Z){return Z.getAttribute("href")
}},relative:{"+":function(bb,ab){var aa=typeof ab==="string",Z=aa&&!/\W/.test(ab);
aa=aa&&!Z;
if(Z){ab=ab.toLowerCase()
}Z=0;
for(var ba=bb.length,bh;
Z<ba;
Z++){if(bh=bb[Z]){for(;
(bh=bh.previousSibling)&&bh.nodeType!==1;
){}bb[Z]=aa||bh&&bh.nodeName.toLowerCase()===ab?bh||false:bh===ab
}}aa&&L.filter(ab,bb,true)
},">":function(bb,ab){var aa=typeof ab==="string";
if(aa&&!/\W/.test(ab)){ab=ab.toLowerCase();
for(var Z=0,ba=bb.length;
Z<ba;
Z++){var bh=bb[Z];
if(bh){aa=bh.parentNode;
bb[Z]=aa.nodeName.toLowerCase()===ab?aa:false
}}}else{Z=0;
for(ba=bb.length;
Z<ba;
Z++){if(bh=bb[Z]){bb[Z]=aa?bh.parentNode:bh.parentNode===ab
}}aa&&L.filter(ab,bb,true)
}},"":function(bb,ab,aa){var Z=U++,ba=V;
if(typeof ab==="string"&&!/\W/.test(ab)){var bh=ab=ab.toLowerCase();
ba=W
}ba("parentNode",ab,Z,bb,bh,aa)
},"~":function(bb,ab,aa){var Z=U++,ba=V;
if(typeof ab==="string"&&!/\W/.test(ab)){var bh=ab=ab.toLowerCase();
ba=W
}ba("previousSibling",ab,Z,bb,bh,aa)
}},find:{ID:function(ab,aa,Z){if(typeof aa.getElementById!=="undefined"&&!Z){return(ab=aa.getElementById(ab[1]))?[ab]:[]
}},NAME:function(bb,ab){if(typeof ab.getElementsByName!=="undefined"){var aa=[];
ab=ab.getElementsByName(bb[1]);
for(var Z=0,ba=ab.length;
Z<ba;
Z++){ab[Z].getAttribute("name")===bb[1]&&aa.push(ab[Z])
}return aa.length===0?null:aa
}},TAG:function(aa,Z){return Z.getElementsByTagName(aa[1])
}},preFilter:{CLASS:function(bh,ba,ab,Z,bb,bi){bh=" "+bh[1].replace(/\\/g,"")+" ";
if(bi){return bh
}bi=0;
for(var aa;
(aa=ba[bi])!=null;
bi++){if(aa){if(bb^(aa.className&&(" "+aa.className+" ").replace(/[\t\n]/g," ").indexOf(bh)>=0)){ab||Z.push(aa)
}else{if(ab){ba[bi]=false
}}}}return false
},ID:function(Z){return Z[1].replace(/\\/g,"")
},TAG:function(Z){return Z[1].toLowerCase()
},CHILD:function(aa){if(aa[1]==="nth"){var Z=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(aa[2]==="even"&&"2n"||aa[2]==="odd"&&"2n+1"||!/\D/.test(aa[2])&&"0n+"+aa[2]||aa[2]);
aa[2]=Z[1]+(Z[2]||1)-0;
aa[3]=Z[3]-0
}aa[0]=U++;
return aa
},ATTR:function(bb,ab,aa,Z,ba,bh){ab=bb[1].replace(/\\/g,"");
if(!bh&&O.attrMap[ab]){bb[1]=O.attrMap[ab]
}if(bb[2]==="~="){bb[4]=" "+bb[4]+" "
}return bb
},PSEUDO:function(bb,ab,aa,Z,ba){if(bb[1]==="not"){if((T.exec(bb[3])||"").length>1||/^\w/.test(bb[3])){bb[3]=L(bb[3],null,null,ab)
}else{bb=L.filter(bb[3],ab,aa,true^ba);
aa||Z.push.apply(Z,bb);
return false
}}else{if(O.match.POS.test(bb[0])||O.match.CHILD.test(bb[0])){return true
}}return bb
},POS:function(Z){Z.unshift(true);
return Z
}},filters:{enabled:function(Z){return Z.disabled===false&&Z.type!=="hidden"
},disabled:function(Z){return Z.disabled===true
},checked:function(Z){return Z.checked===true
},selected:function(Z){return Z.selected===true
},parent:function(Z){return !!Z.firstChild
},empty:function(Z){return !Z.firstChild
},has:function(ab,aa,Z){return !!L(Z[3],ab).length
},header:function(Z){return/h\d/i.test(Z.nodeName)
},text:function(Z){return"text"===Z.type
},radio:function(Z){return"radio"===Z.type
},checkbox:function(Z){return"checkbox"===Z.type
},file:function(Z){return"file"===Z.type
},password:function(Z){return"password"===Z.type
},submit:function(Z){return"submit"===Z.type
},image:function(Z){return"image"===Z.type
},reset:function(Z){return"reset"===Z.type
},button:function(Z){return"button"===Z.type||Z.nodeName.toLowerCase()==="button"
},input:function(Z){return/input|select|textarea|button/i.test(Z.nodeName)
}},setFilters:{first:function(aa,Z){return Z===0
},last:function(ba,ab,aa,Z){return ab===Z.length-1
},even:function(aa,Z){return Z%2===0
},odd:function(aa,Z){return Z%2===1
},lt:function(ab,aa,Z){return aa<Z[3]-0
},gt:function(ab,aa,Z){return aa>Z[3]-0
},nth:function(ab,aa,Z){return Z[3]-0===aa
},eq:function(ab,aa,Z){return Z[3]-0===aa
}},filter:{PSEUDO:function(bb,ab,aa,Z){var ba=ab[1],bh=O.filters[ba];
if(bh){return bh(bb,aa,ab,Z)
}else{if(ba==="contains"){return(bb.textContent||bb.innerText||Y([bb])||"").indexOf(ab[3])>=0
}else{if(ba==="not"){ab=ab[3];
aa=0;
for(Z=ab.length;
aa<Z;
aa++){if(ab[aa]===bb){return false
}}return true
}else{throw"Syntax error, unrecognized expression: "+ba
}}}},CHILD:function(bh,ba){var ab=ba[1],Z=bh;
switch(ab){case"only":case"first":for(;
Z=Z.previousSibling;
){if(Z.nodeType===1){return false
}}if(ab==="first"){return true
}Z=bh;
case"last":for(;
Z=Z.nextSibling;
){if(Z.nodeType===1){return false
}}return true;
case"nth":ab=ba[2];
var bb=ba[3];
if(ab===1&&bb===0){return true
}ba=ba[0];
var bi=bh.parentNode;
if(bi&&(bi.sizcache!==ba||!bh.nodeIndex)){var aa=0;
for(Z=bi.firstChild;
Z;
Z=Z.nextSibling){if(Z.nodeType===1){Z.nodeIndex=++aa
}}bi.sizcache=ba
}bh=bh.nodeIndex-bb;
return ab===0?bh===0:bh%ab===0&&bh/ab>=0
}},ID:function(aa,Z){return aa.nodeType===1&&aa.getAttribute("id")===Z
},TAG:function(aa,Z){return Z==="*"&&aa.nodeType===1||aa.nodeName.toLowerCase()===Z
},CLASS:function(aa,Z){return(" "+(aa.className||aa.getAttribute("class"))+" ").indexOf(Z)>-1
},ATTR:function(ba,ab){var aa=ab[1];
ba=O.attrHandle[aa]?O.attrHandle[aa](ba):ba[aa]!=null?ba[aa]:ba.getAttribute(aa);
aa=ba+"";
var Z=ab[2];
ab=ab[4];
return ba==null?Z==="!=":Z==="="?aa===ab:Z==="*="?aa.indexOf(ab)>=0:Z==="~="?(" "+aa+" ").indexOf(ab)>=0:!ab?aa&&ba!==false:Z==="!="?aa!==ab:Z==="^="?aa.indexOf(ab)===0:Z==="$="?aa.substr(aa.length-ab.length)===ab:Z==="|="?aa===ab||aa.substr(0,ab.length+1)===ab+"-":false
},POS:function(bb,ab,aa,Z){var ba=O.setFilters[ab[2]];
if(ba){return ba(bb,aa,ab,Z)
}}}},A=O.match.POS;
for(var c in O.match){O.match[c]=new RegExp(O.match[c].source+/(?![^\[]*\])(?![^\(]*\))/.source);
O.leftMatch[c]=new RegExp(/(^(?:.|\r|\n)*?)/.source+O.match[c].source.replace(/\\(\d+)/g,function(aa,Z){return"\\"+(Z-0+1)
}))
}var K=function(aa,Z){aa=Array.prototype.slice.call(aa,0);
if(Z){Z.push.apply(Z,aa);
return Z
}return aa
};
try{Array.prototype.slice.call(J.documentElement.childNodes,0)
}catch(H){K=function(ba,ab){ab=ab||[];
if(R.call(ba)==="[object Array]"){Array.prototype.push.apply(ab,ba)
}else{if(typeof ba.length==="number"){for(var aa=0,Z=ba.length;
aa<Z;
aa++){ab.push(ba[aa])
}}else{for(aa=0;
ba[aa];
aa++){ab.push(ba[aa])
}}}return ab
}
}var G;
if(J.documentElement.compareDocumentPosition){G=function(aa,Z){if(!aa.compareDocumentPosition||!Z.compareDocumentPosition){if(aa==Z){Q=true
}return aa.compareDocumentPosition?-1:1
}aa=aa.compareDocumentPosition(Z)&4?-1:aa===Z?0:1;
if(aa===0){Q=true
}return aa
}
}else{if("sourceIndex" in J.documentElement){G=function(aa,Z){if(!aa.sourceIndex||!Z.sourceIndex){if(aa==Z){Q=true
}return aa.sourceIndex?-1:1
}aa=aa.sourceIndex-Z.sourceIndex;
if(aa===0){Q=true
}return aa
}
}else{if(J.createRange){G=function(ba,ab){if(!ba.ownerDocument||!ab.ownerDocument){if(ba==ab){Q=true
}return ba.ownerDocument?-1:1
}var aa=ba.ownerDocument.createRange(),Z=ab.ownerDocument.createRange();
aa.setStart(ba,0);
aa.setEnd(ba,0);
Z.setStart(ab,0);
Z.setEnd(ab,0);
ba=aa.compareBoundaryPoints(Range.START_TO_END,Z);
if(ba===0){Q=true
}return ba
}
}}}(function(){var ab=J.createElement("div"),aa="script"+(new Date).getTime();
ab.innerHTML="<a name='"+aa+"'/>";
var Z=J.documentElement;
Z.insertBefore(ab,Z.firstChild);
if(J.getElementById(aa)){O.find.ID=function(ba,bb,bh){if(typeof bb.getElementById!=="undefined"&&!bh){return(bb=bb.getElementById(ba[1]))?bb.id===ba[1]||typeof bb.getAttributeNode!=="undefined"&&bb.getAttributeNode("id").nodeValue===ba[1]?[bb]:I:[]
}};
O.filter.ID=function(ba,bb){var bh=typeof ba.getAttributeNode!=="undefined"&&ba.getAttributeNode("id");
return ba.nodeType===1&&bh&&bh.nodeValue===bb
}
}Z.removeChild(ab);
Z=ab=null
})();
(function(){var Z=J.createElement("div");
Z.appendChild(J.createComment(""));
if(Z.getElementsByTagName("*").length>0){O.find.TAG=function(ba,ab){ab=ab.getElementsByTagName(ba[1]);
if(ba[1]==="*"){ba=[];
for(var aa=0;
ab[aa];
aa++){ab[aa].nodeType===1&&ba.push(ab[aa])
}ab=ba
}return ab
}
}Z.innerHTML="<a href='#'></a>";
if(Z.firstChild&&typeof Z.firstChild.getAttribute!=="undefined"&&Z.firstChild.getAttribute("href")!=="#"){O.attrHandle.href=function(aa){return aa.getAttribute("href",2)
}
}Z=null
})();
J.querySelectorAll&&function(){var ab=L,aa=J.createElement("div");
aa.innerHTML="<p class='TEST'></p>";
if(!(aa.querySelectorAll&&aa.querySelectorAll(".TEST").length===0)){L=function(ba,bi,bj,bb){bi=bi||J;
if(!bb&&bi.nodeType===9&&!s(bi)){try{return K(bi.querySelectorAll(ba),bj)
}catch(bh){}}return ab(ba,bi,bj,bb)
};
for(var Z in ab){L[Z]=ab[Z]
}aa=null
}}();
(function(){var Z=J.createElement("div");
Z.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!(!Z.getElementsByClassName||Z.getElementsByClassName("e").length===0)){Z.lastChild.className="e";
if(Z.getElementsByClassName("e").length!==1){O.order.splice(1,0,"CLASS");
O.find.CLASS=function(ba,ab,aa){if(typeof ab.getElementsByClassName!=="undefined"&&!aa){return ab.getElementsByClassName(ba[1])
}};
Z=null
}}})();
var w=J.compareDocumentPosition?function(aa,Z){return aa.compareDocumentPosition(Z)&16
}:function(aa,Z){return aa!==Z&&(aa.contains?aa.contains(Z):true)
},s=function(Z){return(Z=(Z?Z.ownerDocument||Z:0).documentElement)?Z.nodeName!=="HTML":false
},P=function(bb,ab){var aa=[],Z="",ba;
for(ab=ab.nodeType?[ab]:ab;
ba=O.match.PSEUDO.exec(bb);
){Z+=ba[0];
bb=bb.replace(O.match.PSEUDO,"")
}bb=O.relative[bb]?bb+"*":bb;
ba=0;
for(var bh=ab.length;
ba<bh;
ba++){L(bb,ab[ba],aa)
}return L.filter(Z,aa)
};
af.find=L;
af.expr=L.selectors;
af.expr[":"]=af.expr.filters;
af.unique=L.uniqueSort;
af.getText=Y;
af.isXMLDoc=s;
af.contains=w
})();
var aQ=/Until$/,au=/^(?:parents|prevUntil|prevAll)/,N=/,/;
ar=Array.prototype.slice;
var j=function(s,c,A){if(af.isFunction(c)){return af.grep(s,function(H,G){return !!c.call(H,G,H)===A
})
}else{if(c.nodeType){return af.grep(s,function(G){return G===c===A
})
}else{if(typeof c==="string"){var w=af.grep(s,function(G){return G.nodeType===1
});
if(aj.test(c)){return af.filter(c,w,!A)
}else{c=af.filter(c,s)
}}}}return af.grep(s,function(G){return af.inArray(G,c)>=0===A
})
};
af.fn.extend({find:function(s){for(var c=this.pushStack("","find",s),K=0,G=0,H=this.length;
G<H;
G++){K=c.length;
af.find(s,this[G],c);
if(G>0){for(var A=K;
A<c.length;
A++){for(var w=0;
w<K;
w++){if(c[w]===c[A]){c.splice(A--,1);
break
}}}}}return c
},has:function(s){var c=af(s);
return this.filter(function(){for(var A=0,w=c.length;
A<w;
A++){if(af.contains(this,c[A])){return true
}}})
},not:function(c){return this.pushStack(j(this,c,false),"not",c)
},filter:function(c){return this.pushStack(j(this,c,true),"filter",c)
},is:function(c){return !!c&&af.filter(c,this).length>0
},closest:function(M,L){if(af.isArray(M)){var K=[],G=this[0],H,A={},w;
if(G&&M.length){H=0;
for(var s=M.length;
H<s;
H++){w=M[H];
A[w]||(A[w]=af.expr.match.POS.test(w)?af(w,L||this.context):w)
}for(;
G&&G.ownerDocument&&G!==L;
){for(w in A){H=A[w];
if(H.jquery?H.index(G)>-1:af(G).is(H)){K.push({selector:w,elem:G});
delete A[w]
}}G=G.parentNode
}}return K
}var c=af.expr.match.POS.test(M)?af(M,L||this.context):null;
return this.map(function(P,O){for(;
O&&O.ownerDocument&&O!==L;
){if(c?c.index(O)>-1:af(O).is(M)){return O
}O=O.parentNode
}return null
})
},index:function(c){if(!c||typeof c==="string"){return af.inArray(this[0],c?af(c):this.parent().children())
}return af.inArray(c.jquery?c[0]:c,this)
},add:function(s,c){s=typeof s==="string"?af(s,c||this.context):af.makeArray(s);
c=af.merge(this.get(),s);
return this.pushStack(a0(s[0])||a0(c[0])?c:af.unique(c))
},andSelf:function(){return this.add(this.prevObject)
}});
af.each({parent:function(c){return(c=c.parentNode)&&c.nodeType!==11?c:null
},parents:function(c){return af.dir(c,"parentNode")
},parentsUntil:function(s,c,w){return af.dir(s,"parentNode",w)
},next:function(c){return af.nth(c,2,"nextSibling")
},prev:function(c){return af.nth(c,2,"previousSibling")
},nextAll:function(c){return af.dir(c,"nextSibling")
},prevAll:function(c){return af.dir(c,"previousSibling")
},nextUntil:function(s,c,w){return af.dir(s,"nextSibling",w)
},prevUntil:function(s,c,w){return af.dir(s,"previousSibling",w)
},siblings:function(c){return af.sibling(c.parentNode.firstChild,c)
},children:function(c){return af.sibling(c.firstChild)
},contents:function(c){return af.nodeName(c,"iframe")?c.contentDocument||c.contentWindow.document:af.makeArray(c.childNodes)
}},function(s,c){af.fn[s]=function(G,w){var A=af.map(this,c,G);
aQ.test(s)||(w=G);
if(w&&typeof w==="string"){A=af.filter(w,A)
}A=this.length>1?af.unique(A):A;
if((this.length>1||N.test(w))&&au.test(s)){A=A.reverse()
}return this.pushStack(A,s,ar.call(arguments).join(","))
}
});
af.extend({filter:function(s,c,w){if(w){s=":not("+s+")"
}return af.find.matches(s,c)
},dir:function(s,c,A){var w=[];
for(s=s[c];
s&&s.nodeType!==9&&(A===I||!af(s).is(A));
){s.nodeType===1&&w.push(s);
s=s[c]
}return w
},nth:function(s,c,A){c=c||1;
for(var w=0;
s;
s=s[A]){if(s.nodeType===1&&++w===c){break
}}return s
},sibling:function(s,c){for(var w=[];
s;
s=s.nextSibling){s.nodeType===1&&s!==c&&w.push(s)
}return w
}});
var bd=/ jQuery\d+="(?:\d+|null)"/g,am=/^\s+/,t=/(<([\w:]+)[^>]*?)\/>/g,f=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,aX=/<([\w:]+)/,a6=/<tbody/i,aS=/<|&\w+;/,aB=function(s,c,w){return f.test(w)?s:c+"></"+w+">"
},aF={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};
aF.optgroup=aF.option;
aF.tbody=aF.tfoot=aF.colgroup=aF.caption=aF.thead;
aF.th=aF.td;
if(!af.support.htmlSerialize){aF._default=[1,"div<div>","</div>"]
}af.fn.extend({text:function(c){if(af.isFunction(c)){return this.each(function(s){var w=af(this);
return w.text(c.call(this,s,w.text()))
})
}if(typeof c!=="object"&&c!==I){return this.empty().append((this[0]&&this[0].ownerDocument||J).createTextNode(c))
}return af.getText(this)
},wrapAll:function(s){if(af.isFunction(s)){return this.each(function(w){af(this).wrapAll(s.call(this,w))
})
}if(this[0]){var c=af(s,this[0].ownerDocument).eq(0).clone(true);
this[0].parentNode&&c.insertBefore(this[0]);
c.map(function(){for(var w=this;
w.firstChild&&w.firstChild.nodeType===1;
){w=w.firstChild
}return w
}).append(this)
}return this
},wrapInner:function(c){return this.each(function(){var s=af(this),w=s.contents();
w.length?w.wrapAll(c):s.append(c)
})
},wrap:function(c){return this.each(function(){af(this).wrapAll(c)
})
},unwrap:function(){return this.parent().each(function(){af.nodeName(this,"body")||af(this).replaceWith(this.childNodes)
}).end()
},append:function(){return this.domManip(arguments,true,function(c){this.nodeType===1&&this.appendChild(c)
})
},prepend:function(){return this.domManip(arguments,true,function(c){this.nodeType===1&&this.insertBefore(c,this.firstChild)
})
},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(s){this.parentNode.insertBefore(s,this)
})
}else{if(arguments.length){var c=af(arguments[0]);
c.push.apply(c,this.toArray());
return this.pushStack(c,"before",arguments)
}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(s){this.parentNode.insertBefore(s,this.nextSibling)
})
}else{if(arguments.length){var c=this.pushStack(this,"after",arguments);
c.push.apply(c,af(arguments[0]).toArray());
return c
}}},clone:function(s){var c=this.map(function(){if(!af.support.noCloneEvent&&!af.isXMLDoc(this)){var A=this.outerHTML,w=this.ownerDocument;
if(!A){A=w.createElement("div");
A.appendChild(this.cloneNode(true));
A=A.innerHTML
}return af.clean([A.replace(bd,"").replace(am,"")],w)[0]
}else{return this.cloneNode(true)
}});
if(s===true){aM(this,c);
aM(this.find("*"),c.find("*"))
}return c
},html:function(s){if(s===I){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(bd,""):null
}else{if(typeof s==="string"&&!/<script/i.test(s)&&(af.support.leadingWhitespace||!am.test(s))&&!aF[(aX.exec(s)||["",""])[1].toLowerCase()]){try{for(var c=0,A=this.length;
c<A;
c++){if(this[c].nodeType===1){aq(this[c].getElementsByTagName("*"));
this[c].innerHTML=s
}}}catch(w){this.empty().append(s)
}}else{af.isFunction(s)?this.each(function(K){var H=af(this),G=H.html();
H.empty().append(function(){return s.call(this,K,G)
})
}):this.empty().append(s)
}}return this
},replaceWith:function(c){if(this[0]&&this[0].parentNode){af.isFunction(c)||(c=af(c).detach());
return this.each(function(){var s=this.nextSibling,w=this.parentNode;
af(this).remove();
s?af(s).before(c):af(w).append(c)
})
}else{return this.pushStack(af(af.isFunction(c)?c():c),"replaceWith",c)
}},detach:function(c){return this.remove(c,true)
},domManip:function(O,M,L){function H(P){return af.nodeName(P,"table")?P.getElementsByTagName("tbody")[0]||P.appendChild(P.ownerDocument.createElement("tbody")):P
}var K,G,A=O[0],s=[];
if(af.isFunction(A)){return this.each(function(P){var Q=af(this);
O[0]=A.call(this,P,M?Q.html():I);
return Q.domManip(O,M,L)
})
}if(this[0]){K=O[0]&&O[0].parentNode&&O[0].parentNode.nodeType===11?{fragment:O[0].parentNode}:ai(O,this,s);
if(G=K.fragment.firstChild){M=M&&af.nodeName(G,"tr");
for(var c=0,w=this.length;
c<w;
c++){L.call(M?H(this[c],G):this[c],K.cacheable||this.length>1||c>0?K.fragment.cloneNode(true):K.fragment)
}}s&&af.each(s,n)
}return this
}});
af.fragments={};
af.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(s,c){af.fn[s]=function(K){var G=[];
K=af(K);
for(var H=0,A=K.length;
H<A;
H++){var w=(H>0?this.clone(true):this).get();
af.fn[c].apply(af(K[H]),w);
G=G.concat(w)
}return this.pushStack(G,s,K.selector)
}
});
af.each({remove:function(s,c){if(!s||af.filter(s,[this]).length){if(!c&&this.nodeType===1){aq(this.getElementsByTagName("*"));
aq([this])
}this.parentNode&&this.parentNode.removeChild(this)
}},empty:function(){for(this.nodeType===1&&aq(this.getElementsByTagName("*"));
this.firstChild;
){this.removeChild(this.firstChild)
}}},function(s,c){af.fn[s]=function(){return this.each(c,arguments)
}
});
af.extend({clean:function(s,c,G,w){c=c||J;
if(typeof c.createElement==="undefined"){c=c.ownerDocument||c[0]&&c[0].ownerDocument||J
}var A=[];
af.each(s,function(K,H){if(typeof H==="number"){H+=""
}if(H){if(typeof H==="string"&&!aS.test(H)){H=c.createTextNode(H)
}else{if(typeof H==="string"){H=H.replace(t,aB);
var M=(aX.exec(H)||["",""])[1].toLowerCase(),L=aF[M]||aF._default,O=L[0];
K=c.createElement("div");
for(K.innerHTML=L[1]+H+L[2];
O--;
){K=K.lastChild
}if(!af.support.tbody){O=a6.test(H);
M=M==="table"&&!O?K.firstChild&&K.firstChild.childNodes:L[1]==="<table>"&&!O?K.childNodes:[];
for(L=M.length-1;
L>=0;
--L){af.nodeName(M[L],"tbody")&&!M[L].childNodes.length&&M[L].parentNode.removeChild(M[L])
}}!af.support.leadingWhitespace&&am.test(H)&&K.insertBefore(c.createTextNode(am.exec(H)[0]),K.firstChild);
H=af.makeArray(K.childNodes)
}}if(H.nodeType){A.push(H)
}else{A=af.merge(A,H)
}}});
if(G){for(s=0;
A[s];
s++){if(w&&af.nodeName(A[s],"script")&&(!A[s].type||A[s].type.toLowerCase()==="text/javascript")){w.push(A[s].parentNode?A[s].parentNode.removeChild(A[s]):A[s])
}else{A[s].nodeType===1&&A.splice.apply(A,[s+1,0].concat(af.makeArray(A[s].getElementsByTagName("script"))));
G.appendChild(A[s])
}}}return A
}});
var X=/z-?index|font-?weight|opacity|zoom|line-?height/i,aI=/alpha\([^)]*\)/,ag=/opacity=([^)]*)/,x=/float/i,i=/-([a-z])/ig,v=/([A-Z])/g,h=/^-?\d+(?:px)?$/i,a9=/^-?\d/,aV={position:"absolute",visibility:"hidden",display:"block"},aG=["Left","Right"],ad=["Top","Bottom"],y=J.defaultView&&J.defaultView.getComputedStyle,B=af.support.cssFloat?"cssFloat":"styleFloat",bc=function(s,c){return c.toUpperCase()
};
af.fn.css=function(s,c){return aY(this,s,c,true,function(G,w,A){if(A===I){return af.curCSS(G,w)
}if(typeof A==="number"&&!X.test(w)){A+="px"
}af.style(G,w,A)
})
};
af.extend({style:function(s,c,G){if(!s||s.nodeType===3||s.nodeType===8){return I
}if((c==="width"||c==="height")&&parseFloat(G)<0){G=I
}var w=s.style||s,A=G!==I;
if(!af.support.opacity&&c==="opacity"){if(A){w.zoom=1;
c=parseInt(G,10)+""==="NaN"?"":"alpha(opacity="+G*100+")";
s=w.filter||af.curCSS(s,"filter")||"";
w.filter=aI.test(s)?s.replace(aI,c):c
}return w.filter&&w.filter.indexOf("opacity=")>=0?parseFloat(ag.exec(w.filter)[1])/100+"":""
}if(x.test(c)){c=B
}c=c.replace(i,bc);
if(A){w[c]=G
}return w[c]
},css:function(s,c,K,G){if(c==="width"||c==="height"){var H,A=c==="width"?aG:ad;
function w(){H=c==="width"?s.offsetWidth:s.offsetHeight;
G!=="border"&&af.each(A,function(){G||(H-=parseFloat(af.curCSS(s,"padding"+this,true))||0);
if(G==="margin"){H+=parseFloat(af.curCSS(s,"margin"+this,true))||0
}else{H-=parseFloat(af.curCSS(s,"border"+this+"Width",true))||0
}})
}s.offsetWidth!==0?w():af.swap(s,aV,w);
return Math.max(0,Math.round(H))
}return af.curCSS(s,c,K)
},curCSS:function(s,c,H){var A,G=s.style;
if(!af.support.opacity&&c==="opacity"&&s.currentStyle){A=ag.test(s.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";
return A===""?"1":A
}if(x.test(c)){c=B
}if(!H&&G&&G[c]){A=G[c]
}else{if(y){if(x.test(c)){c="float"
}c=c.replace(v,"-$1").toLowerCase();
G=s.ownerDocument.defaultView;
if(!G){return null
}if(s=G.getComputedStyle(s,null)){A=s.getPropertyValue(c)
}if(c==="opacity"&&A===""){A="1"
}}else{if(s.currentStyle){H=c.replace(i,bc);
A=s.currentStyle[c]||s.currentStyle[H];
if(!h.test(A)&&a9.test(A)){c=G.left;
var w=s.runtimeStyle.left;
s.runtimeStyle.left=s.currentStyle.left;
G.left=H==="fontSize"?"1em":A||0;
A=G.pixelLeft+"px";
G.left=c;
s.runtimeStyle.left=w
}}}}return A
},swap:function(s,c,G){var w={};
for(var A in c){w[A]=s.style[A];
s.style[A]=c[A]
}G.call(s);
for(A in c){s.style[A]=w[A]
}}});
if(af.expr&&af.expr.filters){af.expr.filters.hidden=function(s){var c=s.offsetWidth,A=s.offsetHeight,w=s.nodeName.toLowerCase()==="tr";
return c===0&&A===0&&!w?true:c>0&&A>0&&!w?false:af.curCSS(s,"display")==="none"
};
af.expr.filters.visible=function(c){return !af.expr.filters.hidden(c)
}
}var k=aA(),be=/<script(.|\s)*?\/script>/gi,aZ=/select|textarea/i,aK=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,aw=/=\?(&|$)/,aW=/\?/,ah=/(\?|&)_=.*?(&|$)/,C=/^(\w+:)?\/\/([^\/?#]+)/,o=/%20/g;
af.fn.extend({_load:af.fn.load,load:function(s,c,G){if(typeof s!=="string"){return this._load(s)
}else{if(!this.length){return this
}}var w=s.indexOf(" ");
if(w>=0){var A=s.slice(w,s.length);
s=s.slice(0,w)
}w="GET";
if(c){if(af.isFunction(c)){G=c;
c=null
}else{if(typeof c==="object"){c=af.param(c,af.ajaxSettings.traditional);
w="POST"
}}}af.ajax({url:s,type:w,dataType:"html",data:c,context:this,complete:function(K,H){if(H==="success"||H==="notmodified"){this.html(A?af("<div />").append(K.responseText.replace(be,"")).find(A):K.responseText)
}G&&this.each(G,[K.responseText,H,K])
}});
return this
},serialize:function(){return af.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?af.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||aZ.test(this.nodeName)||aK.test(this.type))
}).map(function(s,c){s=af(this).val();
return s==null?null:af.isArray(s)?af.map(s,function(w){return{name:c.name,value:w}
}):{name:c.name,value:s}
}).get()
}});
af.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(s,c){af.fn[c]=function(w){return this.bind(c,w)
}
});
af.extend({get:function(s,c,A,w){if(af.isFunction(c)){w=w||A;
A=c;
c=null
}return af.ajax({type:"GET",url:s,data:c,success:A,dataType:w})
},getScript:function(s,c){return af.get(s,null,c,"script")
},getJSON:function(s,c,w){return af.get(s,c,w,"json")
},post:function(s,c,A,w){if(af.isFunction(c)){w=w||A;
A=c;
c={}
}return af.ajax({type:"POST",url:s,data:c,success:A,dataType:w})
},ajaxSetup:function(c){af.extend(af.ajaxSettings,c)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:aL.XMLHttpRequest&&(aL.location.protocol!=="file:"||!aL.ActiveXObject)?function(){return new aL.XMLHttpRequest
}:function(){try{return new aL.ActiveXObject("Microsoft.XMLHTTP")
}catch(c){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(ba){function ab(){Z.success&&Z.success.call(L,M,T,s);
Z.global&&Y("ajaxSuccess",[s,Z])
}function aa(){Z.complete&&Z.complete.call(L,s,T);
Z.global&&Y("ajaxComplete",[s,Z]);
Z.global&&!--af.active&&af.event.trigger("ajaxStop")
}function Y(bb,bh){(Z.context?af(Z.context):af.event).trigger(bb,bh)
}var Z=af.extend(true,{},af.ajaxSettings,ba),U,T,M,L=Z.context||Z,O=Z.type.toUpperCase();
if(Z.data&&Z.processData&&typeof Z.data!=="string"){Z.data=af.param(Z.data,Z.traditional)
}if(Z.dataType==="jsonp"){if(O==="GET"){aw.test(Z.url)||(Z.url+=(aW.test(Z.url)?"&":"?")+(Z.jsonp||"callback")+"=?")
}else{if(!Z.data||!aw.test(Z.data)){Z.data=(Z.data?Z.data+"&":"")+(Z.jsonp||"callback")+"=?"
}}Z.dataType="json"
}if(Z.dataType==="json"&&(Z.data&&aw.test(Z.data)||aw.test(Z.url))){U=Z.jsonpCallback||"jsonp"+k++;
if(Z.data){Z.data=(Z.data+"").replace(aw,"="+U+"$1")
}Z.url=Z.url.replace(aw,"="+U+"$1");
Z.dataType="script";
aL[U]=aL[U]||function(bb){M=bb;
ab();
aa();
aL[U]=I;
try{delete aL[U]
}catch(bh){}K&&K.removeChild(H)
}
}if(Z.dataType==="script"&&Z.cache===null){Z.cache=false
}if(Z.cache===false&&O==="GET"){var A=aA(),c=Z.url.replace(ah,"$1_="+A+"$2");
Z.url=c+(c===Z.url?(aW.test(Z.url)?"&":"?")+"_="+A:"")
}if(Z.data&&O==="GET"){Z.url+=(aW.test(Z.url)?"&":"?")+Z.data
}Z.global&&!af.active++&&af.event.trigger("ajaxStart");
A=(A=C.exec(Z.url))&&(A[1]&&A[1]!==location.protocol||A[2]!==location.host);
if(Z.dataType==="script"&&O==="GET"&&A){var K=J.getElementsByTagName("head")[0]||J.documentElement,H=J.createElement("script");
H.src=Z.url;
if(Z.scriptCharset){H.charset=Z.scriptCharset
}if(!U){var G=false;
H.onload=H.onreadystatechange=function(){if(!G&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){G=true;
ab();
aa();
H.onload=H.onreadystatechange=null;
K&&H.parentNode&&K.removeChild(H)
}}
}K.insertBefore(H,K.firstChild);
return I
}var w=false,s=Z.xhr();
if(s){Z.username?s.open(O,Z.url,Z.async,Z.username,Z.password):s.open(O,Z.url,Z.async);
try{if(Z.data||ba&&ba.contentType){s.setRequestHeader("Content-Type",Z.contentType)
}if(Z.ifModified){af.lastModified[Z.url]&&s.setRequestHeader("If-Modified-Since",af.lastModified[Z.url]);
af.etag[Z.url]&&s.setRequestHeader("If-None-Match",af.etag[Z.url])
}A||s.setRequestHeader("X-Requested-With","XMLHttpRequest");
s.setRequestHeader("Accept",Z.dataType&&Z.accepts[Z.dataType]?Z.accepts[Z.dataType]+", */*":Z.accepts._default)
}catch(Q){}if(Z.beforeSend&&Z.beforeSend.call(L,s,Z)===false){Z.global&&!--af.active&&af.event.trigger("ajaxStop");
s.abort();
return false
}Z.global&&Y("ajaxSend",[s,Z]);
var W=s.onreadystatechange=function(bb){if(!s||s.readyState===0){w||aa();
w=true;
if(s){s.onreadystatechange=af.noop
}}else{if(!w&&s&&(s.readyState===4||bb==="timeout")){w=true;
s.onreadystatechange=af.noop;
T=bb==="timeout"?"timeout":!af.httpSuccess(s)?"error":Z.ifModified&&af.httpNotModified(s,Z.url)?"notmodified":"success";
if(T==="success"){try{M=af.httpData(s,Z.dataType,Z)
}catch(bh){T="parsererror"
}}if(T==="success"||T==="notmodified"){U||ab()
}else{af.handleError(Z,s,T)
}aa();
bb==="timeout"&&s.abort();
if(Z.async){s=null
}}}};
try{var V=s.abort;
s.abort=function(){if(s){V.call(s);
if(s){s.readyState=0
}}W()
}
}catch(R){}Z.async&&Z.timeout>0&&setTimeout(function(){s&&!w&&W("timeout")
},Z.timeout);
try{s.send(O==="POST"||O==="PUT"||O==="DELETE"?Z.data:null)
}catch(P){af.handleError(Z,s,null,P);
aa()
}Z.async||W();
return s
}},handleError:function(s,c,A,w){if(s.error){s.error.call(s.context||aL,c,A,w)
}if(s.global){(s.context?af(s.context):af.event).trigger("ajaxError",[c,s,w])
}},active:0,httpSuccess:function(s){try{return !s.status&&location.protocol==="file:"||s.status>=200&&s.status<300||s.status===304||s.status===1223||s.status===0
}catch(c){}return false
},httpNotModified:function(s,c){var A=s.getResponseHeader("Last-Modified"),w=s.getResponseHeader("Etag");
if(A){af.lastModified[c]=A
}if(w){af.etag[c]=w
}return s.status===304||s.status===0
},httpData:function(s,c,G){var w=s.getResponseHeader("content-type")||"",A=c==="xml"||!c&&w.indexOf("xml")>=0;
s=A?s.responseXML:s.responseText;
if(A&&s.documentElement.nodeName==="parsererror"){throw"parsererror"
}if(G&&G.dataFilter){s=G.dataFilter(s,c)
}if(typeof s==="string"){if(c==="json"||!c&&w.indexOf("json")>=0){if(/^[\],:{}\s]*$/.test(s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){s=aL.JSON&&aL.JSON.parse?aL.JSON.parse(s):(new Function("return "+s))()
}else{throw"Invalid JSON: "+s
}}else{if(c==="script"||!c&&w.indexOf("javascript")>=0){af.globalEval(s)
}}}return s
},param:function(s,c){function G(K,H){H=af.isFunction(H)?H():H;
w[w.length]=encodeURIComponent(K)+"="+encodeURIComponent(H)
}var w=[];
if(c===I){c=af.ajaxSettings.traditional
}af.isArray(s)||s.jquery?af.each(s,function(){G(this.name,this.value)
}):af.each(s,function A(K,H){if(af.isArray(H)){af.each(H,function(M,L){c?G(K,L):A(K+"["+(typeof L==="object"||af.isArray(L)?M:"")+"]",L)
})
}else{!c&&H!=null&&typeof H==="object"?af.each(H,function(M,L){A(K+"["+M+"]",L)
}):G(K,H)
}});
return w.join("&").replace(o,"+")
}});
var aH={},a=/toggle|show|hide/,a2=/^([+-]=)?([\d+-.]+)(.*)$/,ak,D=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
af.fn.extend({show:function(s,c){if(s!=null){return this.animate(az("show",3),s,c)
}else{s=0;
for(c=this.length;
s<c;
s++){var G=af.data(this[s],"olddisplay");
this[s].style.display=G||"";
if(af.css(this[s],"display")==="none"){G=this[s].nodeName;
var w;
if(aH[G]){w=aH[G]
}else{var A=af("<"+G+" />").appendTo("body");
w=A.css("display");
if(w==="none"){w="block"
}A.remove();
aH[G]=w
}af.data(this[s],"olddisplay",w)
}}s=0;
for(c=this.length;
s<c;
s++){this[s].style.display=af.data(this[s],"olddisplay")||""
}return this
}},hide:function(s,c){if(s!=null){return this.animate(az("hide",3),s,c)
}else{s=0;
for(c=this.length;
s<c;
s++){var w=af.data(this[s],"olddisplay");
!w&&w!=="none"&&af.data(this[s],"olddisplay",af.css(this[s],"display"))
}s=0;
for(c=this.length;
s<c;
s++){this[s].style.display="none"
}return this
}},_toggle:af.fn.toggle,toggle:function(s,c){var w=typeof s==="boolean";
if(af.isFunction(s)&&af.isFunction(c)){this._toggle.apply(this,arguments)
}else{s==null||w?this.each(function(){var A=w?s:af(this).is(":hidden");
af(this)[A?"show":"hide"]()
}):this.animate(az("toggle",3),s,c)
}return this
},fadeTo:function(s,c,w){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:c},s,w)
},animate:function(s,c,G,w){var A=af.speed(c,G,w);
if(af.isEmptyObject(s)){return this.each(A.complete)
}return this[A.queue===false?"each":"queue"](function(){var K=af.extend({},A),H,M=this.nodeType===1&&af(this).is(":hidden"),L=this;
for(H in s){var O=H.replace(i,bc);
if(H!==O){s[O]=s[H];
delete s[H];
H=O
}if(s[H]==="hide"&&M||s[H]==="show"&&!M){return K.complete.call(this)
}if((H==="height"||H==="width")&&this.style){K.display=af.css(this,"display");
K.overflow=this.style.overflow
}if(af.isArray(s[H])){(K.specialEasing=K.specialEasing||{})[H]=s[H][1];
s[H]=s[H][0]
}}if(K.overflow!=null){this.style.overflow="hidden"
}K.curAnim=af.extend({},s);
af.each(s,function(P,U){var V=new af.fx(L,K,P);
if(a.test(U)){V[U==="toggle"?M?"show":"hide":U](s)
}else{var T=a2.exec(U),R=V.cur(true)||0;
if(T){U=parseFloat(T[2]);
var Q=T[3]||"px";
if(Q!=="px"){L.style[P]=(U||1)+Q;
R=(U||1)/V.cur(true)*R;
L.style[P]=R+Q
}if(T[1]){U=(T[1]==="-="?-1:1)*U+R
}V.custom(R,U,Q)
}else{V.custom(R,U,"")
}}});
return true
})
},stop:function(s,c){var w=af.timers;
s&&this.queue([]);
this.each(function(){for(var A=w.length-1;
A>=0;
A--){if(w[A].elem===this){c&&w[A](true);
w.splice(A,1)
}}});
c||this.dequeue();
return this
}});
af.each({slideDown:az("show",1),slideUp:az("hide",1),slideToggle:az("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(s,c){af.fn[s]=function(A,w){return this.animate(c,A,w)
}
});
af.extend({speed:function(s,c,A){var w=s&&typeof s==="object"?s:{complete:A||!A&&c||af.isFunction(s)&&s,duration:s,easing:A&&c||c&&!af.isFunction(c)&&c};
w.duration=af.fx.off?0:typeof w.duration==="number"?w.duration:af.fx.speeds[w.duration]||af.fx.speeds._default;
w.old=w.complete;
w.complete=function(){w.queue!==false&&af(this).dequeue();
af.isFunction(w.old)&&w.old.call(this)
};
return w
},easing:{linear:function(s,c,A,w){return A+w*s
},swing:function(s,c,A,w){return(-Math.cos(s*Math.PI)/2+0.5)*w+A
}},timers:[],fx:function(s,c,w){this.options=c;
this.elem=s;
this.prop=w;
if(!c.orig){c.orig={}
}}});
af.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);
(af.fx.step[this.prop]||af.fx.step._default)(this);
if((this.prop==="height"||this.prop==="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(c){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}return(c=parseFloat(af.css(this.elem,this.prop,c)))&&c>-10000?c:parseFloat(af.curCSS(this.elem,this.prop))||0
},custom:function(s,c,G){function w(H){return A.step(H)
}this.startTime=aA();
this.start=s;
this.end=c;
this.unit=G||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
var A=this;
w.elem=this.elem;
if(w()&&af.timers.push(w)&&!ak){ak=setInterval(af.fx.tick,13)
}},show:function(){this.options.orig[this.prop]=af.style(this.elem,this.prop);
this.options.show=true;
this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());
af(this.elem).show()
},hide:function(){this.options.orig[this.prop]=af.style(this.elem,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(s){var c=aA(),G=true;
if(s||c>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
for(var w in this.options.curAnim){if(this.options.curAnim[w]!==true){G=false
}}if(G){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
s=af.data(this.elem,"olddisplay");
this.elem.style.display=s?s:this.options.display;
if(af.css(this.elem,"display")==="none"){this.elem.style.display="block"
}}this.options.hide&&af(this.elem).hide();
if(this.options.hide||this.options.show){for(var A in this.options.curAnim){af.style(this.elem,A,this.options.orig[A])
}}this.options.complete.call(this.elem)
}return false
}else{A=c-this.startTime;
this.state=A/this.options.duration;
s=this.options.easing||(af.easing.swing?"swing":"linear");
this.pos=af.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||s](this.state,A,0,1,this.options.duration);
this.now=this.start+(this.end-this.start)*this.pos;
this.update()
}return true
}};
af.extend(af.fx,{tick:function(){for(var s=af.timers,c=0;
c<s.length;
c++){s[c]()||s.splice(c--,1)
}s.length||af.fx.stop()
},stop:function(){clearInterval(ak);
ak=null
},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(c){af.style(c.elem,"opacity",c.now)
},_default:function(c){if(c.elem.style&&c.elem.style[c.prop]!=null){c.elem.style[c.prop]=(c.prop==="width"||c.prop==="height"?Math.max(0,c.now):c.now)+c.unit
}else{c.elem[c.prop]=c.now
}}}});
if(af.expr&&af.expr.filters){af.expr.filters.animated=function(c){return af.grep(af.timers,function(s){return c===s.elem
}).length
}
}af.fn.offset="getBoundingClientRect" in J.documentElement?function(s){var c=this[0];
if(!c||!c.ownerDocument){return null
}if(s){return this.each(function(G){af.offset.setOffset(this,s,G)
})
}if(c===c.ownerDocument.body){return af.offset.bodyOffset(c)
}var A=c.getBoundingClientRect(),w=c.ownerDocument;
c=w.body;
w=w.documentElement;
return{top:A.top+(self.pageYOffset||af.support.boxModel&&w.scrollTop||c.scrollTop)-(w.clientTop||c.clientTop||0),left:A.left+(self.pageXOffset||af.support.boxModel&&w.scrollLeft||c.scrollLeft)-(w.clientLeft||c.clientLeft||0)}
}:function(O){var M=this[0];
if(!M||!M.ownerDocument){return null
}if(O){return this.each(function(P){af.offset.setOffset(this,O,P)
})
}if(M===M.ownerDocument.body){return af.offset.bodyOffset(M)
}af.offset.initialize();
var L=M.offsetParent,H=M,K=M.ownerDocument,G,A=K.documentElement,s=K.body;
H=(K=K.defaultView)?K.getComputedStyle(M,null):M.currentStyle;
for(var c=M.offsetTop,w=M.offsetLeft;
(M=M.parentNode)&&M!==s&&M!==A;
){if(af.offset.supportsFixedPosition&&H.position==="fixed"){break
}G=K?K.getComputedStyle(M,null):M.currentStyle;
c-=M.scrollTop;
w-=M.scrollLeft;
if(M===L){c+=M.offsetTop;
w+=M.offsetLeft;
if(af.offset.doesNotAddBorder&&!(af.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(M.nodeName))){c+=parseFloat(G.borderTopWidth)||0;
w+=parseFloat(G.borderLeftWidth)||0
}H=L;
L=M.offsetParent
}if(af.offset.subtractsBorderForOverflowNotVisible&&G.overflow!=="visible"){c+=parseFloat(G.borderTopWidth)||0;
w+=parseFloat(G.borderLeftWidth)||0
}H=G
}if(H.position==="relative"||H.position==="static"){c+=s.offsetTop;
w+=s.offsetLeft
}if(af.offset.supportsFixedPosition&&H.position==="fixed"){c+=Math.max(A.scrollTop,s.scrollTop);
w+=Math.max(A.scrollLeft,s.scrollLeft)
}return{top:c,left:w}
};
af.offset={initialize:function(){var s=J.body,c=J.createElement("div"),H,A,G,w=parseFloat(af.curCSS(s,"marginTop",true))||0;
af.extend(c.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});
c.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
s.insertBefore(c,s.firstChild);
H=c.firstChild;
A=H.firstChild;
G=H.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=A.offsetTop!==5;
this.doesAddBorderForTableAndCells=G.offsetTop===5;
A.style.position="fixed";
A.style.top="20px";
this.supportsFixedPosition=A.offsetTop===20||A.offsetTop===15;
A.style.position=A.style.top="";
H.style.overflow="hidden";
H.style.position="relative";
this.subtractsBorderForOverflowNotVisible=A.offsetTop===-5;
this.doesNotIncludeMarginInBodyOffset=s.offsetTop!==w;
s.removeChild(c);
af.offset.initialize=af.noop
},bodyOffset:function(s){var c=s.offsetTop,w=s.offsetLeft;
af.offset.initialize();
if(af.offset.doesNotIncludeMarginInBodyOffset){c+=parseFloat(af.curCSS(s,"marginTop",true))||0;
w+=parseFloat(af.curCSS(s,"marginLeft",true))||0
}return{top:c,left:w}
},setOffset:function(s,c,K){if(/static/.test(af.curCSS(s,"position"))){s.style.position="relative"
}var G=af(s),H=G.offset(),A=parseInt(af.curCSS(s,"top",true),10)||0,w=parseInt(af.curCSS(s,"left",true),10)||0;
if(af.isFunction(c)){c=c.call(s,K,H)
}K={top:c.top-H.top+A,left:c.left-H.left+w};
"using" in c?c.using.call(s,K):G.css(K)
}};
af.fn.extend({position:function(){if(!this[0]){return null
}var s=this[0],c=this.offsetParent(),A=this.offset(),w=/^body|html$/i.test(c[0].nodeName)?{top:0,left:0}:c.offset();
A.top-=parseFloat(af.curCSS(s,"marginTop",true))||0;
A.left-=parseFloat(af.curCSS(s,"marginLeft",true))||0;
w.top+=parseFloat(af.curCSS(c[0],"borderTopWidth",true))||0;
w.left+=parseFloat(af.curCSS(c[0],"borderLeftWidth",true))||0;
return{top:A.top-w.top,left:A.left-w.left}
},offsetParent:function(){return this.map(function(){for(var c=this.offsetParent||J.body;
c&&!/^body|html$/i.test(c.nodeName)&&af.css(c,"position")==="static";
){c=c.offsetParent
}return c
})
}});
af.each(["Left","Top"],function(s,c){var w="scroll"+c;
af.fn[w]=function(G){var H=this[0],A;
if(!H){return null
}if(G!==I){return this.each(function(){if(A=p(this)){A.scrollTo(!s?G:af(A).scrollLeft(),s?G:af(A).scrollTop())
}else{this[w]=G
}})
}else{return(A=p(H))?"pageXOffset" in A?A[s?"pageYOffset":"pageXOffset"]:af.support.boxModel&&A.document.documentElement[w]||A.document.body[w]:H[w]
}}
});
af.each(["Height","Width"],function(s,c){var w=c.toLowerCase();
af.fn["inner"+c]=function(){return this[0]?af.css(this[0],w,false,"padding"):null
};
af.fn["outer"+c]=function(A){return this[0]?af.css(this[0],w,false,A?"margin":"border"):null
};
af.fn[w]=function(A){var G=this[0];
if(!G){return A==null?null:this
}return"scrollTo" in G&&G.document?G.document.compatMode==="CSS1Compat"&&G.document.documentElement["client"+c]||G.document.body["client"+c]:G.nodeType===9?Math.max(G.documentElement["client"+c],G.body["scroll"+c],G.documentElement["scroll"+c],G.body["offset"+c],G.documentElement["offset"+c]):A===I?af.css(G,w):this.css(w,typeof A==="string"?A:A+"px")
}
});
aL.jQuery=aL.$=af
})(window); (function(a){a.fn.ellipsis=function(b){var c=document.documentElement.style;
if(!("textOverflow" in c||"OTextOverflow" in c)){return this.each(function(){var f=a(this);
if(f.css("overflow")=="hidden"){var i=f.html();
var d=f.width();
var e=a(this.cloneNode(true)).hide().css({position:"absolute",width:"auto",overflow:"visible","max-width":"inherit"});
f.after(e);
var h=i;
while(h.length>0&&e.width()>f.width()){h=h.substr(0,h.length-1);
e.html(h+"...")
}f.html(e.html());
e.remove();
if(b==true){var g=f.width();
setInterval(function(){if(f.width()!=g){g=f.width();
f.html(i);
f.ellipsis()
}},200)
}}})
}else{return this
}}
})(jQuery);
