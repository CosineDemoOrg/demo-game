// Core game logic

function startGame() {
  playersCount = clamp(parseInt(playerCountInput.value, 10) || 4, 2, 12);

  let namesArr = getNamesFromInputs(playersCount);
  namesByIndex = {};
  for (let i = 1; i <= playersCount; i++) {
    namesByIndex[i] = namesArr[i - 1] || getDefaultName(i);
  }

  savePlayerPrefs();

  perPokeIncrement = clamp(parseInt(sliderIncrementBottom.value, 10), 1, 20);
  currentProb = clamp(parseInt(sliderInitialBottom.value, 10), 0, 100);
  sliderInitialBottom.value = currentProb;
  sliderIncrementBottom.value = perPokeIncrement;

  turnOrder = Array.from({length: playersCount}, (_, i) => i + 1);
  shuffle(turnOrder);
  currentTurnIndex = 0;
  hasPokedThisTurn = false;
  lullabyUsed = {};
  for (let i = 1; i <= playersCount; i++) lullabyUsed[i] = false;
  gameActive = true;

  totalPokes = 0;
  updatePokeBadge();

  setSlidersEnabled(false);

  updateProbDisplay();
  updateTurnListUI();
  updateCurrentPlayerUI();
  setActionsEnabled(true);
  clearLog();
  showGamePanel();
  gameOverMsg.style.display = 'none';

  logArea.style.display = 'none';
  btnToggleLog.textContent = "Show Log";
  showPokeBadge();
  if (restlessMsg) {
    restlessMsg.style.display = 'none';
    if (restlessTimeoutId) clearTimeout(restlessTimeoutId);
  }
}

function advanceTurn() {
  hasPokedThisTurn = false;
  currentTurnIndex = (currentTurnIndex + 1) % turnOrder.length;
  updateTurnListUI();
  updateCurrentPlayerUI();
  setActionsEnabled(true);
}

function pokeBear() {
  if (!gameActive) return;
  totalPokes++;
  updatePokeBadge();
  const pNum = turnOrder[currentTurnIndex];
  const name = namesByIndex[pNum] || getDefaultName(pNum);
  const wake = Math.random() * 100 < currentProb;
  logAction(`${name} poked: ${wake ? 'the bear woke up!' : 'survived.'} Chance was ${formatPercent(currentProb)}`);
  if (wake) {
    logAction(`${name} was eaten! Game Over.`);
    showGameOver(pNum);
    updateProbDisplay();
    updateTurnListUI();
    updateCurrentPlayerUI();
    return;
  }
  hasPokedThisTurn = true;
  btnEndTurn.disabled = false;

  currentProb = clamp(currentProb + perPokeIncrement, 0, 100);
  updateProbDisplay();
  logAction(`Chance now ${formatPercent(currentProb)}`);

  const sentence = restlessBear[Math.floor(Math.random() * restlessBear.length)];
  const isLogHidden = window.getComputedStyle(logArea).display === 'none';
  if (isLogHidden) {
    showRestlessMessage(sentence);
  }
  updateTurnListUI();
  updateCurrentPlayerUI();
  setActionsEnabled(true);
}

function endTurn() {
  if (!hasPokedThisTurn || !gameActive) return;
  const pNum = turnOrder[currentTurnIndex];
  const name = namesByIndex[pNum] || getDefaultName(pNum);
  logAction(`${name} ended turn.`);
  advanceTurn();
}

function useLullaby() {
  if (!gameActive) return;
  const pNum = turnOrder[currentTurnIndex];
  if (lullabyUsed[pNum]) return;
  lullabyUsed[pNum] = true;
  const name = namesByIndex[pNum] || getDefaultName(pNum);
  const before = currentProb;
  currentProb = clamp(currentProb - 10, 0, 100);
  updateProbDisplay();
  logAction(`${name} used Lullaby: chance now ${formatPercent(currentProb)}`);
  updateTurnListUI();
  logAction(`${name} ended turn.`);
  advanceTurn();
}

function doResetGame() {
  setSlidersEnabled(true);
  sliderInitialBottom.value = "1";
  sliderIncrementBottom.value = "1";
  updateSliderDisplays();
  clearLog();
  showSetupPanel();
  gameActive = false;
  hasPokedThisTurn = false;
  turnOrder = [];
  lullabyUsed = {};
  currentTurnIndex = 0;
  currentPlayerLabel.textContent = '';
  updateProbDisplay(parseInt(sliderInitialBottom.value, 10));
  totalPokes = 0;
  updatePokeBadge();
  showPokeBadge();
  logArea.style.display = 'none';
  btnToggleLog.textContent = "Show Log";
  if (restlessMsg) {
    restlessMsg.style.display = 'none';
    if (restlessTimeoutId) clearTimeout(restlessTimeoutId);
  }
}