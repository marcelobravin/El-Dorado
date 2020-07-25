audios['tremor'] = new Audio('audio/equake6.wav');

var tremorInterval;
function iniciarTremor ()
{
    tremorInterval = setInterval(function(){
        let r = getRandomInt(0, 100);
        if (r < 45) {

            let nivelTremor = 'shake';
            audios['tremor'].volume = 0.25;

            if (sequencia.length > 2 && sequencia.length <= 4) {
                nivelTremor = 'shake2';
                audios['tremor'].volume = 0.5;
            } else if (sequencia.length > 4 && sequencia.length <= 6) {
                nivelTremor = 'shake3';
                audios['tremor'].volume = 0.75;
            } else if (sequencia.length > 6) {
                nivelTremor = 'shake4';
                audios['tremor'].volume = 1;
            }

            $("body").addClass(nivelTremor);
            audios['tremor'].play();

            setTimeout(function(){
                $(".shake").removeClass('shake');
                $(".shake2").removeClass('shake2');
                $(".shake3").removeClass('shake3');
                $(".shake4").removeClass('shake4');
                audios['tremor'].pause();
                audios['tremor'].currentTime = 0;
            }, 1000);
        }
    }, 1000);
}