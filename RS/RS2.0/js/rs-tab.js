$(document).ready(function() {
	//下拉列表	
	$(".rs-summary").click(function() {
		$('.rs-active').removeClass("rs-active");
		$(this).toggleClass("rs-active");
		$(this).next("div").slideToggle("slow").siblings(".rs-detailed").slideUp("slow");
	});
	$(".rs-detailed").on('click','a',function() {
		$('.rs-focus').removeClass("rs-focus");
		$(this).addClass("rs-focus");
	});
});