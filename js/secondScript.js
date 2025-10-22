// 'use strict'

// const GHOST = '&#9781;'
// var gGhosts
// var gIntervalGhosts

// function createGhost(board) {
//   var ghost = {
//     location: {
//       i: 3,
//       j: 3,
//     },
//     currCellContent: FOOD,
//     color: '',
//   }

//   gGhosts.push(ghost)
//   board[ghost.location.i][ghost.location.j] = GHOST
// }

// function createGhosts(board) {
//   // empty the gGhosts array, create 3 ghosts
//   gGhosts = []

//   for (var i = 0; i < 3; i++) {
//     createGhost(board)
//     console.log('gGhosts:', gGhosts)
//     var color = getRandomColor()
//     gGhosts[i].color = color
//     // getGhostHTML(gGhosts[i])
//   }
//   console.log('gGhosts:', gGhosts)
//   // run the interval to move them
//   gIntervalGhosts = setInterval(moveGhosts, 1000)
// }

// function moveGhosts() {
//   // loop through ghosts
//   for (var i = 0; i < gGhosts.length; i++) {
//     var ghost = gGhosts[i]
//     // console.log('ghost:', ghost)
//     moveGhost(ghost) // {location , currCellContent}
//   }
// }

// function moveGhost(ghost) {
//   // console.log('ghost:', ghost)
//   // figure out moveDiff, nextLocation, nextCell

//   var moveDiff = getMoveDiff()

//   var nextLocation = {
//     i: ghost.location.i + moveDiff.i,
//     j: ghost.location.j + moveDiff.j,
//   }
//   // console.log('nextLocation:', nextLocation) // {i,j}

//   var nextCell = gBoard[nextLocation.i][nextLocation.j] // '.'
//   // console.log('nextCell:', nextCell)

//   // return if cannot move
//   if (nextCell === WALL || nextCell === GHOST) return

//   // hitting a pacman? call gameOver
//   if (nextCell === PACMAN && !gPacman.isSuper) {
//     gameOver()
//   } else if (nextCell === PACMAN && gPacman.isSuper) {
//     return

//       // var ghostIdx = findGhost(nextCell)
//       // var removedGhost = gGhosts.splice(ghostIdx, 1)
//       // console.log('removedGhost:', removedGhost)

//       // gRemovedGhosts.push(removedGhost) 
//       // var nextCellObject={i:nextLocation.i,j:nextLocation.j}
//       // renderCell(gPacman.location,PACMAN)

//   }

//   // moving from current location (restore prev cell contents):
//   // update the model
//   gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
//   // update the DOM
//   renderCell(ghost.location, ghost.currCellContent)

//   // Move the ghost to new location (save cell contents):
//   // update the model
//   gBoard[nextLocation.i][nextLocation.j] = GHOST
//   ghost.location = nextLocation
//   ghost.currCellContent = nextCell

//   // update the DOM

//   renderCell(ghost.location, getGhostHTML(ghost))
// }


//   function findGhost(location) {
//     for (var i = 0; i < gGhosts.length; i++) {
//       console.log(gGhosts[i].location.i)
//       if (
//         gGhosts[i].location.i === location.i &&
//         gGhosts[i].location.j === location.j
//       ) {
//         return i
//       }
//     }
//   }


// function getMoveDiff() {
//   const randNum = getRandomIntInclusive(1, 4)

//   switch (randNum) {
//     case 1:
//       return { i: 0, j: 1 }
//     case 2:
//       return { i: 1, j: 0 }
//     case 3:
//       return { i: 0, j: -1 }
//     case 4:
//       return { i: -1, j: 0 }
//   }
// }

// function getGhostHTML(ghost) {
//     var color = gPacman.isSuper? 'purple' : ghost.color
//   return `<span style="color: ${color};">${GHOST}</span>`
// }
