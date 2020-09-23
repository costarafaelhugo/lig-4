function makeBoard() {
    board = [
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"],
        ["C", "c", "c", "c", "c", "c", "c"]
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
    let lastCellViable = null
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount === 0) {
            lastCellViable = cells[i]
            break
        }
    }
    if (currentPlayer === 0) {
        playersTurn(morty)
        peace.classList.add('rick')
        let rickImg = document.createElement('img')
        rickImg.src = 'imagens/rick.png'
        peace.appendChild(rickImg)
        lastCellViable.appendChild(peace)
        modifyBoard(peace)
        seekAndDestroy(peace)
        currentPlayer++
    }
    else {
        peace.classList.add('morty')
        let mortyImg = document.createElement('img')
        mortyImg.src = 'imagens/morty.png'
        peace.appendChild(mortyImg)
        lastCellViable.appendChild(peace)
        modifyBoard(peace)
        seekAndDestroy(peace)
        currentPlayer--
    }
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





function seekAndDestroy(letter) {
    let edgeI = board.length
    let edgeJ = board[0].length - 3

    //vertical linha por linha
    for(let i = 0; i < edgeI; i++){
        for(j = 1; j < edgeJ; j++){
            let cell = board[i][j]
            if(cell !== "c"){
                if(cell === board[i][j+1] && cell == board[i][j+2] && cell === board[i][j+3]){
                    console.log(`${currentPlayer} VERTICAL WIN`)
                    return true
                }
            }
        }
    }

    //horizontal
    edgeI = board.length - 3
    edgeJ = board[0].length
    for(let i = 0; i < edgeI ; i++){
        for(let j = 1; j < edgeJ; j++){
            let cell = board[i][j]
            if(cell !== "c"){
                if(cell === board[i+1][j] && cell === board[i+2][j] && cell === board[i+3][j]){
                    console.log(`${currentPlayer} HORIZONTAL WIN`)
                    return true
                }
            }
        }
    }

    //diagonalUpRight
    edgeI = board.length - 3
    edgeJ = board[0].length -3
    for(let i = 0; i < edgeI; i++){
        for(let j = 1; j < edgeJ; j++){
            let cell = board[i][j]
            if(cell !== "c"){
                if(cell === board[i+1][j+1] && cell === board[i+2][j+2] && cell === board[i+3][j+3]){
                    console.log(`${currentPlayer} DiagonalUpRight WIN`)
                    return true
                }
            }
        }
    }

    edgeI = board.length
    for(let i = 3; i < edgeI; i++){
        for(let j = 1; j < edgeJ; j++){
            let cell = board[i][j]
            if(cell !== "c"){
                if(cell === board[i-1][j+1] && cell === board[i-2][j+2] && cell === board[i-3][j+3]){
                    console.log(` ${currentPlayer} DiagonalLeft WIN`)
                    return true
                }
            }
        }
    }
}






// board = [
// 0   ["C", "c", "c", "c", "c", "c", "c"],
// 1   ["C", "c", "c", "c", "c", "c", "c"],
// 2   ["C", "c", "c", "c", "c", "c", "c"],
// 3   ["C", "c", "c", "c", "c", "c", "c"],
// 4   ["C", "c", "c", "c", "c", "c", "c"],
// 5   ["C", "c", "c", "c", "c", "c", "c"],
// 6   ["C", "c", "c", "c", "c", "c", "c"]
// ]