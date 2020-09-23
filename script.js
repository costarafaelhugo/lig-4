function makeBoard() {
    board = [
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"],
        ["c", "c", "c", "c", "c", "c", "c"]
    ]


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (j === 0) {
                let tabuleiro = document.getElementById('board')
                let column = document.createElement('div')
                column.classList.add('column')
                column.id = `${i} ${j}`
                tabuleiro.appendChild(column)
            }
            if (j > 0) {
                let column = document.getElementById(`${i} 0`)
                let cell = document.createElement('div')
                cell.classList.add('cell')
                cell.id = `${i} ${j}`
                column.appendChild(cell)
            }
        }
    }
}

makeBoard()

addEventLitners()

function addEventLitners() {
    let column = document.getElementsByClassName('column')
    for (let i = 0; i < column.length; i++) {
        column[i].addEventListener('click', creatSon)
    }
}


let currentPlayer = 0

function creatSon(u) {
    u.stopPropagation()
    let column = u.target.parentNode
    let cells = column.children
    peace = document.createElement('div')
    playersTurn(rick)
    if (currentPlayer === 0) {
        playersTurn(morty)
        peace.classList.add('rick')
        let rickImg = document.createElement('img')
        rickImg.src = 'imagens/rick.png'
        peace.appendChild(rickImg)
        currentPlayer++
    }
    else {
        peace.classList.add('morty')
        let mortyImg = document.createElement('img')
        mortyImg.src = 'imagens/morty.png'
        peace.appendChild(mortyImg)
        currentPlayer--
    }
    let lastCellViable = null
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount === 0) {
            lastCellViable = cells[i]
            break
        }
    }
    lastCellViable.appendChild(peace)
    modifyBoard(peace)
    seekVertical(peace)
    seekHorizontal(peace)
    seekDiagonalDownRight(peace)
    seekDiagonalDownLeft(peace)
}



let button = document.getElementById('jogar')
button.addEventListener('click', function () {
    let hidden = document.getElementById('inicial')
    hidden.classList.add('hide')

    let board = document.getElementById('board')
    board.classList.remove('boardHide')

    let divPlayer = document.getElementById('currentPlayer')
    divPlayer.classList.remove('boardHide')

    playersTurn(rick)
})

function playersTurn(a) {
    let output = document.getElementById('currentPlayer')
    if (a === rick) {
        let player1 = document.getElementById('player1').value
        output.innerText = `Sua vez ${player1}!`
    }

    if (a === morty) {
        let player2 = document.getElementById('player2').value
        output.innerText = `Sua vez ${player2}!`
    }
}

function modifyBoard(letter) {
    let arrId = letter.parentNode.id.split('')
    if (letter.classList.value === "rick") {
        board[arrId[0]].splice(arrId[2], 1, "R")
    }
    if (letter.classList.value === "morty") {
        board[arrId[0]].splice(arrId[2], 1, "M")
    }
}





function seekVertical(letter) {
    const edgeX = board[0].length - 3
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < edgeX; j++) {
            if (letter.classList.value === "rick") {
                let cell = "R"
                if (cell === board[i][j + 1] && cell === board[i][j + 2] && cell === board[i][j + 3] && cell === board[i][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
            if (letter.classList.value === "morty") {
                let cell = "M"
                if (cell === board[i][j + 1] && cell === board[i][j + 2] && cell === board[i][j + 3] && cell === board[i][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
        }
    }
}

function seekHorizontal(letter) {
    const edgeY = board.length - 3
    for (let i = 0; i < edgeY; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (letter.classList.value === "rick") {
                let cell = "R"
                if (cell === board[i + 1][j] && cell === board[i + 2][j] && cell === board[i + 3][j] && cell === board[i + 4][j]) {
                    console.log('WIN')
                    break
                }
            }
            if (letter.classList.value === "morty") {
                let cell = "M"
                if (cell === board[i + 1][j] && cell === board[i + 2][j] && cell === board[i + 3][j] && cell === board[i + 4][j]) {
                    console.log('WIN')
                    break
                }
            }
        }
    }
}

function seekDiagonalDownRight(letter) {
    let edgeX = board[0].length - 4
    for (let i = 2; i < board.length; i++) {
        for (let j = 0; j < edgeX; j++) {
            if (letter.classList.value === "rick") {
                let cell = "R"
                if (cell === board[i - 1][j + 1] && cell === board[i - 2][j + 2] && cell === board[i - 3][j + 3] && cell === board[i - 4][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
            if (letter.classList.value === "morty") {
                let cell = "M"
                if (cell === board[i - 1][j + 1] && cell === board[i - 2][j + 2] && cell === board[i - 3][j + 3] && cell === board[i - 4][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
        }
    }
}

function seekDiagonalDownLeft(letter) {
    let edgeY = board.length - 4
    let edgeX = board[0].length - 4
    for (let i = 0; i < edgeY; i++) {
        for (let j = 0; j < edgeX; j++) {
            if (letter.classList.value === "rick") {
                let cell = "R"
                if (cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3] && cell === board[i + 4][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
            if (letter.classList.value === "morty") {
                let cell = "M"
                if (cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3] && cell === board[i + 4][j + 4]) {
                    console.log('WIN')
                    break
                }
            }
        }
    }
}