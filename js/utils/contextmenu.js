let hueRotation = 0;
let intervalId;

// Prevent Inspect Element
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};

// Save Palette
function saveSettings() {
    const currentFilter = document.documentElement.style.filter;
    const borderColor = document.querySelector('.img-fluid').style.borderColor;
    localStorage.setItem('filter', currentFilter);
    localStorage.setItem('hueRotation', hueRotation);
    localStorage.setItem('borderColor', borderColor);
}

function loadSettings() {
    const savedFilter = localStorage.getItem('filter');
    const savedHueRotation = localStorage.getItem('hueRotation');
    const savedBorderColor = localStorage.getItem('borderColor');

    if (savedFilter) {
        document.documentElement.style.filter = savedFilter;
    }
    if (savedHueRotation !== null) {
        hueRotation = parseFloat(savedHueRotation);
    }
    if (savedBorderColor) {
        document.querySelector('.img-fluid').style.borderColor = savedBorderColor;
    }
    updateFilters();
}

// Change Theme
function updateFilters() {
    const currentFilter = document.documentElement.style.filter;
    const hasInvert = currentFilter.includes("invert(1)");

    const adjustedHueRotation = hasInvert ? (hueRotation + 180) % 360 : hueRotation;
    const filterValue = hasInvert ?
        `invert(1) hue-rotate(${adjustedHueRotation}deg)` :
        `hue-rotate(${hueRotation}deg)`;

    document.documentElement.style.filter = filterValue;

    document.querySelectorAll("img, picture, video").forEach((mediaItem) => {
        const mediaAdjustedHueRotation = hasInvert ? (360 - hueRotation + 180) % 360 : (360 - hueRotation) % 360;
        const mediaFilterValue = hasInvert ?
            `invert(1) hue-rotate(${mediaAdjustedHueRotation}deg)` :
            `hue-rotate(${360 - hueRotation}deg)`;
        mediaItem.style.filter = mediaFilterValue;
    });
}

document.getElementById('invert').addEventListener('click', function() {
    const invertButton = document.getElementById('invert');
    const currentFilter = document.documentElement.style.filter;
    const imgElement = document.querySelector('.img-fluid');

    if (currentFilter.includes("invert(1)")) {
        document.documentElement.style.filter = currentFilter.replace("invert(1)", "").trim();
        imgElement.style.borderColor = "white";
        invertButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    } else {
        document.documentElement.style.filter = currentFilter + " invert(1)";
        imgElement.style.borderColor = "black";
        invertButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
    updateFilters();
    saveSettings();
});

document.getElementById('hue').addEventListener('mousedown', function() {
    const hueButton = document.getElementById('hue');
    hueButton.innerHTML = '<i class="fas fa-computer-mouse"></i> Change Colors';

    if (!intervalId) {
        intervalId = setInterval(() => {
            hueRotation = (hueRotation + 1) % 360;
            updateFilters();
            saveSettings();
        }, 20);
    }
});

document.addEventListener('mouseup', function() {
    const hueButton = document.getElementById('hue');
    hueButton.innerHTML = '<i class="fas fa-paint-brush"></i> Change Colors';

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    saveSettings();
});

// Handle Context Menu
document.addEventListener('contextmenu', function(event) {
    const rightClickDiv = document.getElementById('right_click');
    const margin = 200;
    const screenWidth = window.innerWidth;

    if (event.pageX > screenWidth - margin) {
        rightClickDiv.style.left = `${screenWidth - margin}px`;
        rightClickDiv.style.top = `${event.pageY}px`;
        rightClickDiv.style.display = 'block';
    } else {
        rightClickDiv.style.left = `${event.pageX}px`;
        rightClickDiv.style.top = `${event.pageY}px`;
        rightClickDiv.style.display = 'block';
    }
});

document.addEventListener('click', hideRightClickMenu);

document.addEventListener('scroll', hideRightClickMenu);

function hideRightClickMenu() {
    document.getElementById('right_click').style.display = 'none';
}