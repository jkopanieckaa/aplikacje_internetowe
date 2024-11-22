/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


// Obiekt z dostępnych stylami
var styles = {
  "default": "roślinki/css/style1.css",
  alternative: "roślinki/css/style2.css"
};
// Funkcja do zmiany stylu
function changeStyle(styleKey) {
  // Znajdź wszystkie elementy <link rel="stylesheet"> z id="main-style"
  var existingLinks = document.querySelectorAll('link[rel="stylesheet"]#main-style');
  console.log("Znaleziono ".concat(existingLinks.length, " istniej\u0105cych styl\xF3w do usuni\u0119cia."));
  existingLinks.forEach(function (link) {
    var linkElement = link;
    console.log("Usuwam styl: ".concat(linkElement.href));
    linkElement.remove(); // Usuń link ze stylami
  });
  // Dodaj nowy styl
  var newLink = document.createElement('link');
  newLink.rel = "stylesheet";
  newLink.href = styles[styleKey];
  newLink.id = "main-style"; // Nadaj id dla nowego stylu
  console.log("Dodaj\u0119 nowy styl: ".concat(styles[styleKey]));
  document.head.appendChild(newLink); // Dodaj do nagłówka
}
// Funkcja do generowania linków do zmiany stylów
function generateStyleLinks() {
  // Sprawdź, czy istnieje już kontener z linkami
  var existingContainer = document.getElementById("style-links");
  if (existingContainer) {
    existingContainer.remove(); // Usuń, aby nie było duplikatów
  }
  // Stwórz nowy kontener na linki
  var container = document.createElement("div");
  container.id = "style-links";
  // Stylizacja kontenera linków
  container.style.position = "fixed";
  container.style.top = "10px";
  container.style.right = "10px";
  container.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  container.style.padding = "10px";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  container.style.zIndex = "1000";
  // Dodaj tytuł kontenera
  container.innerHTML = "<p>Wybierz styl:</p>";
  // Generuj linki dla każdego dostępnego stylu
  var _loop = function _loop() {
    var link = document.createElement("a");
    link.href = "#"; // Link bez przeładowania strony
    link.textContent = "".concat(key);
    link.dataset.style = key; // Przechowuj klucz stylu w atrybucie `data-style`
    link.style.marginRight = "10px";
    link.style.cursor = "pointer";
    link.style.color = "blue";
    link.style.textDecoration = "underline";
    // Obsługa kliknięcia w link
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Zapobiegaj domyślnemu przeładowaniu strony
      changeStyle(link.dataset.style);
    });
    container.appendChild(link);
  };
  for (var key in styles) {
    _loop();
  }
  // Dodaj kontener na początek strony
  document.body.prepend(container);
  console.log("Linki do zmiany stylu dodane.");
}
// Wywołanie generowania linków po załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
  generateStyleLinks(); // Generuj linki
});
/******/ })()
;