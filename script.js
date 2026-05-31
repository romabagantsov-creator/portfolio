// ============================================
// ПОРТФОЛИО РОМАНА БАГАНЦОВА — С АНИМАЦИЯМИ
// ============================================

// Данные портфолио (твои проекты)
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

// Данные опыта работы
const experienceData = [
    {
        title: "Фронтенд-разработчик",
        company: "Freelance",
        period: "2023 — настоящее время",
        description: "Разработка сайтов под ключ, вёрстка сложных интерфейсов, интеграция API, оптимизация производительности."
    },
    {
        title: "Верстальщик / Junior Frontend",
        company: "Студия 'WebCraft'",
        period: "2022 — 2023",
        description: "Адаптивная вёрстка лендингов и интернет-магазинов, работа с Figma, код-ревью, командная разработка."
    }
];

// Навыки
const skillsData = [
    "JavaScript", "TypeScript", "React", "Vue 3", 
    "Next.js", "HTML5/CSS3", "Tailwind", "SCSS", 
    "Git", "Figma", "Node.js", "REST API"
];

// Текущая активная страница
let currentPage = 'works';
let observer = null;

// ========== АНИМАЦИИ ==========

// Анимация появления элементов при скролле
function initScrollAnimation() {
    // Удаляем старый observer, если есть
    if (observer) observer.disconnect();
    
    const animatedElements = document.querySelectorAll('.project-card, .skill-tag, .contact-card, .experience-card');
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                // Можно продолжать наблюдать или отключить после появления
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Эффект печатной машинки (для секции "Обо мне")
function typeWriterEffect(element, text, speed = 30, callback) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Анимация счётчика (для чисел)
function animateCounter(element, start, end, duration = 1000) {
    let startTime = null;
    
    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// Анимация при наведении на карточки (дополнительно)
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const preview = card.querySelector('.project-card__preview');
            if (preview) {
                preview.style.transform = 'scale(1.02)';
                preview.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', (e) => {
            const preview = card.querySelector('.project-card__preview');
            if (preview) {
                preview.style.transform = 'scale(1)';
            }
        });
    });
}

// Плавный вход контента
function animateContentIn(container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(15px)';
    container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 50);
}

// ========== РЕНДЕР СТРАНИЦ ==========

