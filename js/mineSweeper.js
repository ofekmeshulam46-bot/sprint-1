'use strict'

const MINE = '💣'
const FLAG = '🚩'
const NORMAL_SMILEY = '😀'
const HAPPY_SMILEY = ' 😎'
const SAD_SMILEY = '🤯'

var gLevel = {
  SIZE: 4,
  MINES: 3,
}

var gGame = {
  isOn: false,
  revealedCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

var gSafeCells
var gBoard
var gIsFirstClick
var gFirstCell
var gLives
const gElModal = document.querySelector('.modal span')
var gElEmoji = document.querySelector('.emoji span')
var gElHeader = document.querySelector('.lives')

function onInit() {
  gLives = 3
  gElHeader.innerHTML = gLives
  gGame.isOn = true
  gSafeCells = gLevel.SIZE ** 2
  gBoard = buildBoard()
  renderBoard(gBoard)
  gElModal.innerHTML = ''
  gElEmoji.innerHTML = NORMAL_SMILEY
}

function setDifficulty(button) {
  if (button.innerHTML === 'easy') {
    gLevel = {
      SIZE: 4,
      MINES: 2,
    }
    onInit()
  }
  if (button.innerHTML === 'medium') {
    gLevel = {
      SIZE: 8,
      MINES: 14,
    }
    onInit()
  }
  if (button.innerHTML === 'hard') {
    gLevel = {
      SIZE: 12,
      MINES: 32,
    }
    onInit()
  }
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

  return board
}

function settingRandomMines() {
  var minesCount = 0
  for (var i = 0; minesCount < gLevel.MINES; i++) {
    var randomI = getRandomIntExclusive(0, gLevel.SIZE)
    var randomJ = getRandomIntExclusive(0, gLevel.SIZE)
    if (gBoard[randomI][randomJ].isMine) continue
    gBoard[randomI][randomJ].isMine = true
    minesCount++
    if (gBoard[gFirstCell.i][gFirstCell.j].isMine) {
      gBoard[gFirstCell.i][gFirstCell.j].isMine = false
      minesCount--
      continue
    }
    gSafeCells--
  }
}

function settingMinesAroundCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      negsMinesCount(i, j, board)
    }
  }
}

function negsMinesCount(rowIdx, colIdx, mat) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue
      if (i === rowIdx && j === colIdx) continue

      if (mat[i][j].isMine) mat[rowIdx][colIdx].minesAroundCount++
    }
  }
  return mat
}

// function settingMinesAroundCount(board) {
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//       negsMinesCount(i, j, board)
//     }
//   }
// }

// function negsMinesCount(rowIdx, colIdx, mat) {
//   for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//     if (i < 0 || i >= mat.length) continue

//     for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//       if (j < 0 || j >= mat[i].length) continue
//       if (i === rowIdx && j === colIdx) continue

//       if (mat[i][j].isMine === true) mat[rowIdx][colIdx].minesAroundCount++
//     }
//   }
//   return mat
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
      strHTML += `<td  class="${className}" onclick= onCellClicked(this,${i},${j}) oncontextmenu=onCellMarked(this,${i},${j},event) > <span class= hidden>${cellContent}</span>  <span class=flag></span>

                           
                        </td>`
    }
    strHTML += '</tr>'
  }
  const elContainer = document.querySelector('.board')
  elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function onCellMarked(elCell, i, j, event) {
  event.preventDefault()
  if (!gGame.isOn) return
  const flagCell = document.querySelector(`.cell-${i}-${j} .flag`)
  if (gBoard[i][j].isRevealed) return
  if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false
    flagCell.innerHTML = ''
  } else {
    gBoard[i][j].isMarked = true
    flagCell.innerHTML = FLAG
  }
  var minesMarked = checkMineMarks()
  if (!gSafeCells && minesMarked) gameOver(true)
}

function firstClick(i, j) {
  gIsFirstClick = true
  for (var k = 0; k < gBoard.length; k++) {
    for (var l = 0; l < gBoard[0].length; l++) {
      if (k === i && l === j) continue
      if (gBoard[k][l].isRevealed) {
        gIsFirstClick = false
      }
    }
  }
  return gIsFirstClick
}

function checkMineMarks() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMine && gBoard[i][j].isMarked === false) return false
    }
  }
  return true
}

function onCellClicked(elCell, i, j) {
  if (gBoard[i][j].isMarked) return
  if (!gGame.isOn) return
  var isFirstCell = firstClick(i, j)
  if (isFirstCell) {
    gFirstCell = { i, j }
    settingRandomMines()
    settingMinesAroundCount(gBoard)
    renderBoard(gBoard)
  }

  const cell = document.querySelector(`.cell-${i}-${j} span`)
  cell.classList.remove('hidden')

  if (!gBoard[i][j].isMine && !gBoard[i][j].isRevealed) {
    gBoard[i][j].isRevealed = true
    gSafeCells--
    countNeighbors(i, j, gBoard)
    if (!gSafeCells && checkMineMarks()) {
      gameOver(true)
    }
  } else if (gBoard[i][j].isMine) {
    gBoard[i][j].isRevealed = true
    gLives--
    gElHeader.innerHTML = gLives
    if (gLives > 0) {
      setTimeout(() => {
        alert('life remaining:' + ' ' + gLives)
      }, 400)
      setTimeout(() => {
        gBoard[i][j].isRevealed = false
        cell.classList.add('hidden')
      }, 1500)
      return
    }
    for (var k = 0; k < gBoard.length; k++) {
      for (var l = 0; l < gBoard[0].length; l++) {
        if (gBoard[k][l].isMine) {
          var mineCell = document.querySelector(`.cell-${k}-${l} span`)
          var flagMine = document.querySelector(`.cell-${k}-${l} .flag`)
          flagMine.innerHTML = ''
          mineCell.classList.remove('hidden')
        }
      }
    }
    gameOver(false)
  }
}

function expandReveal(board, elCell, i, j) {
  countNeighbors(i, j, board)
  return
}

function gameOver(isWin) {
  if (isWin) {
    gElModal.style.color = 'white'
    gElModal.innerHTML = 'you won!'
    gElModal.style.textalign = 'center' //not working
    gElEmoji.innerHTML = HAPPY_SMILEY
  } else if (!isWin) {
    gElModal.innerHTML = 'you lost!'
    gElModal.style.color = 'black'
    gElModal.style.textalign = 'center' //not working
    gElEmoji.innerHTML = SAD_SMILEY
  }
  gElModal.classList.remove('hidden') //= display false didnt work
  gGame.isOn = false
}

function countNeighbors(rowIdx, colIdx, mat) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue
      if (i === rowIdx && j === colIdx) continue
      var cell = document.querySelector(`.cell-${i}-${j} span`)
      var flaggedCell = document.querySelector(`.cell-${i}-${j} .flag`)

      if (!mat[i][j].isMine && !mat[i][j].isRevealed) {
        mat[i][j].isRevealed = true
        gSafeCells--
        cell.classList.remove('hidden')
        if (mat[i][j].isMarked) {
          mat[i][j].isMarked = false
          flaggedCell.innerHTML = ''
        }
      }
    }
  }
  return
}
