const animatedContent = document.getElementById('animated-content');
const animatedContainer = document.getElementById('animated-container')
const tags = animatedContent.children;
const typeDelay = 75; // milliseconds between new letters appearing

let lastTimestamp = null;
let currentLetterIndex = 0
let tagIndex = 0;
let currentTag = null;
let tagTextContent = null;
let currentContainer = null;
let skipAnimation = false;

function animateText(timestamp) {
  let done = tagIndex >= tags.length;
  if (done || skipAnimation) {
    skipAnimation = false;
    return;
  }
  
  // get the next tag
  if (currentTag == null) {
    currentTag = tags[tagIndex];
    tagTextContent = currentTag.textContent;
    currentLetterIndex = 0;
    currentContainer = document.createElement(currentTag.tagName);
    let attributes = currentTag.attributes;
    for (const kvp of attributes) {
      currentContainer.setAttribute(kvp.nodeName, kvp.nodeValue);
    }
    animatedContainer.appendChild(currentContainer);
  }

  let endOfLine = currentLetterIndex > tagTextContent.length - 1;
  if (endOfLine) {
    // remove "cursor" from end of line
    currentContainer.textContent = tagTextContent;

    // clear currentTag for next line
    currentTag = null;
    tagIndex += 1;
    requestAnimationFrame(animateText);
    return;
  }

  if (lastTimestamp == null) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;

  if (delta >= typeDelay) {
    currentContainer.textContent = tagTextContent.substring(0, currentLetterIndex + 1) + '\u2588';
    currentLetterIndex++;
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(animateText);
}

function skip() {
  animatedContainer.classList.add('hidden');
  animatedContent.classList.remove('hidden');
  skipAnimation = true;
}

window.addEventListener('keydown', skip);
window.addEventListener('click', skip);

requestAnimationFrame(animateText);