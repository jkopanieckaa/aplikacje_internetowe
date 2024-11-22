const styles = {
    "Styl 1": "roślinki/css/style1.css",
    "Styl 2": "roślinki/css/style2.css",
};

function changeStyle(styleKey: keyof typeof styles) {
    const existingLinks = document.querySelectorAll('link[rel="stylesheet"]#main-style');

    existingLinks.forEach(link => {
        const linkElement = link as HTMLLinkElement;
        console.log(`Usuwam styl: ${linkElement.href}`);
        linkElement.remove();
    });

    const newLink = document.createElement('link');
    newLink.rel = "stylesheet";
    newLink.href = styles[styleKey];
    newLink.id = "main-style";

    document.head.appendChild(newLink);
}


function generateStyleLinks() {

    const existingContainer = document.getElementById("style-links");
    if (existingContainer) return;

    const container = document.createElement("div");
    container.id = "style-links";
    container.style.position = "fixed";
    container.style.right = "10px";
    container.style.backgroundColor = "rgb(255,255,255)";
    container.style.zIndex = "1000";
    container.innerHTML = "<p>Select style:</p>";


    for (const key in styles) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `${key}`;
        link.dataset.style = key;
        link.style.marginRight = "10px";
        link.style.color = "blue";
        link.style.textDecoration = "underline";

        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = event.target as HTMLElement;
            if (target && target.dataset) {
                changeStyle(target.dataset.style as keyof typeof styles);
            }
        });

        container.appendChild(link);
    }

    document.body.prepend(container);
}


document.addEventListener("DOMContentLoaded", function () {
    generateStyleLinks();
});