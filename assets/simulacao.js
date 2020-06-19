var frases    = [
    "- Errei..."
    , "- Cacete..."
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
}); ////////////////////////////////////////////////////////////////////////////

function simularSequencia ()
{
    for (let i=0; i<=sequencia.length-1; i++) {
        if (i == sequencia.length-1 && sequencia.length >= 3) {
            introduzirErro = true;
        } else {
            introduzirErro = false;
        }

        let x = sequencia[i];
        if ( introduzirErro ) {
            x = getRandomInt(1, 4);
        }

        setTimeout(function(){
            simularJogada(x)
        }, TEMPO *(i+1));
    }
}

function simularJogada (x)
{
    const ICONE_MAO = '<img id="hand" src="assets/imagens/mão para clicar.png" style="position: absolute">';
    $(".botao[data-numero="+ x +"]").append(ICONE_MAO);
    setTimeout(function(){
        acessarBotao(x);
        setTimeout(function(){
            $("#hand").remove();
        }, TEMPO/2 -50);
    }, TEMPO/2 -50);
}

function demonstrarSequencia ()
{
    exibir("Memorize...");
    FSM = 'watch';

    for (var i=0; i<=sequencia.length-1; i++) {
        let x = sequencia[i];

        setTimeout(function(){
            acessarBotao(x);
        }, TEMPO *(i+1));

        if ( i == sequencia.length-1  ) {
            setTimeout(function(){
                exibir("Vou jogar, observe...");
                FSM = 'play';
                simularSequencia();
            }, TEMPO *(i+1) +INTERVALO);
        }
    }
}

function errou ()
{
    const frase = getFraseAleatoria();
    exibir(frase, "erro");

    if (sequencia.length > PASSOS_VITORIA) {
        setTimeout(function(){
            FSM = 'stop'; /////////////////////////////////////////////// simulate
            alert("Eu não sou muito bom nisso...")

            var parametroGet = window.location.search.substr(2);
            alert(parametroGet);

            if (confirm("Você está pronto?")) {
                window.location.href = "fase-"+ parametroGet +".html";
            } else {
                window.location.href = "habituacao-"+ parametroGet +".html";
            }
        }, 3000);
    } else {
        setTimeout(function(){

            setTimeout(function(){
                passo = 0;
                sequencia = [];
                IncrementarSequencia();
                demonstrarSequencia();
            }, INTERVALO);
        }, INTERVALO);
    }
}