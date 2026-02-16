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

// Reaction Data
// t: Text, c: CSS class, e: Ionic Equation (Simple)
const reactions = {
    'zn': {
        'naoh_few': { 
            t: 'White precipitate formed.', 
            c: 'ppt-white', 
            e: 'Zn<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Zn(OH)<sub>2</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'Precipitate dissolves to form a colorless solution.', 
            c: 'clear excess', 
            e: 'Precipitate dissolves (No precipitation equation).' 
        },
        'nh3_few': { 
            t: 'White precipitate formed.', 
            c: 'ppt-white', 
            e: 'Zn<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Zn(OH)<sub>2</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Precipitate dissolves to form a colorless solution.', 
            c: 'clear excess', 
            e: 'Precipitate dissolves (No precipitation equation).' 
        }
    },
    'al': {
        'naoh_few': { 
            t: 'White precipitate formed.', 
            c: 'ppt-white', 
            e: 'Al<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Al(OH)<sub>3</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'Precipitate dissolves to form a colorless solution.', 
            c: 'clear excess', 
            e: 'Precipitate dissolves (No precipitation equation).' 
        },
        'nh3_few': { 
            t: 'White precipitate formed.', 
            c: 'ppt-white', 
            e: 'Al<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Al(OH)<sub>3</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'White precipitate remains (Insoluble).', 
            c: 'ppt-white excess', 
            e: 'Al<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Al(OH)<sub>3</sub>(s)' 
        }
    },
    'ca': {
        'naoh_few': { 
            t: 'White precipitate formed.', 
            c: 'ppt-white', 
            e: 'Ca<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Ca(OH)<sub>2</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'White precipitate remains (Insoluble).', 
            c: 'ppt-white excess', 
            e: 'Ca<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Ca(OH)<sub>2</sub>(s)' 
        },
        'nh3_few': { 
            t: 'No precipitate formed (or very slight).', 
            c: 'clear', 
            e: 'No observable reaction.' 
        },
        'nh3_excess': { 
            t: 'No precipitate formed.', 
            c: 'clear excess', 
            e: 'No observable reaction.' 
        }
    },
    'cu': {
        'naoh_few': { 
            t: 'Light blue precipitate formed.', 
            c: 'ppt-blue', 
            e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'Light blue precipitate remains (Insoluble).', 
            c: 'ppt-blue excess', 
            e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' 
        },
        'nh3_few': { 
            t: 'Light blue precipitate formed.', 
            c: 'ppt-blue', 
            e: 'Cu<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Cu(OH)<sub>2</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Precipitate dissolves to form a deep blue solution.', 
            c: 'sol-deep-blue', 
            e: 'Precipitate dissolves (No precipitation equation).' 
        }
    },
    'fe2': {
        'naoh_few': { 
            t: 'Green precipitate formed.', 
            c: 'ppt-green', 
            e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'Green precipitate remains (Insoluble).', 
            c: 'ppt-green excess', 
            e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' 
        },
        'nh3_few': { 
            t: 'Green precipitate formed.', 
            c: 'ppt-green', 
            e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Green precipitate remains (Insoluble).', 
            c: 'ppt-green excess', 
            e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' 
        }
    },
    'fe3': {
        'naoh_few': { 
            t: 'Red-brown precipitate formed.', 
            c: 'ppt-red', 
            e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' 
        },
        'naoh_excess': { 
            t: 'Red-brown precipitate remains (Insoluble).', 
            c: 'ppt-red excess', 
            e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' 
        },
        'nh3_few': { 
            t: 'Red-brown precipitate formed.', 
            c: 'ppt-red', 
            e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Red-brown precipitate remains (Insoluble).', 
            c: 'ppt-red excess', 
            e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' 
        }
    },
    'nh4': {
        'naoh_few': { 
            t: 'Ammonia gas produced on warming.', 
            c: 'clear', 
            e: 'NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq) &rarr; NH<sub>3</sub>(g) + H<sub>2</sub>O(l)' 
        },
        'naoh_excess': { 
            t: 'Ammonia gas produced on warming.', 
            c: 'clear excess', 
            e: 'NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq) &rarr; NH<sub>3</sub>(g) + H<sub>2</sub>O(l)' 
        },
        'nh3_few': { 
            t: 'No visible reaction.', 
            c: 'clear', 
            e: '-' 
        },
        'nh3_excess': { 
            t: 'No visible reaction.', 
            c: 'clear excess', 
            e: '-' 
        }
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

// --- QUIZ ---
const questions = [
    { q: "Which cation forms a white precipitate with Aqueous Sodium Hydroxide that is soluble in excess?", options: ["Calcium", "Zinc", "Iron(II)", "Copper(II)"], a: 1 },
    { q: "Which gas bleaches damp litmus paper?", options: ["Ammonia", "Chlorine", "Oxygen", "Hydrogen"], a: 1 },
    { q: "To test for Chloride ions, you must acidify with Nitric Acid and add...", options: ["Aqueous Sodium Hydroxide", "Silver Nitrate", "Barium Nitrate", "Aqueous Ammonia"], a: 1 },
    { q: "A deep blue solution is formed when excess Aqueous Ammonia is added to...", options: ["Iron(II)", "Copper(II)", "Zinc", "Calcium"], a: 1 },
    { q: "Which ion forms a green precipitate with Aqueous Sodium Hydroxide that is insoluble in excess?", options: ["Iron(II)", "Iron(III)", "Copper(II)", "Zinc"], a: 0 }
];

let qIdx = 0;
let score = 0;

function loadQuestion() {
    if(qIdx >= questions.length) {
        document.getElementById('questionText').innerText = "Quiz Finished!";
        document.getElementById('optionsContainer').innerHTML = `<button onclick="location.reload()" style="background:#27ae60">Restart Quiz</button>`;
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('feedbackText').innerText = `Final Score: ${score}/${questions.length}`;
        return;
    }
    const q = questions[qIdx];
    document.getElementById('questionText').innerText = "Question " + (qIdx+1) + ": " + q.q;
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
        document.getElementById('feedbackText').innerText = "Correct! ✅";
        document.getElementById('feedbackText').style.color = "green";
        btn.style.background = "#27ae60";
    } else {
        document.getElementById('feedbackText').innerText = "Incorrect. The correct answer was: " + questions[qIdx].options[corr];
        document.getElementById('feedbackText').style.color = "#c0392b";
        btn.style.background = "#c0392b";
    }
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    qIdx++;
    loadQuestion();
}

window.onload = loadQuestion;