const SIMULACAO = false;

var frases = [
    [
        "Vamos tentar novamente.",
        "tentar novamente.ogg"
    ], [
        "Você é incrível.",
        "voce e incrivel.ogg"
    ], [
        "Continue assim.",
        "continue assim.ogg"
    ], [
        "Tente novamente.",
        "tente novamente.ogg"
    ], [
        "Vamos tentar novamente, eu sei que você consegue",
        "novamente.ogg"
    ]
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