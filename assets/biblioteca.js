function iniciarJogo ()
{
    if ( comBGM ) {
        audios['BGM'].loop = true;
        audios['BGM'].play();
    }

    if ( !SIMULACAO ) {
        $("body").addClass("simulacao");
    }

    incrementarSequencia();
    setTimeout(function(){
        demonstrarSequencia();
    }, TEMPO_INICIAR);

    if ( !SIMULACAO ) {
        let estagio = pegarNumeroFase();
        var parametros = {
          nome   : localStorage.getItem('nome'),
          estagio: estagio
        };

        var request = $.ajax({
            type: 'GET',
            url: 'controle/buscaRecorde.php',
            // dataType: 'html',
            data: parametros,
            beforeSend: function(xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
                $("body").append("<div id='ajaxLoader'></div>");
                localStorage.setItem('record'+estagio, 0);
            }
        });

        request.done(function(data) {
            // console.log(data);
            localStorage.setItem('record'+estagio, data);
        });

        request.fail(function(jqXHR, textStatus) {
            console.log(jqXHR);
            alert("Ocorreu uma falha na requisição ajax!");
        });

        request.always(function() {
            $('#ajaxLoader').remove();
        });
    }
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
            $(".container").append('<span id="contadorPontuacao">'+(sequencia.length-1)+'</span>');
            let estagio = pegarNumeroFase();
            $(".container").append('<span id="contadorRecord">'+ localStorage.getItem('record'+estagio) +'</span>');
        }

        if (typeof tremorInterval != 'undefined') {
            clearInterval(tremorInterval);
        }

        setTimeout(function(){

            if ( SIMULACAO ) {
                type("Eu não sou muito bom nisso...\n\rVocê está pronto?");
                setTimeout(function(){
                    $("#containerBotoesConfirm").removeClass("invisivel");
                }, 3000);
            } else {

                type("Parabéns!\n\rVocê conseguiu!");
                let estagio = pegarNumeroFase();
                registrarProgresso(estagio, sequencia.length-1);
                setTimeout(function(){
                    carregarProximaFase();
                }, 3000);
            }
        }, 3000);
    } else {
        setTimeout(function(){
            setTimeout(function(){
                passo = 0;
                sequencia = [];
                incrementarSequencia();
                demonstrarSequencia();
            }, INTERVALO);
        }, INTERVALO);
    }
}

/* -------------------------------------------- pode ser em carater de SIMULACAO */
function demonstrarSequencia ()
{
    exibir("Observe...");
    FSM = 'watch';

    for (var i=0; i<=sequencia.length-1; i++) {
        let x = sequencia[i];

        setTimeout(function(){
            ativarBotao(x);
        // }, TEMPO *(i+1));
        }, TEMPO *(i+1) +INTERVALO);

        if ( i == sequencia.length-1  ) {
            setTimeout(function(){
                FSM = 'play';

                if ( SIMULACAO ) {
                    exibir("Vou tentar...");
                    simularSequencia();
                } else {
                    exibir("Sua vez!");
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
        destino = "fase-"+ pegarNumeroFase() +".html";
        setTimeout(function(){
            window.location.href = destino;
        }, 2000);
    } else {
        $("body").addClass("venceu");

        var textToDisplay = 'Vamos nessa!';

        if (pegarNumeroFase() >= 4 ) {
            textToDisplay = "- Agora preciso que você mantenha a ponte abaixada para que eu busque o ouro para nós."
        }

        type(textToDisplay);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().top
        }, 10);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().bottom
        }, 3000);

        let destino = "";
        let faseAtual = pegarNumeroFase();
        sessionStorage.setItem('fase-'+faseAtual, sequencia.length);
        if (faseAtual < 4) {
            let proximaFase = faseAtual+1;
            destino = "habituacao-"+ proximaFase +".html";
        } else {
            destino = "fase-5.html";
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

    if ( !audios['BGM'].paused ) {
        audios['BGM'].pause();
        let x = sequencia.length /10;
        audios['BGM'].playbackRate = 1 + x;
        audios['BGM'].play();

        INTERVALO -= 100;/* * sequencia.length*/
        TEMPO     -= 50;
    }

    passo = 0;
    setTimeout(function(){
        incrementarSequencia();
        demonstrarSequencia();
    }, INTERVALO);
}

function incrementarSequencia ()
{
    let r = getRandomInt(1, 4);
    sequencia.push(r);
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

function type (textToDisplay, INTERVAL=50)
{
    let $output = $(".typewriter");
    $output.empty(); //clear out the $output variable

    $("#ancora").css('display', 'none');

    let displayInt;
    textToDisplay = textToDisplay.split(''); //split the text variable into an array

    displayInt = setInterval(function() {
        let word = textToDisplay.shift(); //removes the first word ("Even") and sets the word variable to that value
        if (word == null) {
            $("#ancora").css('display', 'block');
            return clearInterval(displayInt);
        } //if we're out of words to append
        $output.append(word + ''); //else, add the word and then a space (.split(' ') will not carry over the spaces)
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
    // if (!SIMULACAO) {
        const f = window.location.href;
        let x = f.split('-');
        let numero = x[1][0];
        return parseInt(numero);
    // }
}

function getRandomInt (min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function registrarProgresso (fase, pontuacao)
{
    localStorage.setItem("fase"+fase, pontuacao);
    localStorage.setItem("atual", fase)

    // if (fase == 5) {
        /*let dadosJogador = localizarProgresso();*/

        var parametros = {
            nome : localStorage.getItem("nome"),
            fase1: localStorage.getItem("fase1"),
            fase2: localStorage.getItem("fase2"),
            fase3: localStorage.getItem("fase3"),
            fase4: localStorage.getItem("fase4"),
            fase5: localStorage.getItem("fase5"),
            atual: localStorage.getItem("atual")
        };

        var request = $.ajax({
            type       : 'POST',
            url        : 'controle/insercao.php',
            // dataType   : 'html',
            data       : parametros,
            beforeSend : function(xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
                $("body").append("<div id='ajaxLoader'></div>");
            }
        });

        request.done(function(data) {
            console.log(data);
        });

        request.fail(function(jqXHR, textStatus) {
            console.log(jqXHR);
            alert("Ocorreu uma falha na requisição ajax!");
        });

        request.always(function() {
            $('#ajaxLoader').remove();
        });
    // }
}

function localizarProgresso ()
{
    return [
        localStorage.getItem("nome"),
        localStorage.getItem("fase1"),
        localStorage.getItem("fase2"),
        localStorage.getItem("fase3"),
        localStorage.getItem("fase4"),
        localStorage.getItem("fase5"),
    ]
}