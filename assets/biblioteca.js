function iniciarJogo ()
{
    if ( comBGM ) {
        audios['BGM'].loop = true;
        audios['BGM'].play();
    }

    if ( !SIMULACAO ) {
        $("body").addClass("simulacao");
    }

    IncrementarSequencia();
    setTimeout(function(){
        demonstrarSequencia();
    }, TEMPO_INICIAR);
}

function acertou ()
{
    if (sequencia.length == passo+1) {
        if ( !SIMULACAO ) {
            $("body").addClass("simulacao");
        }
        setTimeout(function(){
            audios['acerto'].play();
        }, 1000);

        carregarProximaSequencia();
    } else {
        passo++;
        $("#passo").val(passo+1 + "º");
        if ( SIMULACAO ) {
            exibir("Acertei o passo "+ passo, "acerto");
        } else {
            exibir("Acertou o passo "+ passo, "acerto");
        }
    }
}

/* -------------------------------------------- pode ser em carater de SIMULACAO */
function errou ()
{
    const frase = getFraseAleatoria();
    exibir(frase, "erro");

    if (sequencia.length > PASSOS_VITORIA || SIMULACAO) {

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().top - 10
        }, 1000);

        $(".typewriter").removeClass("invisivel");
        $("#palcoJogo").css("visibility", "hidden");

        if ( SIMULACAO ) {
            $("body").addClass('simulacaoTerminada');
        } else {
            $("body").addClass("venceu");
        }

        if (typeof tremorInterval != 'undefined') {
            clearInterval(tremorInterval);
        }

        setTimeout(function(){
            $("#containerBotoesConfirm").removeClass("invisivel");

            if ( SIMULACAO ) {
                type("Eu não sou muito bom nisso...<br>Você está pronto?");
            } else {
                type("Parabéns!<br>Você conseguiu!");
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

/* -------------------------------------------- pode ser em carater de SIMULACAO */
function demonstrarSequencia ()
{
    exibir("Memorize...");
    FSM = 'watch';

    for (var i=0; i<=sequencia.length-1; i++) {
        let x = sequencia[i];

        setTimeout(function(){
            ativarBotao(x);
        }, TEMPO *(i+1));

        if ( i == sequencia.length-1  ) {
            setTimeout(function(){
                FSM = 'play';

                if ( SIMULACAO ) {
                    exibir("Vou jogar, observe...");
                    simularSequencia();
                } else {
                    exibir("Sua vez");
                    $("body").removeClass("simulacao");
                }
            }, TEMPO *(i+1) +INTERVALO);
        }
    }
}

/* -------------------------------------------- pode ser em carater de SIMULACAO */
function carregarProximaFase ()
{
    if ( SIMULACAO ) {
        let faseAtual = parseInt( pegarNumeroFase() );
        destino = "fase-"+ faseAtual +".html";
        setTimeout(function(){
            window.location.href = destino;
        }, 2000);
    } else {
        $("body").addClass("venceu");

        var textToDisplay = 'Vamos nessa!';
        type(textToDisplay);

        $("#botaoSim").remove();

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().top
        }, 10);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().bottom
        }, 3000);

        let destino = "";
        let faseAtual = parseInt( pegarNumeroFase() );
        sessionStorage.setItem('fase-'+faseAtual, sequencia.length);
        if (faseAtual < 4) {
            let proximaFase = faseAtual+1;
            destino = "habituacao-"+ proximaFase +".html";
        } else {
            destino = "fim.html";
        }
        $(".container").append('<a id="next" href="'+ destino +'">Próxima Fase</a>');
    }
}

function carregarProximaSequencia ()
{
    FSM = 'watch';

    if ( SIMULACAO ) {
        exibir("Acertei a sequência: "+ (sequencia.length) +"!", "acerto");
    } else {
        exibir("Acertou a sequência: "+ (sequencia.length) +"!", "acerto");
    }

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
    if ( sequencia.length > PASSOS_VITORIA ) {
        $("#tamanhoSequencia").val(sequencia.length).css('background', 'lime');
    }
}

function exibir (mensagem, tipoMensagem='')
{
    let $r = $("#resposta");
    $r.text( mensagem );
    $r.removeClass('erro').removeClass('acerto');

    if (tipoMensagem != '') {
        $r.addClass(tipoMensagem);
    }
}

function ativarBotao (numeroClicado)
{
    if ( comSE ) {
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

function type (textToDisplay, INTERVAL=10)
{
    let $output = $(".typewriter");
    $output.empty(); //clear out the $output variable

    $("#ancora").css('opacity', '0');

    let displayInt;
    textToDisplay = textToDisplay.split(' '); //split the text variable into an array

    displayInt = setInterval(function() {
        let word = textToDisplay.shift(); //removes the first word ("Even") and sets the word variable to that value
        if (word == null) {
            // liberaBotaoNext();
            $("#ancora").css('opacity', '1');
            return clearInterval(displayInt);
        } //if we're out of words to append
        $output.append(word + ' '); //else, add the word and then a space (.split(' ') will not carry over the spaces)
    }, INTERVAL); //setInterval is delayed 300ms, so a word will be added every 300ms
}

function getFraseAleatoria ()
{
    let r = getRandomInt(0, frases.length);
    return frases[r];
}

function getFraseSequencial (n)
{
    if (n >= frases.length) {
        return -1;
    }

    return frases[n];
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