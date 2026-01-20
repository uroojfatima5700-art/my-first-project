let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let isDark = true;

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        addToHistory(display.value + ' = ' + result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function addToHistory(entry) {
    let li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
    // Keep only last 5 entries
    while (historyList.children.length > 5) {
        historyList.removeChild(historyList.firstChild);
    }
}

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    document.body.classList.toggle('dark', isDark);
    document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀️';
}