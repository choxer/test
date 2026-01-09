// Wörter und ihre Silben
const words = [
    { word: 'SCHULE', syllables: ['SCHU', 'LE'] },
    { word: 'HAUS', syllables: ['HAU', 'S'] },
    { word: 'APFEL', syllables: ['AP', 'FEL'] },
    { word: 'BAUM', syllables: ['BAU', 'M'] },
    { word: 'FENSTER', syllables: ['FEN', 'STER'] },
    { word: 'EIMER', syllables: ['EI', 'MER'] },
    { word: 'BUTTER', syllables: ['BUT', 'TER'] },
    { word: 'BLUME', syllables: ['BLU', 'ME'] },
    { word: 'TIGER', syllables: ['TI', 'GER'] },
    { word: 'FARBEN', syllables: ['FAR', 'BEN'] }
];

let currentWordIndex = 0;
let selectedSyllables = [];

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadWord();
    setupEventListeners();
});

// Word laden
function loadWord() {
    selectedSyllables = [];
    const currentWord = words[currentWordIndex];
    
    // Titel aktualisieren
    document.getElementById('taskTitle').textContent = 'Aufgabe: Bilde das Wort "' + currentWord.word + '"';
    
    // Silben shuffeln und anzeigen
    const shuffledSyllables = [...currentWord.syllables].sort(() => Math.random() - 0.5);
    const container = document.getElementById('availableSyllables');
    container.innerHTML = '';
    
    shuffledSyllables.forEach((syllable, index) => {
        const div = document.createElement('div');
        div.className = 'syllable';
        div.textContent = syllable;
        div.draggable = true;
        div.dataset.syllable = syllable;
        div.dataset.originalIndex = index;
        
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
        
        container.appendChild(div);
    });
    
    // Progress aktualisieren
    document.getElementById('currentTask').textContent = currentWordIndex + 1;
    document.getElementById('totalTasks').textContent = words.length;
    updateProgressBar();
    
    // Feedback und Buttons zurücksetzen
    clearFeedback();
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'inline-block';
}

// Event Listeners einrichten
function setupEventListeners() {
    const dropZone = document.getElementById('answerDropZone');
    const selectedSyllablesDiv = document.getElementById('selectedSyllables');
    
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);
    dropZone.addEventListener('dragleave', dragLeave);
    
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('resetBtn').addEventListener('click', resetAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextWord);
}

// Drag & Drop Funktionen
function dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('syllable', this.dataset.syllable);
    this.classList.add('dragging');
}

function dragEnd(e) {
    this.classList.remove('dragging');
    document.getElementById('answerDropZone').classList.remove('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function dragLeave(e) {
    if (e.target === this) {
        this.classList.remove('drag-over');
    }
}

function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const syllable = e.dataTransfer.getData('syllable');
    selectedSyllables.push(syllable);
    renderSelectedSyllables();
    
    this.classList.remove('drag-over');
}

// Ausgewählte Silben rendern
function renderSelectedSyllables() {
    const container = document.getElementById('selectedSyllables');
    container.innerHTML = '';
    
    selectedSyllables.forEach((syllable, index) => {
        const div = document.createElement('div');
        div.className = 'selected-syllable';
        div.innerHTML = syllable + ' <span class="remove">✕</span>';
        div.style.cursor = 'pointer';
        
        div.addEventListener('click', function() {
            selectedSyllables.splice(index, 1);
            renderSelectedSyllables();
        });
        
        container.appendChild(div);
    });
}

// Antwort überprüfen
function checkAnswer() {
    const currentWord = words[currentWordIndex];
    const userAnswer = selectedSyllables.join('');
    const feedback = document.getElementById('feedback');
    
    if (userAnswer === currentWord.word) {
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct', 'show');
        feedback.textContent = '🎉 Richtig! "' + currentWord.word + '" ist korrekt!';
        
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        
        // Silben deaktivieren
        document.querySelectorAll('.syllable').forEach(el => {
            el.style.pointerEvents = 'none';
            el.style.opacity = '0.5';
        });
    } else {
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect', 'show');
        feedback.textContent = '❌ Das ist nicht richtig. Versuche es nochmal!';
    }
}

// Antwort zurücksetzen
function resetAnswer() {
    selectedSyllables = [];
    renderSelectedSyllables();
    clearFeedback();
    
    // Silben wieder aktivieren
    document.querySelectorAll('.syllable').forEach(el => {
        el.style.pointerEvents = 'auto';
        el.style.opacity = '1';
    });
}

// Feedback löschen
function clearFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('show', 'correct', 'incorrect');
    feedback.textContent = '';
}

// Nächstes Wort
function nextWord() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        loadWord();
    } else {
        // Alle Aufgaben abgeschlossen
        showCompletion();
    }
}

// Alle Aufgaben abgeschlossen
function showCompletion() {
    const feedback = document.getElementById('feedback');
    feedback.classList.add('correct', 'show');
    feedback.textContent = '🏆 Herzlichen Glückwunsch! Du hast alle Aufgaben gelöst!';
    
    document.getElementById('checkBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').textContent = '🔄 Von vorne anfangen';
    
    document.getElementById('nextBtn').onclick = function() {
        currentWordIndex = 0;
        loadWord();
        document.getElementById('nextBtn').textContent = 'Nächste Aufgabe →';
        document.getElementById('nextBtn').onclick = nextWord;
    };
}

// Progress Bar aktualisieren
function updateProgressBar() {
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}