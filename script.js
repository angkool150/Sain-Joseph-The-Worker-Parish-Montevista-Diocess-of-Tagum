const timeEl = document.querySelector('.time');
const headingTop = document.getElementById('heading-top');
const headingBottom = document.getElementById('heading-bottom');

function getNextChristmas() {
    const now = new Date();
    const xmas = new Date(now.getFullYear(), 11, 25, 0, 0, 0);
    if (now >= xmas) xmas.setFullYear(xmas.getFullYear() + 1);
    return xmas.getTime();
}

function getNextNewYear() {
    const now = new Date();
    const ny = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    return ny.getTime();
}

function isChristmasMode() {
    return getNextChristmas() < getNextNewYear();
}

function formatTimeUnit(value) {
    return String(value).padStart(2, '0');
}

let countDownDate;

function startCountdown() {
    const xmasMode = isChristmasMode();

    if (xmasMode) {
        countDownDate = getNextChristmas();
        headingTop.textContent = 'ONLY';
        headingBottom.textContent = 'UNTIL CHRISTMAS!';
    } else {
        countDownDate = getNextNewYear();
        headingTop.textContent = 'ONLY';
        const year = new Date(countDownDate).getFullYear();
        headingBottom.textContent = `UNTIL NEW YEAR ${year}!`;
    }

    timeEl.style.display = '';
    let timer;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = Math.max(countDownDate - now, 0);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = formatTimeUnit(hours);
        document.getElementById('minutes').textContent = formatTimeUnit(minutes);
        document.getElementById('seconds').textContent = formatTimeUnit(seconds);

        if (distance <= 0) {
            if (timer) clearInterval(timer);
            timeEl.style.display = 'none';

            if (xmasMode) {
                headingTop.textContent = 'Merry';
                headingBottom.textContent = 'Christmas!';
            } else {
                headingTop.textContent = 'Happy';
                headingBottom.textContent = 'New Year!';
            }

            setTimeout(function () { startCountdown(); }, 5 * 60 * 1000);
            return false;
        }

        return true;
    }

    if (updateCountdown()) {
        timer = setInterval(updateCountdown, 1000);
    }
}

startCountdown();

(function () {
    const boxes = document.querySelectorAll('.text-time-box');
    if (!boxes || boxes.length === 0) return;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function flicker(box) {
        const size = Math.round(rand(12, 42)) + 'px';
        const alpha = (rand(0.25, 0.76)).toFixed(2);
        box.style.setProperty('--glow-size', size);
        box.style.setProperty('--glow-alpha', alpha);
        box.style.transform = `scale(${(rand(0.992, 1.012)).toFixed(3)})`;
    }

    setInterval(() => {
        boxes.forEach((box) => {
            setTimeout(() => flicker(box), Math.random() * 700);
        });
    }, 950);

    boxes.forEach((box) => flicker(box));
})();
