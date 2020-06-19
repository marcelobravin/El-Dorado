$(document).ready(function(){

    let etapa = 0;
    let bloco = 0;
    $("#ancora").click(function(e){
        e.preventDefault();
        var textToDisplay = getFraseSequencial(etapa);
        var $output = $(".typewriter");

        if ( bloco == 0) {
            textToDisplay = getFraseSequencial(etapa);

            if (textToDisplay == -1) {
                let faseAtual = parseInt( pegarNumeroFase() );
                window.location.href = "simulacao.html?=" + faseAtual;
                return;

                // muda para proximo bloco de textos
                etapa = 0;
                bloco++;
            } else {
                type(textToDisplay, $output);
                etapa++;
            }
        } else {
            textToDisplay = getFraseSequencial(etapa, 2);

            if (textToDisplay == -1) {
                $("#ancora").addClass("invisivel");
                setTimeout(function(){
                    $("#container-botoes").removeClass("invisivel");
                }, 1500);
            } else {
                type(textToDisplay, $output);
                etapa++;
            }
        }
    });

    $("#nao").click(function(){
        window.location.href = "habituacao-1.html";

        // window.location.href = "habituacao-2.html";
    });

    $("#sim").click(function(){
        carregarProximaFase();
    });


    setTimeout(function(){
        $("#ancora").click();
    }, 1500);
});

function getRandomInt (min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
    }, 10); //setInterval is delayed 300ms, so a word will be added every 300ms
}

function carregarProximaFase ()
{
    let faseAtual = parseInt( pegarNumeroFase() );
    destino = "fase-"+ faseAtual +".html";
    setTimeout(function(){
        window.location.href = destino;
    }, 2000);
}

function pegarNumeroFase ()
{
    const f = window.location.href;
    let x = f.split('-');
    let numero = x[1][0];
    return parseInt(numero);
}