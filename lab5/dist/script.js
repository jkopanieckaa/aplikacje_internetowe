/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var styles = {
  "Styl 1": "roślinki/css/style1.css",
  "Styl 2": "roślinki/css/style2.css"
};
function changeStyle(styleKey) {
  var existingLinks = document.querySelectorAll('link[rel="stylesheet"]#main-style');
  existingLinks.forEach(function (link) {
    var linkElement = link;
    console.log("Usuwam styl: ".concat(linkElement.href));
    linkElement.remove();
  });
  var newLink = document.createElement('link');
  newLink.rel = "stylesheet";
  newLink.href = styles[styleKey];
  newLink.id = "main-style";
  document.head.appendChild(newLink);
}
function generateStyleLinks() {
  var existingContainer = document.getElementById("style-links");
  if (existingContainer) return;
  var container = document.createElement("div");
  container.id = "style-links";
  container.style.position = "fixed";
  container.style.right = "10px";
  container.style.backgroundColor = "rgb(255,255,255)";
  container.style.zIndex = "1000";
  container.innerHTML = "<p>Select style:</p>";
  for (var key in styles) {
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = "".concat(key);
    link.dataset.style = key;
    link.style.marginRight = "10px";
    link.style.color = "blue";
    link.style.textDecoration = "underline";
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var target = event.target;
      if (target && target.dataset) {
        changeStyle(target.dataset.style);
      }
    });
    container.appendChild(link);
  }
  document.body.prepend(container);
}
document.addEventListener("DOMContentLoaded", function () {
  generateStyleLinks();
});
/******/ })()
;