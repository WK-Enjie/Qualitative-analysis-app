// --- EQUATION RENDERING UTILITY ---
function updateEquation(latex) {
    const eqDiv = document.getElementById('eqText');
    
    if (!latex || latex === '-') {
        eqDiv.innerHTML = '-';
        return;
    }

    const cleanLatex = latex.replace(/^\$|\$$/g, '');

    if (window.katex) {
        try {
            katex.render(cleanLatex, eqDiv, {
                throwOnError: false,
                displayMode: false
            });
        } catch (e) {
            console.error("KaTeX Error:", e);
            eqDiv.innerHTML = latex;
        }
    } else {
        eqDiv.innerHTML = latex;
    }
}

// --- NAV & TABS ---
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

// --- LAB MODES & STATE ---
let currentMode = 'cation';
let mysterySalt = { cation: null, anion: null };

function setLabMode(mode) {
    currentMode = mode;
    resetLab();
    document.querySelectorAll('.control-group').forEach(cg => cg.style.display = 'none');
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active-mode'));

    document.getElementById(`${mode}-controls`).style.display = 'block';
    document.getElementById(`btn-${mode}`).classList.add('active-mode');
    
    if (mode === 'anion') updateAnionReagents();
}

// --- DYNAMIC ANION REAGENTS (Matched to Syllabus 6092) ---
function updateAnionReagents() {
    resetLab();
    const anion = document.getElementById('anionSelect').value;
    const container = document.getElementById('anion-reagent-container');
    
    const reagentMap = {
        'co3': `<button onclick="runTest('acid')">Add dilute acid</button>`,
        'cl': `<button onclick="runTest('ag_test')">Acidify with dilute HNO₃, then add aqueous AgNO₃</button>`,
        'i': `<button onclick="runTest('ag_test')">Acidify with dilute HNO₃, then add aqueous AgNO₃</button>`,
        'no3': `<button onclick="runTest('nitrate_test')">Add aqueous NaOH, then Al foil; warm carefully</button>`,
        'so4': `<button onclick="runTest('ba_test')">Acidify with dilute HNO₃, then add aqueous Ba(NO₃)₂</button>`
    };
    container.innerHTML = reagentMap[anion] || '';
}

