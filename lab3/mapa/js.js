var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                console.warn("Brak zgody na powiadomienia.");
            }
        });
    }
});

document.getElementById('getLocation').onclick = function () {
    map.locate({ setView: true, maxZoom: 16 });
};

map.on('locationfound', function (e) {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // // Add marker at the current location
    // L.marker(e.latlng).addTo(map)
    //     .bindPopup("You are here!")
    //     .openPopup();

    // Set the map view to the user's location with a close zoom level
    map.setView(e.latlng, 16);
});

map.on('locationerror', function (e) {
    alert("Location access denied.");
});

//zapisanie mapy i puzzle
document.getElementById('saveButton').onclick = function () {
    leafletImage(map, function (err, canvas) {
        if (err) {
            console.error("Error capturing the map image:", err);
            return;
        }

       // document.getElementById('rasterMap').style.display = 'none';

        const puzzleContainer = document.getElementById('puzzleContainer');
        const puzzleTarget = document.getElementById('puzzleTarget');
        puzzleContainer.style.display = 'grid';
        puzzleTarget.style.display = 'grid';

        puzzleContainer.innerHTML = '';
        puzzleTarget.innerHTML = '';

        const tileSize = 75;
        const rows = 4;
        const cols = 4;

        let pieces = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = tileSize;
                pieceCanvas.height = tileSize;
                const context = pieceCanvas.getContext('2d');
                context.drawImage(canvas, x * tileSize, y * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);

                pieceCanvas.classList.add('puzzle-piece');
                pieceCanvas.id = `piece-${y}-${x}`;
                pieceCanvas.draggable = true;
                pieceCanvas.ondragstart = dragStart;
                pieceCanvas.dataset.position = `${y}-${x}`;

                pieces.push(pieceCanvas);
            }
        }


        // pieces = pieces.sort(() => Math.random() - 0.5);
        pieces.forEach(piece => puzzleContainer.appendChild(piece));

        for (let i = 0; i < rows * cols; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('puzzle-piece');
            emptyCell.ondragover = allowDrop;
            emptyCell.ondrop = drop;
            emptyCell.dataset.position = `${Math.floor(i / cols)}-${i % cols}`;
            puzzleTarget.appendChild(emptyCell);
        }
    });
};

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('text/plain');
    const piece = document.getElementById(pieceId);

    if (piece && e.target.classList.contains('puzzle-piece') && !e.target.hasChildNodes()) {
        e.target.appendChild(piece);

        if (checkPuzzleCompletion()) {
            alert("Gratulacje! Jej");

            if (Notification.permission === "granted") {
                new Notification("Gratulacje!", {
                    body: "Udało się!",
                    //icon: "ikona.png"
                });
            }
        }
    }
}

function checkPuzzleCompletion() {
    const pieces = document.querySelectorAll('#puzzleTarget .puzzle-piece canvas');
    if (pieces.length !== 16) return false;  // Sprawdzamy, czy wszystkie elementy są na planszy

    for (let piece of pieces) {
        if (!piece || piece.dataset.position !== piece.parentElement.dataset.position) {
            return false;
        }
    }
    return true;
}
