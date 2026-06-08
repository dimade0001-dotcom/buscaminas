class Minesweeper {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.gameWon = false;
        this.startTime = null;
        this.timerInterval = null;
        this.firstClick = true;
        this.revealedCount = 0;

        this.initializeBoard();
    }

    initializeBoard() {
        // Crear tablero vacío
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.revealed = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.flagged = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.revealedCount = 0;
    }

    placeMines(avoidRow, avoidCol) {
        let placed = 0;
        while (placed < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            // No poner minas en la primera celda clickeada ni si ya hay una mina
            if ((row === avoidRow && col === avoidCol) || this.board[row][col] === 'M') {
                continue;
            }

            this.board[row][col] = 'M';
            placed++;
        }

        // Calcular números
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] !== 'M') {
                    this.board[r][c] = this.countAdjacentMines(r, c);
                }
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const newRow = row + r;
                const newCol = col + c;
                if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                    if (this.board[newRow][newCol] === 'M') {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    revealCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return;
        }

        if (this.revealed[row][col] || this.flagged[row][col]) {
            return;
        }

        // Primer click - colocar minas evitando esa celda
        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
            this.startTimer();
        }

        this.revealed[row][col] = true;
        this.revealedCount++;

        // Si es una mina - GAME OVER
        if (this.board[row][col] === 'M') {
            this.gameOver = true;
            this.revealAllMines();
            return false;
        }

        // Si es un número 0, revelar celdas adyacentes automáticamente
        if (this.board[row][col] === 0) {
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    const newRow = row + r;
                    const newCol = col + c;
                    if (!this.revealed[newRow][newCol] && !this.flagged[newRow][newCol]) {
                        this.revealCell(newRow, newCol);
                    }
                }
            }
        }

        // Verificar victoria
        this.checkWin();
        return true;
    }

    toggleFlag(row, col) {
        if (this.revealed[row][col]) {
            return;
        }
        this.flagged[row][col] = !this.flagged[row][col];
    }

    revealAllMines() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] === 'M') {
                    this.revealed[r][c] = true;
                }
            }
        }
    }

    checkWin() {
        const cellsToReveal = (this.rows * this.cols) - this.mines;
        if (this.revealedCount === cellsToReveal) {
            this.gameWon = true;
            this.stopTimer();
        }
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateTimer(), 100);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    getMinesLeft() {
        const flaggedCount = this.flagged.flat().filter(f => f).length;
        return Math.max(0, this.mines - flaggedCount);
    }

    getElapsedTime() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}

let game = null;
let leaderboard = [];

