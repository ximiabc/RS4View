$(document).ready(function() {
	//下拉列表	
	$(".rs-summary").click(function() {
		$(this).toggleClass("rs-active");
		$(this).next("div").slideToggle("slow").siblings(".rs-detailed").slideUp("slow");
	    $(this).siblings(".rs-summary").removeClass("rs-active");
	});
	$(".rs-detailed").on('click','a',function() {
		$('.rs-focus').removeClass("rs-focus");
		$(this).addClass("rs-focus");
	});
});