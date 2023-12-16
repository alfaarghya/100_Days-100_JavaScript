document.addEventListener("DOMContentLoaded", () => {

    const gameScore = document.querySelector("#gameScore");
    const gameHighScore = document.querySelector("#gameHighScore");
    const gameBoard = document.querySelector(".gameBoard");
    const gameOver = document.querySelector(".gameOver");
    const Controller = document.querySelectorAll(".Controller");

    let score = 0;
    let highScore = localStorage.getItem('game-highScore') || 0;
    let game = [];
    let size = 4;

    gameHighScore.textContent = highScore;

    //score update
    const scoreUpdate = (value) => {
        score += value
        gameScore.textContent = score;

        // highScore update
        if (score > highScore) {
            highScore = score;
            gameHighScore.textContent = highScore;
            localStorage.setItem('game-highScore', highScore);
        }
    };

    //start the game
    const initGame = () => {
        //fill array with 0
        game = [...Array(size)].map(element => Array(size).fill(0));

        randomGenerate();
        randomGenerate();
        renderGame();
    };

    //restart the game
    const restart = () => {
        score = 0;
        gameScore.textContent = '0';
        // gameOver
        initGame();
    };


    //generate random cells on game board
    const randomGenerate = () => {
        const emptyPosition = [];
        //get positions where 0 present
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (game[i][j] === 0) {
                    emptyPosition.push({ x: i, y: j });
                }
            }
        }

        //place random value between 2 and 4
        if (emptyPosition.length > 0) {
            const randomCell = emptyPosition[Math.floor(Math.random() * emptyPosition.length)];
            console.log(randomCell);
            game[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
            console.log(game[randomCell.x][randomCell.y]);
            const cell = document.querySelector(`[data-row="${randomCell.x}"][data-column="${randomCell.y}"]`);
            cell.classList.add("new-cell");
        }

    };

    //generate or update game
    const renderGame = () => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);

                //get the values
                const oldValue = cell.dataset.value;
                const newValue = game[i][j];

                //render the cell
                if (newValue !== 0) {
                    cell.dataset.value = newValue;
                    cell.textContent = newValue;

                    if (newValue !== parseInt(oldValue) && !cell.classList.contains('new-cell')) {
                        cell.classList.add('merged-cell');
                    }
                } else {
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.remove('merged-cell', 'new-cell');
                }
            }
        }

        setTimeout(() => {
            const cells = document.querySelectorAll('.game-cell');
            cells.forEach(cell => {
                cell.classList.remove('merged-cell', 'new-cell')
            });
        }, 300);
    };

    //press the key and move the direction & transform the game
    const transform = (line, moveDirection) => {

        let newLine = line.filter((cell) => cell !== 0);
        if (!moveDirection) {
            newLine.reverse();
        }

        for (let i = 0; i < newLine.length - 1; i++) {
            if (newLine[i] === newLine[i + 1]) {
                newLine[i] *= 2;
                scoreUpdate(newLine[i]);
                newLine.splice(i + 1, 1);
            }
        }
        while (newLine.length < size) {
            newLine.push(0);
        }
        if (!moveDirection) {
            newLine.reverse();
        }
        return newLine;

    };

    //move the column & row 
    const move = (direction) => {
        let isChanged = false;

        if (direction === 'ArrowUp' || direction === 'ArrowDown') {
            for (let j = 0; j < size; j++) {
                const column = [...Array(size)].map((_, i) => game[i][j]);
                const newColumn = transform(column, direction === 'ArrowUp');
                for (let i = 0; i < size; i++) {
                    if (game[i][j] !== newColumn[i]) {
                        isChanged = true;
                        game[i][j] = newColumn[i];
                    }
                }
            }
        } else if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
            for (let i = 0; i < size; i++) {
                const row = game[i];
                const newRow = transform(row, direction === 'ArrowLeft');
                if (row.join(',') !== newRow.join(',')) {
                    isChanged = true;
                    game[i] = newRow;
                }
            }
        }

        if (isChanged) {
            randomGenerate();
            renderGame();
        }

    };



    //checking... is game over or not??
    const isGameOver = () => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (game[i][j] === 0) {
                    return;
                }
                if (j < size - 1 && game[i][j] === game[i][j + 1]) {
                    return;
                }
                if (i < size - 1 && board[i][j] === board[i + 1][j]) {
                    return;
                }
            }
        }
        //style
    }

    //key pressing
    document.addEventListener('keydown', event => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            move(event.key);
        }
    });

    //restart btn


    initGame();
});

