var ORG_WORK_NUM="1001";
var ORG_VERIFY_MSG="";

var KF_COOKIE_DOMAIN = KF_BIZAPP+"." + KF_DOMAINNAME;

var KF_CN_KFUIN = "kfuin";
var KF_CN_KFEXT = "kfext";

var KF_S_KFUIN = "skfuin";
var KF_S_KFEXT = "skfext";
var KF_CN_SAVEINFO = 'kfsinfo';

var g_vcodeInitImg = "http://ptlogin2."+KF_DOMAINNAME+"/getimage?aid=3000401&";
var req_data = "";

var lo_dirUrl;

//客服号
var KFUIN;
//客服分机号

var KFEXT;

var g_changeFocus = true;

var VS_KEY_BACKSPACE=8,VS_KEY_TAB=9,VS_KEY_ENTER=13,VS_KEY_PAGEUP=33,VS_KEY_PAGEDOWN=34,VS_KEY_END=35,VS_KEY_HOME=36,VS_KEY_LEFT=37,VS_KEY_UP=38,VS_KEY_RIGHT=39,VS_KEY_DOWN=40,VS_KEY_INSERT=45,VS_KEY_DEL=46,VS_KEY_0=48,VS_KEY_9=57,VS_KEY_NUM0=96,VS_KEY_NUM9=105,VS_KEY_NUMSUB=109,VS_KEY_NUMDOT=110,VS_KEY_SUB=189,VS_KEY_DOT=190,VS_KEY_A=65,VS_KEY_Z=90,VS_KEY_SPACE=32,VS_KEY_IME=229;
var VS_FT_LONG="long",VS_FT_ULONG="ulong",VS_FT_FLOAT= "float",VS_FT_UFLOAT="ufloat",VS_FT_TAG="tag";

var err_kfErrorCode=new Array();
err_kfErrorCode["-1"]="未知错误";
err_kfErrorCode["0"]="成功";
err_kfErrorCode["1"]="没有登录";
err_kfErrorCode["2"]="包括不支持的参数";
err_kfErrorCode["3"]="不支持的加密方法";
err_kfErrorCode["4"]="非法请求";
err_kfErrorCode["5"]="服务器忙";
err_kfErrorCode["6"]="请重新登录，因为用户在其它地方登录";
err_kfErrorCode["7"]="因为安全原因请重新登录";
err_kfErrorCode["8"]="因为密码已经修改请重新登录";
err_kfErrorCode["9"]="资料长度超过限制";
err_kfErrorCode["50"]="请到QQ统一登录平台登录";
err_kfErrorCode["100"]="您的企业QQ已升级到2.0版本。\n请下载2.0客户端登录。";
err_kfErrorCode["101"]="密码错误";
err_kfErrorCode["102"]="不支持的模式";
err_kfErrorCode["103"]="客服工号（分机号）不存在";
err_kfErrorCode["104"]="验证码错误";
err_kfErrorCode["105"]="用户号码错误";
err_kfErrorCode["106"]="消息太长";
err_kfErrorCode["110"]="获取会话信息失败";
err_kfErrorCode["111"]="关闭Case失败";
err_kfErrorCode["112"]="不能发送空消息";
err_kfErrorCode["113"]="该QQ号码不存在";
err_kfErrorCode["119"]="您是VIP用户，请到\"http://b.qq.com/\"登录"; 
err_kfErrorCode["120"]="该号码连续三个月未登录，已被回收。\n\n点击确定查看详情"; 

function showError(s)
{
	alert(s);
}

var g_last_qqnum = parseInt('a');

