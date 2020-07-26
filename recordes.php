<?php
    include "controle/controle.php";

    $recordes = getPontuacoes();
?><!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Recordes</title>

        <!-- <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" /> -->
        <link href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAPwr/ACbrDAAA6v8A8pIMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMzMzMzAAIDMzMzMzBAAiAzMzMzBEACIgMzMzBEQAIiIDMzBERAAiIiAzBEREACIiIgBEREQAIiIiAERERAAiIiARBEREACIiAREQREQAIiAREREERAAiARERERBEACAREREREQQAAREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" rel="icon" type="image/x-icon" />

        <script type="text/javascript" src="assets/vendors/jquery-3.4.1.min.js"></script>

        <style type="text/css">
            body {
                background-color: black;
                color: white;
                text-align: center
            }
            table { margin: 0 auto }
        </style>
    </head>
    <body>
        <a href="menu.html">Voltar</a>
        <br>
        <br>
        <div>
            <h1>Recordes:</h1>

            <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Nível 1</td>
                        <td>Nível 2</td>
                        <td>Nível 3</td>
                        <td>Nível 4</td>
                        <td>Ouro</td>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recordes as $v): ?>
                    <tr>
                        <td><?php echo $v['nome'] ?></td>
                        <td><?php echo $v['fase1'] ?></td>
                        <td><?php echo $v['fase2'] ?></td>
                        <td><?php echo $v['fase3'] ?></td>
                        <td><?php echo $v['fase4'] ?></td>
                        <td><?php echo $v['fase5'] ?></td>
                    </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
        </div>

    </body>
</html>