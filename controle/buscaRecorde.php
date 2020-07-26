<?php
    include "controle.php";

    # http://localhost/projetos/genius/controle/buscaRecorde.php

    $jogadorJaRegistrado = getPontuacao( $_GET['nome'] );
    $jogadorJaRegistrado = $jogadorJaRegistrado[0];

    echo $jogadorJaRegistrado[ 'fase' . $_GET['estagio'] ];
?>