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
            e: 'Precipitate remains insoluble.' 
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
            e: 'Precipitate remains insoluble.' 
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
            e: 'Precipitate remains insoluble.' 
        },
        'nh3_few': { 
            t: 'Green precipitate formed.', 
            c: 'ppt-green', 
            e: 'Fe<sup>2+</sup>(aq) + 2OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>2</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Green precipitate remains (Insoluble).', 
            c: 'ppt-green excess', 
            e: 'Precipitate remains insoluble.' 
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
            e: 'Precipitate remains insoluble.' 
        },
        'nh3_few': { 
            t: 'Red-brown precipitate formed.', 
            c: 'ppt-red', 
            e: 'Fe<sup>3+</sup>(aq) + 3OH<sup>-</sup>(aq) &rarr; Fe(OH)<sub>3</sub>(s)' 
        },
        'nh3_excess': { 
            t: 'Red-brown precipitate remains (Insoluble).', 
            c: 'ppt-red excess', 
            e: 'Precipitate remains insoluble.' 
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

// --- QUIZ DATA ---
const questions = [
    // --- DIRECT QUESTIONS ---
    { 
        q: "Which gas turns damp red litmus paper blue?", 
        options: ["Chlorine", "Ammonia", "Oxygen", "Hydrogen"], 
        a: 1 
    },
    { 
        q: "Which ion forms a white precipitate with acidified Silver Nitrate?", 
        options: ["Chloride", "Sulfate", "Nitrate", "Carbonate"], 
        a: 0 
    },
    { 
        q: "What is observed when Aqueous Sodium Hydroxide is added to Iron(II) ions?", 
        options: ["White ppt", "Red-brown ppt", "Green ppt", "Blue ppt"], 
        a: 2 
    },
    { 
        q: "Which cation produces Ammonia gas when warmed with Aqueous NaOH and Aluminium foil?", 
        options: ["Ammonium", "Nitrate", "Zinc", "Calcium"], 
        a: 1 
    },
    
    // --- FLOWCHART / DEDUCTION QUESTIONS ---
    { 
        q: "<strong>Flowchart Step 1:</strong> Add Aqueous NaOH &rarr; White precipitate formed.<br><strong>Flowchart Step 2:</strong> Add Excess Aqueous NaOH &rarr; Precipitate dissolves.<br><strong>Flowchart Step 3:</strong> Add Aqueous Ammonia &rarr; White precipitate formed.<br><strong>Flowchart Step 4:</strong> Add Excess Aqueous Ammonia &rarr; Precipitate remains insoluble.<br><br>Identify the Cation.", 
        options: ["Zinc (Zn²⁺)", "Aluminium (Al³⁺)", "Calcium (Ca²⁺)", "Lead (Pb²⁺)"], 
        a: 1 // Aluminium is insoluble in excess ammonia
    },
    { 
        q: "<strong>Flowchart Step 1:</strong> Add Aqueous NaOH &rarr; White precipitate formed.<br><strong>Flowchart Step 2:</strong> Add Excess Aqueous NaOH &rarr; Precipitate dissolves.<br><strong>Flowchart Step 3:</strong> Add Aqueous Ammonia &rarr; White precipitate formed.<br><strong>Flowchart Step 4:</strong> Add Excess Aqueous Ammonia &rarr; Precipitate dissolves.<br><br>Identify the Cation.", 
        options: ["Zinc (Zn²⁺)", "Aluminium (Al³⁺)", "Calcium (Ca²⁺)", "Copper (Cu²⁺)"], 
        a: 0 // Zinc is soluble in both
    },
    { 
        q: "<strong>Mystery Solution X:</strong><br>1. Acidify with Nitric Acid.<br>2. Add Barium Nitrate.<br>3. Result: White precipitate formed.<br><br>What anion is present?", 
        options: ["Chloride", "Sulfate", "Nitrate", "Carbonate"], 
        a: 1 
    },
    { 
        q: "<strong>Flowchart Step 1:</strong> Add Aqueous NaOH &rarr; Light blue precipitate.<br><strong>Flowchart Step 2:</strong> Add Excess Aqueous Ammonia &rarr; Precipitate dissolves to form a Deep Blue Solution.<br><br>Identify the Cation.", 
        options: ["Iron(II)", "Copper(II)", "Zinc", "Calcium"], 
        a: 1 
    },
    { 
        q: "<strong>Mystery Cation Y:</strong><br>Forms a White precipitate with Aqueous Sodium Hydroxide, but NO precipitate with Aqueous Ammonia.<br><br>Identify Y.", 
        options: ["Zinc", "Aluminium", "Calcium", "Ammonium"], 
        a: 2 // Calcium
    },
    {
        q: "<strong>Gas Test Flowchart:</strong><br>1. Insert lighted splint into gas jar.<br>2. Result: 'Pop' sound heard.<br><br>Identify the gas.",
        options: ["Hydrogen", "Oxygen", "Carbon Dioxide", "Ammonia"],
        a: 0
    }
];

let qIdx = 0;
let score = 0;

function loadQuestion() {
    // End of Quiz
    if(qIdx >= questions.length) {
        document.getElementById('questionText').innerText = "Quiz Completed!";
        document.getElementById('optionsContainer').innerHTML = `
            <div style="margin-bottom:20px;">You scored ${score} out of ${questions.length}</div>
            <button onclick="location.reload()" style="background:#27ae60; color:white; border:none; padding:15px; cursor:pointer; border-radius:5px;">Restart Quiz</button>`;
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('feedbackText').innerText = "";
        return;
    }

    const q = questions[qIdx];
    // Use innerHTML to render the <br> tags in flowchart questions
    document.getElementById('questionText').innerHTML = "Question " + (qIdx+1) + ":<br><br>" + q.q;
    
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
        document.getElementById('feedbackText').innerHTML = "Incorrect. <br>The correct answer was: " + questions[qIdx].options[corr];
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