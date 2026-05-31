// ============================================
// ПОРТФОЛИО РОМАНА БАГАНЦОВА
// ============================================

// Данные портфолио с РЕАЛЬНЫМИ ССЫЛКАМИ на проекты
const projectsData = [
    {
        id: 1,
        title: "Bright — IT компания",
        description: "Современный корпоративный лендинг для IT-компании с анимациями, формой связи и тёмной темой.",
        link: "https://romabagantsov-creator.github.io/bright-company/",
        icon: "🏢"
    },
    {
        id: 2,
        title: "GoodsFlow — маркетплейс",
        description: "Каталог товаров с фильтрацией по категориям, поиском, корзиной и сохранением в LocalStorage.",
        link: "https://romabagantsov-creator.github.io/goodsflow/",
        icon: "🛒"
    },
    {
        id: 3,
        title: "TravelBlog — блог о путешествиях",
        description: "Блог с постами о путешествиях, комментариями, счётчиком просмотров и удобной навигацией.",
        link: "https://romabagantsov-creator.github.io/travel-blog/",
        icon: "✈️"
    },
    {
        id: 4,
        title: "FitTrack — фитнес-трекер",
        description: "Трекер тренировок с графиками прогресса, добавлением занятий и статистикой.",
        link: "https://romabagantsov-creator.github.io/fitness-tracker/",
        icon: "💪"
    },
    {
        id: 5,
        title: "PhotoPortfolio — фотограф",
        description: "Портфолио фотографа с галереей, фильтрацией, Lightbox и формой обратной связи.",
        link: "https://romabagantsov-creator.github.io/photo-portfolio/",
        icon: "📷"
    },
    {
        id: 6,
        title: "CRM Dashboard",
        description: "Система управления клиентами и задачами с графиками, CRUD операциями и LocalStorage.",
        link: "https://romabagantsov-creator.github.io/crm-dashboard/",
        icon: "📊"
    }
];

const skillsData = [
    "JavaScript", "TypeScript", "React", "Vue 3", 
    "Next.js", "HTML5/CSS3", "Tailwind", "SCSS", 
    "Git", "Figma", "Node.js", "REST API", "GitHub"
];

let currentPage = 'works';
let observer = null;

// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (toggleBtn) toggleBtn.querySelector('.theme-toggle__icon').textContent = '☀️';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            const icon = toggleBtn.querySelector('.theme-toggle__icon');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { toggleBtn.style.transform = 'scale(1)'; }, 150);
        });
    }
}

// ========== АНИМАЦИИ ==========

function animateSequential() {
    const elements = document.querySelectorAll('.project-card, .skill-tag, .contact-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

function init3DCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            setTimeout(() => { card.style.transition = 'transform 0.3s ease'; }, 100);
        });
        card.addEventListener('mouseenter', () => { card.style.transition = 'all 0.1s ease'; });
    });
}

function initScrollReveal() {
    if (observer) observer.disconnect();
    const revealElements = document.querySelectorAll('.project-card, .skill-tag, .contact-card, .accent-block');
    revealElements.forEach(el => {
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        el.classList.add('reveal-' + direction);
        el.style.opacity = '0';
    });
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.2)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
}

function typeWriterWithCursor(element, text, speed = 40) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    element.style.borderRight = `2px solid var(--accent)`;
    element.style.animation = 'cursorBlink 0.7s infinite';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === ' ' ? '&nbsp;' : text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    type();
}