// Cargar marcadores del localStorage
function loadLeaderboard() {
    try {
        const saved = localStorage.getItem('minesweeper_leaderboard');
        if (saved) {
            leaderboard = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error cargando marcadores:', e);
        leaderboard = [];
    }
}

// Guardar marcadores en localStorage
function saveLeaderboard() {
    try {
        localStorage.setItem('minesweeper_leaderboard', JSON.stringify(leaderboard));
    } catch (e) {
        console.error('Error guardando marcadores:', e);
    }
}

// Configurar dificultad
function setDifficulty(level) {
    try {
        const buttons = document.querySelectorAll('.difficulty-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Buscar el botón correspondiente al nivel
        const levelMap = {
            'easy': 0,
            'medium': 1,
            'hard': 2
        };
        
        if (buttons[levelMap[level]]) {
            buttons[levelMap[level]].classList.add('active');
        }

        const configs = {
            easy: { rows: 8, cols: 8, mines: 10 },
            medium: { rows: 12, cols: 12, mines: 40 },
            hard: { rows: 16, cols: 16, mines: 99 }
        };

        const config = configs[level];
        const rowsEl = document.getElementById('rows');
        const colsEl = document.getElementById('cols');
        const minesEl = document.getElementById('mines');
        
        if (rowsEl) rowsEl.value = config.rows;
        if (colsEl) colsEl.value = config.cols;
        if (minesEl) minesEl.value = config.mines;
    } catch (e) {
        console.error('Error en setDifficulty:', e);
    }
}

// Iniciar nuevo juego
function startGame() {
    try {
        const rowsEl = document.getElementById('rows');
        const colsEl = document.getElementById('cols');
        const minesEl = document.getElementById('mines');
        
        if (!rowsEl || !colsEl || !minesEl) {
            console.error('Elementos del formulario no encontrados');
            return;
        }

        const rows = parseInt(rowsEl.value);
        const cols = parseInt(colsEl.value);
        const mines = parseInt(minesEl.value);

        console.log(`Iniciando juego: ${rows}x${cols} con ${mines} minas`);

        // Validaciones
        if (isNaN(rows) || isNaN(cols) || isNaN(mines)) {
            alert('Por favor ingresa números válidos');
            return;
        }

        if (rows < 5 || rows > 20 || cols < 5 || cols > 20) {
            alert('Las dimensiones deben estar entre 5 y 20');
            return;
        }

        if (mines >= rows * cols) {
            alert('El número de minas no puede ser igual o mayor que el número de celdas');
            return;
        }

        // Limpiar juego anterior
        if (game) {
            game.stopTimer();
        }

        clearMessage();
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            timerEl.textContent = '0:00';
        }

        game = new Minesweeper(rows, cols, mines);
        updateMinesLeft();
        updateRevealed();
        renderBoard();
        console.log('Juego iniciado correctamente');
    } catch (e) {
        console.error('Error al iniciar el juego:', e);
        alert('Error al iniciar el juego. Abre la consola para más detalles.');
    }
}

// Renderizar tablero
function renderBoard() {
    try {
        const boardEl = document.getElementById('board');
        if (!boardEl) {
            console.error('Elemento board no encontrado');
            return;
        }

        boardEl.innerHTML = '';
        boardEl.style.gridTemplateColumns = `repeat(${game.cols}, 40px)`;

        for (let r = 0; r < game.rows; r++) {
            for (let c = 0; c < game.cols; c++) {
                const cell = document.createElement('button');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (game.revealed[r][c]) {
                    cell.classList.add('revealed');
                    if (game.board[r][c] === 'M') {
                        cell.textContent = '💣';
                        cell.classList.add('mine');
                    } else if (game.board[r][c] === 0) {
                        cell.classList.add('empty');
                    } else {
                        cell.textContent = game.board[r][c];
                        cell.classList.add(`${['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'][game.board[r][c]]}`);
                    }
                } else if (game.flagged[r][c]) {
                    cell.textContent = '🚩';
                    cell.classList.add('flagged');
                }

                cell.onclick = () => clickCell(r, c);
                cell.oncontextmenu = (e) => {
                    e.preventDefault();
                    rightClickCell(r, c);
                };

                boardEl.appendChild(cell);
            }
        }
    } catch (e) {
        console.error('Error al renderizar tablero:', e);
    }
}

// Click en celda
function clickCell(row, col) {
    try {
        if (!game || game.gameOver || game.gameWon) {
            return;
        }

        const result = game.revealCell(row, col);
        updateMinesLeft();
        renderBoard();
        updateRevealed();

        if (game.gameOver) {
            showMessage('¡PERDISTE! 💥 Has pisado una mina', 'lose');
            game.stopTimer();
        } else if (game.gameWon) {
            saveScore();
            showMessage('¡GANASTE! 🎉 ¡Felicidades!', 'win');
            updateLeaderboard();
        }
    } catch (e) {
        console.error('Error en clickCell:', e);
    }
}

// Click derecho en celda
function rightClickCell(row, col) {
    try {
        if (!game || game.gameOver || game.gameWon || game.revealed[row][col]) {
            return;
        }

        game.toggleFlag(row, col);
        updateMinesLeft();
        renderBoard();
    } catch (e) {
        console.error('Error en rightClickCell:', e);
    }
}

// Actualizar minas restantes
function updateMinesLeft() {
    try {
        if (game) {
            const el = document.getElementById('minesLeft');
            if (el) {
                el.textContent = game.getMinesLeft();
            }
        }
    } catch (e) {
        console.error('Error en updateMinesLeft:', e);
    }
}

// Actualizar celdas reveladas
function updateRevealed() {
    try {
        if (game) {
            const el = document.getElementById('revealed');
            if (el) {
                el.textContent = game.revealedCount;
            }
        }
    } catch (e) {
        console.error('Error en updateRevealed:', e);
    }
}

// Mostrar mensaje
function showMessage(text, type) {
    try {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.textContent = text;
            messageEl.className = `message ${type}`;
        }
    } catch (e) {
        console.error('Error en showMessage:', e);
    }
}

