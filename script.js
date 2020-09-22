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
    
    
    for(let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (j === 0){
                let tabuleiro = document.getElementById('board')
                let column = document.createElement('div')
                column.classList.add('column')
                column.id = `${i} ${j}`
                tabuleiro.appendChild(column)
            }
            if (j > 0){
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
    for(let i = 0; i < column.length; i++){
        column[i].addEventListener('click', creatSon)
    }
}

function creatSon(u){
    u.stopPropagation()
    let column = u.target.parentNode
    let cells = column.children
    console.log(cells)
    peace = document.createElement('div')
    peace.classList.add('rick')
    let lastCellViable = null
    for(let i = 0; i < cells.length; i++){
        if (cells[i].childElementCount === 0){
            lastCellViable = cells[i]
            break
        }
    }

    lastCellViable.appendChild(peace)
    console.log(lastCellViable)
    
}
