(function(){
    "use strict";

    window.onload = function(){
        [].forEach.call(document.querySelectorAll('[data-module="collapsible"]'), function(module){
            [].forEach.call(module.querySelectorAll('dt'), function(header){
                header.onclick = function() {
                    header.classList.toggle('open');
                    header.nextSibling.classList.toggle('open');
                };
            });
        });
    };
})();
