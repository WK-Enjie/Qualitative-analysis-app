// --- NAV ---
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(id).classList.add('active-section');
}

function openTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active-content'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(id).classList.add('active-content');
    event.currentTarget.classList.add('active-tab');
}

// --- VIRTUAL LAB ---
const chemical = document.getElementById('chemical');
const obsText = document.getElementById('obsText');
const eqText = document.getElementById('eqText');

const reactions = {
    'zn': {
        'naoh_few': { t: 'White precipitate formed.', c: 'ppt-white', e: 'Zn<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Zn(OH)<sub>2</sub>(s)' },
        'naoh_excess': { t: 'Precipitate dissolves (colorless solution).', c: 'clear excess', e: 'Precipitate dissolves (No precipitation equation).' },
        'nh3_few': { t: 'White precipitate formed.', c: 'ppt-white', e: 'Zn<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Zn(OH)<sub>2</sub>(s)' },
        'nh3_excess': { t: 'Precipitate dissolves (colorless solution).', c: 'clear excess', e: 'Precipitate dissolves (No precipitation equation).' }
    },
    'al': {
        'naoh_few': { t: 'White precipitate formed.', c: 'ppt-white', e: 'Al<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Al(OH)<sub>3</sub>(s)' },
        'naoh_excess': { t: 'Precipitate dissolves (colorless solution).', c: 'clear excess', e: 'Precipitate dissolves (No precipitation equation).' },
        'nh3_few': { t: 'White precipitate formed.', c: 'ppt-white', e: 'Al<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Al(OH)<sub>3</sub>(s)' },
        'nh3_excess': { t: 'White precipitate remains (Insoluble).', c: 'ppt-white excess', e: 'Precipitate remains insoluble.' }
    },
    'ca': {
        'naoh_few': { t: 'White precipitate formed.', c: 'ppt-white', e: 'Ca<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Ca(OH)<sub>2</sub>(s)' },
        'naoh_excess': { t: 'White precipitate remains (Insoluble).', c: 'ppt-white excess', e: 'Precipitate remains insoluble.' },
        'nh3_few': { t: 'No precipitate formed.', c: 'clear', e: 'No observable reaction.' },
        'nh3_excess': { t: 'No precipitate formed.', c: 'clear excess', e: 'No observable reaction.' }
    },
    'cu': {
        'naoh_few': { t: 'Light blue precipitate formed.', c: 'ppt-blue', e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' },
        'naoh_excess': { t: 'Light blue precipitate remains.', c: 'ppt-blue excess', e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' },
        'nh3_few': { t: 'Light blue precipitate formed.', c: 'ppt-blue', e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' },
        'nh3_excess': { t: 'Deep blue solution formed.', c: 'sol-deep-blue', e: 'Precipitate dissolves (No precipitation equation).' }
    },
    'fe2': {
        'naoh_few': { t: 'Green precipitate formed.', c: 'ppt-green', e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' },
        'naoh_excess': { t: 'Green precipitate remains.', c: 'ppt-green excess', e: 'Precipitate remains insoluble.' },
        'nh3_few': { t: 'Green precipitate formed.', c: 'ppt-green', e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' },
        'nh3_excess': { t: 'Green precipitate remains.', c: 'ppt-green excess', e: 'Precipitate remains insoluble.' }
    },
    'fe3': {
        'naoh_few': { t: 'Red-brown precipitate formed.', c: 'ppt-red', e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' },
        'naoh_excess': { t: 'Red-brown precipitate remains.', c: 'ppt-red excess', e: 'Precipitate remains insoluble.' },
        'nh3_few': { t: 'Red-brown precipitate formed.', c: 'ppt-red', e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' },
        'nh3_excess': { t: 'Red-brown precipitate remains.', c: 'ppt-red excess', e: 'Precipitate remains insoluble.' }
    },
    'nh4': {
        'naoh_few': { t: 'Ammonia gas produced on warming.', c: 'clear', e: 'NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq) &rarr; NH<sub>3</sub>(g) + H<sub>2</sub>O(l)' },
        'naoh_excess': { t: 'Ammonia gas produced on warming.', c: 'clear excess', e: 'NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq) &rarr; NH<sub>3</sub>(g) + H<sub>2</sub>O(l)' },
        'nh3_few': { t: 'No reaction.', c: 'clear', e: '-' },
        'nh3_excess': { t: 'No reaction.', c: 'clear excess', e: '-' }
    }
};

function runTest(reagent) {
    const ion = document.getElementById('ionSelect').value;
    const res = reactions[ion][reagent];
    if (res) {
        obsText.innerText = res.t;
        eqText.innerHTML = res.e; 
        chemical.className = 'chemical ' + res.c;
    }
}

function resetLab() {
    chemical.className = 'chemical clear';
    chemical.style.height = '25%';
    obsText.innerText = 'Colorless Solution';
    eqText.innerHTML = 'No reaction yet.';
}

// --- QUESTION BANK (Compound Identification) ---
const questionBank = [
    // --- COMPOUND 1: ZINC CHLORIDE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solution P</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test</div>
                        <div class="flow-box">+ Aq. NaOH &rarr; White Ppt (Soluble in excess)</div>
                        <div class="flow-box">+ Aq. Ammonia &rarr; White Ppt (Soluble in excess)</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ Dil. HNO₃</div>
                        <div class="flow-box">+ Silver Nitrate</div>
                        <div class="flow-box flow-result">White Precipitate</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound P.</p>
        `,
        options: ["Zinc Chloride", "Aluminium Chloride", "Calcium Chloride", "Zinc Sulfate"], 
        a: 0 // Zinc Chloride
    },
    // --- COMPOUND 2: IRON(II) SULFATE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solution Q</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test</div>
                        <div class="flow-box">+ Aq. NaOH &rarr; Green Ppt (Insoluble in excess)</div>
                        <div class="flow-box">+ Aq. Ammonia &rarr; Green Ppt (Insoluble in excess)</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ Dil. HNO₃</div>
                        <div class="flow-box">+ Barium Nitrate</div>
                        <div class="flow-box flow-result">White Precipitate</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound Q.</p>
        `,
        options: ["Iron(II) Nitrate", "Iron(III) Sulfate", "Iron(II) Sulfate", "Copper(II) Sulfate"], 
        a: 2 // Iron(II) Sulfate
    },
    // --- COMPOUND 3: ALUMINIUM IODIDE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solution R</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test</div>
                        <div class="flow-box">+ Aq. NaOH &rarr; White Ppt (Soluble in excess)</div>
                        <div class="flow-box">+ Aq. Ammonia &rarr; White Ppt (Insoluble in excess)</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ Dil. HNO₃</div>
                        <div class="flow-box">+ Silver Nitrate</div>
                        <div class="flow-box flow-result">Yellow Precipitate</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound R.</p>
        `,
        options: ["Zinc Iodide", "Aluminium Iodide", "Aluminium Chloride", "Lead Iodide"], 
        a: 1 // Al Iodide
    },
    // --- COMPOUND 4: COPPER(II) CARBONATE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solid S</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test (in soln)</div>
                        <div class="flow-box">+ Aq. Ammonia &rarr; Light Blue Ppt</div>
                        <div class="flow-box">+ Excess Ammonia &rarr; Deep Blue Solution</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ Dilute Acid</div>
                        <div class="flow-box flow-result">Effervescence (Gas turns limewater milky)</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound S.</p>
        `,
        options: ["Copper(II) Sulfate", "Copper(II) Chloride", "Copper(II) Carbonate", "Iron(II) Carbonate"], 
        a: 2 // Copper Carbonate
    },
    // --- COMPOUND 5: CALCIUM NITRATE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solution T</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test</div>
                        <div class="flow-box">+ Aq. NaOH &rarr; White Ppt (Insoluble)</div>
                        <div class="flow-box">+ Aq. Ammonia &rarr; No Precipitate</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ NaOH + Al Foil + Heat</div>
                        <div class="flow-box flow-result">Gas produced turns red litmus blue</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound T.</p>
        `,
        options: ["Calcium Chloride", "Calcium Nitrate", "Zinc Nitrate", "Ammonium Nitrate"], 
        a: 1 // Calcium Nitrate
    },
    // --- COMPOUND 6: AMMONIUM CHLORIDE ---
    { 
        html: `
            <div class="flowchart-container">
                <div class="flow-unknown">Unknown Solution U</div>
                <div class="flow-split-wrapper">
                    <div class="flow-col">
                        <div class="flow-header">Cation Test</div>
                        <div class="flow-box">+ NaOH + Warm</div>
                        <div class="flow-box flow-result">Pungent gas produced</div>
                    </div>
                    <div class="flow-col">
                        <div class="flow-header">Anion Test</div>
                        <div class="flow-box">+ Dil. HNO₃ + AgNO₃</div>
                        <div class="flow-box flow-result">White Precipitate</div>
                    </div>
                </div>
            </div>
            <p>Identify Compound U.</p>
        `,
        options: ["Ammonium Sulfate", "Ammonium Chloride", "Zinc Chloride", "Sodium Chloride"], 
        a: 1 // Ammonium Chloride
    },
    
    // --- TEXT QUESTIONS (General Knowledge) ---
    { q: "Which gas turns damp red litmus paper blue?", options: ["Chlorine", "Ammonia", "Oxygen", "Hydrogen"], a: 1 },
    { q: "Which ion forms a white precipitate with acidified Silver Nitrate?", options: ["Chloride", "Sulfate", "Nitrate", "Carbonate"], a: 0 },
    { q: "What is observed when Aqueous Sodium Hydroxide is added to Iron(III) ions?", options: ["White ppt", "Red-brown ppt", "Green ppt", "Blue ppt"], a: 1 },
    { q: "Which cation produces Ammonia gas when warmed with Aqueous NaOH and Aluminium foil?", options: ["Ammonium", "Nitrate", "Zinc", "Calcium"], a: 1 },
    { q: "Which gas extinguishes a lighted splint with a 'pop' sound?", options: ["Hydrogen", "Oxygen", "Carbon Dioxide", "Ammonia"], a: 0 },
    { q: "Which anion produces carbon dioxide when reacted with dilute acid?", options: ["Chloride", "Carbonate", "Sulfate", "Nitrate"], a: 1 },
    { q: "Which cation forms a precipitate that is soluble in excess Aqueous Ammonia?", options: ["Zinc", "Aluminium", "Iron(II)", "Calcium"], a: 0 },
    { q: "Which gas turns limewater milky?", options: ["Hydrogen", "Ammonia", "Carbon Dioxide", "Chlorine"], a: 2 },
    { q: "To test for Sulfate ions, you add acid followed by...", options: ["Silver Nitrate", "Barium Nitrate", "Sodium Hydroxide", "Ammonia"], a: 1 },
    { q: "Observation: Red-brown precipitate formed with Aqueous Ammonia, insoluble in excess.", options: ["Iron(II)", "Iron(III)", "Copper(II)", "Zinc"], a: 1 },
    { q: "Which gas relights a glowing splint?", options: ["Hydrogen", "Oxygen", "Carbon Dioxide", "Chlorine"], a: 1 },
    { q: "Observation: Green precipitate formed with NaOH, insoluble in excess.", options: ["Iron(II)", "Iron(III)", "Copper(II)", "Chromium"], a: 0 }
];

// --- RANDOM QUIZ LOGIC ---
let currentQuiz = [];
let qIdx = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    qIdx = 0;
    score = 0;
    const shuffled = shuffleArray([...questionBank]);
    currentQuiz = shuffled.slice(0, 6); // Pick 6 random questions
    document.getElementById('totalVal').innerText = currentQuiz.length;
    document.getElementById('scoreVal').innerText = "0";
    loadQuestion();
}

function loadQuestion() {
    if(qIdx >= currentQuiz.length) {
        document.getElementById('questionArea').innerHTML = `<h3>Quiz Completed!</h3>`;
        document.getElementById('optionsContainer').innerHTML = `
            <div style="margin-bottom:20px;">You scored ${score} out of ${currentQuiz.length}</div>
            <button onclick="startQuiz()" style="background:#27ae60; color:white; border:none; padding:15px; cursor:pointer; border-radius:5px;">Restart Quiz</button>`;
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('feedbackText').innerText = "";
        return;
    }

    const q = currentQuiz[qIdx];
    const qArea = document.getElementById('questionArea');
    
    if (q.html) {
        qArea.innerHTML = `<div style="font-weight:bold; margin-bottom:10px;">Question ${qIdx+1}:</div>` + q.html;
    } else {
        qArea.innerHTML = `<div style="font-weight:bold; margin-bottom:10px;">Question ${qIdx+1}:</div><p>${q.q}</p>`;
    }
    
    const opts = document.getElementById('optionsContainer');
    opts.innerHTML = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('nextBtn').style.display = 'none';
    
    q.options.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.innerText = o;
        btn.onclick = () => check(i, q.a, btn);
        opts.appendChild(btn);
    });
}

function check(sel, corr, btn) {
    const all = document.querySelectorAll('.options-grid button');
    all.forEach(b => b.disabled = true);
    
    if(sel === corr) {
        score++;
        document.getElementById('scoreVal').innerText = score;
        document.getElementById('feedbackText').innerHTML = "Correct! ✅";
        document.getElementById('feedbackText').style.color = "green";
        btn.style.background = "#27ae60";
    } else {
        document.getElementById('feedbackText').innerHTML = "Incorrect. <br>The correct answer was: " + currentQuiz[qIdx].options[corr];
        document.getElementById('feedbackText').style.color = "#c0392b";
        btn.style.background = "#c0392b";
    }
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    qIdx++;
    loadQuestion();
}

// Init
window.onload = startQuiz;