document.charset="UTF-8"
//ƽ������������
toTop = {
	init:function(){
		document.getElementById("toTop").onclick=function(e){
			toTop.set();
			return false;
		}		
	},
	waitTimer:null,
	set:function(){
		var d_st=document.documentElement.scrollTop;
		if(window.navigator.userAgent.indexOf("MSIE")>=1){
			for (var i=d_st; i>10; i-=Math.floor(i/6)){
			window.scrollTo(0,i);
			}
			window.scrollTo(0,10);
		}
		else{
		window.scrollTo(0,Math.floor(d_st / 2));
		
		 if(d_st>10){
				 waitTimer=setTimeout("toTop.set()",40);
		  }
			else{
				  clearTimeout(waitTimer);
			}
		}
	}
}
window.onload = function(){toTop.init();}


lastScrollY=0;
function heartBeat(){ 
var diffY;
if (document.documentElement && document.documentElement.scrollTop)
    diffY = document.documentElement.scrollTop;
else if (document.body)
    diffY = document.body.scrollTop
else
    {/*Netscape stuff*/}

percent=.1*(diffY-lastScrollY); 
if(percent>0)percent=Math.ceil(percent); 
else percent=Math.floor(percent); 
document.getElementById("full").style.top=parseInt(document.getElementById("full").style.top)+percent+"px";

lastScrollY=lastScrollY+percent; 
}
function mClk(){ //��
event.srcElement.click();
} 
//ȥ����꾭��QQʱ�͵������ onmouseover='mClk()'
suspendcode="<div id=\"full\" style='right:20px; top:180px; position:absolute;z-index:1000;text-align:center;'><table width='99' border='0' cellpadding='0' cellspacing='0'><tr><td align='center'><a id='toTop' href='#top'><img border='0' src='http://www.ieread.cn/images/icon_top.gif' alt='����' /></a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;font-size:12px; font-family:Arial;line-height:18px;background:#fff;'>�����ܹ�˾</td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;font-size:12px; font-family:Arial;line-height:18px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=1142501266&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:1142501266:45''' title='���QQ�����ǽ���'/>&nbsp;��������</a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=1153638172&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:1153638172:45''' title='���QQ�����ǽ���'/>&nbsp;���۴���</a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=1493162804&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:1493162804:45''' title='���QQ�����ǽ���'/>&nbsp;���۴���</a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;font-size:12px; font-family:Arial;line-height:18px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=33611720&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:33611720:45''' title='���QQ�����ǽ���'/>&nbsp;�������</a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=1619872625&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:1619872625:45''' title='���QQ�����ǽ���'/>&nbsp;�ͻ�����</a></td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;font-size:12px; font-family:Arial;line-height:18px;background:#fff;'>�����г���</td></tr><tr><td align='center' style='border-left:solid 1px #dde6ec;border-right:solid 1px #dde6ec;height:26px;background:#fff;'><a href='http://wpa.qq.com/msgrd?v=3&uin=1270057659&Site=www.ieread.com&Menu=yes'><img  border='0' align='absmiddle' src='http://wpa.qq.com/pa?p=2:1270057659:45''' title='���QQ�����ǽ���'/>&nbsp;���۴���</a></td></tr><tr><td align='center'><a href='#bottom'><img border='0' src='http://www.ieread.cn/images/icon_bottom.gif' alt='�ײ�' /></a></td></tr></table></div>"

document.write(suspendcode);
window.setInterval("heartBeat()",1);