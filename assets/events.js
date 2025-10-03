// Event wiring and initialization

startBtn.addEventListener('click', () => {
  startGame();
});

btnPoke.addEventListener('click', () => {
  if (!gameActive) return;
  pokeBear();
});

btnEndTurn.addEventListener('click', () => {
  if (!gameActive || !hasPokedThisTurn) return;
  endTurn();
});

btnLullaby.addEventListener('click', () => {
  if (!gameActive) return;
  useLullaby();
});

btnNewGame.addEventListener('click', doResetGame);

btnToggleLog.addEventListener('click', () => {
  if (logArea.style.display === 'none') {
    logArea.style.display = '';
    btnToggleLog.textContent = "Hide Log";
    hidePokeBadge();
    if (restlessMsg) {
      restlessMsg.style.display = 'none';
    }
  } else {
    logArea.style.display = 'none';
    btnToggleLog.textContent = "Show Log";
    showPokeBadge();
  }
});

btnToggleSettings.addEventListener('click', () => {
  if (sliderControls.style.display === 'none' || sliderControls.classList.contains('hidden')) {
    sliderControls.style.display = '';
    btnToggleSettings.textContent = "Hide Settings";
  } else {
    sliderControls.style.display = 'none';
    btnToggleSettings.textContent = "Settings";
  }
});

sliderInitialBottom.addEventListener('input', () => {
  updateSliderDisplays();
  updateProbDisplay(parseInt(sliderInitialBottom.value, 10));
});
sliderIncrementBottom.addEventListener('input', () => {
  updateSliderDisplays();
});

playerCountInput.addEventListener('input', () => {
  let val = parseInt(playerCountInput.value, 10);
  if (isNaN(val) || val < 2) {
    playerCountInput.value = 2;
  } else if (val > 12) {
    playerCountInput.value = 12;
  }
  const oldCount = playerNamesContainer.querySelectorAll('.name-field input[type="text"]').length;
  const oldNames = [];
  for (let i = 1; i <= oldCount; i++) {
    const el = document.getElementById(`playerName_${i}`);
    oldNames.push((el?.value || '').trim());
  }
  const newCount = parseInt(playerCountInput.value, 10) || 4;
  renderNameInputs(newCount, oldNames);
  savePlayerPrefs();
});

playerNamesContainer.addEventListener('input', function (e) {
  if (e.target && e.target.matches('input[type="text"]')) {
    savePlayerPrefs();
  }
});

function init() {
  const savedNames = loadPlayerPrefs();
  const count = parseInt(playerCountInput.value, 10) || 4;
  renderNameInputs(count, savedNames);

  updateSliderDisplays();
  setSlidersEnabled(true);
  showSetupPanel();
  clearLog();
  gameOverMsg.style.display = 'none';
  logArea.style.display = 'none';
  btnToggleLog.textContent = "Show Log";
  showPokeBadge();
  totalPokes = 0;
  updatePokeBadge();
  sliderControls.style.display = 'none';
  btnToggleSettings.textContent = "Settings";
  if (restlessMsg) {
    restlessMsg.textContent = '';
    restlessMsg.style.display = 'none';
  }
  if (document.getElementById('btnGameOverNew')) {
    document.getElementById('btnGameOverNew').onclick = null;
  }
  updateProbDisplay(parseInt(sliderInitialBottom.value, 10));
}

window.addEventListener('DOMContentLoaded', init);

playerCountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    startGame();
  }
});

btnPoke.addEventListener('dblclick', (e) => e.preventDefault());
btnEndTurn.addEventListener('dblclick', (e) => e.preventDefault());
btnLullaby.addEventListener('dblclick', (e) => e.preventDefault());