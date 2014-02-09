$(window).load(function(){

});

(function($){
    function Ls() {
        var items,
            elemIndex,
            removeEl = '<a href="javascript: void(0)" class="tw-ls-remove">del</a>',
            sep = ',', str, key, self = this,
            temp = '<div class="ls-wrapper">Please type something here<input type="text" value="" id="input" placeholder="text here"/><ul id="all"></ul></div>';

        this.init = function(){
            $('body').append(temp);
            $('#all').append(this.getList());
            $('#input').on('keypress', self.keyPress);
            $('.tw-ls-remove').off('click').on('click', self.removeElement);
        };



        this.getList = function(){
            if(!localStorage.getItem('ls')) return false;
            str = localStorage.getItem('ls').split(',');
            items = '';
            for(var i = 0; i < str.length; i++){
                items += '<li>' + localStorage.getItem(str[i]) + removeEl + '</li>';
            }
            return items;
        };

        this.removeElement = function(){
            elemIndex = $(this).parent().index();
            str = localStorage.getItem('ls').split(',');
            localStorage.removeItem(str[elemIndex]);
            str.splice(elemIndex, 1);
            if(str.length == 0)
                localStorage.removeItem('ls');
            else
                localStorage.setItem('ls', str.toString());
            $(this).parent().remove();

        };

        this.update = function(key){
            $('#all').append('<li>' + localStorage.getItem(key) + removeEl + '</li>');
            $('.tw-ls-remove').off('click').on('click', self.removeElement);
        };

        this.addItem =  function(item){
            key = 'ls' + new Date().getTime();
            str = localStorage.getItem('ls');

            if(str){
                localStorage.setItem('ls', str + sep + key);
            }else{
                localStorage.setItem('ls', key);
            }
            localStorage.setItem(key, item);
            self.update(key);
        };

        this.keyPress = function(e){
            if(e.which == 13){
                if($.trim($('#input').val()) != ''){
                    self.addItem($.trim($(this).val()));
                    $(this).val('');
                }
            }
        };

        this.clear = function(){
            localStorage.clear();
        };

        this.init();
    }

    ls = new Ls();

})(jQuery)