const state = {
 score: {
  playerScore: 0,
  computerScore: 0,
  scoreBox: document.getElementById('score_points'),
 },
 cardSprite: {
  avatar: document.getElementById('card-image'),
  name: document.getElementById('card-name'),
  type: document.getElementById('card-type'),
 },
 fieldCards: {
  player: document.getElementById('player-field-card'),
  computer: document.getElementById('computer-field-card'),
 },
 button: document.getElementById('next-duel'),
}

const player = {
 player1: 'player-cards',
 computer: 'computer-cards',
}

const cardData = [
 {
  id: 0,
  name: 'Papel',
  type: 'Papel',
  img: '../src/assets/icons/papel.png',

  WinOf: [1],
  LoseOf: [2],
 },
 {
  id: 1,
  name: 'Pedra',
  type: 'Pedra',
  img: '../src/assets/icons/pedra.png',
  WinOf: [2],
  LoseOf: [0],
 },
 {
  id: 2,
  name: 'Tesoura',
  type: 'Tesoura',
  img: '../src/assets/icons/tesoura.png',
  WinOf: [0],
  LoseOf: [1],
 },
]

let fixedCardIndices = [0, 1, 2]

async function getRandomCardId() {
 if (fixedCardIndices.length === 0) {

  fixedCardIndices = [0, 1, 2]
 }

 return fixedCardIndices.pop()
}

async function setCardsField(cardId) {
 await RemoveAllCardImages()

 state.fieldCards.player.style.display = 'block'
 state.fieldCards.computer.style.display = 'block'
 state.fieldCards.player.src = cardData[cardId].img


 const computerCardId = await getRandomCardId()
 state.fieldCards.computer.src = cardData[computerCardId].img

 let duelResults = await checkDuelResults(cardId, computerCardId)

 await updateScore()
 await drawButton(duelResults)
}



async function checkDuelResults(playerCardId, computerCardId) {
 let playerCard = cardData[playerCardId]
 let duelResults = 'Empate'


 if (playerCard.WinOf.includes(computerCardId)) {
  duelResults = 'Ganhou'
  await playAudio('win')
  state.score.playerScore++
 }


 if (playerCard.LoseOf.includes(computerCardId)) {
  duelResults = 'Perdeu'
  await playAudio('lose')
  state.score.computerScore++
 }

 return duelResults
}

async function createCardImage(randomIdCard, fieldSide) {
 const cardImage = document.createElement('img')
 cardImage.setAttribute('height', '100px')
 cardImage.setAttribute('src', './src/assets/icons/jokepo.png')
 cardImage.setAttribute('data-id', randomIdCard)
 cardImage.classList.add('card')

 if (fieldSide === player.player1) {
  cardImage.addEventListener('click', () => {
   setCardsField(cardImage.getAttribute('data-id'))
  })

  cardImage.addEventListener('mouseover', () => {
   drawSelectCard(randomIdCard)
  })

     cardImage.setAttribute('src', './src/assets/icons/jokepo.png')
     

 }

 return cardImage
}

async function RemoveAllCardImages() {
 let cards = document.querySelector('.card-box.framed#computer-cards')
 let imgElements = cards.querySelectorAll('img')
 imgElements.forEach((img) => img.remove())

 cards = document.querySelector('.card-box.framed#player-cards')
 imgElements = cards.querySelectorAll('img')
 imgElements.forEach((img) => img.remove())
}

async function drawCards(cardNumbers, fieldSide) {
 for (let i = 0; i < cardNumbers; i++) {
  const randomIdCard = await getRandomCardId()
  const cardImage = await createCardImage(randomIdCard, fieldSide)

  document.getElementById(fieldSide).appendChild(cardImage)
 }
}

function drawSelectCard(index) {
 state.cardSprite.avatar.src = cardData[index].img
 state.cardSprite.type.innerText = 'Attribute: ' + cardData[index].type
}

async function drawButton(text) {
 state.button.innerText = text
 state.button.style.display = 'block'
}

async function resetDuel() {
 state.cardSprite.avatar.src = ''
 state.button.style.display = 'none'

 state.fieldCards.player.style.display = 'none'
 state.fieldCards.computer.style.display = 'none'

 drawCards(3, player.player1)
 drawCards(3, player.computer)
}

async function playAudio(status) {
 const audio = new Audio(`../src/assets/audios/${status}.wav`)
 audio.play()
}

async function updateScore() {
 state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

function init() {
 drawCards(3, player.player1)
 drawCards(3, player.computer)

 const bgm = document.getElementById('bgm')
    bgm.play()
    
    
}

init()
