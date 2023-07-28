
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="./public/index.css">

    <script src="//cdn.amcharts.com/lib/4/core.js"></script>
    <script src="//cdn.amcharts.com/lib/4/charts.js"></script>
</head>
<body>
    <div id="loader"></div>
    <div id="f"></div>
    <header>
        <div class="menu">
          <div class="menu_logo">
            <img src="./public/img/folderIcon.png" id="folderIcon" />
            <div id="titleSiteFolderIcon">Folder Size Site</div>
          </div>

          <div class="menu_stat">
            <a id="stat" href="./index.php">Главная страница</a>
          </div>

        </div>
    </header>

    <div id="wrapper">

    <?php

         $user = "example_user";
         $password = "password";
         $database = "stat";
         $table = "t_stat";

         try {
            $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
            echo "<table>";
               echo "<tr>";
                  echo "<td>Путь</td>";
                  echo "<td td>Размер (МБ)</td>";
                  echo "<td td>Количество</td>";
                  echo "<td td>Время запроса (сек)</td>";
                  echo "<td td>Дата</td>";
               echo "</tr>";
            foreach($db->query("SELECT * FROM $table") as $row) {
               echo "<tr>";
                  echo "<td>" . $row['c_path'] . "</td>";
                  echo "<td class='c_totalsize'>" . $row['c_totalsize'] . "</td>";
                  echo "<td>" . $row['c_count'] . "</td>";
                  echo "<td class='c_time'>" . $row['c_time'] . "</td>";
                  echo "<td>" . $row['c_date'] . "</td>";
               echo "</tr>";
            }
            echo "</table>";
         
         } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
         }

        function getPost($user,$password,$database,$table){
            
          $data = json_decode(file_get_contents("php://input"), true);

          if(empty(!$data)){
            try {
               $conn = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
               $sql = "INSERT INTO $table(c_path,c_totalsize,c_count,c_time,c_date) VALUES (:c_path, :c_totalsize,:c_count,:c_time,:c_date)";
               // определяем prepared statement
               $stmt = $conn->prepare($sql);
               // привязываем параметры к значениям
               $stmt->bindValue(":c_path", $data["c_path"]);
               $stmt->bindValue(":c_totalsize", $data["c_totalsize"]);
               $stmt->bindValue(":c_count", $data["c_count"]);
               $stmt->bindValue(":c_time", $data["c_time"]);
               $stmt->bindValue(":c_date", $data["c_date"]);
  
               // выполняем prepared statement
               $affectedRowsNumber = $stmt->execute();
               // если добавлена как минимум одна строка
               if($affectedRowsNumber > 0 ){
                   //echo "Data successfully added:";  
               }
            }catch (PDOException $e) {
               print "Error!: " . $e->getMessage() . "<br/>";
               die();
            }
          }
         }

         getPost($user,$password,$database,$table)
   
      ?>

    </div>

    <div id="chartdiv" style="width: 900px; height: 800px;"></div>

    <script src="./public/chart.js"></script>

</body>
</html>
