<?php
    include "controle.php";

    # http://localhost/projetos/genius/controle/insercao.php
/*
    #insert
    $_POST['jogador']   = 'MARK';

    #update
    $_POST['fase']      = 3;
    $_POST['pontuacao'] = 12;
*/

    $jogadorJaRegistrado = getPontuacao( $_POST['jogador'] );

    if ( !$jogadorJaRegistrado ) {
        echo inserirPontuacao($_POST);
    } else {
        echo atualizarPontuacao($_POST);
    }
?>