// Рендер страницы "Работы"
function renderWorksPage() {
    return `
        <div class="works-page fade-in">
            <h1 style="font-size: 2.2rem; margin-bottom: 10px; font-weight: 800;">Мои проекты</h1>
            <p style="color: var(--text-secondary); margin-bottom: 40px; font-size: 1rem;">Реальные сайты и приложения, которые я создал</p>
            
            <div class="stats-row" style="display: flex; gap: 30px; justify-content: center; margin-bottom: 50px; flex-wrap: wrap;">
                <div class="stat-card" style="background: var(--bg-elevated); border-radius: 16px; padding: 20px 32px; text-align: center; border: 1px solid var(--border);">
                    <div class="stat-number" id="projectsCount" style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">0</div>
                    <div class="stat-label" style="color: var(--text-secondary); font-size: 0.85rem;">завершённых проектов</div>
                </div>
                <div class="stat-card" style="background: var(--bg-elevated); border-radius: 16px; padding: 20px 32px; text-align: center; border: 1px solid var(--border);">
                    <div class="stat-number" id="techCount" style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">0</div>
                    <div class="stat-label" style="color: var(--text-secondary); font-size: 0.85rem;">технологий в работе</div>
                </div>
                <div class="stat-card" style="background: var(--bg-elevated); border-radius: 16px; padding: 20px 32px; text-align: center; border: 1px solid var(--border);">
                    <div class="stat-number" id="expYears" style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">0</div>
                    <div class="stat-label" style="color: var(--text-secondary); font-size: 0.85rem;">лет в разработке</div>
                </div>
            </div>
            
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

// Рендер страницы "Обо мне"
function renderAboutPage() {
    return `
        <div class="about-section fade-in">
            <h1>Привет, я Роман Баганцов <span style="display: inline-block; animation: wave 1s infinite;">👋</span></h1>
            <div class="lead">
                <span id="typewriter-text"></span>
            </div>
            
            <div style="margin-bottom: 36px;">
                <p style="margin-bottom: 24px; line-height: 1.6;">Специализируюсь на фронтенде, но могу и бэкенд. Люблю чистый код, продуманный дизайн и решать реальные задачи пользователей. Постоянно учусь новому и слежу за трендами в веб-разработке.</p>
                <p style="color: var(--text-secondary);">🚀 Главный принцип: <strong style="color: var(--accent);">"Код должен работать и радовать глаз"</strong></p>
            </div>
            
            <h3 style="margin: 40px 0 20px; font-size: 1.3rem;">🛠️ Технологии и инструменты</h3>
            <div class="skill-list">
                ${skillsData.map((skill, index) => `<span class="skill-tag" data-delay="${index * 0.03}">${skill}</span>`).join('')}
            </div>
            
            <h3 style="margin: 40px 0 20px; font-size: 1.3rem;">💼 Опыт работы</h3>
            ${experienceData.map(exp => `
                <div class="experience-card">
                    <strong>${exp.title}</strong> <span class="date">${exp.period}</span>
                    <div style="color: var(--accent); font-size: 0.85rem; margin-top: 4px;">${exp.company}</div>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
            
            <div class="accent-block">
                <p style="margin: 0; font-size: 1rem;">✨ <strong>Открыт к сотрудничеству</strong> — пиши, если нужен классный сайт или помощь с проектом! ✨</p>
            </div>
        </div>
    `;
}

// Рендер страницы "Контакты"
function renderContactsPage() {
    return `
        <div class="contacts-section fade-in">
            <h1>Связаться со мной</h1>
            <p style="color: var(--text-secondary); margin-top: 12px; margin-bottom: 20px;">Всегда на связи — выберите удобный способ</p>
            
            <div class="social-links" style="display: flex; justify-content: center; gap: 20px; margin: 30px 0;">
                <a href="#" class="social-icon" id="githubSocial" style="background: var(--bg-elevated); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; text-decoration: none; transition: all 0.2s; border: 1px solid var(--border);">🐙</a>
                <a href="#" class="social-icon" id="telegramSocial" style="background: var(--bg-elevated); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; text-decoration: none; transition: all 0.2s; border: 1px solid var(--border);">💬</a>
                <a href="#" class="social-icon" id="emailSocial" style="background: var(--bg-elevated); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; text-decoration: none; transition: all 0.2s; border: 1px solid var(--border);">📧</a>
            </div>
            
            <div class="contacts-grid">
                <a href="mailto:roman@example.com" class="contact-card" id="emailCard">
                    <div class="contact-card__icon">📧</div>
                    <div class="contact-card__info">
                        <h3>Email</h3>
                        <p>roman@example.com</p>
                    </div>
                </a>
                <a href="#" class="contact-card" id="telegramCard">
                    <div class="contact-card__icon">💬</div>
                    <div class="contact-card__info">
                        <h3>Telegram</h3>
                        <p>@romabagantsov</p>
                    </div>
                </a>
                <a href="#" class="contact-card" id="githubCard">
                    <div class="contact-card__icon">🐙</div>
                    <div class="contact-card__info">
                        <h3>GitHub</h3>
                        <p>/romabagantsov-creator</p>
                    </div>
                </a>
            </div>
            
            <div style="margin-top: 40px; padding: 20px; background: var(--accent-soft); border-radius: 16px; border: 1px solid rgba(255,51,51,0.2);">
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
            animateContentIn(contentDiv);
        }
        if (loader) loader.style.display = 'none';
        
        updateActiveNavLink(page);
        attachProjectHandlers();
        attachContactHandlers();
        
        // Анимация счётчиков на странице работ
        if (page === 'works') {
            setTimeout(() => {
                const projectsCountEl = document.getElementById('projectsCount');
                const techCountEl = document.getElementById('techCount');
                const expYearsEl = document.getElementById('expYears');
                if (projectsCountEl) animateCounter(projectsCountEl, 0, projectsData.length, 1200);
                if (techCountEl) animateCounter(techCountEl, 0, skillsData.length, 1200);
                if (expYearsEl) animateCounter(expYearsEl, 0, 4, 1200);
            }, 200);
        }
        
        // Эффект печатной машинки на странице "Обо мне"
        if (page === 'about') {
            setTimeout(() => {
                const typeEl = document.getElementById('typewriter-text');
                if (typeEl) {
                    typeWriterEffect(typeEl, "Веб-разработчик, создаю современные и быстрые сайты.", 40);
                }
            }, 300);
        }
        
        // Инициализируем анимацию скролла после рендера
        setTimeout(() => {
            initScrollAnimation();
            addCardHoverEffects();
            
            // Добавляем стили для анимации, если их ещё нет
            if (!document.getElementById('animation-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'animation-styles';
                styleSheet.textContent = `
                    .scroll-animate {
                        opacity: 0;
                        transform: translateY(25px);
                        transition: opacity 0.5s ease, transform 0.5s ease;
                    }
                    .scroll-visible {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                    }
                    .project-card, .skill-tag, .contact-card, .experience-card {
                        transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, transform 0.2s;
                    }
                    @keyframes wave {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(15deg); }
                        75% { transform: rotate(-10deg); }
                    }
                    .fade-in {
                        animation: fadeInUp 0.5s ease forwards;
                    }
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .social-icon:hover {
                        transform: translateY(-3px);
                        border-color: var(--accent) !important;
                        background: var(--accent-soft) !important;
                    }
                    .contact-card {
                        transition: transform 0.25s, border-color 0.2s, box-shadow 0.2s !important;
                    }
                    .stat-card {
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .stat-card:hover {
                        transform: translateY(-3px);
                        box-shadow: var(--shadow-md);
                    }
                `;
                document.head.appendChild(styleSheet);
            }
        }, 100);
        
        currentPage = page;
    }, 200);
}

// Обновление активной ссылки
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

// Обработчики для проектов
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
    
    // Добавляем анимацию при наведении на карточки
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const preview = card.querySelector('.project-card__preview');
            if (preview) {
                preview.style.transform = 'scale(1.02)';
                preview.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', () => {
            const preview = card.querySelector('.project-card__preview');
            if (preview) preview.style.transform = 'scale(1)';
        });
    });
}

// Обработчики для контактов
function attachContactHandlers() {
    const handlers = [
        { id: 'telegramCard', msg: '📱 Напиши мне в Telegram: @romabagantsov' },
        { id: 'githubCard', msg: '🐙 Мой GitHub: github.com/romabagantsov-creator' },
        { id: 'emailCard', msg: '📧 Отправь письмо на roman@example.com' },
        { id: 'telegramSocial', msg: '📱 Напиши мне в Telegram: @romabagantsov' },
        { id: 'githubSocial', msg: '🐙 Мой GitHub: github.com/romabagantsov-creator' },
        { id: 'emailSocial', msg: '📧 Отправь письмо на roman@example.com' }
    ];
    
    handlers.forEach(({ id, msg }) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                showGlowNotification(msg);
            });
        }
    });
}

// Красивое уведомление
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
        box-shadow: 0 0 20px rgba(255, 51, 51, 0.3);
        backdrop-filter: blur(10px);
        white-space: nowrap;
        max-width: 90%;
        white-space: normal;
        text-align: center;
        animation: slideUpGlow 0.3s ease;
        letter-spacing: 0.3px;
    `;
    
    // Добавляем анимацию
    const style = document.createElement('style');
    if (!document.querySelector('#toast-keyframes')) {
        style.id = 'toast-keyframes';
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// Навигация
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

// Анимация при загрузке страницы
function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initPageLoadAnimation();
    initNavigation();
    loadPage('works');
});
