// Obiekt z dostępnych stylami
const styles = {
    default: "roślinki/css/style1.css",
    alternative: "roślinki/css/style2.css"
};

// Funkcja do zmiany stylu
function changeStyle(styleKey: keyof typeof styles) {
    // Znajdź wszystkie elementy <link rel="stylesheet"> z id="main-style"
    const existingLinks = document.querySelectorAll('link[rel="stylesheet"]#main-style');
    console.log(`Znaleziono ${existingLinks.length} istniejących stylów do usunięcia.`);

    existingLinks.forEach(link => {
        const linkElement = link as HTMLLinkElement;
        console.log(`Usuwam styl: ${linkElement.href}`);
        linkElement.remove(); // Usuń link ze stylami
    });

    // Dodaj nowy styl
    const newLink = document.createElement('link');
    newLink.rel = "stylesheet";
    newLink.href = styles[styleKey];
    newLink.id = "main-style"; // Nadaj id dla nowego stylu

    console.log(`Dodaję nowy styl: ${styles[styleKey]}`);
    document.head.appendChild(newLink); // Dodaj do nagłówka
}

// Funkcja do generowania linków do zmiany stylów
function generateStyleLinks() {
    // Sprawdź, czy istnieje już kontener z linkami
    const existingContainer = document.getElementById("style-links");

    if (existingContainer) {
        existingContainer.remove(); // Usuń, aby nie było duplikatów
    }

    // Stwórz nowy kontener na linki
    const container = document.createElement("div");
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
    for (const key in styles) {
        const link = document.createElement("a");
        link.href = "#"; // Link bez przeładowania strony
        link.textContent = `${key}`;
        link.dataset.style = key; // Przechowuj klucz stylu w atrybucie `data-style`
        link.style.marginRight = "10px";
        link.style.cursor = "pointer";
        link.style.color = "blue";
        link.style.textDecoration = "underline";

        // Obsługa kliknięcia w link
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Zapobiegaj domyślnemu przeładowaniu strony
            changeStyle(link.dataset.style as keyof typeof styles);
        });

        container.appendChild(link);
    }

    // Dodaj kontener na początek strony
    document.body.prepend(container);
    console.log("Linki do zmiany stylu dodane.");
}

// Wywołanie generowania linków po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    generateStyleLinks(); // Generuj linki
});
