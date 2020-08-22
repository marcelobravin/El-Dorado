<?php
    include "controle.php";

    # URL: http://localhost/projetos/genius/controle/insercao.php
/*
    # INSERT
    $_POST['jogador']   = 'MARK';

    # UPDATE
    $_POST['fase']      = 3;
    $_POST['pontuacao'] = 12;
*/
    registrar();

function registrar ()
{
    $jogadorJaRegistrado = getPontuacao( $_POST['jogador'] );

    if ( !$jogadorJaRegistrado ) {
        echo inserirPontuacao($_POST);
    } else {
        echo atualizarPontuacao($_POST);
    }
}
?>