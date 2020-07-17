$(document).ready(function(){
    let etapa = 0;
    let bloco = 0;

    $("#ancora").click(function(e){
        e.preventDefault();
        var textToDisplay = getFraseSequencial(etapa);

        if (textToDisplay == -1) {
            let faseAtual = parseInt( pegarNumeroFase() );
            window.location.href = "simulacao.html?=" + faseAtual;
            return;

            // muda para proximo bloco de textos
            etapa = 0;
            bloco++;
        } else {
            type(textToDisplay);
            etapa++;
        }
    });

    $("#botaoNao").click(function(){
        window.location.href = "habituacao-1.html";
    });

    $("#botaoSim").click(function(){
        carregarProximaFase();
    });

    setTimeout(function(){
        $("#ancora").click();
    }, 1500);
});