function win_onload()
{
	//KFUIN = g_vs.getCookie(KF_CN_KFUIN);
	//KFEXT = g_vs.getCookie(KF_CN_KFEXT);
	top.onaloginresult = il_onaloginresult;
	
	//登录用的隐藏form
	var frm = document.createElement('<IFRAME ID="il_frame" name="il_frame" FRAMEBORDER=0 SCROLLING=NO SRC="" style="display:none"></IFRAME>');
	frm.src = "about:blank";
	document.body.appendChild(frm);
	frm = document.createElement('<form id="il_frm" name="il_frm" action="" style="display:none" method="POST" autocomplete="off" target="_top"></form>');
	frm.action = "";
	var html = '<input type=hidden name="kfguin">';
  	html += '<input type=hidden name="ext">';
  	html += '<input type=hidden name="auth">';
  	html += '<input type=hidden name="et">';
  	frm.innerHTML = html;
	document.body.appendChild(frm);
	//document.body.insertAdjacentHTML("beforeEnd", html);
	
	//delete by rains
	//if(document.location.hash)
	//{
	//	lo_dirUrl = document.location.hash;
	//	lo_dirUrl = lo_dirUrl.leftTrim("#");
	//	document.location.hash = "#";
	//}
	
	var verify = document.getElementById('vcode');
	if(verify){
		verify.value = ORG_VERIFY_MSG;
		verify.style.color = "#000000";
	}
	
	var div = document.getElementById("ptlgfrm");
	if(div && div.children[0])
	{
		div.children[0].src = "bizptl2.htm";
	}	
	
	var qq_num_box = document.getElementById("qq_num");
	if(getCookie(KF_S_KFUIN)!=null)
	{
		if(qq_num_box.value=="")
		{
			qq_num_box.value = getCookie(KF_S_KFUIN);
		}
		g_last_qqnum = parseInt(qq_num_box.value);
	}
	
	window.setTimeout("setqqfocus();");
	
	window.setTimeout('SendAJAXRequest("/cgi/nct?" , "GET", donetworktester, "", new Date());');
	
	var num = document.getElementById("qq_num");
	if(num)
	{
		num.onblur = function()
		{
			if(isNaN(g_last_qqnum) && isNaN(parseInt(num.value)))
			{
				//do nothing
			}
			else if(g_last_qqnum != parseInt(num.value) && parseInt(num.value) > 10000)
			{
				changeImage(true);
				g_last_qqnum = parseInt(num.value);
			}
		}
	}

}

function cookie_onload()
{
 
	var qq_num_box = document.getElementById("qq_num");
	if(getCookie(KF_S_KFUIN)!=null && qq_num_box.value=="")
	{
		qq_num_box.value = getCookie(KF_S_KFUIN);
	}
		
	var qq_ext_box = document.getElementById("work_num");
	if(getCookie(KF_S_KFEXT)!=null && getCookie(KF_S_KFEXT)!='' && qq_ext_box.value!=getCookie(KF_S_KFEXT))	
	{ 
		qq_ext_box.value = getCookie(KF_S_KFEXT);
	}
	else if(qq_ext_box.value=="")	
	{
		qq_ext_box.value = '1001';
	}
	
	if(getCookie(KF_S_KFUIN)!=null && getCookie(KF_S_KFUIN)!='' && getCookie(KF_S_KFEXT)!=null && getCookie(KF_S_KFEXT)!='')
	{ 
		var qq_pwd_box = document.getElementById("passwd");
		if(g_changeFocus == true && qq_pwd_box.value == '' && IsMaskVisible())
		{
		    qq_pwd_box.focus();
		}
	}
	else
	{
        if(g_changeFocus == true && qq_num_box.value == '' && IsMaskVisible())
		{
		    qq_num_box.focus();
		}		
	}
}

function  onclickinput()
{
    g_changeFocus = false;
}

function checkQQInput()
{
    g_changeFocus = false;
	return pkfun_DZ(VS_FT_ULONG, null);
}

function checkWorkInput()
{
    g_changeFocus = false;
	return pkfun_DZ(VS_FT_ULONG, null);
}

function checkVerifyInput()
{
    g_changeFocus = false;
    return true;
}

