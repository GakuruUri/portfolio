const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions(){
    // Button click active class
    for (let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        });
    }

    // Sections Active
    allSections.addEventListener('click', (e) =>{
        const control = e.target.closest('.control');
        const id = control && control.dataset.id;
        if(id){
            sections.forEach((section) =>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            if(element) element.classList.add('active');
        }
    })

    // Toggle theme (persisted in localStorage, shared with learning pages)
    const THEME_KEY = 'uri-theme';
    const root = document.documentElement;

    function applyTheme(theme) {
        const light = theme === 'light';
        root.classList.toggle('light-mode', light);
        document.body.classList.toggle('light-mode', light);
    }

    // Sync with whatever the no-flash head script already applied.
    let savedTheme = null;
    try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    applyTheme(savedTheme);

    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = root.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(next);
            try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
        });
    }
}

PageTransitions();

// In-page links (e.g. "Get in Touch", header anchors) should switch the
// active section the same way the side-nav dots do, since hidden sections
// can't be reached by a normal anchor jump.
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target || !target.classList.contains('section')) return;
        e.preventDefault();
        sections.forEach((s) => s.classList.remove('active'));
        target.classList.add('active');
        const currentBtn = document.querySelector('.active-btn');
        if (currentBtn) currentBtn.classList.remove('active-btn');
        const btn = document.querySelector('.control[data-id="' + id + '"]');
        if (btn) btn.classList.add('active-btn');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Typed role animation
const roles = ['Cloud Engineer', 'DevOps Engineer', 'AWS Solutions Architect', 'Systems Analyst'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }
    setTimeout(typeRole, delay);
}
typeRole();
