			$(document).ready(function() {
		//下拉列表		
				$(".rs-summary").click(function() {
					$(this).toggleClass("active");
					$(this).next("div").slideToggle("slow").siblings(".rs-detailed").slideUp("slow");
				    $(this).siblings(".rs-summary").removeClass("active");
				});
				
				
             });