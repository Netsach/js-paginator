(function ($) {
    $.extend({

        // Class Paginator with constructor
        paginator : function(options){
            // If options is undefined, force to empy object
            if(!options) options = {}
            this.options = options;
            // set default values
            _.defaults(this.options, {
                paginate_by: 4,
                elements: null,
                btn_previous: null,
                btn_next: null,
                page_counter: null,
            });
            this.current_page = 1;
            this.render();

            var paginator = this;
            $(this.options.btn_previous).click(function(){
                paginator.paginate_previous();
            });
            $(this.options.btn_next).click(function(){
                paginator.paginate_next();
            });

            return this;
        },

        get_elements_count : function(){
            return $(this.options.elements).size();
        },
        get_pages_count : function(){
            return Math.ceil(this.get_elements_count() / this.options.paginate_by);
        },
        get_current_page : function(){
            return this.current_page;
        },
        paginate_previous : function(){
            if( this.current_page > 1 ){
                this.current_page--;
                this.render();
            }
        },
        paginate_next : function(){
            if(this.current_page < this.get_pages_count()){
                this.current_page++;
                this.render();
            }
        },
        render : function(){
            var paginator = this;
            $(this.options.elements).each(function(index){
                
                if(index >=  paginator.options.paginate_by*(paginator.current_page-1) && index < paginator.options.paginate_by*paginator.current_page){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });


            if(this.get_elements_count < paginator.options.paginate_by){
                $(this.options.btn_previous).hide();
                $(this.options.btn_next).hide();
            };

            if(this.current_page == 1){
                $(this.options.btn_previous).hide();
            }else{
                $(this.options.btn_previous).show();
            };

            if(this.current_page == this.get_pages_count()){
                $(this.options.btn_next).hide();
            }else{
                $(this.options.btn_next).show();
            };

            $(this.options.page_counter).html(this.get_current_page() + "/" + this.get_pages_count());
        }
    });
})(jQuery);
