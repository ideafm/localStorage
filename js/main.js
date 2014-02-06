$(window).load(function(){
    ls.init();
});

(function($){
    function Ls() {
        var items = [],
            item,
            strToArr,
            sep = ',', str, key, self = this,
            temp = '<div class="ls-wrapper">Please type something here<input type="text" value="" id="input" placeholder="text here"/><ul id="all"></ul></div>';

        this.init = function(){
            $('body').append(temp);
            $('#all').append(this.getList());
            $('#input').on('keypress', self.keyPress);
        };

        this.getList = function(){
            if(!localStorage.getItem('ls')) return false;
            str = localStorage.getItem('ls').split(',');
            items = '';
            for(var i = 0; i < str.length; i++){
                items += '<li>' + localStorage.getItem(str[i]) + '</li>';
            }
            return items;
        };

        this.update = function(key){
            $('#all').append('<li>' + localStorage.getItem(key) + '</li>')
        }

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
        }
    }

    ls = new Ls();

})(jQuery)