function iniciarJogo ()
{
    if ( comBGM ) {
        audios['BGM'].volume = .2;
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
            url : 'controle/buscaRecorde.php',
            data: parametros,
            beforeSend: function(xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
                $("body").append("<div id='ajaxLoader'></div>");
                localStorage.setItem('record'+estagio, 0);
            }
        });

        request.done(function(data) {
            localStorage.setItem('record'+estagio, data);
        });

        request.fail(function(jqXHR, textStatus) {
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
            audios['acerto'].volume = 0.2;
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
    if ( !audios['BGM'].paused ) {
        audios['BGM'].pause();
        audios['BGM'].playbackRate = 1;
        audios['BGM'].play();
    }

    TEMPO     = TEMPO_INICIAL;
    INTERVALO = INTERVALO_INICIAL;

    if (sequencia.length > PASSOS_VITORIA || SIMULACAO) {
        scrollToTop();

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

        if ( SIMULACAO ) {
            let x = getRandomInt(0, fraseErro.length-1);
            setTimeout(function(){
                setTimeout(function(){
                    type(fraseErro[x][0]);
                    dublagem(fraseErro[x][1]);
                }, 900);

                    $("#containerBotoesConfirm").removeClass("invisivel");
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#containerBotoesConfirm").offset().top
                    }, 2000);
            }, 2500);
        } else {

            let estagio = pegarNumeroFase();
            registrarProgresso(estagio, sequencia.length-1);

            type(fraseSucesso[0]);
            dublagem(fraseSucesso[1]);
            setTimeout(function(){
                dublagem("Well Done CCBY3.ogg");
            }, 1000);

            setTimeout(function(){
                setTimeout(function(){
                    carregarProximaFase();
                }, 2500);
            }, 3000);

        }
    } else {
        const frase = getFraseAleatoria();
        exibir(frase[0], "erro");
        dublagem(frase[1]);

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

        if (pegarNumeroFase() >= 4 ) {
            type("- Agora preciso que você mantenha a ponte abaixada para que eu busque o ouro para nós.");
            dublagem("preciso que voce mantenha.ogg");
        } else {
            type("- Vamos nessa!");
            dublagem("vamos nessa.ogg");
        }
/*
        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().top
        }, 10);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().bottom
        }, 3000);
*/
        let destino = "";
        let faseAtual = pegarNumeroFase();
        sessionStorage.setItem('fase-'+faseAtual, sequencia.length);
        if (faseAtual < 4) {
            let proximaFase = faseAtual+1;
            destino = "habituacao-"+ proximaFase +".html";
        } else {
            destino = "fase-5.html";
        }
        $(".typewriter").append('<a id="next" href="'+ destino +'">Próxima Fase</a>');
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
        audios['BGM'].playbackRate = 1 + (sequencia.length/10);
        audios['BGM'].play();

        INTERVALO -= 100;
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
    let r = getRandomInt(1, 5);
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
            case 1: audios['do'].cloneNode(true).play();
                break;
            case 2: audios['re'].cloneNode(true).play();
                break;
            case 3: audios['mi'].cloneNode(true).play();
                break;
            case 4: audios['fa'].cloneNode(true).play();
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
            $("body").addClass("simulacao");
        }
    }
}

function type (textToDisplay, INTERVAL=70)
{
    let $output = $(".typewriter");
    $output.empty(); // clear out the $output variable

    textToDisplay = textToDisplay.split(''); // split the text variable into an array

    let displayInt;
    displayInt = setInterval(function() {
        let word = textToDisplay.shift();
        if (word == null) {
            /*$("#ancora").css('display', 'block');*/
            return clearInterval(displayInt);
        } // if we're out of words to append
        $output.append(word + '');
    }, INTERVAL); // setInterval so each letter will be delayed

    $("#ancora").css('display', 'none');
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

function registrarProgresso (fase, pontuacao)
{
    localStorage.setItem("fase"+fase, pontuacao);

    var parametros = {
        jogador  : localStorage.getItem("nome"),
        fase     : fase,
        pontuacao: pontuacao
    };

    var request = $.ajax({
        type      : 'POST',
        url       : 'controle/registro.php',
        data      : parametros,
        beforeSend: function(xhr) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
            $("body").append("<div id='ajaxLoader'></div>");
        }
    });

    // request.done(function(data) {
        // console.log(data);
    // });

    request.fail(function(jqXHR, textStatus) {
        alert("Ocorreu uma falha na requisição ajax!");
    });

    request.always(function() {
        $('#ajaxLoader').remove();
    });
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

function dublagem (arquivoAudio)
{
    audios['dublagem'] = new Audio('audio/frases/'+ arquivoAudio);
    audios['dublagem'].play();

    audios['dublagem'].addEventListener("ended", function(){
        $("#ancora").css('display', 'block');
    });
}

function scrollToTop ()
{
    $([document.documentElement, document.body]).animate({
        scrollTop: $("body").offset().top - 10
    }, 1000);
}
