var KF_DOMAINNAME = "qq.com";
var KF_BIZAPP = "b";

var KF_FILESVR = 'http://file.'+KF_BIZAPP+'.'+KF_DOMAINNAME;
var CGI_SENDFILE = KF_FILESVR+'/cgi-bin/up';
var BASE_LOGO_URL = KF_FILESVR + '/logo/';

var g_isFF = vs_isFF(1.5);

function SendAJAXRequest(sURL ,sMethod ,fFunc,sContent, param)
{
	var ajaxobj=new AJAXRequest;
	var sTmp = "t="+Math.random().toString();
	var tContent = sContent+sTmp;
	ajaxobj.method=sMethod;
	ajaxobj.callback=fFunc;
	ajaxobj.callbackparam=param;
	if(sMethod == "POST" )
	{
		/*ajaxobj.url="http://"+KF_BIZAPP+"."+KF_DOMAINNAME+"/"+sURL+sTmp;*/
		ajaxobj.url=sURL+sTmp;
		ajaxobj.content=tContent;
	}
	else
	{
		/*ajaxobj.url="http://"+KF_BIZAPP+"."+KF_DOMAINNAME+"/"+sURL+sContent+sTmp;*/
		ajaxobj.url=sURL+sContent+sTmp;
	}
	ajaxobj.send();    // 发送请求

}

// AJAX类

function AJAXRequest()
{
	var xmlObj = false;
	var CBfunc,ObjSelf;
	ObjSelf=this;
	try
	{
		xmlObj=new XMLHttpRequest; 
	}
	catch(e)
	{
		try
		{
			xmlObj=new ActiveXObject("MSXML2.XMLHTTP"); 
		}
		catch(e2)
		{
			try
			{
				xmlObj=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e3)
			{
				xmlObj=false;
			}
		}
	}
	if (!xmlObj) return false;
	this.method="POST";
	this.url;
	this.async=true;
	this.content="";
	this.callback=function(cbobj){return;}
	this.send=function()
	{
		if(!this.method||!this.url||!this.async) return false;
		xmlObj.open (this.method, this.url, this.async);
		if(this.method=="POST") xmlObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlObj.onreadystatechange=function()
		{
			if(xmlObj.readyState==4)
			{
				if(xmlObj.status==200)
				{
					ObjSelf.callback(xmlObj, ObjSelf.callbackparam);
				}
				else
				{ 
					ObjSelf.callback(null, ObjSelf.callbackparam);
				}
				ObjSelf.callbackparam = null;
			}
		}
		if(this.method=="POST")	{ xmlObj.send(this.content);}
		else { xmlObj.send(null);}		
	}
}

function fail_login()
{
	alert("密码或验证码错误");
	changeImage();
}

function vs_isFF(ver, exact)
{
	var b = false;
	var v;
	var agt = navigator.userAgent.toLowerCase();
	var i = agt.indexOf("firefox/");

	if(!ver)
	{
		ver = 2;
	}
	
	if(i >= 0)
	{
		v = parseFloat(agt.substring(i + 8));

		if(!isNaN(v))
		{
			if(exact)
			{
				b = (v == ver);
			}
			else
			{
				b = (v >= ver);
			}
		}
	}

	return b;
}
