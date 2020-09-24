let board = [
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"],
    ["C", "c", "c", "c", "c", "c", "c"]
]

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


let currentPlayer = 'rick'

//FUNÇÃO QUE COLOCA UM ADDEVENTLISTNERS EM CADA COLUNA
function addEventListners() {
    let column = document.getElementsByClassName('column')
    for (let i = 0; i < column.length; i++) {
        column[i].addEventListener('click', creatSon)
    }
}

//FUNÇÃO QUE CRIA AS PEÇAS DOS JOGADORES
function lastCellViable(cells){
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount === 0) {
            return cells[i]
        }
    }
}


function pieceCreator(place){
    let piece = document.createElement('div')
    piece.classList.add(currentPlayer)
    let img = document.createElement('img')
    if (currentPlayer === 'rick'){
        img.src = 'imagens/rick.png'
        currentPlayer = 'morty'
    } else if(currentPlayer === 'morty'){
        img.src = 'imagens/morty.png'
        currentPlayer = 'rick'
    }
    piece.appendChild(img)
    place.appendChild(piece)
}





function creatSon(u) {
    u.stopPropagation()
    let column = u.target.parentNode
    let cells = column.children
    let place = lastCellViable(cells)
    pieceCreator(place)
    
    
    



    if (isDraw()) {
        //aqui seria a mesma função da condição de vitória, é só a gnt fazer um parâmetro que iria identificar o que fazer no innerText
        let output = document.getElementById('currentPlayer')
        output.innerText = "Deu empate!"
    }
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

    playersTurn(rick)

})

//FUNÇÃO QUE IDENTIFICA DE QUAL PLAYER É A VEZ

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
//Dividir seekAndDestroy em funções menores, achar o bug na função de diagonal

function winAndDrawCondition(){
    if( seekVertical() || seekHorizontal() || seekDiagonalUpRight() || seekDiagonalUpLeft()){
        //colocar aqui a tela de vítoria!
        console.log(`${currentPlayer} WIN!`)
    }

    if( isDraw() ){
        //colocar tela de empate aqui
        console.log('EMPATE')
    }
}

function seekVertical(){
    let edgeI = board.length
    let edgeJ = board[0].length - 3
    for (let i = 0; i < edgeI; i++) {
        for (j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i][j + 1] && cell == board[i][j + 2] && cell === board[i][j + 3]) {
                    console.log(`${currentPlayer} VERTICAL WIN`)
                    return true
                }
            }
        }
    }
}

function seekHorizontal(){
    let edgeI = board.length - 3
    let edgeJ = board[0].length
    for (let i = 0; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i + 1][j] && cell === board[i + 2][j] && cell === board[i + 3][j]) {
                    console.log(`${currentPlayer} HORIZONTAL WIN`)
                    return true
                }
            }
        }
    }
}

function seekDiagonalUpRight(){
    let edgeI = board.length - 3
    let edgeJ = board[0].length - 3
    for (let i = 0; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3]) {
                    console.log(`${currentPlayer} DiagonalUpRight WIN`)
                    return true
                }
            }
        }
    }
}

function seekDiagonalUpLeft(){
    let edgeI = board.length
    let edgeJ = board[0].length - 3
    edgeI = board.length
    for (let i = 3; i < edgeI; i++) {
        for (let j = 1; j < edgeJ; j++) {
            let cell = board[i][j]
            if (cell !== "c") {
                if (cell === board[i - 1][j + 1] && cell === board[i - 2][j + 2] && cell === board[i - 3][j + 3]) {
                    console.log(` ${currentPlayer} DiagonalLeft WIN`)
                    return true
                }
            }
        }
    }

}



// let board = [
//0    ["C", "c", "c", "c", "c", "c", "c"],
//1    ["C", "c", "c", "c", "c", "c", "c"],
//2    ["C", "c", "c", "c", "c", "c", "c"],
//3    ["C", "c", "c", "c", "c", "c", "c"],
//4    ["C", "c", "c", "c", "c", "c", "c"],
//5    ["C", "c", "c", "c", "c", "c", "c"],
//6    ["C", "c", "c", "c", "c", "c", "c"]
// ]




//FUNÇÃO DE EMPATE

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