// --- REACTIONS DATABASE (Phrasing precisely matched to Page 30 of Syllabus) ---
// Note: Syllabus states "formulae of complex ions are not required", but they are kept here for enrichment.
const reactions = {
    // CATIONS
    'nh4': {
        'naoh_few': { obs: 'Ammonia produced on warming.', class: 'bubbles clear', eq: '$\\text{NH}_4^+(\\text{aq}) + \\text{OH}^-(\\text{aq}) \\rightarrow \\text{NH}_3(\\text{g}) + \\text{H}_2\\text{O}(\\text{l})$', paperStart: 'paper-red', paperEnd: 'paper-blue', paperText: 'Turns Blue' },
        'naoh_excess': { obs: 'Ammonia produced on warming.', class: 'bubbles clear', eq: '-' },
        'nh3_few': { obs: '– (No visible reaction)', class: 'clear', eq: '-' },
        'nh3_excess': { obs: '– (No visible reaction)', class: 'clear', eq: '-' }
    },
    'zn': {
        'naoh_few': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Zn}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Zn(OH)}_2(\\text{s})$' },
        'naoh_excess': { obs: 'White ppt., soluble in excess giving a colourless solution.', class: 'clear', eq: '$\\text{Zn(OH)}_2(\\text{s}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow [\\text{Zn(OH)}_4]^{2-}(\\text{aq})$' },
        'nh3_few': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Zn}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Zn(OH)}_2(\\text{s})$' },
        'nh3_excess': { obs: 'White ppt., soluble in excess giving a colourless solution.', class: 'clear', eq: '$\\text{Zn(OH)}_2(\\text{s}) + 4\\text{NH}_3(\\text{aq}) \\rightarrow [\\text{Zn(NH}_3)_4]^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq})$' }
    },
    'al': {
        'naoh_few': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Al}^{3+}(\\text{aq}) + 3\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Al(OH)}_3(\\text{s})$' },
        'naoh_excess': { obs: 'White ppt., soluble in excess giving a colourless solution.', class: 'clear', eq: '$\\text{Al(OH)}_3(\\text{s}) + \\text{OH}^-(\\text{aq}) \\rightarrow [\\text{Al(OH)}_4]^-(\\text{aq})$' },
        'nh3_few': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Al}^{3+}(\\text{aq}) + 3\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Al(OH)}_3(\\text{s})$' },
        'nh3_excess': { obs: 'White ppt., insoluble in excess.', class: 'ppt-white', eq: '-' }
    },
    'ca': {
        'naoh_few': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Ca}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Ca(OH)}_2(\\text{s})$' },
        'naoh_excess': { obs: 'White ppt., insoluble in excess.', class: 'ppt-white', eq: '-' },
        'nh3_few': { obs: 'No ppt.', class: 'clear', eq: '-' },
        'nh3_excess': { obs: 'No ppt.', class: 'clear', eq: '-' }
    },
    'cu': {
        'naoh_few': { obs: 'Light blue ppt.', class: 'ppt-blue', eq: '$\\text{Cu}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Cu(OH)}_2(\\text{s})$' },
        'naoh_excess': { obs: 'Light blue ppt., insoluble in excess.', class: 'ppt-blue', eq: '-' },
        'nh3_few': { obs: 'Light blue ppt.', class: 'ppt-blue', eq: '$\\text{Cu}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Cu(OH)}_2(\\text{s})$' },
        'nh3_excess': { obs: 'Light blue ppt., soluble in excess giving a dark blue solution.', class: 'deep-blue', eq: '$\\text{Cu(OH)}_2(\\text{s}) + 4\\text{NH}_3(\\text{aq}) \\rightarrow [\\text{Cu(NH}_3)_4]^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq})$' }
    },
    'fe2': {
        'naoh_few': { obs: 'Green ppt.', class: 'ppt-green', eq: '$\\text{Fe}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Fe(OH)}_2(\\text{s})$' },
        'naoh_excess': { obs: 'Green ppt., insoluble in excess.', class: 'ppt-green', eq: '-' },
        'nh3_few': { obs: 'Green ppt.', class: 'ppt-green', eq: '$\\text{Fe}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Fe(OH)}_2(\\text{s})$' },
        'nh3_excess': { obs: 'Green ppt., insoluble in excess.', class: 'ppt-green', eq: '-' }
    },
    'fe3': {
        'naoh_few': { obs: 'Red-brown ppt.', class: 'ppt-red', eq: '$\\text{Fe}^{3+}(\\text{aq}) + 3\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Fe(OH)}_3(\\text{s})$' },
        'naoh_excess': { obs: 'Red-brown ppt., insoluble in excess.', class: 'ppt-red', eq: '-' },
        'nh3_few': { obs: 'Red-brown ppt.', class: 'ppt-red', eq: '$\\text{Fe}^{3+}(\\text{aq}) + 3\\text{OH}^-(\\text{aq}) \\rightarrow \\text{Fe(OH)}_3(\\text{s})$' },
        'nh3_excess': { obs: 'Red-brown ppt., insoluble in excess.', class: 'ppt-red', eq: '-' }
    },

    // ANIONS
    'co3': {
        'acid': { obs: 'Effervescence, carbon dioxide produced.', class: 'bubbles clear', eq: '$\\text{CO}_3^{2-}(\\text{aq}) + 2\\text{H}^+(\\text{aq}) \\rightarrow \\text{CO}_2(\\text{g}) + \\text{H}_2\\text{O}(\\text{l})$' }
    },
    'cl': {
        'ag_test': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Ag}^+(\\text{aq}) + \\text{Cl}^-(\\text{aq}) \\rightarrow \\text{AgCl}(\\text{s})$' }
    },
    'i': {
        'ag_test': { obs: 'Yellow ppt.', class: 'ppt-yellow', eq: '$\\text{Ag}^+(\\text{aq}) + \\text{I}^-(\\text{aq}) \\rightarrow \\text{AgI}(\\text{s})$' }
    },
    'no3': {
        'nitrate_test': { obs: 'Ammonia produced.', class: 'bubbles clear', eq: '$8\\text{Al}(\\text{s}) + 3\\text{NO}_3^-(\\text{aq}) + 5\\text{OH}^-(\\text{aq}) + 18\\text{H}_2\\text{O}(\\text{l}) \\rightarrow 8[\\text{Al(OH)}_4]^-(\\text{aq}) + 3\\text{NH}_3(\\text{g})$', paperStart: 'paper-red', paperEnd: 'paper-blue', paperText: 'Turns Blue' }
    },
    'so4': {
        'ba_test': { obs: 'White ppt.', class: 'ppt-white', eq: '$\\text{Ba}^{2+}(\\text{aq}) + \\text{SO}_4^{2-}(\\text{aq}) \\rightarrow \\text{BaSO}_4(\\text{s})$' }
    }
};

