// ============================================
// ПОРТФОЛИО РОМАНА БАГАНЦОВА — МАКСИМУМ АНИМАЦИЙ
// ============================================

// Данные портфолио
const projectsData = [
    {
        id: 1,
        title: "Корпоративный сайт Bright",
        description: "Современный лендинг для IT-компании с анимациями и формой обратной связи. Адаптив под все устройства.",
        tech: ["React", "Framer Motion", "EmailJS"],
        link: "#",
        icon: "🏢"
    },
    {
        id: 2,
        title: "Маркетплейс GoodsFlow",
        description: "Каталог товаров с фильтрацией, корзиной и адаптивным дизайном. Оптимизирован для быстрой загрузки.",
        tech: ["Vue 3", "Pinia", "Tailwind"],
        link: "#",
        icon: "🛒"
    },
    {
        id: 3,
        title: "Блог о путешествиях",
        description: "Блоговая платформа с постами, комментариями и админ-панелью. Поддержка Markdown и SEO.",
        tech: ["Next.js", "MDX", "MongoDB"],
        link: "#",
        icon: "✈️"
    },
    {
        id: 4,
        title: "Фитнес-трекер",
        description: "SPA для отслеживания тренировок с графиками, прогрессом и историей достижений.",
        tech: ["TypeScript", "Chart.js", "LocalStorage"],
        link: "#",
        icon: "💪"
    },
    {
        id: 5,
        title: "Портфолио фотографа",
        description: "Галерея с ленивой загрузкой, lightbox и плавными переходами. Вдохновляющий дизайн.",
        tech: ["HTML/CSS", "JavaScript", "Lightbox"],
        link: "#",
        icon: "📷"
    },
    {
        id: 6,
        title: "CRM система",
        description: "Дашборд для управления клиентами и задачами. Аналитика и отчёты в реальном времени.",
        tech: ["React", "Redux Toolkit", "Firebase"],
        link: "#",
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
    } else {
        document.body.classList.remove('dark');
        if (toggleBtn) toggleBtn.querySelector('.theme-toggle__icon').textContent = '🌙';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            const icon = toggleBtn.querySelector('.theme-toggle__icon');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            
            // Анимация кнопки
            toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { toggleBtn.style.transform = 'scale(1)'; }, 150);
        });
    }
}

// ========== НОВЫЕ АНИМАЦИИ ==========

// 1. Плавное появление элементов с задержкой
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

// 2. 3D-эффект при движении мыши (только на карточках)
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
            setTimeout(() => {
                card.style.transition = 'transform 0.3s ease';
            }, 100);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.1s ease';
        });
    });
}

