<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="./public/index.css">
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

        <div id="errorInTime"></div>

          <div class="menu_stat">
            <a id="stat" href="./stat.php">Статистика</a>
          </div>

          <div class="menu_timeLoad">
            <span>Время выполнения: </span>
            <div id="timeLoad"></div>
            <span>сек</span>
          </div>
        </div>
    </header>

    <?php
          

       
    ?>

    <div id="wrapper">

        <div id="wrapper_allFolder">
            <button type="submit" id="allFolder">Вывести все папки из корневой директории</button>
        </div>
        <div id="wrapper_sortingTypeRadio">
            <div class="sortingTypeRadio">
                <label for="asc">ASC</label>
                <input type="radio" value="asc" id="asc" checked name="typeSorting">
                <label for="desc">DESC</label>
                <input type="radio" value="desc" id="desc" name="typeSorting">
            </div>
        </div>

        <div id="buttonsPath">
            <div id="wrapperButtonsPath">
                <button type="submit" id="back">Назад</button>
            </div>
        </div>

        <div id="separator"></div>
        <div id="currentCertainFolder"></div>
        <div id="wrapperDescriptionSizeFile">
            <div id="descriptionSizeFile">Размер Файла (MB)</div>
        </div>
    </div>

    <div class="directories"></div>

    <script type="module" src="./public/req.js"></script>

</body>
</html>