function pkfun_DZ(type,maxlen,ansi)
{
	var el=event.srcElement,b=false,s=el.value,key=event.keyCode,shift=event.shiftKey,alt=event.altKey,ctrl=event.ctrlKey;
	maxlen=parseInt(maxlen,10);
	if(isNaN(maxlen))
	{maxlen=-1;}
	
	el.filterType=type;
	
	el.maxlen=maxlen;
	
	el.ansi=ansi;
	
	if(el.onchange != pkfun_DC)
	{el.oldonchange=el.onchange;el.onchange=pkfun_DC;}
	
	if(el.onpaste != pkfun_DY)
	{el.oldonpaste=el.onpaste;el.onpaste=pkfun_DY;}
	
	if(alt||ctrl||key==VS_KEY_BACKSPACE||key==VS_KEY_TAB||key==VS_KEY_LEFT
		||key==VS_KEY_UP||key==VS_KEY_RIGHT||key==VS_KEY_DOWN||key==VS_KEY_PAGEUP
		||key==VS_KEY_PAGEDOWN||key==VS_KEY_HOME||key==VS_KEY_END||key==VS_KEY_DEL
		||key==VS_KEY_ENTER)
		{b=true;}
	else
	{
		switch(type)
		{
		case VS_FT_LONG:
			b=(key==VS_KEY_SUB||key==VS_KEY_NUMSUB)||(key>=VS_KEY_0&&key<=VS_KEY_9&&!shift)
			||(key>=VS_KEY_NUM0&&key<=VS_KEY_NUM9)||(key==VS_KEY_IME);
			break;
			
		case VS_FT_ULONG:
			b=(key>=VS_KEY_0&&key<=VS_KEY_9&&!shift)||(key>=VS_KEY_NUM0&&key<=VS_KEY_NUM9)
			||(key==VS_KEY_IME);break;case VS_FT_FLOAT:b=(key>=VS_KEY_0&&key<=VS_KEY_9&&!shift)
			||(key>=VS_KEY_NUM0&&key<=VS_KEY_NUM9)||key==VS_KEY_SUB||key==VS_KEY_DOT||
			key==VS_KEY_NUMSUB||key==VS_KEY_NUMDOT||(key==VS_KEY_IME);
			break;
			
		case VS_FT_UFLOAT:
			b=(key>=VS_KEY_0&&key<=VS_KEY_9&&!shift)||(key>=VS_KEY_NUM0&&key<=VS_KEY_NUM9)
			||key==VS_KEY_DOT||key==VS_KEY_NUMDOT||(key==VS_KEY_IME);
			break;
			
		case VS_FT_TAG:
			b=(key>=VS_KEY_0&&key<=VS_KEY_9&&!shift)||(key>=VS_KEY_NUM0&&key<=VS_KEY_NUM9)
			||(key>=VS_KEY_A&&key<=VS_KEY_Z)||(key==VS_KEY_SPACE)||(key==VS_KEY_IME);
			break;
			
		default:
			b=true;
			break;
		}
		
		if(b&&maxlen>=0)
		{
			if(ansi){maxlen -= s.BLength();}
			else{maxlen -= s.UTF8Length();}
		
			if(key<0x20){}
			else if(key<0x80||key==VS_KEY_IME){maxlen--;}
			else{	if(ansi){maxlen -= 2;}
					else{maxlen -= 3;}
			}
		
			if(maxlen<0){b=false;}
		}
	}
	event.cancelBubble=true;
	return b;
}
	
function pkfun_DC()
{
	var b,el=event.srcElement,s=el.value,x;
	switch(el.filterType)
	{
		case VS_FT_LONG:
		case VS_FT_ULONG:x=parseInt(s,10);break;
		case VS_FT_FLOAT:
		case VS_FT_UFLOAT:x=parseFloat(s);break;
		default:x=0;break;
	}
	
	if(isNaN(x))
	{
		if(typeof(el.defValue)=="undefined"){el.defValue=0;}s=el.defValue.toString();}
		else{switch(el.filterType)
			{case VS_FT_LONG:
			case VS_FT_FLOAT:s=x.toString();break;
			case VS_FT_ULONG:
			case VS_FT_UFLOAT:s=Math.abs(x).toString();break;
			case VS_FT_TAG:s=E6(s);break;
			default:break;
			}
		}
		
		if(el.maxlen>=0)
		{
			if(el.ansi){s=s.BTrunc(el.maxlen);}
			else{s=s.UTF8Trunc(el.maxlen);
		}
	}
	if(s != el.value){el.value=s;b=false;}else{b=true;}
	if(typeof(el.oldonchange)=="function"){b=el.oldonchange()&&b;}
	return b;
}

