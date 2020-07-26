<?php
    if ( $_SERVER['SERVER_NAME'] == 'localhost' ) { # ========================== LOCAL
        define( 'AMBIENT', 'DEVELOPMENT');
    } else { # ================================================================= SERVERs
        define( 'AMBIENT', 'PRODUCTION');
    }

    if (AMBIENT == 'PRODUCTION') { # =========================================== SERVER
        define( "SERVIDOR", "sql303.epizy.com");
        define( "DBNAME"  , "epiz_25354541_phaser");
        define( "USUARIO" , "epiz_25354541");
        define( "SENHA"   , "azj3YFWhjgr3");

    } else { # ================================================================= LOCAL
        define( "SERVIDOR", "localhost");
        define( "DBNAME"  , "el-dorado");
        define( "USUARIO" , "root");
        define( "SENHA"   , "");
    }

    /**
     * Realiza uma conexão com um BD mySql através do PDO
     * @package grimoire/bibliotecas/persistencia-pdo.php
     * @since 05-07-2015
     * @version 09/09/2016 20:24:25
     *
     * @param   boolean
     * @param   string
     * @param   string
     * @param   string
     * @param   string
     * @return  PDO
     *
     * @uses    PDO
     */
    function conectarPdo($transacao=false, $hostname=SERVIDOR, $dbname=DBNAME, $username=USUARIO, $password=SENHA)
    {
        try {
            $dbh = new PDO("mysql:host={$hostname};dbname={$dbname}", $username, $password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $dbh->exec("SET CHARACTER SET utf8"); //  return all sql requests as UTF-8

            if ($transacao) {
                $dbh->beginTransaction(); # apenas em tabelas innoDB {http://pt.stackoverflow.com/questions/41672/quais-as-diferen%C3%A7as-entre-myisam-e-innodb}
            }

        } catch(PDOException $e) {
/*
            if ($e->getCode() == 1045) { // access denied
                reportError($e, '1045');
            } else if ($e->getCode() == 2002) { // timeout
                reportError($e,  '2002');
            } else {
                reportError($e, '0201');
            }
            exit;
*/
        }
        return $dbh;
    }

    function inserirPontuacao ($post)
    {
        $sql = "INSERT INTO pontuacoes (nome, fase1) VALUES (?, ?)";

        $con = conectarPdo();
        $stmt = $con->prepare($sql);

        $stmt->bindValue(1, $post['nome']);
        $stmt->bindValue(2, $post['fase1']);
        // $stmt->bindValue(3, $post['fase2']);
        // $stmt->bindValue(4, $post['fase3']);
        // $stmt->bindValue(5, $post['fase4']);
        // $stmt->bindValue(6, $post['fase5']);

        return $stmt->execute();
    }

    function atualizarPontuacao ($post)
    {
        $sql = "
            UPDATE pontuacoes
            SET fase{$post['atual']} = ?
            WHERE
                nome = ?
                AND fase{$post['atual']} < ?
        ";

        $con = conectarPdo();
        $stmt = $con->prepare($sql);

        $indice = 'fase'.$post['atual'];
        $stmt->bindValue(1, $post[ $indice ]);
        $stmt->bindValue(2, $post['nome']);
        $stmt->bindValue(3, $post[ $indice ]);

        return $stmt->execute();
    }

    function getPontuacoes ()
    {
        $sql = "SELECT * FROM pontuacoes";

        $con = conectarPdo();
        $stmt = $con->prepare($sql);
        $stmt->execute();

        $vc = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $con = null;

        return $vc;
    }

    function getPontuacao ($nome='')
    {
       $sql = "SELECT * FROM pontuacoes WHERE nome = ?";

        $con = conectarPdo();
        $stmt = $con->prepare($sql);
        $stmt->bindValue(1, $nome);
        $stmt->execute();

        $vc = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $con = null;

        return $vc;
    }
?>