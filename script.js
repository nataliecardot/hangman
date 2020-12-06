const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'application',
  'programming',
  'javascript',
  'coding',
  'internet',
  'computer',
  'syntax',
  'refactoring',
  'browser',
  'application',
  'lambda',
  'function',
  'interface',
  'class',
  'object',
  'loop',
  'promise',
  'fetch',
  'library',
  'framework',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You won!';
    popup.style.display = 'flex';
  }
}

// Update wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      // This is needed to hide parts after game restart
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You lost.';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => notification.classList.remove('show'), 2000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  // Note: keyCode now deprecated; replaced with `code`
  // console.log(e.code);
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        // Update word element to show new letter
        displayWord();
      } else {
        // If letter is correct but already used
        showNotification();
      }
      // Letter not in word
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

function gameRestart() {
  // Empty correct and wrong letter arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
}

// Restart game on play button click
playAgainBtn.addEventListener('click', () => {
  gameRestart();
});

// If popup is displayed (won or lost), restart game on enter
window.addEventListener('keydown', (e) => {
  if (e.code == 'Enter') {
    if (popup.style.display == 'flex') {
      gameRestart();
    }
  }
});

displayWord();
