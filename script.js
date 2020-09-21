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