function iniciarJogo ()
{
    if ( comBGM ) {
        audios['BGM'].loop = true;
        audios['BGM'].play();
    }

    IncrementarSequencia();
    setTimeout(function(){
        demonstrarSequencia();
    }, TEMPO_INICIAR);
}

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

    var textToDisplay = 'getFraseSequencial(etapa)';
    var $output = $(".typewriter");
    type(textToDisplay, $output);

    $("body").append('<a id="next" href="'+ destino +'">Proxima Fase</a>');
    $([document.documentElement, document.body]).animate({
        scrollTop: $("body").offset().top
    }, 3000);
}

function carregarProximaSequencia ()
{
    FSM = 'watch';
    exibir("Acertou a sequência: "+ (sequencia.length) +"!", "acerto");
    passo = 0;
    setTimeout(function(){
        IncrementarSequencia();
        demonstrarSequencia();
    }, INTERVALO);
}

function IncrementarSequencia ()
{
    let r = getRandomInt(1, 4);
    sequencia.push(r);
    $("#tamanhoSequencia").val(sequencia.length);
    $("#sequencia").val(sequencia);
    $("#passo").val(passo+1 + "º");
}

function exibir (mensagem, tipoMensagem='')
{
    let $r = $("#resposta");
    $r.text( mensagem );
    $r.removeClass('erro').removeClass('acerto');

    if (tipoMensagem == 'acerto') {
        $r.addClass('acerto');
    } else if (tipoMensagem == 'erro') {
        $r.addClass('erro');
    }
}

function acessarBotao (numeroClicado)
{
    if ( comSom ) {
        switch ( parseInt(numeroClicado) ) {
            case 1: audios['do'].play();
                break;
            case 2: audios['re'].play();
                break;
            case 3: audios['mi'].play();
                break;
            case 4: audios['fa'].play();
                break;
        }
    }

    $(".botao[data-numero="+ numeroClicado +"]").addClass("ativo");
    setTimeout(function(){
        $(".ativo").removeClass("ativo");
    }, 300);

    if (FSM == "play") {
        if (numeroClicado == sequencia[ passo ]) {
            acertou();
        } else {
            errou();
        }
    }
}


function getFraseAleatoria ()
{
    let r = getRandomInt(0, frases.length);
    return frases[r];
}

function pegarNumeroFase ()
{
    const f = window.location.href;
    let x = f.split('-');
    let numero = x[1][0];
    return parseInt(numero);
}

function getRandomInt (min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}