function runTest(reagent, isMystery = false) {
    let ionToTest;

    if (isMystery) {
        if (!mysterySalt.cation) return alert("Please generate a mystery salt first!");
        const isCationReagent = ['naoh_few', 'naoh_excess', 'nh3_few', 'nh3_excess'].includes(reagent);
        ionToTest = isCationReagent ? mysterySalt.cation : mysterySalt.anion;
    } else {
        ionToTest = currentMode === 'cation' ? document.getElementById('cationSelect').value : document.getElementById('anionSelect').value;
    }

    const res = (reactions[ionToTest] && reactions[ionToTest][reagent]) ? reactions[ionToTest][reagent] : null;

    const chem = document.getElementById('chemical');
    const paperContainer = document.getElementById('litmusPaperContainer');
    const paper = document.getElementById('litmusPaper');
    
    document.getElementById('splint').style.display = 'none';

    if (res) {
        document.getElementById('obsText').innerText = res.obs;
        updateEquation(res.eq);
        chem.className = 'chemical ' + res.class;

        if (res.paperStart && res.paperEnd) {
            paperContainer.style.display = 'block';
            paper.className = `litmus ${res.paperStart}`;
            paper.innerText = "Damp Litmus";
            setTimeout(() => {
                paper.className = `litmus ${res.paperEnd}`;
                paper.innerText = res.paperText;
            }, 300);
        } else {
            paperContainer.style.display = 'none';
        }
    } else {
        document.getElementById('obsText').innerText = "– (No visible reaction)";
        updateEquation("-");
        chem.className = 'chemical clear';
        paperContainer.style.display = 'none';
    }
}

// --- GAS TESTING ---
const gasTests = {
    'nh3': { obs: "Turns damp red litmus paper blue.", paperStart: 'paper-red', paperEnd: 'paper-blue', paperText: 'Turns Blue', chemClass: 'clear' },
    'co2': { obs: "Gives white ppt. with limewater (ppt. dissolves with excess CO₂).", paperStart: null, chemClass: 'milky bubbles', eq: "$\\text{Ca(OH)}_2(\\text{aq}) + \\text{CO}_2(\\text{g}) \\rightarrow \\text{CaCO}_3(\\text{s}) + \\text{H}_2\\text{O}(\\text{l})$" },
    'cl2': { obs: "Bleaches damp litmus paper.", paperStart: 'paper-blue', paperEnd: 'paper-bleached', paperText: 'Bleached (White)', chemClass: 'clear bubbles' },
    'h2': { obs: "'Pops' with a lighted splint.", paperStart: null, chemClass: 'clear bubbles', splintStart: 'splint-lighted', splintEnd: 'splint-pop', eq: "$2\\text{H}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{H}_2\\text{O}(\\text{l})$" },
    'o2': { obs: "Relights a glowing splint.", paperStart: null, chemClass: 'clear bubbles', splintStart: 'splint-glowing', splintEnd: 'splint-lighted' },
    'so2': { obs: "Turns aqueous acidified potassium manganate(VII) from purple to colourless.", paperStart: null, chemClass: 'clear bubbles', eq: "$\\text{MnO}_4^-(\\text{aq}) + 8\\text{H}^+(\\text{aq}) + 5\\text{e}^- \\rightarrow \\text{Mn}^{2+}(\\text{aq}) + 4\\text{H}_2\\text{O}(\\text{l})$" }
};

function runGasTest() {
    resetLab();
    const gas = document.getElementById('gasSelect').value;
    const test = gasTests[gas];

    document.getElementById('obsText').innerText = test.obs;
    updateEquation(test.eq || "-");

    const chem = document.getElementById('chemical');
    const paperContainer = document.getElementById('litmusPaperContainer');
    const paper = document.getElementById('litmusPaper');
    const splint = document.getElementById('splint');

    if(gas === 'so2') {
        chem.className = 'chemical purple bubbles';
        setTimeout(() => chem.className = 'chemical clear bubbles', 1000);
    } else {
        chem.className = 'chemical ' + test.chemClass;
    }

    if(test.paperStart) {
        paperContainer.style.display = 'block';
        paper.className = `litmus ${test.paperStart}`;
        paper.innerText = "Damp Litmus";
        setTimeout(() => {
            paper.className = `litmus ${test.paperEnd}`;
            paper.innerText = test.paperText;
        }, 800);
    } else {
        paperContainer.style.display = 'none';
    }

    if(test.splintStart) {
        splint.style.display = 'block';
        splint.className = `splint ${test.splintStart}`;
        setTimeout(() => {
            splint.className = `splint ${test.splintEnd}`;
        }, 1000);
    } else {
        splint.style.display = 'none';
    }
}

