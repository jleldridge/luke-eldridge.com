const animatedContent = document.getElementById('animated-content');
const animatedContainer = document.getElementById('animated-container');
const outputContainer = document.getElementById('output-container');
const inputLine = document.getElementById('input-line');
const inputLineText = document.getElementById('input-line-text');
const tags = animatedContent.children;
const typeDelay = 50; // milliseconds between new letters appearing

let lastTimestamp = null;
let currentLetterIndex = 0
let tagIndex = 0;
let currentTag = null;
let tagTextContent = null;
let currentContainer = null;
let skipAnimation = false;
let hoveredCommand = "";

function animateInitPageContent(timestamp) {
  let done = tagIndex >= tags.length;
  if (done || skipAnimation) {
    skipAnimation = false;
    animatedContainer.classList.add('hidden');
    animatedContent.classList.remove('hidden');
    inputLine.classList.remove('hidden');
    inputLineText.focus();
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
    requestAnimationFrame(animateInitPageContent);
    return;
  }

  if (lastTimestamp == null) lastTimestamp = timestamp;
  let delta = timestamp - lastTimestamp;

  if (delta >= typeDelay) {
    currentContainer.textContent = tagTextContent.substring(0, currentLetterIndex + 1) + '\u2588';
    currentLetterIndex++;
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(animateInitPageContent);
}

function skip() {
  skipAnimation = true;
}

function logCommand(commandText) {
  let logLine = document.createElement('div');
  let outputLine = document.createElement('div');
  logLine.textContent = "> " + commandText;
  outputLine.textContent = `Running ${commandText}`;

  outputContainer.appendChild(logLine);
  outputContainer.appendChild(outputLine);
}

function prepCommand(commandText) {
  hoveredCommand = commandText;
  requestAnimationFrame((timestamp) => this.animateCommand(timestamp, null, 0, hoveredCommand));
}

function animateCommand(timestamp, lastTimestamp, index, processingCommand) {
  if (hoveredCommand == "" || hoveredCommand != processingCommand) {
    inputLineText.textContent = "";
    return;
  }

  let done = index >= hoveredCommand.length;
  if (done) return;

  if (lastTimestamp == null) lastTimestamp = timestamp;

  delta = timestamp - lastTimestamp;
  if (delta >= typeDelay) {
    inputLineText.textContent += hoveredCommand[index];
    index++;
    lastTimestamp = timestamp;
  }

  requestAnimationFrame((newTimestamp) => this.animateCommand(newTimestamp, lastTimestamp, index, processingCommand));
}

window.addEventListener('keydown', skip);
window.addEventListener('click', skip);

requestAnimationFrame(animateInitPageContent);