// --- Animated Section Reveal on Scroll ---
function revealSections() {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// --- Navigation Scroll, Toggle & Highlight ---
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({behavior: "smooth"});
            // Close nav on mobile
            document.querySelector('.nav-links').classList.remove('open');
        });
    });

    // Hamburger menu
    const navToggle = document.getElementById('nav-toggle');
    navToggle && navToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('open');
    });

    // Active link highlight
    function highlightNav() {
        const scrollPos = window.scrollY + 120;
        document.querySelectorAll('.nav-link').forEach(link => {
            let section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav);
    highlightNav();
});

// --- Back to Top Button ---
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) backToTop.style.display = 'block';
    else backToTop.style.display = 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// --- Ripple Effect on Button ---
document.getElementById('cta-btn').addEventListener('click', function(e) {
    let btn = this;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    let rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// --- Confetti Animation ---
function launchConfetti() {
    const colors = ['#00838f','#00bcd4','#ffeb3b','#ff7043','#43a047','#8e24aa','#e91e63'];
    const ctaSection = document.querySelector('.call-to-action');
    let confettiCount = 32;
    for(let i=0;i<confettiCount;i++) {
        let conf = document.createElement('div');
        conf.className = 'confetti-piece';
        conf.style.background = colors[Math.floor(Math.random()*colors.length)];
        conf.style.left = Math.random()*90+'%';
        conf.style.top = '-32px';
        conf.style.opacity = (0.7 + Math.random()*0.3).toFixed(2);
        conf.style.transform = `rotate(${Math.random()*360}deg)`;
        let fall = 120 + Math.random()*220;
        let side = (Math.random()-0.5)*120;
        conf.style.transition = `transform 1.4s cubic-bezier(.45,0,.2,1), top 1.4s linear, opacity 1.4s`;
        setTimeout(()=>{
            conf.style.top = fall+'px';
            conf.style.transform += ` translateX(${side}px) rotate(${Math.random()*360}deg)`;
            conf.style.opacity = 0;
        },30);
        ctaSection.appendChild(conf);
        setTimeout(()=>conf.remove(), 1600);
    }
}

// --- Support Counter with LocalStorage ---
function updateSupportCount() {
    const count = localStorage.getItem('supportCount') || 0;
    document.getElementById('support-count').textContent = `${count} supporter${count == 1 ? '' : 's'} so far`;
}
function incrementSupport() {
    let count = parseInt(localStorage.getItem('supportCount') || '0', 10);
    count++;
    localStorage.setItem('supportCount', count);
    updateSupportCount();
}

// --- Show Support Message, Confetti, and Update Counter ---
function showSupportMessage() {
    const supportMessage = document.getElementById('support-message');
    if (supportMessage) {
        supportMessage.style.display = 'block';
        incrementSupport();
        launchConfetti();
        setTimeout(()=>{supportMessage.style.display='none';}, 3000);
    }
}
document.getElementById('cta-btn').addEventListener('click', showSupportMessage);

// On page load, show support count
window.addEventListener('DOMContentLoaded', updateSupportCount);
