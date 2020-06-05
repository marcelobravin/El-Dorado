var sequencia = [];
var passo     = 0;
var FSM       = '';
// const PASSOS_VITORIA = 5;
const PASSOS_VITORIA = 0;

/* Fonte: https://freesound.org/people/Jaz_the_MAN_2/packs/17749/?page=1#sound */
var audios = [];
audios['do']   = new Audio('audio/316898__jaz-the-man-2__do.wav');
audios['re']   = new Audio('audio/316908__jaz-the-man-2__re.wav');
audios['mi']   = new Audio('audio/316906__jaz-the-man-2__mi.wav');
audios['fa']   = new Audio('audio/316904__jaz-the-man-2__fa.wav');
audios['BGM']  = new Audio('audio/My-Fat-Cat.mp3');
audios['erro'] = new Audio('audio/02_-_Pitfall!_-_A26_-_Death_Fanfare.ogg');
audios['acerto'] = new Audio('audio/03_-_Pitfall!_-_A26_-_Treasure_Fanfare.ogg');

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
        let numeroClicado = $(this).text();

        if (comSom) {
            switch (numeroClicado) {
                case '1': audios['do'].play();
                    break;
                case '2': audios['re'].play();
                    break;
                case '3': audios['mi'].play();
                    break;
                case '4': audios['fa'].play();
                    break;
            }
        }

        if (FSM == "play") {
            if (numeroClicado == sequencia[ passo ]) {
                acertou();
            } else {
                errou();
            }
        }
    });

    gameStart();
});

///////////////////////////////////////////////////////////////////////////////;
function acertou ()
{
    if (sequencia.length == passo+1) {
        setTimeout(function(){
            audios['acerto'].play();
        }, 1000);

        carregarProximaSequencia();
    } else {
        passo++;
        $("#passo").val(passo+1 + "º");
        exibir("Acertou o "+ passo, "acerto");
    }
}

function carregarProximaFase ()
{
    $("body").addClass("venceu");
    // alert("Meus parabéns você venceu!");

    let destino = "";
    let faseAtual = parseInt( pegarNumeroFase() );
    if (faseAtual < 4) {
        let proximaFase = faseAtual+1;
        destino = "habituacao-"+ proximaFase +".html";
    } else {
        destino = "fim.html";
    }

    // txto

    var textToDisplay = 'getFraseSequencial(etapa)';
    var $output = $(".typewriter");
    type(textToDisplay, $output);
/*
    if (textToDisplay == -1) {
        type("Você está pronto(a)?", $output);
        $("#ancora").addClass("invisivel");
        setTimeout(function(){
            $("#container-botoes").removeClass("invisivel");
        }, 1500);
    } else {
        type(textToDisplay, $output);
        // etapa++;
    }

*/







    $("body").append('<a id="next" href="'+ destino +'">Proxima Fase</a>');
    $([document.documentElement, document.body]).animate({
        scrollTop: $("body").offset().top
    }, 3000);
}

function pegarNumeroFase ()
{
    const f = window.location.href;
    let x = f.split('-');
    let numero = x[1][0];
    return parseInt(numero);
}

function carregarProximaSequencia ()
{
    FSM = 'watch';
    exibir("Acertou a sequência: "+ (sequencia.length) +"!", "acerto");
    passo = 0;
    setTimeout(function(){
        IncrementarSequencia();
        demonstrarSequencia();
    }, 2000);
}

function errou ()
{
    // audios['erro'].play();
    const frase = getFraseAleatoria();
    exibir(frase, "erro");

    if (sequencia.length > PASSOS_VITORIA) {
        setTimeout(function(){
            carregarProximaFase();
        }, 3000);
    } else {
        setTimeout(function(){

            setTimeout(function(){
                passo = 0;
                sequencia = [];
                IncrementarSequencia();
                demonstrarSequencia();
            }, 2000);
        }, 2000);
    }
}

function demonstrarSequencia ()
{
    exibir("Memorize...");
    FSM = 'watch';

    for (var i=0; i<=sequencia.length-1; i++) {
        let x = sequencia[i];

        setTimeout(function(){
            $(".botao[data-numero="+ x +"]").click();
            $(".botao[data-numero="+ x +"]").addClass("ativo");

            setTimeout(function(){
                $(".ativo").removeClass("ativo");
            }, 300);
        }, 2000 *(i+1));

        if ( i==sequencia.length-1  ) {
            setTimeout(function(){
                $(".ativo").removeClass("ativo");
                exibir("Sua vez");
                FSM = 'play';
            }, 1500 *(i+1) +2000);
        }
    }
}

function IncrementarSequencia ()
{
    let r = getRandomInt(1, 4);
    sequencia.push(r);
    $("#sequencia").val(sequencia);
    $("#passo").val(passo+1 + "º");
}

function getRandomInt (min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function exibir (mensagem, tipoMensagem='')
{
    $("#resposta").removeClass('erro');
    $("#resposta").removeClass('acerto');

    $("#resposta").text( mensagem );

    if (tipoMensagem == 'acerto') {
        $("#resposta").addClass('acerto');
    } else if (tipoMensagem == 'erro') {
        $("#resposta").addClass('erro');
    }
}

function gameStart ()
{
    IncrementarSequencia();
    if ( comBGM ) {
        audios['BGM'].loop = true;
        audios['BGM'].play();
    }

    setTimeout(function(){
        demonstrarSequencia();
    }, 1500);
}

function getFraseAleatoria ()
{
    var frases = [
        "- Você está cada vez melhor!",
        "- Vamos tentar novamente, eu sei que você consegue!",
        "- Vamos tentar novamente.",
        "- Muito bom, estamos quase conseguindo.",
        "- Você é incrível.",
        "- Continue assim.",

        "- Tente Novamente.",
        "- Vamos novamente."
    ];

    let r = getRandomInt(1, frases.length);
    return frases[r-1];
}