class RevealResult {
    static BOMB = 'BOMB';
    static NOT_BOMB = 'NOT_BOMB';
}

class GameState {
    static WON = 'WON';
    static LOST = 'LOST';
    static IN_GAME = 'IN_GAME';
}

class Game {
    constructor(cellsCount) {
        this.cells = [];
        let cellsWithBomb = chooseCellsWithBomb(cellsCount, 3);

        for (let i = 0; i < cellsCount; i++) {
            let cell = new Cell();
            if (cellsWithBomb.includes(i)) {
                cell.setAsBomb();
            }
            this.cells.push(cell);
        }
    }

    revealCell(i) {
        let selectedCell = this.cells[i];
        if (selectedCell.is_reveled) {
            // nothing
        } else {
            selectedCell.reveal();
            if (selectedCell.is_bomb) {
                return RevealResult.BOMB;
            } else {
                return RevealResult.NOT_BOMB;
            }
        }
    }

    getState() {
        for (let i = 0; i < this.cells.length; i++) { 
            if (this.cells[i].is_bomb && this.cells[i].is_reveled) {
                return GameState.LOST;
            }
        }

        for (let i = 0; i < this.cells.length; i++) {
            if (!this.cells[i].is_bomb && !this.cells[i].is_reveled) {
                return GameState.IN_GAME;
            }
        }

        return GameState.WON;
    }

    getCellsCount() {
        return this.cells.length;
    }

}


class Cell {
    constructor() {
        this.is_bomb = false;
        this.is_reveled = false;
    }

    setAsBomb() {
        this.is_bomb = true;
    }

    reveal() {
        this.is_reveled = true;
    }
}

function chooseCellsWithBomb(cellsCount, bombCount) {
    chosen = []
    for (let i = 0; i < bombCount; i++) {
        chosen.push(Math.floor(Math.random() * cellsCount));
    }
    console.log("Cells with bomb: " + chosen)
    return chosen;
}


function onCellClicked(selectedCellId, game) {
    console.log("Clicked " + selectedCellId)
    let selectedCell = document.getElementById(selectedCellId);

    let revealResult = game.revealCell(selectedCellId)

    if (revealResult == RevealResult.BOMB) {
        selectedCell.textContent = "💣";
    } else {
        selectedCell.textContent = "□";
    }

    let gameState = game.getState();

    if (gameState == GameState.WON) {
        document.getElementById("result-header").textContent = "You won";
    } else if (gameState == GameState.LOST) {
        document.getElementById("result-header").textContent = "You lost";
    }
}

function renderGame(game) {
    let grid = document.getElementById("grid");

    let cellsToCreate = game.getCellsCount();
    console.log("Rendering " + cellsToCreate + " cells")
    for (let i = 0; i < cellsToCreate; i++) {
        let cell = document.createElement("div");
        cell.id = i;
        cell.textContent = "?"
        cell.className = 'cell'
        cell.onclick = function () { onCellClicked(i, game) };
        grid.appendChild(cell);
    }
}


function start() {
    let game = new Game(10);
    renderGame(game)
}