function pkfun_DY()
{
	var b=true,el=event.srcElement,s=el.value;
	if(el.maxlen>=0)
	{if(el.ansi){b=s.BLength()<el.maxlen;}else{b=s.UTF8Length()<el.maxlen;}}
	if(typeof(el.oldonpaste)=="function"){b=el.oldonpaste()&&b;}
	return b;
}

function login_wkblur()
{
	var wknum = document.getElementById('work_num');
	if(wknum.value == '')
	{
		wknum.value = ORG_WORK_NUM;
	}
}

function clearInput()
{
	var el = event.srcElement;
	if(el)
	{		
		if((el.value==ORG_WORK_NUM)||(el.value==KFEXT))
		{
			el.value = "";
		}
	}
}

function login_verifyblur()
{
	var verify = document.getElementById('vcode');
	if(verify.value == '')
	{
		verify.value = ORG_VERIFY_MSG;
		verify.style.color = "#000000";
	}
}

function clearVerify()
{
	var el = event.srcElement;
	if(el)
	{		
		if(el.value==ORG_VERIFY_MSG)
		{
			el.value = "";
		}
		el.style.color = "#000000";
	}
}

function changeImage(nofocus)
{
	var verify_img = document.getElementById("vimg");

	if(verify_img)
	{
		verify_img.style.display = "block";		

		var elem=document.getElementById("qq_num");
		if (elem && (!isNaN(parseInt(elem.value))) && parseInt(elem.value)>10000)
		{
			verify_img.src = g_vcodeInitImg + Math.random()+"&uin="+parseInt(elem.value);
		}
		else
		{
			verify_img.src = g_vcodeInitImg + Math.random();
		}
		
		var elem = document.getElementsByName("verifycode")[0];
		if(elem && nofocus != true)
		{
			elem.value = '';
			try
			{
				elem.focus();
			}
			catch(e)
			{
			}
		}		
	}
}

function PtLogin()
{
	var frm = document.getElementById("login");

	if(frm == null || typeof(top.setPTLogin2FrameDate) != "function")
	{
		alert("网页出错，无法登录\n请刷新页面后再试");
		return false;
	}
	
	var qq_num = frm.u.value; 
	var passwd = frm.p.value;
	var vcode = frm.verifycode.value;
	var str = "";
  	str += vcode;
  	str = str.toUpperCase();
  	passwd = md5(md5_3(passwd)+str);
 
	top.onptloginsuccess = login_onptloginsuccess;
	top.onbizptl2load = ql_onbizptl2load;
	
	top.setPTLogin2FrameDate(qq_num, passwd, vcode);
}

function ql_onbizptl2load()
{
	changeImage();
}

var g_logining = false;
function onBtnLogin()
{
    if(g_logining == true)
    {
        return;
    }
    
	var t_frm = document.getElementById("login");

	if(!checkinput())
	{
		return;
	}

	var qq_num = t_frm.u.value; 
	var work_num = t_frm.w.value; 
	var passwd = t_frm.p.value;
	var vcode = t_frm.verifycode.value;
	var str = "";
	str += vcode;
	//str = str.toUpperCase();
	var md5_passwd;
	md5_passwd = md5(md5(passwd)+str);
	
	var request = 'kfguin='+qq_num+'&ext='+work_num+'&p='+md5_passwd+'&vcode='+vcode+'&';
	req_data = request;
	
	KFUIN = qq_num;
	KFEXT = work_num;
	
	g_logining = true;
	SendAJAXRequest("/cgi/il?" , "POST", doLogin,req_data);
}