function showGlowNotification(message) {
    const existingToast = document.querySelector('.glow-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'glow-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-elevated);
        color: var(--accent);
        border: 1px solid var(--accent);
        padding: 12px 28px;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(204, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        white-space: normal;
        text-align: center;
        animation: slideUpGlow 0.3s ease;
        letter-spacing: 0.3px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ========== РЕНДЕР СТРАНИЦ ==========

function renderWorksPage() {
    return `
        <div class="works-page fade-in">
            <h1 style="font-size: 2.2rem; margin-bottom: 10px; font-weight: 800;">Мои проекты</h1>
            <p style="color: var(--text-secondary); margin-bottom: 40px; font-size: 1rem;">Портфолио моих проектов</p>
            <div class="projects-grid">
                ${projectsData.map((project) => `
                    <div class="project-card">
                        <div class="project-card__preview">${project.icon}</div>
                        <div class="project-card__content">
                            <h3 class="project-card__title">${project.title}</h3>
                            <p class="project-card__desc">${project.description}</p>
                            <a href="${project.link}" class="project-card__link" target="_blank" data-project-id="${project.id}">
                                Посмотреть проект → 
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAboutPage() {
    return `
        <div class="about-section fade-in">
            <h1>О себе <span class="wave-hand">👋</span></h1>
            <div class="lead"><span id="typewriter-text"></span></div>
            <div style="margin-bottom: 36px;">
                <p style="margin-bottom: 24px; line-height: 1.6;">Веб-разработчик, создаю современные и быстрые веб-приложения. В работе ценю чистый код, продуманный дизайн и решение реальных задач пользователей. Постоянно учусь новому и слежу за трендами.</p>
                <p style="color: var(--text-secondary);">🚀 Главный принцип: <strong style="color: var(--accent);">"Код должен работать и радовать глаз"</strong></p>
            </div>
            <h3 style="margin: 40px 0 20px; font-size: 1.3rem;">🛠️ Технологии и инструменты</h3>
            <div class="skill-list">${skillsData.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}</div>
            <div class="accent-block"><p style="margin: 0;">✨ <strong>Открыт к сотрудничеству</strong> — пиши, если нужен классный сайт или помощь с проектом! ✨</p></div>
        </div>
    `;
}

function renderContactsPage() {
    return `
        <div class="contacts-section fade-in">
            <h1>Связаться со мной</h1>
            <p style="color: var(--text-secondary); margin-bottom: 40px;">Всегда на связи — выберите удобный способ</p>
            <div class="contacts-grid">
                <a href="mailto:roma_bagantsov@vk.com" class="contact-card" id="emailCard">
                    <div class="contact-card__icon bounce-icon">📧</div>
                    <div class="contact-card__info"><h3>Email</h3><p>roma_bagantsov@vk.com</p></div>
                </a>
                <a href="#" class="contact-card" id="telegramCard">
                    <div class="contact-card__icon bounce-icon">💬</div>
                    <div class="contact-card__info"><h3>Telegram</h3><p>@RomanBagantsov</p></div>
                </a>
            </div>
            <div class="accent-block" style="margin-top: 48px;"><p>📌 Обычно отвечаю в течение нескольких часов. Буду рад новым знакомствам и проектам!</p></div>
        </div>
    `;
}

// ========== ЗАГРУЗКА СТРАНИЦ ==========

function loadPage(page) {
    const contentDiv = document.getElementById('dynamicContent');
    const loader = document.getElementById('loader');
    
    if (loader) loader.style.display = 'flex';
    if (contentDiv) contentDiv.style.opacity = '0';
    
    setTimeout(() => {
        let html = '';
        if (page === 'works') html = renderWorksPage();
        else if (page === 'about') html = renderAboutPage();
        else if (page === 'contacts') html = renderContactsPage();
        else html = renderWorksPage();
        
        if (contentDiv) {
            contentDiv.innerHTML = html;
            contentDiv.style.opacity = '1';
        }
        if (loader) loader.style.display = 'none';
        
        updateActiveNavLink(page);
        attachProjectHandlers();
        attachContactHandlers();
        
        setTimeout(() => {
            animateSequential();
            init3DCards();
            initScrollReveal();
            if (page === 'about') {
                const typeEl = document.getElementById('typewriter-text');
                if (typeEl) typeWriterWithCursor(typeEl, "Веб-разработчик, создаю современные и быстрые сайты.", 40);
            }
            if (!document.getElementById('animation-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'animation-styles';
                styleSheet.textContent = `
                    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
                    @keyframes glitch { 0% { transform: skew(0deg); } 20% { transform: skew(2deg); } 40% { transform: skew(-2deg); } 100% { transform: skew(0deg); } }
                    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                    @keyframes cursorBlink { 0%,100% { border-color: var(--accent); } 50% { border-color: transparent; } }
                    @keyframes bounceIcon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                    .reveal-left { transform: translateX(-50px); transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.2); }
                    .reveal-right { transform: translateX(50px); transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.2); }
                    .wave-hand { display: inline-block; animation: waveHand 1s ease-in-out infinite; transform-origin: 70% 70%; }
                    @keyframes waveHand { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(15deg); } 75% { transform: rotate(-10deg); } }
                    @keyframes slideUpGlow { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
                    .project-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    .skill-tag:hover { transform: translateY(-3px) scale(1.02); }
                `;
                document.head.appendChild(styleSheet);
            }
        }, 100);
        currentPage = page;
    }, 200);
}

function updateActiveNavLink(page) {
    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === page) link.classList.add('active');
        else link.classList.remove('active');
    });
}

function attachProjectHandlers() {
    const projectLinks = document.querySelectorAll('.project-card__link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showGlowNotification('🔗 Ссылка на проект будет добавлена позже');
            }
        });
    });
}

function attachContactHandlers() {
    const telegramCard = document.getElementById('telegramCard');
    if (telegramCard) {
        telegramCard.addEventListener('click', (e) => {
            e.preventDefault();
            showGlowNotification('📱 Напиши мне в Telegram: @RomanBagantsov');
        });
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page && page !== currentPage) {
                currentPage = page;
                loadPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadPage('works');
});
