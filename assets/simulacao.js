const SIMULATIONS_BEFORE_ERROR = 3;
const SIMULACAO = true;

var frases    = [
    "- Errei...",
    "- Acho que não era essa...",
    "- Você sabe qual era a correta?",
    "- Quase..."
];

let introduzirErro = false;

$(document).ready(function(){
    $("#sound").click(function(){
        if (audios['BGM'].currentTime == 0) {
            audios['BGM'].play();
        } else {
            audios['BGM'].pause();
            audios['BGM'].currentTime = 0;
        }
    });

    iniciarJogo();
});

function simularSequencia ()
{
    for (let i=0; i<=sequencia.length-1; i++) {
        if (i == sequencia.length-1 && sequencia.length >= SIMULATIONS_BEFORE_ERROR) {
            introduzirErro = true;
        } else {
            introduzirErro = false;
        }

        let x = sequencia[i];
        if ( introduzirErro ) {
            while (x == sequencia[i]) {
                x = getRandomInt(1, 4);
            }
        }

        // console.log(x);
        setTimeout(function(){
            simularJogada(x)
        }, TEMPO *(i+1));
    }
}

function simularJogada (x)
{
    const ICONE_MAO = '<img id="hand" src="assets/imagens/mão para clicar.png">';

    $("#hand").remove();
    $(".botao[data-numero="+ x +"]").append(ICONE_MAO);

    setTimeout(function(){
        ativarBotao(x);
        setTimeout(function(){
            $("#hand").remove();
            $("#debug").append(ICONE_MAO);
        }, TEMPO/2 -50);
    }, TEMPO/2 -50);
}

function getStageNumber ()
{
    return window.location.search.substr(2);
}