// Limpiar mensaje
function clearMessage() {
    try {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }
    } catch (e) {
        console.error('Error en clearMessage:', e);
    }
}

// Guardar puntuación
function saveScore() {
    try {
        const playerNameEl = document.getElementById('playerName');
        const playerName = (playerNameEl ? playerNameEl.value.trim() : '') || 'Anónimo';
        const time = game.getElapsedTime();
        const difficulty = getDifficulty();

        const score = {
            name: playerName,
            time: time,
            difficulty: difficulty,
            board: `${game.rows}x${game.cols}`,
            mines: game.mines,
            date: new Date().toLocaleDateString('es-ES')
        };

        leaderboard.push(score);
        // Ordenar por tiempo (menor es mejor)
        leaderboard.sort((a, b) => a.time - b.time);
        // Guardar solo los top 10
        leaderboard = leaderboard.slice(0, 10);
        saveLeaderboard();
    } catch (e) {
        console.error('Error en saveScore:', e);
    }
}

// Obtener dificultad actual
function getDifficulty() {
    try {
        const rowsEl = document.getElementById('rows');
        const colsEl = document.getElementById('cols');
        const minesEl = document.getElementById('mines');
        
        const rows = rowsEl ? parseInt(rowsEl.value) : 0;
        const cols = colsEl ? parseInt(colsEl.value) : 0;
        const mines = minesEl ? parseInt(minesEl.value) : 0;

        if (rows === 8 && cols === 8 && mines === 10) return 'Fácil';
        if (rows === 12 && cols === 12 && mines === 40) return 'Medio';
        if (rows === 16 && cols === 16 && mines === 99) return 'Difícil';
        return 'Personalizado';
    } catch (e) {
        console.error('Error en getDifficulty:', e);
        return 'Desconocido';
    }
}

// Actualizar tabla de clasificación
function updateLeaderboard() {
    try {
        const leaderboardEl = document.getElementById('leaderboardList');
        if (!leaderboardEl) {
            console.error('Elemento leaderboardList no encontrado');
            return;
        }

        leaderboardEl.innerHTML = '';

        if (leaderboard.length === 0) {
            leaderboardEl.innerHTML = '<li class="leaderboard-item"><span>No hay puntuaciones aún</span></li>';
            return;
        }

        leaderboard.forEach((score, index) => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            
            const rankSpan = document.createElement('span');
            rankSpan.className = 'rank';
            if (index === 0) rankSpan.classList.add('gold');
            if (index === 1) rankSpan.classList.add('silver');
            if (index === 2) rankSpan.classList.add('bronze');
            rankSpan.textContent = `#${index + 1}`;

            const infoSpan = document.createElement('span');
            infoSpan.innerHTML = `
                <strong>${score.name}</strong><br>
                <span class="difficulty-label">${score.difficulty} - ${score.board} (${score.mines} minas)</span>
            `;

            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            const minutes = Math.floor(score.time / 60);
            const seconds = score.time % 60;
            timeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            li.appendChild(rankSpan);
            li.appendChild(infoSpan);
            li.appendChild(timeSpan);
            leaderboardEl.appendChild(li);
        });
    } catch (e) {
        console.error('Error en updateLeaderboard:', e);
    }
}

// Limpiar marcadores
function resetScores() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los marcadores?')) {
        leaderboard = [];
        saveLeaderboard();
        updateLeaderboard();
        alert('Marcadores eliminados');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando juego...');
    loadLeaderboard();
    updateLeaderboard();
    setDifficulty('medium');
    startGame();
    console.log('Juego listo!');
});
