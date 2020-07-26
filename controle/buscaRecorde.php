<?php
    include "controle.php";

    # http://localhost/projetos/genius/controle/buscaRecorde.php

    $jogadorJaRegistrado = getPontuacao( $_GET['nome'] );
    if ( !empty($jogadorJaRegistrado) ) {
        $jogadorJaRegistrado = $jogadorJaRegistrado[0];
        echo $jogadorJaRegistrado[ 'fase' . $_GET['estagio'] ];
    } else {
        echo 0;
    }

?>