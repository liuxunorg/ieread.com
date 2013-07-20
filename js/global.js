var g_winoldload = window.onload;
window.onload= function(){
	if(typeof g_winoldload == 'function'){ g_winoldload(); } 
	win_onload();
	changeImage();
	try{
		timePoints[3]=new Date();
		setTimeout(report,1000);// 1秒后发送时间点
	}catch(e){};
	//alert(typeof g_winoldload);
};

var maskCount;
function _mask(){
	if(mini.userAgent.ie){
		maskCount = mini.maskLayout.create(1000); //创建蒙版层，并且返回蒙版的id
		mini.dom.get('mask').style.display = 'block';  
		window.setTimeout("setqqfocus();");
	}
	else{
		alert('目前系统暂时只支持IE浏览器登录');
	}
}
function closeMask(){
	mini.dom.get('mask').style.display = 'none';  
	mini.maskLayout.remove(maskCount);
}
if (typeof(mini) == "undefined" || !mini) {
	var mini = {};
}
mini.userAgent = (function() {
	var t,vie,vff,vopera,vsf,vawk,wintype,winver,mactype,vair,vchrome,isBeta = false, discerned = false,
		_ua = navigator.userAgent,
		mainRE = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+))|(?:Opera.(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/,
		osRE = /(Windows.*?;)|(Mac OS X.*?;)/,
		winRE = /Windows.+?(\d+\.\d+)/,
		airRE = /AdobeAIR/,
		chromeRE = /Chrome.(\d+\.\d+)/,
		safariRE = /Version\/(\d+(?:\.\d+)?)/,
		agent = mainRE.exec(_ua),
		os = osRE.exec(_ua);
	if (agent) {
		vie = agent[1] ? parseFloat(agent[1], 10) : NaN;
		vff = agent[2] ? parseFloat(agent[2], 10) : NaN;
		vopera = agent[3] ? parseFloat(agent[3], 10) : NaN;
		vawk = agent[4] ? parseFloat(agent[4], 10) : NaN;
		vair = vsf = vchrome = NaN;
		if (vawk) {
			if (t = airRE.exec(_ua)) {
				vair = 1;
			} else if(t = safariRE.exec(_ua)){
				if(t.length > 1){
					vsf = parseFloat(t[1], 10);
				}else{
					vsf = 1.0;
				}
			} else if(t = chromeRE.exec(_ua)){
				if(t.length > 1){
					vchrome = parseFloat(t[1], 10);
				}else{
					vchrome = 1.0;
				}
			}
		}
	} else {
		vie = vff = vopera = vsf = vawk = vair = vchrome = NaN;
		if (typeof ActiveXObject == "function") {
			vie = 8 - (typeof XDomainRequest == "object" ? 0 : 1) - (typeof XMLHttpRequest == "object" ? 0 : 1);
		}
		else if (/AppleWebKit\/\d+\.\d+/i.test(navigator.appVersion)) {
			vawk = parseFloat(navigator.appVersion.replace(/^[\s\S]*?AppleWebKit.(\d+\.\d+)[\s\S]*$/i, "$1"));
			if (typeof openDatabase == "function") {
				vsf = parseFloat(navigator.appVersion.replace(/^[\s\S]*?Version.(\d+\.\d+)[\s\S]*$/i, "$1"));
			}
			if (typeof MessageEvent == "function") {
				vchrome = parseFloat(navigator.appVersion.replace(/^[\s\S]*?chrome.(\d+\.\d+)[\s\S]*$/i, "$1"));
			}
			if (/AdobeAIR/i.test(navigator.appVersion)){
				vair = 1;
			}
		}
		else if(typeof document.getBoxObjectFor == "function"){
			vff = parseFloat(navigator.userAgent.replace(/^[\s\S]*?Firefox\/(\d+\.\d+)[\s\S]*$/i, "$1"));
		}
		else if(typeof opera == "object"){
			vopera = parseFloat(navigator.appVersion.replace(/^(\d+\.\d+)[\s\S]*$/i, "$1"));
		}
		else{
			vie = 6;
		}
	}
	if(vie){
		if(
			vie > 7 &&
			window.navigator &&
			window.navigator.appMinorVersion &&
			window.navigator.appMinorVersion.toLowerCase().indexOf("beta") > -1
		){
			isBeta = true;
		}
	}
	if (os) {
		wintype = !!os[1];
		mactype = !!os[2];
		
		if(wintype){
			if(t = winRE.exec(_ua)){
				if(t.length > 0){
					winver = parseFloat(t[1], 10);
				}
			}
		}
	} else {
		wintype = mactype = false;
		winver = NaN;
	}
	function adjustBehaviors() {
		if (!adjustBehaviors.adjusted && vie && vie < 7) {
			try {
				document.execCommand('BackgroundImageCache', false, true);
			} catch (ignored) {}
			adjustBehaviors.adjusted = true;
		}
	}
	return {
		beta : isBeta,
		firefox : vff,
		ie : vie,
		opera : vopera,
		air : vair,
		safari : vsf,
		safariV : vsf,
		webkit : vawk,
		windows : winver ? winver : wintype,
		macs : mactype,
		chrome : vchrome,
		adjustBehaviors : adjustBehaviors
	};
})();
mini.maskLayout = {
	count : 0,
	items : {},
	create : function(zindex, _doc) {
		this.count++;
		_zindex = zindex || 5000;
		_doc = _doc || document;
		var _m = mini.dom.createElementIn("div", _doc.body, false, {
					className : "rl_mask_layout"
				});
		var _h = (mini.userAgent.ie && mini.userAgent.ie < 7)
				? Math.max(_doc.documentElement.scrollHeight,
						_doc.body.scrollHeight)
				: mini.dom.getClientHeight(_doc);
		_m.style.zIndex = _zindex;
		_m.style.height = _h + "px";
		_m.unselectable = "on";
		this.items[this.count] = _m;
		return this.count;
	},

	remove : function(countId) {
		mini.dom.removeElement(this.items[countId]);
		delete this.items[countId];
	}
}
mini.dom = {
	getById : function(id) {
		return document.getElementById(id);
	},
	get : function(e) {
		if (e && ((e.tagName || e.item) || e.nodeType == 9)) {
			return e;
		}
		return this.getById(e);
	},
	getClientHeight : function(doc) {
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
	},
	createElementIn : function(tagName, el, insertFirst, attributes) {
		tagName = tagName || "div";
		el = this.get(el) || document.body;
		var _doc = el.ownerDocument;
		var _e = _doc.createElement(tagName);
		if (attributes) {
			for (var k in attributes) {
				if (/class/.test(k)) {
					_e.className = attributes[k];
				} else if (/style/.test(k)) {
					_e.style.cssText = attributes[k];
				} else {
					_e[k] = attributes[k];
				}
			}
		}
		if (insertFirst) {
			el.insertBefore(_e, el.firstChild);
		} else {
			el.appendChild(_e);
		}
		return _e;
	},
	removeElement : function(el) {
		if (typeof(el) == "string") {
			el = mini.dom.getById(el);
		}
		if (!el) {
			return;
		}
		if (el.removeNode) {
			el.removeNode(true);
		} else {
			if (el.childNodes.length > 0) {
				for (var ii = el.childNodes.length - 1; ii >= 0; ii--) {
					mini.dom.removeElement(el.childNodes[ii]);
				}
			}
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
		el = null;
		return null;
	}
}

