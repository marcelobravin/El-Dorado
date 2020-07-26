<?php
    include "controle.php";

# http://localhost/projetos/genius/controle/insercao.php
/*
    $_POST['atual'] = 2;
    $_POST['nome']  = 'bondia';
    $_POST['fase1'] = 10;
    $_POST['fase2'] = 5;
    $_POST['fase3'] = 7;
    $_POST['fase4'] = 0;
    $_POST['fase5'] = 0;
*/

    // if ($_POST['atual'] == 1) {
        $jogadorJaRegistrado = getPontuacao( $_POST['nome'] );

        if ( !$jogadorJaRegistrado ) {
            echo inserirPontuacao($_POST);
        } else {
            echo atualizarPontuacao($_POST);
        }
    // } else {
        // echo atualizarPontuacao($_POST);
    // }
?>