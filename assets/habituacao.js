$(document).ready(function(){

    let etapa = 0;
    let bloco = 0;
    $("#ancora").click(function(e){
        e.preventDefault();
        var textToDisplay = getFraseSequencial(etapa);
        var $output = $(".typewriter");

        // if ( bloco == 0) {
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
        // } else {
        //     textToDisplay = getFraseSequencial(etapa);

        //     if (textToDisplay == -1) {
        //         $("#ancora").addClass("invisivel");
        //         setTimeout(function(){
        //             $("#container-botoes").removeClass("invisivel");
        //         }, 1500);
        //     } else {
        //         type(textToDisplay, $output);
        //         etapa++;
        //     }
        // }
    });

    $("#nao").click(function(){
        window.location.href = "habituacao-1.html";
    });

    $("#sim").click(function(){
        carregarProximaFase();
    });

    setTimeout(function(){
        $("#ancora").click();
    }, 1500);
});
/*
function carregarProximaFase ()
{
    let faseAtual = parseInt( pegarNumeroFase() );
    destino = "fase-"+ faseAtual +".html";
    setTimeout(function(){
        window.location.href = destino;
    }, 2000);
}*/