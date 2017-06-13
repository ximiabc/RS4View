var MSG = {
    setCss : 'position:absolute;top:0;left:50%;width:200px;margin-left:-100px;background-color:#0BF;color: #fff;font-size:16px;line-height:32px;text-align:center;border-radius:0px 0px 6px 6px;display:none;',
    timeIn : 1500,
	timeOut : 3000,
	createDiv : function(msg){
		var div = document.createElement('div');
		div.style.cssText = MSG.setCss;
		div.innerHTML = msg;
		document.body.appendChild(div);
		return div;
	},
    fadeIn : function(ele){
    	ele.fadeIn(MSG.timeIn,function(){
    		MSG.fadeOut(ele);
    	});
	},
    fadeOut : function(ele){
    	ele.fadeOut(MSG.timeOut,function(){
    		MSG.remove(ele);
    	});
	},
	remove : function(ele){
    	ele.remove()
    },
	show : function(setmsg){
		MSG.fadeIn($(MSG.createDiv(setmsg)));
	}
}