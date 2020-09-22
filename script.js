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
        console.log(this)
        vertical(this)
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
}


function play(){
    let button = document.getElementById('jogar')
    button.addEventListener('click', function(){
        let hidden = document.getElementById('inicial')
        hidden.classList.add('hide') 

        let board = document.getElementById('board')
        board.classList.remove('boardHide')

        let divPlayer = document.getElementById('currentPlayer')
        divPlayer.classList.remove('boardHide')

        playersTurn(rick)
    })
}

play()

function playersTurn(a){
    let output = document.getElementById('currentPlayer')
    if (a === rick){
        let player1 = document.getElementById('player1').value
        output.innerText = `Sua vez ${player1}!`
    }

    if (a === morty){
        let player2 = document.getElementById('player2').value
        output.innerText = `Sua vez ${player2}!`
    }
}


// function vertical(){
//     let ricks = Array.from(document.getElementsByClassName('rick'))
//     console.log(typeof(ricks))
//     let rickParents = []

//     ricks.forEach(element => {
//         rickParents.push(element.parentElement.id.split(""))
//     });

//     for(let i = 0; i < rickParents.length;i++){
//         for(let j = rickParents.length; j > 0; j--){
//             if(rickParents[i][j] === rickParents[i+1][j]){
//                 console.log('temos uma sequencia')
//             }
//         }
//     }

//     console.log(rickParents)
// }

function vertical(column){
    let filhos = column.children
    console.log(filhos)
}
