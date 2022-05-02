'use strict'

const pixel = document.querySelectorAll('.pixel')
const newGame = document.querySelector('#newGame')
const newRound = document.querySelector('#newRound')
const bot = document.querySelector('#bot')
const gameResult = document.querySelector('.result')
const turn = document.querySelector('#turn')

let currentTurn = ['X', 'O']
let endGame = false
let player = true
turn.innerHTML = currentTurn[0]

let counter_X = 0
let counter_O = 0
const crosser = document.querySelector('#crosser')
const zeros = document.querySelector('#zeros')


pixel.forEach(item => {
    item.addEventListener('click', e => {
        bot.closest('div').hidden = true

        if (!endGame && player) {
            if (e.target.innerHTML === '') {
                e.target.innerHTML = currentTurn[0]
                currentTurn.reverse()
                turn.innerHTML = currentTurn[0]

                if (bot.checked)
                    player = false

                checkField()
            }
        }
        
        if (bot.checked) {
            if (!endGame && !player) {
                setTimeout(() => {
                    botMove()
                    player = true
                    checkField()
                }, 400);
            }
        }
    })
})


function checkField() {
    const allComb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i = 0; i < allComb.length; i++) {
        if(pixel[allComb[i][0]].innerHTML === 'X' && pixel[allComb[i][1]].innerHTML === 'X' && pixel[allComb[i][2]].innerHTML === 'X'){
         
            win('X', allComb[i])
            break

        } else if (pixel[allComb[i][0]].innerHTML === 'O' && pixel[allComb[i][1]].innerHTML === 'O' && pixel[allComb[i][2]].innerHTML === 'O') {
            
            win('O', allComb[i])
            break

        }
        
    }

    let check
    for (let i = 0; i < pixel.length; i++) {
        if (pixel[i].innerHTML === '') {
            check = false
            break
        }

        check = true
    }

    if (check && !endGame) {
        endGame = true
        gameResult.innerHTML = 'Friendship won!!!'
    }
}


function win(team, args) {
    endGame = true

    if (team === 'X') {
        crosser.innerHTML = ++counter_X
        gameResult.innerHTML = 'Team <span>crosser</span> won!!!'
    } else {
        zeros.innerHTML = ++counter_O
        gameResult.innerHTML = 'Team <span>zeros</span> won!!!'
    }

    args.forEach(index => {
        pixel[index].classList.add('red')
    })
}

function botMove() {
    let index
    
    do {
        index = myRandom(pixel.length)
    } while (pixel[index].innerHTML !== '');

    pixel[index].innerHTML = currentTurn[0]
    currentTurn.reverse()
    turn.innerHTML = currentTurn[0]
}

function myRandom(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

newRound.addEventListener('click', () => {
    clear()
})

newGame.addEventListener('click', () => {
    clear()
    bot.closest('div').hidden = false
    bot.checked = false
    crosser.innerHTML = counter_X = 0
    zeros.innerHTML = counter_O = 0
})

function clear() {
    pixel.forEach(item => {
        item.innerHTML = ''
        item.classList.remove('red')
    })

    endGame = false
    player = true
    gameResult.innerHTML = ''
    currentTurn = ['X', 'O']
    turn.innerHTML = currentTurn[0]
}

