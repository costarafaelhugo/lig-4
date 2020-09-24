let board = [
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"]
]

let currentPlayer = 'rick'

//FUNÇÃO DE CRIAÇÃO DO TABULEIRO
function makeBoard() {
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
addEventListners()




//FUNÇÃO QUE COLOCA UM ADDEVENTLISTNERS EM CADA COLUNA
function addEventListners() {
    let column = document.getElementsByClassName('column')
    for (let i = 0; i < column.length; i++) {
        column[i].addEventListener('click', gamePlay)
    }
}

//FUNÇÃO QUE CRIA AS PEÇAS DOS JOGADORES
function lastCellViable(cells) {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount === 0) {
            return cells[i]
        }
    }
}


function pieceCreator(place) {
    let piece = document.createElement('div')
    piece.classList.add(currentPlayer)
    let img = document.createElement('img')
    if (currentPlayer === 'rick') {
        img.src = 'imagens/rick.png'
    } else if (currentPlayer === 'morty') {
        img.src = 'imagens/morty.png'
    }
    piece.appendChild(img)
    place.appendChild(piece)
    modifyBoard(piece)
}

function switchPlayer() {
    if (currentPlayer === 'rick') {
        currentPlayer = 'morty'
    } else if (currentPlayer === 'morty') {
        currentPlayer = 'rick'
    }

    playersTurn(currentPlayer)
}





function gamePlay(u) {
    u.stopPropagation()
    let column = u.target.parentNode
    let cells = column.children
    let place = lastCellViable(cells)
    pieceCreator(place)
    if (winAndDrawCondition() === "WIN") {
        //função para mostrar o vencedor
        //winOrDrawScreen(currentPlayer)
        time(currentPlayer)
        console.log('WIN')
    }

    if (winAndDrawCondition() === "DRAW") {
        //função para mostrar empate
        // winOrDrawScreen('draw')
        time('draw')
        console.log('DRAW')
    }
    switchPlayer()
}

function time(player) {
    setTimeout(function () {
        winOrDrawScreen(player)
    }, 1250);
}

//FUNÇÃO DO BOTÃO JOGAR
let button = document.getElementById('jogar')
button.addEventListener('click', function () {
    let hidden = document.getElementById('inicial')
    hidden.classList.add('hide')

    let board = document.getElementById('board')
    board.classList.remove('boardHide')

    let divPlayer = document.getElementById('currentPlayer')
    divPlayer.classList.remove('boardHide')

    playersTurn(currentPlayer)

})

//FUNÇÃO QUE IDENTIFICA DE QUAL PLAYER É A VEZ

function playersTurn(a) {
    let output = document.getElementById('currentPlayer')
    if (a === 'rick') {
        let player1 = document.getElementById('player1').value
        output.innerText = `Sua vez ${player1}!`
    }

    if (a === 'morty') {
        let player2 = document.getElementById('player2').value
        output.innerText = `Sua vez ${player2}!`
    }
}

//FUNÇÃO QUEMODIFICA O BOARD CADA VEZ QUE UMA PEÇA É COLOCADA

function modifyBoard(letter) {
    let arrId = letter.parentNode.id.split('')
    if (letter.classList.value === "rick") {
        board[arrId[0]].splice(arrId[2], 1, "R")
    }
    if (letter.classList.value === "morty") {
        board[arrId[0]].splice(arrId[2], 1, "M")
    }
}


//FUNÇÃO DE CONDIÇÃO DE VITÓRIA

function winAndDrawCondition() {
    if (seekVertical() || seekHorizontal() || seekDiagonalUpRight() || seekDiagonalUpLeft()) {
        //colocar aqui a tela de vítoria!
        console.log(`${currentPlayer} WIN!`)
        return "WIN"
    }

    if (isDraw()) {
        console.log('EMPATE')
        return "DRAW"

    }
}

function seekVertical() {
    let edgeI = board.length
    let edgeJ = board[0].length - 3
    for (let i = 0; i < edgeI; i++) {
        for (j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i][j + 1] && cell == board[i][j + 2] && cell === board[i][j + 3]) {
                    return true
                }
            }
        }
    }
}

function seekHorizontal() {
    let edgeI = board.length - 3
    let edgeJ = board[0].length
    for (let i = 0; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i + 1][j] && cell === board[i + 2][j] && cell === board[i + 3][j]) {
                    return true
                }
            }
        }
    }
}

function seekDiagonalUpRight() {
    let edgeI = board.length - 3
    let edgeJ = board[0].length - 3
    for (let i = 0; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3]) {
                    return true
                }
            }
        }
    }
}

function seekDiagonalUpLeft() {
    let edgeI = board.length
    let edgeJ = board[0].length - 3
    edgeI = board.length
    for (let i = 3; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i - 1][j + 1] && cell === board[i - 2][j + 2] && cell === board[i - 3][j + 3]) {
                    return true
                }
            }
        }
    }

}

function isDraw() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 1; j < board[i].length; j++) {
            if (board[i][j] === "c") {
                return false
            }
        }
    }
    return true
}

function winOrDrawScreen(element) {
    let board1 = document.getElementById('board')
    board1.classList.add('boardHide')

    let divPlayer = document.getElementById('currentPlayer')
    divPlayer.classList.add('boardHide')

    let destination = document.getElementById('main')
    let winDiv = document.createElement('div')
    winDiv.id = "endGame"
    let winGif = document.createElement('img')
    let player1 = document.getElementById('player1').value
    let player2 = document.getElementById('player2').value
    if (element === 'rick') {
        winGif.src = "imagens/rickWin.gif"
        winGif.id = "rickWin"
        winDiv.textContent = `Parabéns ${player1}! Um Rick sempre vai ser melhor que um Morty...`
        winDiv.appendChild(winGif)
        destination.appendChild(winDiv)
    }

    if (element === 'morty') {
        winGif.src = "imagens/mortyWin.gif"
        winGif.id = "mortyWin"
        winDiv.textContent = `Parabéns ${player2}! Um Morty as vezes consegue...`
        winDiv.appendChild(winGif)
        destination.appendChild(winDiv)
    }

    if (element === 'draw') {
        winGif.id = "gifMaior"
        winGif.src = "imagens/gifLosers.gif"
        winDiv.textContent = 'Nenhum dos dois conseguiu ganhar? Poxa... hoje não é um dia para uma aventura.'
        winDiv.appendChild(winGif)
        destination.appendChild(winDiv)
    }

    setTimeout(() => {
        winDiv.classList.add('hide')
        board1.innerHTML = ""
        board1.classList.remove('boardHide')
        divPlayer.classList.remove('boardHide')
        board = [
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"],
            ["C", "c", "c", "c", "c", "c", "c"]
        ]
        makeBoard()
        addEventListners()
    }, 2000)

}


