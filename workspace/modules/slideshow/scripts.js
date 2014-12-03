/**
Module Slideshow
=====

The Slideshow module is a very simple slider that will switch between child elements with fade effect.

The first `slide` must have the class `active`.

__Template markup:__

```
<module class="slideshow" data-module="slideshow">
    <!-- loop of slides -->
    <div class="slide" data-index="0">
        ...
    </div>
    <!-- end of loop of slides -->

    <nav class="nav">
        <button class="prev">prev</button>
        <button class="next">next</button>
    </nav>

    <nav class="control">
        <!-- loop of slides -->
            <button data-index="0">•</button>
        <!-- end of loop of slides -->
    </nav>
</module>
```

__Style required:__

```
.slideshow {
    position: relative;

    .slide {
        display: none;
        opacity: 0;
        position: relative;
        transition: opacity 2s;
        width: 100%;
        z-index: 1;

        &.active {
            display: block;
            opacity: 1;
            transition: opacity 2s;
            z-index: 2;
        }
    }

    .nav {
        position: absolute;
        top: 50%;
        width: 100%;
        z-index: 3;

        .prev {
            float: left;
        }

        .next {
            float: right;
        }
    }

    .control {
        bottom: -20px;
        position: absolute;
        text-align: center;
        width: 100%;
        z-index: 4;
    }

    &.initialized {
        .slide {
            display: block;
            position: absolute;
        }
    }
}

```

*/
(function(){
    "use strict";

    [].forEach.call(document.querySelectorAll('[data-module="slideshow"]'), function(module){
        console.log(module);
        
        var index = 0, interval = 0,
            slides = module.getElementsByClassName("js-slide"),
            nav = module.getElementsByClassName("js-nav")[0],
            prev = nav.getElementsByClassName("js-prev")[0],
            next = nav.getElementsByClassName("js-next")[0],
            control = module.getElementsByClassName("js-control")[0],
            controlItens = control.getElementsByClassName("js-control-item");

        function setHeight(){
            module.style.height = slides[index].offsetHeight + "px";
        }

        function buildControl(){
            [].forEach.call(controlItens, function (controlItem) {
                controlItem.addEventListener("click", function () {
                    switchSlide(this.dataset.index);
                }, false);
            });
        }

        function buildNavigation(){
            prev.onclick = function() {
                switchSlide("prev");
            };

            next.onclick = function() {
                switchSlide("next");
            };
        }

        function switchSlide(action){
            clearInterval(interval);
            interval = 0;

            slides[index].classList.remove("active");
            controlItens[index].classList.remove("active");

            if (action === "prev") {
                index = index === 0 ? slides.length - 1 : index - 1;
            } else if (action === "next") {
                index = index === slides.length - 1 ? 0 : index + 1;
            } else {
                index = parseInt(action);
            }

            slides[index].classList.add("active");
            controlItens[index].classList.add("active");
            module.dataset.index = index;

            setHeight();

            interval = setInterval(function (){
                switchSlide("next");
            }, 5000);
        }

        if (slides.length > 1) {
            window.addEventListener("resize", setHeight);
        }

        buildControl();
        buildNavigation();
        setHeight();

        slides[0].classList.add("active");
        controlItens[0].classList.add("active");

        module.dataset.index = index;
        module.classList.add("initialized");

        interval = setInterval(function (){
            switchSlide("next");
        }, 5000);
    });

/*
        var slider = document.getElementsByClassName("js-slider"),

        

        if (slider.length > 0) {
            slides = slider[0].getElementsByClassName("slide");
            control = slider[0].getElementsByClassName("control");
            controlItens = control[0].getElementsByTagName("button");

            if (slides.length > 1) {
                window.addEventListener("resize", setHeight);

                buildControl();
                buildNavigation();
                setHeight();

                slides[0].classList.add("active");
                controlItens[0].classList.add("active");

                slider[0].dataset.index = index;
                slider[0].classList.add("initialized");

                interval = setInterval(function (){
                    switchSlide("next");
                }, 5000);
            }
        }
*/

})();
