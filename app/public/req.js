import { create, deleteFolders } from './el.js';
var params, root, sor;
//основной путь
var ROOTPATH = "/";
var xhr = new XMLHttpRequest();
var back = [];
//время запроса
var timeLoad = document.getElementById("timeLoad");

//время запроса
var errorInTime = document.getElementById("errorInTime");


export var f = document.getElementById("f");
export var loader = document.getElementById("loader");

//обозначение дива с текущей директорией
var currentCertainFolder = document.getElementById("currentCertainFolder");

//объект получаемый из json
function DataResponseWrapper(directories,responseWrapper) {
    this.directories = directories;
    this.responseWrapper=responseWrapper
}
export var dataResponseWrapper = new DataResponseWrapper();
//getAllFolder() получение всех папок через запрос
export function getAllFolder() {
    root = ROOTPATH;
    currentCertainFolder.innerHTML = "Текущая директория: " + root;
    params = 'root=' + encodeURIComponent(root);
    getRequest(params);
}
//getCeratainFolderTree() получение папок конкретной папки  через запрос
export function getCeratainFolderTree(e) {
    if (back[back.length - 1] != root) {
        back.push(root);
    }
    //back.push(root);
    console.log(back+"FRONT")
    if (e.target.classList.contains('ceratainFolder')) {
        root = e.target.innerHTML;

        console.log(root+" NOVAY ROOOT")
        if (back[back.length - 1] == root) {
            back.pop();
            return;
        }
        currentCertainFolder.innerHTML = "Текущая директория: " + root;
    }
    else {
        return;
    }
    params = 'root=' + encodeURIComponent(root);

    console.log(root+" !! 2 NOVAY ROOOT")

    getRequest(params)
   
}
//getRequest() создаем запрос с переданными параметрами
function getRequest(params) {
    errorInTime.style.display="none"

    loader.style.display="block"
    f.style.display="block"

    xhr.open("GET", "http://localhost:8080/dirSize?" + params, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            dataResponseWrapper = JSON.parse(xhr.responseText);
            if (dataResponseWrapper.responseWrapper.status == 1) {
                console.log(root+ " :root do")
                console.log(back+ " :back do")

                root=back[back.length-1]
                back.pop()
                console.log(root+ " :root posle")
                console.log(back+ " :back posle")

                currentCertainFolder.innerHTML = "Текущая директория: " + root;
                errorInTime.innerHTML=dataResponseWrapper.responseWrapper.err
                errorInTime.style.display="block"
                console.log(dataResponseWrapper.responseWrapper.err);
                loader.style.display="none"
                f.style.display="none"
                return "error";
            }
            if (dataResponseWrapper.directories.length == 0) {
                root=back[back.length-1]
                back.pop()
                currentCertainFolder.innerHTML = "Текущая директория: " + root;
                errorInTime.innerHTML="Папка пуста"
                errorInTime.style.display="block"

                console.log("папка пуста");
                loader.style.display="none"
                f.style.display="none"
                return "error";
            }

            //currentCertainFolder.innerHTML = "Текущая директория: " + root;
            sortingFolders();
        }
    };
    xhr.send(params);

}
//sorting() сортировка по указанному типу
function sortingFolders() {
    deleteFolders();
    sor = document.querySelector('input[name="typeSorting"]:checked').value;
    dataResponseWrapper.directories.sort(function (a, b) { return a.size - b.size; });
    dataResponseWrapper.directories.forEach(function (element) {
        if (element.files != null) {
            element.files.sort(function (a, b) { return a.size - b.size; });
        }
    });
    if (sor == "desc") {
        dataResponseWrapper.directories.reverse();
        dataResponseWrapper.directories.forEach(function (element) {
            if (element.files != null) {
                element.files.reverse();
            }
        });
    }
    create();
}
//backStep() шаг назад
export function backStep() {
    if (back.length != 0) {
        console.log(back+" DO")

        root = back.pop();
        console.log(back+" POSLE")

        currentCertainFolder.innerHTML = "Текущая директория: " + root;
        params = 'root=' + encodeURIComponent(root);
        getRequest(params);
    }
}
//добавление слушателя загрузки сраницы для проверки изменения кнопок radioButton и вывода корневых папок
window.addEventListener('load', function () {
    initRadioButton();
    getAllFolder();
});
//initRadioButton() проверки изменения кнопок radioButton
export function initRadioButton() {
    document.querySelectorAll('input[name="typeSorting"]').forEach(function (elem) {
        elem.addEventListener("change", sortingFolders);
    });
}
