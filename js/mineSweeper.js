'use strict'

// {
// minesAroundCount: 4,
// isRevealed: false,
// isMine: false,
// isMarked: false
// }

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




function onInit() {
 var gBoard = settingMinesAroundCount()
  // gBoard = buildBoard()
  buildBoard()
  renderBoard(gBoard)
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

function settingMinesAroundCount() {
  var builtBoard = buildBoard()
  for (var i = 0; i < builtBoard.length; i++) {
    for (var j = 0; j < builtBoard[i].length; j++) {
      setMinesNegsCount(i, j, builtBoard)
    }
  }

  console.log('builtBoard:', builtBoard)
  console.table(builtBoard)
  debugger
  return buildBoard
  
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
    console.log('gBoard:', gBoard)
  console.table(gBoard)
  var lines = gBoard.length
  console.log('lines:', lines)
  var columns = gBoard[0].length
  console.log('columns:', columns)
  for (var i = 0; i < lines; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < columns; j++) {
      const cell = gBoard[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">
                            ${cell.minesAroundCount}
                        </td>`
    }
    strHTML += '</tr>'
  }
  const elContainer = document.querySelector('.board')
  elContainer.innerHTML = strHTML
}












// buildBoard()

// renderBoard(board)

// const WALL = '#'
// const FOOD = '.'
// const EMPTY = ' '
// const SUPERFOOD = '🍽'
// const CHERRY = '🍒'

//   score: 0,
// const gGame = {
//   isOn: false,
// }
// var gFoodCount = 0
// var elScore = document.querySelector('h2 .score ')
// var elModal = document.querySelector('.modal')
// var elModalText = document.querySelector('.modal h2 span')
// var gCherryInterval

// function onInit() {
//   gBoard = buildBoard()

//   createPacman(gBoard)
//   createGhosts(gBoard)
//   console.table(gBoard)
//   renderBoard(gBoard)
//   gCherryInterval = setInterval(() => {
//     addCherry()
//   }, 15000)
//   gFoodCount = 15 //55
//   gGame.score = 0
//   elScore.innerText = '0'
//   gGame.isOn = true
//   // elModal.innerText = elModal.innerHTML /// doesn't change to you won @@@
//   elModal.hidden = true
//   console.log('elModal:', elModal)
// }










// // location is an object like this - { i: 2, j: 7 }

// function renderCell(location, value) {
//   // Select the elCell and set the value
//   const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//   elCell.innerHTML = value
// }

// function addCherry() {
//   const emptyCell = findEmptyCells(gBoard)
//   gBoard[emptyCell.i][emptyCell.j] = CHERRY
//   renderCell(emptyCell, CHERRY)
// }

// function findEmptyCells() {
//   var emptyCells = []
//   for (var i = 0; i < gBoard.length; i++) {
//     for (var j = 0; j < gBoard[0].length; j++) {
//       const currCell = gBoard[i][j]
//       //   console.table(gBoard)
//       //   console.log('gBoard[i][j]:', gBoard[i][j])
//       if (currCell === EMPTY) {
//         emptyCells.push({ i, j })
//         // console.log('emptyCells:', emptyCells)
//       }
//     }
//   }

//   var emptyCell = emptyCells[getRandomIntExclusive(0, emptyCells.length)]
//   return emptyCell
// }

// function updateScore(diff) {
//   // update both the model and the dom for the score
//   gGame.score += diff
//   elScore.innerText = gGame.score
// }

// function gameOver(won) {
//   console.log('Game Over')
//   clearInterval(gIntervalGhosts)
//   clearInterval(gCherryInterval)
//   gGame.isOn = false
//   renderCell(gPacman.location, EMPTY)
//   elModalText.innerText = 'you won :)'

//   if (!won) {
//     elModalText.innerText = 'you lost!'
//     // elModal.innerText = 'you lost!'
//     console.log('elModal:', elModal)
//     elModalText.style.color = 'black'
//   }
//   elModal.hidden = false
// }

// // function onPlayAgain() {

// // }


