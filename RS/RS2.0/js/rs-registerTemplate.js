function itemListfunc(){
	//获取当前页面上字段名列表中的值
	var itemList = [];
	$('.slot-item').each(function(){
		itemList.push($.trim($(this).text()));
	});
//				console.log("itemList的类型为：" + typeof(itemList) + "\nitemList的长度为："+itemList.length + "\nitemList的值为："+itemList);
	return itemList;
}
/*
 * stopImmediatePropagation
 * 阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上
 */
$('#slot-list').on('mousedown','.slot-item .glyphicon',function(e){
	e.stopImmediatePropagation();
	var slotItem = $(this).parent();
	$('#editModal').modal('show');
	//设置模态框中文本
	$('#rs-modalText').val($.trim(slotItem.text()));
	//点击删除，删除此节点
	$('#rs-modalDelete').click(function (e){
		e.stopImmediatePropagation();
		slotItem.remove();
		$('#editModal').modal('hide');
		$('#rs-down').prop("disabled",true);
		$('#rs-saveItem').removeClass("hidden");
		console.log(0-0);
		console.log('***');
	});
	//点击修改，修改此节点值
	$('#rs-modalEdit').click(function (e){
		e.stopImmediatePropagation();
		var editText = $('#rs-modalText').val();
		var itemList = [];
		itemList = itemListfunc();
		if($.inArray(editText,itemList) != -1){alert("已存在此字段名。");return;}
		slotItem.html(editText);
		slotItem.append('<span class="glyphicon glyphicon-edit pull-right" aria-hidden="true"></span>');
		$('#editModal').modal('hide');
		$('#rs-down').prop("disabled",true);
		$('#rs-saveItem').removeClass("hidden");
	});
});
//点击添加
$('#rs-addItem').click(function(){
	var addText = $.trim($('#rs-addItemText').val());
	var itemList = [];
	itemList = itemListfunc();
	if(addText == ''){return;}
//				console.log($.inArray(addText,itemList));
	if($.inArray(addText,itemList) != -1){alert("已存在此字段名。");return;}
	if($('.slot-item').length >= 40){alert("字段数量过多，无法添加。");return;}
	//缺少一套对添加字段的校验
	$('#slot-list').append('<li class="list-group-item slot-item">'+addText+
		'<span class="glyphicon glyphicon-edit pull-right" aria-hidden="true"></span></li>');
	$('#rs-addItemText').val('');
	$('#rs-down').prop("disabled",true);
	$('#rs-saveItem').removeClass("hidden");
});
//点击保存
$('#rs-saveItem').click(function(){
	var itemList = [];
	itemList = itemListfunc();
	$('#rs-saveItem').addClass("hidden");
	$('#rs-down').prop("disabled",false);
//				$('#rs-down').removeProp("disabled");
	//通过Ajax提交信息到后台
//				$.ajax({
//					contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
//					type: "POST",
//					url: "",/*地址*/
//					data: {itemList : itemList},/*传参*/
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