audios['tremor'] = new Audio('audio/equake6.wav');

$(document).ready(function(){
    setInterval(function(){
        let r = getRandomInt(0, 100);
        if (r < 45) {
            $("body").addClass('shake');
            audios['tremor'].play();

            setTimeout(function(){
                $(".shake").removeClass('shake');
                audios['tremor'].pause();
                audios['tremor'].currentTime = 0;
            }, 1000);
        }
    }, 1000);
});