// --- MYSTERY SALT MODE ---
const cations = ['nh4', 'zn', 'al', 'ca', 'cu', 'fe2', 'fe3'];
const anions = ['co3', 'cl', 'i', 'no3', 'so4'];

function generateMystery() {
    mysterySalt.cation = cations[Math.floor(Math.random() * cations.length)];
    mysterySalt.anion = anions[Math.floor(Math.random() * anions.length)];
    document.getElementById('mystery-status').innerText = "Status: New salt ready for testing! (Solution is clear)";
    
    document.getElementById('guessCation').value = "";
    document.getElementById('guessAnion').value = "";
    resetLab();
}

function checkMystery() {
    if (!mysterySalt.cation) return alert("Generate a salt first!");

    const guessC = document.getElementById('guessCation').value;
    const guessA = document.getElementById('guessAnion').value;

    if(guessC === mysterySalt.cation && guessA === mysterySalt.anion) {
        document.getElementById('mystery-status').innerText = "🎉 Correct! You identified the salt perfectly.";
        document.getElementById('mystery-status').style.color = "green";
    } else {
        document.getElementById('mystery-status').innerText = "❌ Incorrect guess. Keep testing!";
        document.getElementById('mystery-status').style.color = "red";
    }
}

function resetLab() {
    document.getElementById('obsText').innerText = "Ready for testing...";
    updateEquation("-");
    document.getElementById('chemical').className = 'chemical clear';
    document.getElementById('litmusPaperContainer').style.display = 'none';
    document.getElementById('splint').style.display = 'none';
}

// --- QUIZ LOGIC (Adapted for 6092 Syllabus) ---
const questions = [
    { q: "A solution produces a <b>white ppt.</b> with aqueous sodium hydroxide that is <b>insoluble in excess</b>. It produces <b>no ppt.</b> with aqueous ammonia. Identify the cation.", options: ["Al³⁺", "Zn²⁺", "Ca²⁺", "Fe²⁺"], a: 2, hint: "Calcium produces a white ppt. with NaOH (insoluble in excess) and no ppt. with NH₃." },
    { q: "In the test for <b>Nitrate (NO₃⁻) ions</b>, what is the chemical role of the aluminium foil?", options: ["As a catalyst", "As a reducing agent", "To neutralize the NaOH", "To react with Ammonia"], a: 1, hint: "According to the syllabus, the test is 'by reduction with aluminium in aqueous sodium hydroxide'. The Al acts as a reducing agent." },
    { q: "An unknown gas bleaches damp litmus paper. What is the gas?", options: ["Sulfur Dioxide", "Ammonia", "Carbon Dioxide", "Chlorine"], a: 3, hint: "Only Chlorine has a bleaching effect on litmus paper in the syllabus." }
];

let currentQ = 0;
let score = 0;

function loadQuiz() {
    const q = questions[currentQ];
    document.getElementById('questionArea').innerHTML = `<h3>Challenge ${currentQ + 1} of ${questions.length}</h3><p>${q.q}</p>`;
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('nextBtn').style.display = 'none';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerHTML = opt;
        btn.onclick = () => checkAns(i);
        container.appendChild(btn);
    });
}

function checkAns(idx) {
    const q = questions[currentQ];
    const feedback = document.getElementById('feedbackText');
    if(idx === q.a) { 
        score++; 
        feedback.innerText = "Correct! ✅"; 
        feedback.style.color = "green"; 
    } else { 
        feedback.innerHTML = `Incorrect. <br><small>${q.hint || "Review the notes for qualitative analysis."}</small>`; 
        feedback.style.color = "#c0392b"; 
    }
    document.getElementById('scoreVal').innerText = score;
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.querySelectorAll('.options-grid button').forEach(b => b.disabled = true);
}

function nextQuestion() {
    currentQ++;
    if(currentQ < questions.length) loadQuiz();
    else {
        document.getElementById('questionArea').innerHTML = `<h2>Quiz Complete!</h2><p>Final Score: ${score}/${questions.length}</p>`;
        document.getElementById('optionsContainer').innerHTML = '';
        document.getElementById('nextBtn').style.display = 'none';
    }
}

window.onload = () => { loadQuiz(); };