function checkinput()
{
	var elem;
	var num;
	var val;

	elem=document.getElementById("qq_num");
	if (elem)
	{
    if (elem.value == "")
    {
			alert("客服帐号输入错误");
			elem.focus();
			return false;
    }
		else
		{
			val = elem.value;
			num=parseInt(val);
			if(isNaN(num)||(num<1000))
			{
				alert("客服帐号输入错误");
				elem.value="";
				elem.focus();
				return false;
			}
		}
	}

	elem=document.getElementById ("work_num");
	if (elem)
	{
    if (elem.value == "")
    {
			alert("客服工号输入错误");
			elem.focus();
			return false;
    }
		else
		{
			val = elem.value;
			num=parseInt(val);
			if(isNaN(num)||(num<1000))
			{
				alert("客服工号输入错误");
				elem.value="";
				elem.focus();
				return false;
			}
		}
	}

	elem=document.getElementById ("passwd");
	if (elem)
	{
		if (elem.value == "")
		{
			alert("工号密码不能为空");
			elem.focus();
			return false;
		}
	}

	elem=document.getElementById ("vcode");
	if (elem)
	{
		if (elem.value == "")
		{
			alert("验证码不能为空");
			elem.focus();
			return false;
		}
		if(elem.value.length<4)
		{
			alert("验证码错误");
			elem.value="";
			elem.focus();
			elem.style.color='#000000';
			return false;
		}
	}
	
	elem=document.getElementById ("accept");
	if (elem)
	{
		if (elem.checked == false)
		{
			alert("您必须同意协议才能登录");
			return false;
		}
	}

	return true;
}

function getValue(node,name)
{
	var value="", n=node.selectSingleNode(name);
	if(n){value=n.text;}
	return value;
}

function getCookie(name)
{
	var value = "";
	var cookies = document.cookie.split("; ");
	var nv;
	var i;

	for(i = 0; i < cookies.length; i++)
	{
		nv = cookies[i].split("=");

		//if(nv && nv.length >= 2 && name == nv[0].trim())
		
		if(nv && nv.length >= 2 && name == nv[0])
		{ 
			value = unescape(nv[1]);
		}
	}
	
	return value;
} 

function setCookie(name,value,exp,path,domain)
{
	var nv=name+"="+escape(value)+";",d=null;
	if(typeof(exp)=="object"){d=exp;}
	else if(typeof(exp)=="number")
	{
		d=new Date();
		d=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes()+exp,d.getSeconds(),d.getMilliseconds());
	}
	
	if(d){nv+="expires="+d.toGMTString()+";";}

	if(!path){nv+="path=/;";}
	else if(typeof(path)=="string"&&path != ""){nv+="path="+path+";";}
	
	//if(!domain&&typeof(VS_COOKIEDM) != "undefined"){domain=VS_COOKIEDM;}
	
	if(typeof(domain)=="string"&&domain != ""){nv+="domain="+domain+";";}
	
	document.cookie=nv;
}

