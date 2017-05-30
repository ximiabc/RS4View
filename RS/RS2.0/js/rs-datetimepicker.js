$('.form_date').datetimepicker({
    language:  'zh-CN',
    format: "yyyy-mm-dd",
    weekStart: 0,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
});
$(function () {
    var startTime = $('#startTime');
    var endTime = $("#endTime");
    //动态设置最小值(选择前面一个日期后：后面一个日期不能小于前面一个)
    startTime.on('changeDate', function (e) {
        endTime.datetimepicker('setStartDate', e.date);
    });
    //动态设置最大值(选择后面一个日期后：前面一个日期不能大于前面一个）
    endTime.on('changeDate', function (e) {
        startTime.datetimepicker('setEndDate', e.date);
    });
});