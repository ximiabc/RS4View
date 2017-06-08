function setDisabled(){
	//这个类是用来设置报名期间的上传、删除、添加不可用。
	$('#rs-up').prop("disabled",true);
	$('#rs-modalDelete').prop("disabled",true);
	$('#rs-addItemText').prop("disabled",true);
	$('#rs-addItem').prop("disabled",true);
}
function itemListfunc(){
	//获取当前页面上字段名列表中的值
	var itemList = [];
	$('.slot-item').each(function(){
		itemList.push($.trim($(this).children('.rs-itemName').text()));
	});
	$('.rs-baoliu').each(function(){
		itemList.push($.trim($(this).children('.rs-itemName').text()));
	});
//				console.log("itemList的类型为：" + typeof(itemList) + "\nitemList的长度为："+itemList.length + "\nitemList的值为："+itemList);
	return itemList;
}
(function(){
	var slotItem , slotItemTxt , slotItemTxtRule;
	$('#slot-list').on('mousedown','.slot-item .glyphicon',function(e){
		e.stopImmediatePropagation();
		slotItem = $(this).parent();
		slotItemTxt = slotItem.children('.rs-itemName');
		slotItemTxtRule =  slotItem.children('.rs-itemRule');
		$('#editModal').modal('show');
		//设置模态框中文本
		$('#rs-modalText').val($.trim(slotItemTxt.text()));
		$('#rs-modalSelect').val(slotItemTxtRule.attr('id'));
	});
	//点击删除，删除此节点
	$('#rs-modalDelete').click(function (e){
		if(!slotItem){alert('操作失败,请刷新');return;}
		slotItem.remove();
		$('#editModal').modal('hide');
		$('#rs-down').prop("disabled",true);
		$('#rs-saveItem').removeClass("hidden");
	});
	//点击修改，修改此节点值
	$('#rs-modalEdit').click(function (e){
		if(!slotItem){alert('操作失败,请刷新');return;}
		//获取修改文本框内的文本
		var editText = $('#rs-modalText').val();
		//获取修改规则框内的文本
		var editRule = $('#rs-modalSelect option:selected').text();
		//获取修改规则的值
		var editRuleId = $('#rs-modalSelect option:selected').val();
		var itemList = [];
		itemList = itemListfunc();
		var isInArray = $.inArray(editText,itemList);
		var itemIndex = $('#slot-list').children().index(slotItem);
		//console.log(isInArray+'+++'+itemIndex);
		if(isInArray != -1 && isInArray != itemIndex){alert("已存在此字段名。");return;}
		slotItemTxt.text(editText);
		slotItemTxtRule.text(editRule);
		slotItemTxtRule.attr('id',editRuleId);
		$('#editModal').modal('hide');
		$('#rs-down').prop("disabled",true);
		$('#rs-saveItem').removeClass("hidden");
	});
})();
//点击添加
$('#rs-addItem').click(function(){
	//addId的'items'为字段序号////////////////////
	var addId = 'items' + ($('.slot-item').length + 1);
	var addText = $.trim($('#rs-addItemText').val());
	var itemList = [];
	if(addText == ''){return;}
	itemList = itemListfunc();
	if($.inArray(addText,itemList) != -1){alert("已存在此字段名。");return;}
	if($('.slot-item').length >= 40){alert("字段数量过多，无法添加。");return;}
	//缺少一套对添加字段的校验
	$('#slot-list').append('<li class="list-group-item slot-item">'+
		'<span id='+addId+' class="rs-itemName">'+addText+'</span>'+
		'<span id="rule1" class="rs-itemRule">无</span>'+
		'<span class="glyphicon glyphicon-edit pull-right" aria-hidden="true"></span></li>');
	$('#rs-addItemText').val('');
	$('#rs-down').prop("disabled",true);
	$('#rs-saveItem').removeClass("hidden");
});
//点击保存
$('#rs-saveItem').click(function(){
	//ToWhere是设置post路径的变量
	var ToWhere = $('.container').attr('id');
	var itemList = [];
	$('.slot-item').each(function(){
		//字段名的id值
		var nameId = $(this).children('.rs-itemName').attr('id');
		//字段名值
		var nameTxt = $.trim($(this).children('.rs-itemName').text());
		//字段名规则id值
		var ruleId = $.trim($(this).children('.rs-itemRule').attr('id'));
		itemList.push(nameId + ':' + nameTxt + ':' + ruleId);
	});
	console.log(itemList);
//				console.log("itemList的类型为：" + typeof(itemList) + "\nitemList的长度为："+itemList.length + "\nitemList的值为："+itemList);
	$('#rs-saveItem').addClass("hidden");
	$('#rs-down').prop("disabled",false);
	//通过Ajax提交信息到后台
//				$.ajax({
//					contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
//					type: "POST",
//					url: "",/*地址*/
//					data: {itemList : JSON.stringify(itemList)},/*传参*/
//					dataType: "json",
//					success: function(data){
//						$('#rs-saveItem').addClass("hidden");
//					},
//					error: function(jqXHR){alert(jqXHR.status);}
//				});
});
jQuery(function($){
	$('#dragslot').dragslot({
		dropCallback: function(el){/*alert(el);*/}
	});
});