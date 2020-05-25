setTimeout(function(){
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#ancora").offset().top
    }, 3000);
}, 1000);