function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    var navLinks = document.querySelectorAll('nav a');
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove('active');
    }

    var selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.classList.add('active');

    var selectedNavLink = document.getElementById('nav-' + pageId);
    if (selectedNavLink) selectedNavLink.classList.add('active');

    window.scrollTo(0, 0);
}


var fogEnabled = true;
var fogEl = null;

function createFog() {
    fogEl = document.createElement('div');
    fogEl.style.position = 'fixed';
    fogEl.style.top = '0';
    fogEl.style.left = '0';
    fogEl.style.width = '100%';
    fogEl.style.height = '100%';
    fogEl.style.pointerEvents = 'none';
    fogEl.style.zIndex = '9999';
    fogEl.style.background = 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(0, 0, 0, 0.8) 40%)';
    document.body.appendChild(fogEl);
}

function setFog(enabled) {
    fogEnabled = enabled;
    if (!fogEl) return;
    fogEl.style.display = enabled ? 'block' : 'none';
}

function disableFlashlight(e) {
    if (e) e.preventDefault();
    setFog(false);
}

function enableFlashlight(e) {
    if (e) e.preventDefault();
    setFog(true);
}

window.disableFlashlight = disableFlashlight;
window.enableFlashlight = enableFlashlight;

function onMouseMove(e) {
    if (!fogEnabled || !fogEl) return;

    var x = e.clientX;
    var y = e.clientY;

    fogEl.style.background =
        'radial-gradient(circle at ' +
        x +
        'px ' +
        y +
        'px, transparent 10%, rgba(0, 0, 0, 0.8) 35%)';

    var moveX = (x - window.innerWidth / 2) * 0.01;
    var moveY = (y - window.innerHeight / 2) * 0.01;
    document.body.style.backgroundPosition = moveX + 'px ' + moveY + 'px';
}

function onMouseDown() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    setTimeout(function () {
        document.body.style.filter = 'none';
    }, 50);
}

function setupNavHover() {
    var links = document.querySelectorAll('nav a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', function () {
            this.style.letterSpacing = '4px';
        });
        links[i].addEventListener('mouseleave', function () {
            this.style.letterSpacing = '2px';
        });
    }
}

function init() {
    createFog();
    setupNavHover();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);

    console.log('L4D2 Mod Site Initialized');
}

document.addEventListener('DOMContentLoaded', init);



