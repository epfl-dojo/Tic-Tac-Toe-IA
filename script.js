$(document).ready(() => {
    var player = 0
    var round = 1

    while (!player) {
        player = prompt("Player name ?")
    }

    var players = {
        "X": player,
        "O": "IA"
    }

    var IAplayCells = initEasyIA() // change by wished difficulty

    $('.click').click(function () {
        var clickedCell = $(this)

        if (clickedCell.html() == '') {
            // Human play
            clickedCell.text('x')

            // IA play
            playIA(IAplayCells)

            checkWin(round, players)
            round += 1
        }
    })
})


function playIA(IAplayCells) {
    chosenCell = IAchoseCell(IAplayCells)
    $(chosenCell).text('o')
}

function IAchoseCell(IAplayCells) {
    for (var i = 0, chosenCell = IAplayCells[0]; i < IAplayCells.length; i++ , chosenCell = IAplayCells[i]) {
        if ($(chosenCell).html() != "x" && $(chosenCell).html() != "o") {
            return chosenCell
        }
    }
}

function checkWin(rounds, players) {
    var tabVal = tableState()
    var someoneWon = winConditions(tabVal)

    if (someoneWon) {
        if (someoneWon == "x") {
            sayResult("win", players.X)
        } else {
            sayResult("win", players.O)
        }
    }
    else {
        if (rounds == 5 && !someoneWon) {
            sayResult("draw", "")
        }
    }
}

function sayResult(gameState, winner) {
    if (gameState == "win") {
        alert("Game won by " + winner)
    }
    else {
        alert("Tied game")
    }
    replay()
}

// get state of table cells
function tableState() {
    tabVal = new Array(8)
    var index = 0

    $('table tr td').each(function () {
        var cellValue = $(this).html()
        if (cellValue != "") {
            tabVal[index] = cellValue
        }
        index = index + 1
    })
    return tabVal
}

function winConditions(tabVal) {
    var someoneWon

    // Line 1
    if (tabVal[0] == tabVal[1] && tabVal[0] == tabVal[2]) {
        someoneWon = tabVal[0]
    }

    // Line 2
    if (tabVal[3] == tabVal[4] && tabVal[3] == tabVal[5]) {
        someoneWon = tabVal[3]
    }

    // Line 3
    if (tabVal[6] == tabVal[7] && tabVal[6] == tabVal[8]) {
        someoneWon = tabVal[6]
    }

    // Row 1
    if (tabVal[0] == tabVal[3] && tabVal[0] == tabVal[6]) {
        someoneWon = tabVal[0]
    }

    // Row 2
    if (tabVal[1] == tabVal[4] && tabVal[1] == tabVal[7]) {
        someoneWon = tabVal[1]
    }

    // Row 3
    if (tabVal[2] == tabVal[5] && tabVal[2] == tabVal[8]) {
        someoneWon = tabVal[2]
    }

    // Diag 1
    if (tabVal[0] == tabVal[4] && tabVal[0] == tabVal[8]) {
        someoneWon = tabVal[0]
    }

    // Diag 2
    if (tabVal[2] == tabVal[4] && tabVal[2] == tabVal[6]) {
        someoneWon = tabVal[2]
    }
    return someoneWon
}

function replay() {
    confirm("Play again ?") ? location.reload() : window.location = "https://9gag.com"
}

function initEasyIA() {
    var playOptions = [".x2.y2", ".x1.y3",
        ".x1.y1", ".x1.y2",
        ".x2.y1", ".x2.y3",
        ".x3.y1", ".x3.y2", ".x3.y3"
    ]
    return playOptions
}

function initIntermediateIA() {
    var playOptions = [".x2.y2", ".x1.y3",
        ".x1.y1", ".x1.y2",
        ".x2.y1", ".x2.y3",
        ".x3.y1", ".x3.y2", ".x3.y3"
    ]
    return playOptions
    // TODO: change playOptions for intermediate
}
