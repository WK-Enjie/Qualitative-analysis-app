// --- Game State ---
let questions = [];
let currentIdx = 0;
let score = 0;
let nianHP = 100;
let combo = 0;
let maxCombo = 0;

// Timing Variables
let questionStartTime;
let timerInterval;
const TIME_LIMIT = 15000; // 15 seconds per question for calculation (bar goes down)

// --- DOM Elements ---
const screens = {
    login: document.getElementById('login-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const pinInput = document.getElementById('pin-input');
const startBtn = document.getElementById('start-btn');
const errorMsg = document.getElementById('error-msg');
const mainContainer = document.getElementById('main-container');

// Game UI
const nianElem = document.getElementById('nian');
const healthFill = document.getElementById('health-bar-fill');
const projectile = document.getElementById('projectile');
const timerBar = document.getElementById('timer-bar');
const comboBox = document.getElementById('combo-box');
const comboCount = document.getElementById('combo-count');
const damageTextContainer = document.getElementById('damage-text-container');
const particlesContainer = document.getElementById('particles-container');

const qText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const progressInd = document.getElementById('progress-indicator');
const scoreInd = document.getElementById('score-indicator');

// --- Event Listeners ---
startBtn.addEventListener('click', attemptLogin);
document.getElementById('restart-btn').addEventListener('click', () => location.reload());
pinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });

// --- Core Functions ---

async function attemptLogin() {
    const pin = pinInput.value.trim();
    if (!pin) return;

    const filePath = `worksheets/${pin}.json`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("File not found");
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            questions = data;
            startGame();
        } else {
            showError("Invalid JSON.");
        }
    } catch (err) {
        showError("Worksheet not found. Check the PIN.");
    }
}

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
}

function startGame() {
    screens.login.classList.remove('active');
    screens.game.classList.add('active');
    screens.game.classList.remove('hidden');

    currentIdx = 0;
    score = 0;
    nianHP = 100;
    combo = 0;
    updateHealthUI();
    loadQuestion();
}

function loadQuestion() {
    if (currentIdx >= questions.length) {
        endGame();
        return;
    }

    const q = questions[currentIdx];
    qText.textContent = q.question;
    progressInd.textContent = `Q ${currentIdx + 1}/${questions.length}`;
    scoreInd.textContent = `Score: ${score}`;
    
    // Reset Timer
    clearInterval(timerInterval);
    questionStartTime = Date.now();
    timerBar.style.width = '100%';
    
    // Start Timer Visual
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - questionStartTime;
        const remainingPct = Math.max(0, 100 - (elapsed / TIME_LIMIT * 100));
        timerBar.style.width = `${remainingPct}%`;
        
        // Color change based on time
        if(remainingPct < 30) timerBar.style.background = 'red';
        else if(remainingPct < 60) timerBar.style.background = 'orange';
        else timerBar.style.background = 'var(--gold)';
        
    }, 100);

    // Render Options
    optionsGrid.innerHTML = '';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(btn, opt, q.answer);
        optionsGrid.appendChild(btn);
    });
}

function handleAnswer(btn, selected, correct) {
    clearInterval(timerInterval); // Stop timer immediately
    const allBtns = document.querySelectorAll('.opt-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        handleCorrect();
    } else {
        btn.classList.add('wrong');
        allBtns.forEach(b => {
            if(b.textContent === correct) b.classList.add('correct');
        });
        handleWrong();
    }
}

function handleCorrect() {
    combo++;
    if(combo > maxCombo) maxCombo = combo;
    
    // Update Combo UI
    comboBox.classList.remove('hidden');
    comboCount.textContent = `x${combo}`;
    
    // Calculate Damage & Score based on Speed and Combo
    const timeTaken = Date.now() - questionStartTime;
    
    // Base Damage per question (ensure we kill Nian if all correct)
    let baseDamage = 100 / questions.length;
    
    // Speed Multiplier (Fast = 1.5x, Slow = 0.8x)
    let speedMult = 1;
    let isCrit = false;
    
    if(timeTaken < 3000) { speedMult = 1.5; isCrit = true; } // Under 3 sec
    else if(timeTaken > 10000) { speedMult = 0.8; } // Over 10 sec

    // Combo Multiplier
    let comboMult = 1 + (combo * 0.1); // +10% per combo

    // Final Calc
    let totalDamage = baseDamage * speedMult * comboMult;
    let points = Math.floor(100 * speedMult * comboMult);
    score += points;

    performAttack(totalDamage, isCrit);
}

function handleWrong() {
    combo = 0;
    comboBox.classList.add('hidden');
    setTimeout(nextQuestion, 1500);
}

function performAttack(damage, isCrit) {
    // 1. Firecracker Animation
    projectile.classList.remove('hidden');
    projectile.classList.add('throw-anim');

    // 2. Impact
    setTimeout(() => {
        projectile.classList.add('hidden');
        projectile.classList.remove('throw-anim');
        
        // Spawn Particles
        spawnExplosion(nianElem.getBoundingClientRect());
        
        // Show Damage Text
        showFloatingText(Math.floor(damage), isCrit);

        // Shake Nian
        nianElem.classList.add('hit-anim');
        
        // Crit Shake Screen
        if(isCrit) mainContainer.classList.add('screen-shake');

        // Apply Damage
        nianHP = Math.max(0, nianHP - damage);
        updateHealthUI();

        // Cleanup
        setTimeout(() => {
            nianElem.classList.remove('hit-anim');
            mainContainer.classList.remove('screen-shake');
            nextQuestion();
        }, 500);

    }, 400); // Matches throw animation duration
}

function spawnExplosion(rect) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        // Random direction
        const x = (Math.random() - 0.5) * 200 + 'px';
        const y = (Math.random() - 0.5) * 200 + 'px';
        const color = Math.random() > 0.5 ? 'red' : 'gold';
        
        p.style.setProperty('--x', x);
        p.style.setProperty('--y', y);
        p.style.background = color;
        p.style.left = centerX + 'px';
        p.style.top = centerY + 'px';

        particlesContainer.appendChild(p);
        
        // Remove particle after anim
        setTimeout(() => p.remove(), 800);
    }
}

function showFloatingText(amount, isCrit) {
    const div = document.createElement('div');
    div.className = isCrit ? 'damage-text crit' : 'damage-text';
    div.textContent = isCrit ? `CRIT! -${amount}` : `-${amount}`;
    damageTextContainer.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function updateHealthUI() {
    healthFill.style.width = `${nianHP}%`;
    if(nianHP < 30) healthFill.style.background = '#ff0000';
}

function nextQuestion() {
    currentIdx++;
    loadQuestion();
}

function endGame() {
    screens.game.classList.remove('active');
    screens.game.classList.add('hidden');
    screens.end.classList.add('active');
    screens.end.classList.remove('hidden');

    const title = document.getElementById('end-title');
    const msg = document.getElementById('end-message');
    document.getElementById('final-score').textContent = score;
    document.getElementById('max-combo').textContent = maxCombo;

    if (nianHP <= 5) {
        title.textContent = "VICTORY!";
        title.style.color = "#D90429";
        msg.textContent = "You defeated the Nian with your speed and accuracy!";
    } else {
        title.textContent = "GAME OVER";
        title.style.color = "#555";
        msg.textContent = "The Nian is still standing. Be faster next time!";
    }
}