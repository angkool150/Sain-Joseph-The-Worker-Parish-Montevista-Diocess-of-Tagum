function getNextNewYear() {
    const now = new Date();
    return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0).getTime();
}

let countDownDate = getNextNewYear();
const timeEl = document.querySelector('.time');
const headingTop = document.getElementById('heading-top');
const headingBottom = document.getElementById('heading-bottom');

function startCountdown() {
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance <= 0) {
            clearInterval(x);
            timeEl.style.display = 'none';
            headingTop.textContent = '🎉 Happy';
            headingBottom.textContent = 'New Year! 🎉';

            setTimeout(function () {
                countDownDate = getNextNewYear();
                headingTop.textContent = 'ONLY';
                headingBottom.textContent = 'UNTIL NEW YEAR';
                timeEl.style.display = '';
                startCountdown();
            }, 5000);
        }
    }, 1000);
}

startCountdown();

// --- Random white glow for .text-time-box (christmas lights effect) ---
(function () {
    const boxes = document.querySelectorAll('.text-time-box');
    if (!boxes || boxes.length === 0) return;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    // apply a random glow to a single box
    function flicker(box) {
        const size = Math.round(rand(10, 45)) + 'px'; // blur radius
        const alpha = (rand(0.25, 0.95)).toFixed(2); // opacity of white
        box.style.setProperty('--glow-size', size);
        box.style.setProperty('--glow-alpha', alpha);
        // subtle scale bounce for extra life
        box.style.transform = `scale(${(rand(0.985, 1.02)).toFixed(3)})`;
    }

    // staggered flicker loop
    setInterval(() => {
        boxes.forEach((box, i) => {
            // each box flickers with a slight random delay
            setTimeout(() => flicker(box), Math.random() * 700);
        });
    }, 850);

    // initial seed
    boxes.forEach(b => flicker(b));
})();
