$(document).ready(function() {
	var arr=[];
	$('.btn-modal').on('click',function(){
		arr.length=0;
        $(this).parent().siblings("td").each(function(){
        	arr.push($(this).text());
        	console.log(arr);
        });
	    var num= $('#myModal-2 .modal-body .form-group div').find('input'); 
	     	for(var i=0;i<num.length;i++){
	     	num.eq(i).attr('placeholder',arr[i]);
	    }
	});
});