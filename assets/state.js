// Game state and constants

const LS_PLAYER_COUNT = 'ptb_playerCount';
const LS_PLAYER_NAMES = 'ptb_playerNames';

let playersCount = 4;
let turnOrder = [];
let currentTurnIndex = 0;
let currentProb = 1;
let perPokeIncrement = 1;
let hasPokedThisTurn = false;
let lullabyUsed = [];
let gameActive = false;
let totalPokes = 0;
let namesByIndex = {};
let restlessTimeoutId = null;

function getDefaultName(i) {
  return `Player ${i}`;
}