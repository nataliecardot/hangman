const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'javascript', 'magic'];

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
function updateWrongLettersEl() {}

// Show notification
function showNotification() {}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  // There are keycodes (actually now keyCode is deprecated; replaced with property `code`) on event parameter that's passed in. Letters go from a, 65, to z, 90
  if (e.code >= 65 && e.code <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        // Update word element to show new letter
        displayWord();
      }
      // If letter is correct but already used
    } else {
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
});

displayWord();
