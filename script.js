const cellsCount = 10;
const cellsWithBomb = chooseCellsWithBomb(cellsCount, 3);


function chooseCellsWithBomb(cellsCount, bombCount) {
    chosen = []
    for (let i=0; i<bombCount; i++) {
        chosen.push(Math.floor(Math.random() * cellsCount));
    }
    console.log("Cells with bomb: " + chosen)
    return chosen;
}

function onCellClicked(selectedCellId) {
    let selectedCell = document.getElementById(selectedCellId);
    if (selectedCell.textContent === "?") {
        // revealing the cell
        if (cellsWithBomb.includes(selectedCellId) ) {
            selectedCell.textContent = "💣";
            document.getElementById("result-header").textContent = "You lost";

        } else {
            selectedCell.textContent = "□";
        }
    }
}

function renderGame() {
    
    let grid = document.getElementById("grid");

    for(let i=0; i<cellsCount; i++) {
        let cell = document.createElement("div");
        cell.id = i;
        cell.textContent = "?"
        cell.className = 'cell'
        cell.onclick = function(){ onCellClicked(i) };
        grid.appendChild(cell);
    }
}

