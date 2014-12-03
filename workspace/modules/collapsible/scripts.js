(function(){
    "use strict";

    [].forEach.call(document.querySelectorAll('[data-module="collapsible"]'), function(module){
        console.log(module);
        [].forEach.call(module.querySelectorAll('dt'), function(header){
            header.onclick = function() {
                header.classList.toggle('open');
                header.nextSibling.classList.toggle('open');
            };
        });
    });
})();