var g_strArray=new Array("<请输入帐号>","很抱歉，您当前所用的QQ版本不支持此功能。目前仅支持\r\nQQ2009正式版SP1及以上版本，您可以在http://im.qq.com下载。","您还没有输入QQ帐号！","您还没有输入密码！","您还没有输入验证码！","请输入正确的QQ帐号！","请输入完整的验证码！","QQ帐号：","QQ密码：","验证码：","输入下图中的字符，不区分大小写","看不清，换一张","下次自动登录","一天","一周","一个月","半年","一年","忘了密码？","登 录","重 填","快速登录模式","用户登录","如果您已登录QQ，点击按钮即可快速登录。","正在登录中，请稍候……","什么是快速登录？","切换到普通登录模式","快速登录","系统繁忙，请您返回重试或切换到普通登录模式。","您的QQ帐号处于离线状态，请先登录或选择普通登录模式。","快速登录失败，请您返回重试或切换到普通登录模式。","返 回","重 试","注册新帐号","确定","支持版本：QQ2009以上版本","检测到您已登录QQ帐号：","系统检测到您机器上QQ未启动或已被锁定。请您先登录QQ或解锁后再使用本功能。","您所选择号码对应的QQ已经失效，请检查该号码对应的QQ是否已经被关闭。","正在检测能否快速登录...","要登录其他帐号,请返回普通登录","未登录QQ或者浏览器不支持快速登录");
var LOGIN_FAIL_ERRMSG=["登录成功!","系统繁忙，请稍后重试(%d)。","已经过期的QQ号码。","您用于登陆微博的QQ密码有误，请和我们联系解决。","您输入的验证码有误，请重试。","校验失败。","密码错误。如果您刚修改过密码, 请稍后再登录.","您的输入有误, 请重试。","您的IP输入错误的次数过多，请稍后再试。","您输入的帐号不存在，请重试。","您输入的帐号不正确，请重试。","您输入的帐号不正确，请重试。","已经过期的QQ号码。","","该QQ号码已经转换为Email帐号，请使用Email帐号登录。","","您的IP输入错误的次数过多，请稍后再试。","","您的Email帐号未进行验证，请验证后再登录。","很抱歉，您的号码暂时不能登录，请联系客服中心。","很抱歉，您的号码暂时不能登录，请联系客服中心(20)。"];
var EXT_RES_MSG=["页面过期，请重试!","登录失败，请重试!"];
function ptuiCB(C,A,B,E)
{
	if(B!="")
	{
		switch(E)
		{
			case"0":
				window.location.href=B;
				break;
			case"1":
				top.location.href=B;
				break;
			case"2":
				parent.location.href=B;
				break;
			default:
				top.location.href=B;
		}
		return
	}
	g_submitting=false;
	if(C==0)
	{
		top.location=document.forms[0].ul.value;
		return 
	}
	else
	{
		if(A==0)
		{
			if(typeof (LOGIN_FAIL_ERRMSG[C])!="undefined")
			{
				alert(LOGIN_FAIL_ERRMSG[C])
			}
			else
			{
				alert("系统繁忙")
			}
		}
		else
		{
			alert(EXT_RES_MSG[A-2]);
			//document.getElementById("p").value="";
			//document.getElementById("p").focus();
			//document.getElementById("p").select()
		}
		
		if(C==3||C==4)
		{
			if(navigator.userAgent.toLowerCase().indexOf("webkit"))
			{
				document.getElementById("u").focus()
			}
			if(C==3)
			{
				//document.getElementById("p").value=""
			}
			//document.getElementById("p").focus();
			//document.getElementById("p").select();
			changeImage();
			if(C==4)
			{
				try
				{
					document.getElementsByName("verifycode")[0].focus();
					document.getElementsByName("verifycode")[0].select()
				}
				catch(D)
				{
				}
			}
			if(A!=0)
			{
				document.getElementsByName("verifycode")[0].value="";
				g_submitting=true
			}
		}
	}
}


function doLogin(xmlobj)
{
	var url;
	if(xmlobj == null)
	{
		showError(err_kfErrorCode["5"]);
		g_logining = false;
		return;
	}

	xml = xmlobj.responseXML;
	var node = xml.selectSingleNode("//root");

	var result = getValue(node, "r");
	var redir = getValue(node, "url");
	if(redir != "")
	{
		if(redir.substr(0, 15) == "ptuiCB('4','0',")
		{
			result = 104;
		}
		else if(redir.substr(0, 15) != "ptuiCB('0','0',")
		{
			//error
			window.setTimeout(redir, 100);
			g_logining = false;
			return;
		}		
	}
	
	//success
	var t_frm = document.getElementById("login");
	if(parseInt(result) == 0)
	{	
		var dm = getValue(node, "dm");
		var auth = getValue(node, "key");
		var et = getValue(node, "et");
		var frm = document.getElementById("il_frm");
		if(frm && dm != "" && auth != "")
		{
			frm.auth.value = auth;
			frm.et.value = et;
			frm.kfguin.value = KFUIN;
			frm.ext.value = KFEXT;
			frm.action = "http://"+dm+"/cgi/vil?t=" + Math.random().toString().substr(2);
			
			//保存一下COOKEI
			var bsave, bsaveBox = document.getElementById("bsaveinfo");
			if(bsaveBox.checked == true)
			{
	 			bsave = 1;
				setCookie(KF_CN_SAVEINFO, bsave, '', '/', KF_COOKIE_DOMAIN);
				setCookie(KF_S_KFUIN, KFUIN, 30*24*60, '/', KF_COOKIE_DOMAIN);
				setCookie(KF_S_KFEXT, KFEXT, 30*24*60, '/', KF_COOKIE_DOMAIN);
			}
			else
			{
				setCookie(KF_S_KFUIN, '', 30*24*60, '/', KF_COOKIE_DOMAIN);
				setCookie(KF_S_KFEXT, '', 30*24*60, '/', KF_COOKIE_DOMAIN);
				bsave = 0;
				setCookie(KF_CN_SAVEINFO, bsave, '', '/', KF_COOKIE_DOMAIN);	
			}
			
			frm.submit();
		}
		else
		{
			alert("网页出错，请刷新页面后重试。");
		}
		//login_directURL(url);
	}
	else if(parseInt(result) == 50)
	{
		//到PTLogin进一步验证

		PtLogin();
	}	
	else
	{
		showError(err_kfErrorCode[result]);
		//重新刷验证码
		changeImage();
		//设置焦点
		if(result==101)
		{
			if(t_frm && t_frm.p && IsMaskVisible())
			{
				t_frm.p.focus();
			}
		}
		else if(result==104)
		{
			if(t_frm && t_frm.verifycode && IsMaskVisible())
			{
				t_frm.verifycode.value = "";
				t_frm.verifycode.focus();
			}
		}
		else if(result==119)
		{
			url = 'http://b.qq.com';
			login_directURL (url);
		}
		else if(result==120)
		{
			url = 'http://b.qq.com/notes/#note6';
			login_directURL (url);
		}
	}
	g_logining = false;
}

