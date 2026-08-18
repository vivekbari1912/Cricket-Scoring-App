const runsEl = document.getElementById('runs');
const wicketsEl = document.getElementById('wickets');
const oversEl = document.getElementById('overs');
const summaryTextEl = document.getElementById('summaryText');
const resetBtn = document.getElementById('resetBtn');
const wicketBtn = document.getElementById('wicketBtn');
const dotBallBtn = document.getElementById('dotBallBtn');
const undoBtn = document.getElementById('undoBtn');

const state = {
  runs: 0,
  wickets: 0,
  balls: 0,
  history: []
};

function getOversText() {
  const overs = Math.floor(state.balls / 6);
  const balls = state.balls % 6;
  return `${overs}.${balls}`;
}

function updateDisplay() {
  runsEl.textContent = state.runs;
  wicketsEl.textContent = state.wickets;
  oversEl.textContent = getOversText();
  summaryTextEl.textContent = `${state.runs}/${state.wickets} in ${getOversText()} overs`;
}

function pushHistory(label) {
  state.history.push({
    runs: state.runs,
    wickets: state.wickets,
    balls: state.balls,
    label
  });
}

function addRuns(points, label = 'runs') {
  state.runs += points;
  state.balls += 1;
  pushHistory(label);
  updateDisplay();
}

function addExtra(points, label) {
  state.runs += points;
  pushHistory(label);
  updateDisplay();
}

function addWicket() {
  state.wickets += 1;
  state.balls += 1;
  pushHistory('wicket');
  updateDisplay();
}

function addDotBall() {
  state.balls += 1;
  pushHistory('dot ball');
  updateDisplay();
}

function undoLastAction() {
  const last = state.history.pop();
  if (!last) return;

  state.runs = last.runs;
  state.wickets = last.wickets;
  state.balls = last.balls;
  updateDisplay();
}

function resetGame() {
  state.runs = 0;
  state.wickets = 0;
  state.balls = 0;
  state.history = [];
  updateDisplay();
}

document.querySelectorAll('.run-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const points = Number(button.dataset.points);
    addRuns(points, `${points} runs`);
  });
});

document.querySelectorAll('.extra-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const points = Number(button.dataset.points);
    const label = button.dataset.extra || 'extra';
    addExtra(points, label);
  });
});

wicketBtn.addEventListener('click', addWicket);
dotBallBtn.addEventListener('click', addDotBall);
undoBtn.addEventListener('click', undoLastAction);
resetBtn.addEventListener('click', resetGame);

updateDisplay();
