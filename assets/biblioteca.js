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
    console.log("clear os time outs no caso do player jogando");
    if ( !SIMULACAO ) {
        $("body").addClass("simulacao");
    }

    const frase = getFraseAleatoria();
    exibir(frase, "erro");

    if (sequencia.length > PASSOS_VITORIA || SIMULACAO) {
        setTimeout(function(){

            if ( SIMULACAO ) {

                alert("Eu não sou muito bom nisso...")
                apresentaOpcoes();

/*
                $(".typewrite").removeClass('invisivel');
                type("Eu não sou muito bom nisso...");

                // libera botao para
                let botao = "<a onclick='apresentaOpcoes()'>Next</a>";
                $("body").append(botao);
*/
            } else {
                carregarProximaFase();
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
function carregarProximaFase (/*habituacao = false*/)
{
    if ( SIMULACAO ) {
        let faseAtual = parseInt( pegarNumeroFase() );
        destino = "fase-"+ faseAtual +".html";
        setTimeout(function(){
            window.location.href = destino;
        }, 2000);
    } else {
        $("body").addClass("venceu");
        // alert("Meus parabéns você venceu!");

        let destino = "";
        let faseAtual = parseInt( pegarNumeroFase() );
        sessionStorage.setItem('fase-'+faseAtual, sequencia.length);
        if (faseAtual < 4) {
            let proximaFase = faseAtual+1;
            destino = "habituacao-"+ proximaFase +".html";
        } else {
            destino = "fim.html";
        }




console.log("-----------------");

        var textToDisplay = 'getFraseSequencial(etapa)';
        var $output = $(".typewriter");
        type(textToDisplay, $output);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().top
        }, 10);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("body").offset().bottom
        }, 3000);

        $(".container").append('<a id="next" href="'+ destino +'">Próxima Fase</a>');
    }
}

function apresentaOpcoes ()
{
    let parametroGet = window.location.search.substr(2);

    if ( confirm("Você está pronto?") ) {
        window.location.href = "fase-"+ parametroGet +".html";
    } else {
        window.location.href = "habituacao-"+ parametroGet +".html";
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

function type (textToDisplay, $output)
{
    var displayInt;
    textToDisplay = textToDisplay.split(' '); //split the text variable into an array
    $output.empty(); //clear out the $output variable
    displayInt = setInterval(function() {
        var word = textToDisplay.shift(); //removes the first word ("Even") and sets the word variable to that value
        if (word == null) { return clearInterval(displayInt); } //if we're out of words to append
        $output.append(word + ' '); //else, add the word and then a space (.split(' ') will not carry over the spaces)
        console.log(word);
    }, 10); //setInterval is delayed 300ms, so a word will be added every 300ms
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