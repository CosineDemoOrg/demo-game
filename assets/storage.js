// LocalStorage and name input helpers

function getNamesFromInputs(count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    const el = document.getElementById(`playerName_${i}`);
    const v = (el?.value || '').trim();
    arr.push(v || getDefaultName(i));
  }
  return arr;
}

function renderNameInputs(count, presetNames = []) {
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'name-field';
    const lab = document.createElement('label');
    lab.setAttribute('for', `playerName_${i}`);
    lab.textContent = `Player ${i} Name`;
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.id = `playerName_${i}`;
    inp.placeholder = getDefaultName(i);
    inp.value = (presetNames[i - 1] && presetNames[i - 1].trim()) || '';
    wrap.appendChild(lab);
    wrap.appendChild(inp);
    frag.appendChild(wrap);
  }
  playerNamesContainer.innerHTML = '';
  playerNamesContainer.appendChild(frag);
}

function savePlayerPrefs() {
  localStorage.setItem(LS_PLAYER_COUNT, String(playerCountInput.value));
  const namesArr = getNamesFromInputs(parseInt(playerCountInput.value, 10) || 4);
  localStorage.setItem(LS_PLAYER_NAMES, JSON.stringify(namesArr));
}

function loadPlayerPrefs() {
  const pc = localStorage.getItem(LS_PLAYER_COUNT);
  if (pc) playerCountInput.value = pc;
  const pn = localStorage.getItem(LS_PLAYER_NAMES);
  if (pn === null) return [];
  try {
    const arr = JSON.parse(pn);
    if (Array.isArray(arr)) return arr;
  } catch (e) {}
  return pn.split('\n').map(s => s.trim()).filter(Boolean);
}