function login_directURL(url)
{
	parent.location.href = url;
	return;
}

function login_onptloginsuccess()
{
	SendAJAXRequest("/cgi/il?" , "POST", doLogin,req_data+"mod=1&");
}

function setqqfocus()
{
	cookie_onload();
	try
	{
		var num = document.getElementById("qq_num");
		if(num && g_changeFocus == true && num.value == '' && IsMaskVisible())
		{
			num.focus();
		}
	}

	catch(e)
	{
	}
}

function login_onfindpwd()
{
    location.href = "service.htm?pid=3";
}

function clear_cookie()
{
 
	var bsave = 0;
	setCookie(KF_S_KFUIN, '', 0, '/', KF_COOKIE_DOMAIN);
	setCookie(KF_S_KFEXT, '', 0, '/', KF_COOKIE_DOMAIN);
	//setCookie(KF_CN_SAVEINFO, bsave, 0, '/', KF_COOKIE_DOMAIN);
    cookie_onload();
}

function donetworktester(xmlobj, dt)
{ 
	if(dt == null)
	{  
		return;
	}
	
	var dtNow = new Date();
	var url;
	if(xmlobj == null)
	{
		return;
	}
	
	xml = xmlobj.responseXML;
	var node = xml.selectSingleNode("//root");

	var result = getValue(node, "r");

	if(parseInt(result) == 0 && dt != null)
	{
		var sec = dtNow.getTime() - dt.getTime();

		SendAJAXRequest("/cgi/nct?" , "POST", donetworktester, "d="+sec+"&n="+dtNow.getTime()+"&");
    }
}

function il_onaloginresult(result)
{
	if(result == 0)
	{
		alert("登录意外失败。");
	}
	else if(parseInt(result) == 50)
	{
		//到PTLogin进一步验证
		PtLogin();
	}	
	else
	{
		var t_frm = document.getElementById("login");
		showError(err_kfErrorCode[result]);
		//重新刷验证码
		changeImage();
		//设置焦点
		if(result==101)
		{
			if(t_frm && t_frm.p && IsMaskVisible())
			{
				t_frm.p.focus();
			}
		}
		else if(result==104)
		{
			if(t_frm && t_frm.verifycode && IsMaskVisible())
			{
				t_frm.verifycode.value = "";
				t_frm.verifycode.focus();
			}
		}
		else if(result==105)
		{
			if(t_frm && t_frm.u && IsMaskVisible())
			{
				t_frm.u.focus();
			}
		}
		else if(result==119)
		{
			url = 'http://b.qq.com';
			login_directURL(url);
		}
	}
	g_logining = false;
	
	var frm = document.getElementById("il_frame");
	if(frm)
	{
		frm.src = "about:blank";
	}
}

function IsMaskVisible()
{
	if(document.getElementById("mask"))
	{
		return document.getElementById("mask").style.display == "block";
	}
	return true;
}

