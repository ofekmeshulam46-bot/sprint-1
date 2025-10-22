// 'use strict'

// const PACMAN = '😀'
// var gPacman
// var gRemovedGhosts = []

// function createPacman(board) {
//   // initialize gPacman...
//   gPacman = {
//     location: {
//       i: 7,
//       j: 7,
//     },
//     isSuper: false,
//   }

//   board[gPacman.location.i][gPacman.location.j] = PACMAN
//   gFoodCount--
// }

// function onMovePacman(ev) {
//   if (!gGame.isOn) return
//   // use getNextLocation(), nextCell

//   var nextLocation = getNextLocation(ev)
//   if (!nextLocation) return

//   var nextCell = gBoard[nextLocation.i][nextLocation.j]

//   // return if cannot moveK
//   if (nextCell === WALL) return

//   // hitting a ghost? call gameOver
//   if (nextCell === GHOST) {
//     if (!gPacman.isSuper) {
//       gameOver(false)
//       return
//     } else {
//       var ghostIdx = findGhost(nextCell)
//       var removedGhost = gGhosts.splice(ghostIdx, 1)[0]
//       console.log('removedGhost:', removedGhost)

//       gRemovedGhosts.push(removedGhost)
//       // var nextCellObject={i:nextLocation.i,j:nextLocation.j}
//       // renderCell(nextCellObject, EMPTY)

//       //    setTimeout()
//       console.log('gRemovedGhosts:', gRemovedGhosts)

//       if (removedGhost.currCellContent === FOOD) {
//         gFoodCount--
//         removedGhost.currCellContent = EMPTY
//       }
//       //   nextCell = ''
//     }
//   }

//   function findGhost(location) {
//     for (var i = 0; i < gGhosts.length; i++) {
//       console.log(gGhosts[i].location.i)
//       if (
//         gGhosts[i].location.i === location.i &&
//         gGhosts[i].location.j === location.j
//       ) {
//         return i
//       } else return null
//     }
//   }

//   // hitting food? update score
//   if (nextCell === FOOD) {
//     updateScore(1)
//     gFoodCount--
//     console.log('gFoodCount:', gFoodCount)
//     if (gFoodCount === 0) gameOver(true)
//     // console.log('gFoodCount:', gFoodCount)
//   }

//   if (nextCell === CHERRY) {
//     updateScore(10)
//   }

//   if (nextCell === SUPERFOOD) {
//     if (gPacman.isSuper) return
//     gPacman.isSuper = true
//     setTimeout(() => {
//       gPacman.isSuper = false
//       gGhosts.push(...gRemovedGhosts)
//       gRemovedGhosts = []
//       console.log('gGhosts: ', gGhosts)
//     }, 7000)
//   }

//   // moving from current location:
//   // update the model
//   gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

//   // update the DOM
//   renderCell(gPacman.location, EMPTY)

//   // Move the pacman to new location:
//   // update the model
//   gBoard[nextLocation.i][nextLocation.j] = PACMAN
//   gPacman.location = nextLocation

//   // update the DOM
//   renderCell(gPacman.location, PACMAN)
// }

// function getNextLocation(eventKeyboard) {
//   // console.log('eventKeyboard:', eventKeyboard)

//   // figure out nextLocation
//   var nextLocation = {
//     i: gPacman.location.i,
//     j: gPacman.location.j,
//   }

//   switch (eventKeyboard.code) {
//     case 'ArrowUp':
//       nextLocation.i--
//       break
//     case 'ArrowDown':
//       nextLocation.i++
//       break
//     case 'ArrowRight':
//       nextLocation.j++
//       break
//     case 'ArrowLeft':
//       nextLocation.j--
//       break
//     default:
//       return null
//   }

//   return nextLocation
// }
