'use strict'

var MINE = '💣'
var FLAG = '🚩'
var gLevel = {
  SIZE: 4,
  MINES: 2,
}

var gGame = {
  isOn: false,
  revealedCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

// var gBoard

var gBoard = buildBoard()
// settingMinesAroundCount()

function onInit() {
  var check = buildBoard()
  gBoard = buildBoard()
  settingMinesAroundCount(gBoard)
  console.log('gBoard:', gBoard)
  console.table(gBoard)
  renderBoard(gBoard)
  // renderCell({i:2,j:3},9)
}

function buildBoard() {
  var board = []
  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([])
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  board[1][1].isMine = true
  board[2][2].isMine = true

  return board
}

function settingMinesAroundCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      setMinesNegsCount(i, j, board)
    }
  }
}

function setMinesNegsCount(rowIdx, colIdx, mat) {
  var neighborsCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue
      if (i === rowIdx && j === colIdx) continue

      if (mat[i][j].isMine === true) mat[rowIdx][colIdx].minesAroundCount++
    }
  }
  return mat
}

//   return board
// }

function renderBoard() {
  var strHTML = ''
  var lines = gBoard.length
  var columns = gBoard[0].length
  for (var i = 0; i < lines; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < columns; j++) {
      const cell = gBoard[i][j]
      const className = `cell cell-${i}-${j}`
      var cellContent = cell.isMine ? MINE : cell.minesAroundCount
      strHTML += `<td  class="${className}" onclick= onCellClicked(this,${i},${j}) oncontextmenu=onCellMarked(this,${i},${j},event) > <span class=hidden >${cellContent}</span>

                           
                        </td>`
    }
    strHTML += '</tr>'
  }
  const elContainer = document.querySelector('.board')
  elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function onCellMarked(elCell, i, j, event) {
  event.preventDefault()
  const cell = document.querySelector(`.cell-${i}-${j} span`)
  if (!cell.classList.contains('hidden')) return
  else console.log(i, j)
  // if (elCell.hidden) return
  // else elCell.innerHTML=FLAG
}

function onCellClicked(elCell, i, j) {
  const cell = document.querySelector(`.cell-${i}-${j} span`)

  cell.classList.remove('hidden')
  cell.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
}





//   // var cell = document.querySelector(`.cell-${i}-${j} .hidden`)
//   // cell.classList.remove('hidden')

//   cell.classList.remove('hidden')






