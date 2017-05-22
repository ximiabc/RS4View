(function(jQuery){
    $.extend({
        Vaild : function(_this){
            if( !!$(_this).data("vaild") ){
                var pattern = new RegExp($(_this).data("vaild"));
                if( pattern.test( $(_this).val() ) ){
                    $(_this).parent().removeClass("has-error").addClass("has-success");
                    $(_this).popover("destroy");
                }else{
                    $(_this).parent().addClass("has-error").removeClass("has-success");
                    $(_this).data("toogle", "top").data("placement", "top").data("container", "body").data("content", $(_this).data("errmsg")).popover({"trigger":"manual"}).popover("show");
                    return false;
                }
            }else{
                $(_this).parent().addClass("has-success");
            }
            return true;
        }
    });
    $.fn.extend({
        Vaild : function(){
            $(this).each(function(index, _this){
                $(_this).submit(function(){
                    var checkResult = true;
                    for(var i = 0 ; i < _this.length; i++ ){
                        checkResult = $.Vaild(_this[i]) && checkResult;
                    }
                    return checkResult;
                });
                for(var i = 0 ; i < _this.length; i++ ){
                    $(_this[i]).blur(function(){
                        $.Vaild(this);
                    });
                }
            });
        }
    });
    
    
})(jQuery);