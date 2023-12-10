const state = {
 score: {
  playerScore: 0,
  computerScore: 0,
  scoreBox: document.getElementById('score_pints'),
 },
 cardSprites: {
  avatar: document.getElementById('card-image'),
  name: document.getElementById('card-name'),
  type: document.getElementById('card-type'),
 },
 fieldCards: {
  player: document.getElementById('player-field-card'),
  computer: document.getElementById('computer-field-card'),
 },
 action: {
  button: document.getElementById('next-duel'),
 },
}
const playerSides = {
    player1: 'player-field-card',
    computer:""
}

const pathImages = './src/assets/icons/'

const cardData = [
 {
  id: 0,
  name: 'Dark Magician',
  type: 'Rock',
  img: `${pathImages}magician.Png`,
  WinOf: [1],
  LoseOf: [2],
 },
 {
  id: 1,
  name: 'Blue Eyes White Dragon',
  type: 'Paper',
  img: `${pathImages}dragon.Png`,
  WinOf: [2],
  LoseOf: [0],
    },
  {
  id: 2,
  name: 'Exodio',
  type: 'Scissors',
  img: `${pathImages}exodio.Png`,
  WinOf: [0],
  LoseOf: [1],
 },

]

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0;i < cardNumbers;i++){
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function initt() {
 drawCards(5, "playerSides.player1")
 drawCards(5, 'playerSides.computer')
}

init()
