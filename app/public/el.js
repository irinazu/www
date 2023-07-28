import { getAllFolder, getCeratainFolderTree, backStep, dataResponseWrapper,f,loader } from './req.js';
//кнопка вывода всех папок из корня
var buttonGetAllFolder = document.getElementById("allFolder");
buttonGetAllFolder.addEventListener("click", getAllFolder, false);
//кнопка движения назад
var backButton = document.getElementById("back");
backButton.addEventListener("click", backStep, false);
//время запроса
var timeLoad = document.getElementById("timeLoad");
//getCeratainFilesBlock() находим стрелку по которой кликнули
function getCeratainFilesBlock(e) {
    if (e.target.classList.contains('arrowSign')) {
        if (e.target.parentNode.parentNode.nextSibling.style.display == "block") {
            e.target.parentNode.parentNode.nextSibling.style.display = "none";
            e.target.style.transform = "rotate(0deg)";
        }
        else {
            e.target.parentNode.parentNode.nextSibling.style.display = "block";
            e.target.style.transform = "rotate(3.142rad)";
        }
    }
}
//create() создание нод для отражения папок на странице
export function create() {
    var parentDivFolderHolder = document.getElementById("wrapper");
    var divFolderHolder = document.createElement("div");
    divFolderHolder.id = "folders";
    parentDivFolderHolder.append(divFolderHolder);
    dataResponseWrapper.directories.forEach(function (element) {
        var wrapperDivFolder = document.createElement("div");
        wrapperDivFolder.className = "wrapperDivFolder";
        //блок обертка для изображения и самого пути
        var wrapperDivFolderAndImg = document.createElement("div");
        wrapperDivFolderAndImg.className = "wrapperDivFolderAndImg";
        wrapperDivFolder.append(wrapperDivFolderAndImg);
        //прописывание изображения-стрелки
        var imgArrow = document.createElement('img');
        imgArrow.src = './public/img/arrowIcon.png';
        wrapperDivFolderAndImg.append(imgArrow);
        //прописывание изображения
        var img = document.createElement('img');
        img.src = './public/img/folderIcon.png';
        wrapperDivFolderAndImg.append(img);
        img.className = "folderSign";
        //прописывание пути папки
        var divFolder = document.createElement("div");
        divFolder.className = "ceratainFolder";
        divFolder.append(element.name);
        divFolder.addEventListener('click', getCeratainFolderTree);
        wrapperDivFolderAndImg.append(divFolder);
        //прописывание размер папки
        var divFolderSize = document.createElement("div");
        divFolderSize.className = "ceratainFolderSize";
        divFolderSize.append(element.size.toString());
        wrapperDivFolder.append(divFolderSize);
        divFolderHolder.append(wrapperDivFolder);
        if (element.files != null) {
            imgArrow.className = "arrowSign";
            imgArrow.addEventListener("click", getCeratainFilesBlock);
            var filesDiv_1 = document.createElement("div");
            filesDiv_1.className = "files";
            element.files.forEach(function (file) {
                var wrapperDivFile = document.createElement("div");
                wrapperDivFile.className = "wrapperDivFile";
                filesDiv_1.append(wrapperDivFile);
                //блок обертка для изображения и самого пути
                var wrapperDivFileAndImg = document.createElement("div");
                wrapperDivFileAndImg.className = "wrapperDivFileAndImg";
                wrapperDivFile.append(wrapperDivFileAndImg);
                //прописывание изображения
                var imgFile = document.createElement('img');
                imgFile.src = './public/img/fileIcon.png';
                wrapperDivFileAndImg.append(imgFile);
                imgFile.className = "fileSign";
                //прописывание пути папки
                var divFile = document.createElement("div");
                divFile.className = "certainFile";
                divFile.append(file.name);
                wrapperDivFileAndImg.append(divFile);
                //прописывание размер папки
                var divFileSize = document.createElement("div");
                divFileSize.className = "certainFileSize";
                divFileSize.append(file.size.toString());
                wrapperDivFile.append(divFileSize);
            });
            divFolderHolder.append(filesDiv_1);
        }
        else {
            imgArrow.className = "arrowSignHidden";
        }
    });
    timeLoad.innerHTML = dataResponseWrapper.timeExecuting.toString();
    
    loader.style.display="none"
    f.style.display="none"
}
//deleteFolders() предварительное удаление папок
export function deleteFolders() {
    var folders = document.getElementById("folders");
    if (folders != undefined) {
        folders.parentNode.removeChild(folders);
    }
}