// 3. Парящая анимация (лёгкое покачивание)
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.animation = `float ${3 + index * 0.2}s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// 4. Glitch-эффект для заголовков
function initGlitchEffect() {
    const titles = document.querySelectorAll('h1, h2, .logo__text');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => { title.style.animation = ''; }, 300);
        });
    });
}

// 5. Анимация появления при скролле (с разных сторон)
function initScrollReveal() {
    if (observer) observer.disconnect();
    
    const revealElements = document.querySelectorAll('.project-card, .skill-tag, .contact-card, .accent-block');
    
    revealElements.forEach(el => {
        // Случайное направление появления
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

// 6. Эффект печатной машинки с курсором
function typeWriterWithCursor(element, text, speed = 40) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    // Добавляем курсор
    element.style.borderRight = `2px solid var(--accent)`;
    element.style.animation = 'cursorBlink 0.7s infinite';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === ' ' ? '&nbsp;' : text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Убираем курсор после печати
            element.style.borderRight = 'none';
        }
    }
    type();
}

// 7. Анимированный фон (след за мышью)
function initAnimatedBackground() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}

// 8. Пульсация для кнопок "Подробнее"
function addPulseAnimation() {
    const buttons = document.querySelectorAll('.project-card__link');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 500);
        });
    });
}

// 9. Анимация для иконок контактов
function initContactIconsAnimation() {
    const icons = document.querySelectorAll('.contact-card__icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.2s ease';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// 10. Всплывающие уведомления (улучшенные)
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
        white-space: nowrap;
        max-width: 90%;
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
                ${projectsData.map((project, index) => `
                    <div class="project-card" data-delay="${index * 0.05}">
                        <div class="project-card__preview">${project.icon}</div>
                        <div class="project-card__content">
                            <h3 class="project-card__title">${project.title}</h3>
                            <p class="project-card__desc">${project.description}</p>
                            <div class="project-card__tech">
                                ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                            </div>
                            <a href="${project.link}" class="project-card__link" data-project-id="${project.id}">
                                Подробнее → 
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
            <h1>Привет, Роман Баганцов <span class="wave-hand">👋</span></h1>
            <div class="lead">
                <span id="typewriter-text"></span>
            </div>
            
            <div style="margin-bottom: 36px;">
                <p style="margin-bottom: 24px; line-height: 1.6;">Веб-разработчик, создаю современные и быстрые веб-приложения. В работе ценю чистый код, продуманный дизайн и решение реальных задач пользователей. Постоянно учусь новому и слежу за трендами.</p>
                <p style="color: var(--text-secondary);">🚀 Главный принцип: <strong style="color: var(--accent);">"Код должен работать и радовать глаз"</strong></p>
            </div>
            
            <h3 style="margin: 40px 0 20px; font-size: 1.3rem;">🛠️ Технологии и инструменты</h3>
            <div class="skill-list">
                ${skillsData.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="accent-block">
                <p style="margin: 0; font-size: 1rem;">✨ <strong>Открыт к сотрудничеству</strong> — пиши, если нужен классный сайт или помощь с проектом! ✨</p>
            </div>
        </div>
    `;
}

function renderContactsPage() {
    return `
        <div class="contacts-section fade-in">
            <h1>Связаться со мной</h1>
            <p style="color: var(--text-secondary); margin-top: 12px; margin-bottom: 40px;">Всегда на связи — выберите удобный способ</p>
            
            <div class="contacts-grid">
                <a href="mailto:roma_bagantsov@vk.com" class="contact-card" id="emailCard">
                    <div class="contact-card__icon bounce-icon">📧</div>
                    <div class="contact-card__info">
                        <h3>Email</h3>
                        <p>roma_bagantsov@vk.com</p>
                    </div>
                </a>
                
                <a href="#" class="contact-card" id="telegramCard">
                    <div class="contact-card__icon bounce-icon">💬</div>
                    <div class="contact-card__info">
                        <h3>Telegram</h3>
                        <p>@RomanBagantsov</p>
                    </div>
                </a>
            </div>
            
            <div class="accent-block" style="margin-top: 48px;">
                <p style="margin: 0; font-size: 0.9rem;">📌 Обычно отвечаю в течение нескольких часов. Буду рад новым знакомствам и проектам!</p>
            </div>
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
        switch(page) {
            case 'works':
                html = renderWorksPage();
                break;
            case 'about':
                html = renderAboutPage();
                break;
            case 'contacts':
                html = renderContactsPage();
                break;
            default:
                html = renderWorksPage();
        }
        
        if (contentDiv) {
            contentDiv.innerHTML = html;
            contentDiv.style.opacity = '1';
        }
        if (loader) loader.style.display = 'none';
        
        updateActiveNavLink(page);
        attachProjectHandlers();
        attachContactHandlers();
        
        // ЗАПУСК ВСЕХ АНИМАЦИЙ
        setTimeout(() => {
            animateSequential();
            init3DCards();
            initScrollReveal();
            initGlitchEffect();
            addPulseAnimation();
            initContactIconsAnimation();
            
            if (page === 'about') {
                const typeEl = document.getElementById('typewriter-text');
                if (typeEl) {
                    typeWriterWithCursor(typeEl, "Веб-разработчик, создаю современные и быстрые сайты.", 40);
                }
            }
            
            // Добавляем анимации в CSS
            if (!document.getElementById('animation-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'animation-styles';
                styleSheet.textContent = `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    
                    @keyframes glitch {
                        0% { transform: skew(0deg); opacity: 1; }
                        20% { transform: skew(2deg); opacity: 0.8; }
                        40% { transform: skew(-2deg); opacity: 0.9; }
                        60% { transform: skew(1deg); opacity: 1; }
                        100% { transform: skew(0deg); opacity: 1; }
                    }
                    
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); text-shadow: 0 0 5px rgba(204,0,0,0.5); }
                        100% { transform: scale(1); }
                    }
                    
                    @keyframes cursorBlink {
                        0%, 100% { border-color: var(--accent); }
                        50% { border-color: transparent; }
                    }
                    
                    @keyframes bounceIcon {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-5px); }
                    }
                    
                    .reveal-left {
                        transform: translateX(-50px);
                        transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.2);
                    }
                    
                    .reveal-right {
                        transform: translateX(50px);
                        transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.2);
                    }
                    
                    .bounce-icon {
                        display: inline-block;
                        transition: transform 0.2s ease;
                    }
                    
                    .bounce-icon:hover {
                        animation: bounceIcon 0.5s ease;
                    }
                    
                    .wave-hand {
                        display: inline-block;
                        animation: waveHand 1s ease-in-out infinite;
                        transform-origin: 70% 70%;
                    }
                    
                    @keyframes waveHand {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(15deg); }
                        75% { transform: rotate(-10deg); }
                    }
                    
                    @keyframes slideUpGlow {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                    }
                    
                    .project-card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.2s;
                    }
                    
                    .skill-tag, .contact-card {
                        transition: all 0.3s ease;
                    }
                    
                    .skill-tag:hover {
                        transform: translateY(-3px) scale(1.02);
                    }
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
        if (linkPage === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function attachProjectHandlers() {
    const projectLinks = document.querySelectorAll('.project-card__link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                showGlowNotification('🔗 Демо-версия: проект в портфолио (ссылка будет добавлена позже)');
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

// Анимация загрузки страницы
function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPageLoadAnimation();
    initNavigation();
    loadPage('works');
});
