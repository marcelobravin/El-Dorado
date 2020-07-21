const SIMULACAO = false;

var frases = [
    "- Você está cada vez melhor!",
    "- Vamos tentar novamente, eu sei que você consegue!",
    "- Vamos tentar novamente.",
    "- Muito bom, estamos quase conseguindo.",
    "- Você é incrível.",
    "- Continue assim.",
    "- Tente novamente.",
    "- Vamos novamente."
];

$(document).ready(function(){
    $("#sound").click(function(){
        if (audios['BGM'].currentTime == 0) {
            audios['BGM'].play();
        } else {
            audios['BGM'].pause();
            audios['BGM'].currentTime = 0;
        }
    });

    $(".botao").click(function(){
        if ( !$("body").hasClass("simulacao") ) {
            let numeroClicado = $(this).text();
            ativarBotao(numeroClicado);
        }
    });

    iniciarJogo();
});