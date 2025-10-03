// UI helpers and rendering

function updateSliderDisplays() {
  labelInitialBottom.textContent = formatPercent(sliderInitialBottom.value);
  labelIncrementBottom.textContent = `+${Math.round(sliderIncrementBottom.value)}%`;
}

function setSlidersEnabled(enabled) {
  sliderInitialBottom.disabled = !enabled;
  sliderIncrementBottom.disabled = !enabled;
}

function showSetupPanel() {
  setupPanel.style.display = '';
  gamePanel.style.display = 'none';
  gameOverMsg.style.display = 'none';
}

function showGamePanel() {
  setupPanel.style.display = 'none';
  gamePanel.style.display = '';
  gameOverMsg.style.display = 'none';
}

function updateProbDisplay(val) {
  let probVal = typeof val === 'number' ? val : currentProb;
  probDisplay.textContent = riskLabel(probVal);
  labelInitialBottom.textContent = formatPercent(sliderInitialBottom.value);
  labelIncrementBottom.textContent = `+${sliderIncrementBottom.value}%`;
}

function updateTurnListUI() {
  turnList.innerHTML = '';
  for (let i = 0; i < turnOrder.length; i++) {
    const pNum = turnOrder[i];
    const li = document.createElement('li');
    li.textContent = namesByIndex[pNum] || getDefaultName(pNum);
    if (i === currentTurnIndex && gameActive) {
      li.classList.add('current');
    }
    const badge = document.createElement('span');
    if (lullabyUsed[pNum]) {
      badge.className = 'lullaby-badge';
      badge.innerHTML = `<i>🎶</i> Lullaby used`;
      li.appendChild(badge);
    }
    turnList.appendChild(li);
  }
}

function updateCurrentPlayerUI() {
  if (!gameActive) {
    currentPlayerLabel.textContent = '';
    return;
  }
  const pNum = turnOrder[currentTurnIndex];
  currentPlayerLabel.textContent = `Turn: ${namesByIndex[pNum] || getDefaultName(pNum)}`;
}

function setActionsEnabled(enabled) {
  btnPoke.disabled = !enabled;
  btnLullaby.disabled = !enabled ||
    lullabyUsed[turnOrder[currentTurnIndex]];
  btnEndTurn.disabled = !enabled || !hasPokedThisTurn;
}

function showGameOver(loserPlayerNum) {
  gameActive = false;
  setActionsEnabled(false);
  const loserName = namesByIndex[loserPlayerNum] || getDefaultName(loserPlayerNum);
  gameOverMsg.innerHTML = `<b>The bear woke and ate ${loserName}!<br>Take a drink! 🐻🍺</b><br><button id="btnGameOverNew" class="primary-btn" style="margin-top:1em;">New Game</button>`;
  gameOverMsg.style.display = '';
  const btnOver = gameOverMsg.querySelector('#btnGameOverNew');
  if (btnOver) {
    btnOver.onclick = doResetGame;
    btnOver.focus();
  }
}

function logAction(msg) {
  const div = document.createElement('div');
  div.className = 'action-log-entry';
  div.textContent = msg;
  logArea.appendChild(div);
  scrollLogToBottom();
}

function clearLog() {
  logArea.innerHTML = '';
}

function updatePokeBadge() {
  pokeCountBadge.textContent = `Pokes: ${totalPokes}`;
}

function showPokeBadge() {
  pokeCountBadge.style.display = '';
}

function hidePokeBadge() {
  pokeCountBadge.style.display = 'none';
}

function showRestlessMessage(text) {
  if (!restlessMsg) return;
  restlessMsg.textContent = text;
  restlessMsg.style.display = '';
}