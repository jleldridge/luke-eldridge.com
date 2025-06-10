header = document.getElementById('header');
desiredText = document.getElementById('hidden-header').textContent;
let headerContainer = header.getElementsByTagName('h1')[0];

lastTimestamp = null;
typeDelay = 100; // milliseconds between new letters appearing
currentLetterIndex = 0

function animateText(timestamp) {
  let done = currentLetterIndex > desiredText.length - 1;
  if (done) return;

  if (lastTimestamp == null) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;

  if (delta >= typeDelay) {
    headerContainer.textContent = desiredText.substring(0, currentLetterIndex + 1) + '\u2588';
    currentLetterIndex++;
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(animateText);
}

requestAnimationFrame(animateText);