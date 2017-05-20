$(document).ready(function(){
    var body = $(document.body),
        filer_default_opts = {
            changeInput2: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>拖拽文件到这里</h3> <span style="display:inline-block; margin: 15px 0">或</span></div><a class="jFiler-input-choose-btn blue-light">浏览文件</a></div></div>',
            limit: null,
            templates: {
                box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
                item: '<li class="jFiler-item" style="width: 33%">\
                            <div class="jFiler-item-container">\
                                <div class="jFiler-item-inner">\
                                    <div class="jFiler-item-thumb">\
                                        <div class="jFiler-item-status"></div>\
                                        <div class="jFiler-item-info">\
                                            <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name | limitTo: 25}}</b></span>\
                                            <span class="jFiler-item-others">{{fi-size2}}</span>\
                                        </div>\
                                        {{fi-image}}\
                                    </div>\
                                    <div class="jFiler-item-assets jFiler-row">\
                                        <ul class="list-inline pull-left">\
                                            <li>{{fi-progressBar}}</li>\
                                        </ul>\
                                        <ul class="list-inline pull-right">\
                                            <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>',
                itemAppend: '<li class="jFiler-item" style="width: 33%">\
                                <div class="jFiler-item-container">\
                                    <div class="jFiler-item-inner">\
                                        <div class="jFiler-item-thumb">\
                                            <div class="jFiler-item-status"></div>\
                                            <div class="jFiler-item-info">\
                                                <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name | limitTo: 25}}</b></span>\
                                                <span class="jFiler-item-others">{{fi-size2}}</span>\
                                            </div>\
                                            {{fi-image}}\
                                        </div>\
                                        <div class="jFiler-item-assets jFiler-row">\
                                            <ul class="list-inline pull-left">\
                                                <li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
                                            </ul>\
                                            <ul class="list-inline pull-right">\
                                                <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </li>',
                progressBar: '<div class="bar"></div>',
                itemAppendToEnd: false,
                removeConfirmation: true,
                _selectors: {
                    list: '.jFiler-items-list',
                    item: '.jFiler-item',
                    progressBar: '.bar',
                    remove: '.jFiler-item-trash-action'
                }
            },
            dragDrop: {},
            uploadFile: {
                url: "./php/upload.php",
                data: {},
                type: 'POST',
                enctype: 'multipart/form-data',
                beforeSend: function(){},
                success: function(data, el){
                    var parent = el.find(".jFiler-jProgressBar").parent();
                    el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                        $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                    });

                    console.log(data);
                },
                error: function(el){
                    var parent = el.find(".jFiler-jProgressBar").parent();
                    el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                        $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");    
                    });
                },
                statusCode: null,
                onProgress: null,
                onComplete: null
            },
            onRemove: function(itemEl, file, id, listEl, boxEl, newInputEl, inputEl){
                var file = file.name;
                $.post('./php/remove_file.php', {file: file});
            },
        };
    
    //Run PrettyPrint
    prettyPrint();
    
    //Pre Collapse
    $('.pre-collapse').on("click", function(e){
        var collapse_class = 'collapsed',
            title = ["<i class=\"fa fa-code pull-left\"></i> + Show the source code", "<i class=\"fa fa-code pull-left\"></i> - Hide the source code"],
            $parent = $(this).closest('.pre-box'),
            $pre = $parent.find('pre').first();
        
        if($parent.hasClass(collapse_class)){
            $pre.slideDown("fast", function(){
                $parent.removeClass(collapse_class);
            });
            $(this).html(title[1]);
        }else{
            $pre.slideUp("fast", function(){
                $parent.addClass(collapse_class);
            });
            $(this).html(title[0]);
        }
    });
    
    //Apply jQuery.filer
    
    $('#demo-fileInput').filer({
        changeInput: filer_default_opts.changeInput2,
        showThumbs: true,
        theme: "dragdropbox",
        limit: 1,
        extensions: ['xls', 'xlsx', 'xlsm'],
        templates: filer_default_opts.templates,
        dragDrop: filer_default_opts.dragDrop,
        uploadFile: filer_default_opts.uploadFile,
        onRemove: filer_default_opts.onRemove
    });
});
