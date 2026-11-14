const servicesData = {
    top: [
        { id: 't1', title: 'Мужская стрижка', time: '45 мин', price: 1500, type: 'top' },
        { id: 't2', title: 'Детская стрижка до 10 лет', time: '30 мин', price: 1200, type: 'top' },
        { id: 't3', title: 'Оформление бороды', time: '30 мин', price: 1200, type: 'top' },
        { id: 't4', title: 'Мужская стрижка + оформление бороды', time: '1 ч', price: 2500, type: 'top' }, /* Изменили название */
        { id: 't5', title: 'Камуфляж бороды', time: '1 ч', price: 1200, type: 'top' },
        { id: 't6', title: 'Коррекция воском', time: '15 мин', price: 300, type: 'top' },
        { id: 't7', title: 'Укладка', time: '30 мин', price: 500, type: 'top' },
        { id: 't8', title: 'Друг+Друг', time: '1 ч', price: 2800, type: 'top' },
        { id: 't9', title: 'Папа+Сын', time: '1 ч', price: 2500, type: 'top' },
        { id: 't10', title: 'Тонирующий шампунь NISHMAN', time: '30 мин', price: 800, type: 'top' },
        { id: 't11', title: 'Уход за кожей лица', time: '15 мин', price: 800, type: 'top' }
    ],
    barber: [
        { id: 'b1', title: 'Мужская стрижка', time: '45 мин', price: 1300, type: 'barber' },
        { id: 'b2', title: 'Мужская стрижка + оформление бороды', time: '1 ч', price: 2300, type: 'barber' },
        { id: 'b3', title: 'Коррекция воском (от 300р..)', time: '15 мин', price: 300, type: 'barber' },
        { id: 'b4', title: 'Королевское бритьё - (Опаской)', time: '45 мин', price: 1200, type: 'barber' },
        { id: 'b5', title: 'Детская стрижка', time: '30 мин', price: 1000, type: 'barber' },
        { id: 'b6', title: 'Оформление бороды', time: '30 мин', price: 1000, type: 'barber' },
        { id: 'b7', title: 'Камуфляж бороды', time: '1 ч', price: 1200, type: 'barber' },
        { id: 'b8', title: 'Друг+Друг', time: '1 ч', price: 2400, type: 'barber' },
        { id: 'b9', title: 'Папа+Сын', time: '1 ч', price: 2100, type: 'barber' },
        { id: 'b10', title: 'Уход за кожей лица', time: '15 мин', price: 800, type: 'barber' },
        { id: 'b11', title: 'Стрижка Ножницами (Удлиненная стрижка)', time: '1 ч', price: 1500, type: 'barber' },
        { id: 'b12', title: 'Стрижка машинкой (одна/две насадки)', time: '30 мин', price: 1000, type: 'barber' },
        { id: 'b13', title: 'Стрижка бороды и усов', time: '30 мин', price: 800, type: 'barber' },
        { id: 'b14', title: 'Бритье начисто шейвером', time: '30 мин', price: 1000, type: 'barber' },
        { id: 'b15', title: 'Укладка', time: '15 мин', price: 500, type: 'barber' },
        { id: 'b16', title: 'Укладка', time: '15 мин', price: 500, type: 'barber' },
        { id: 'b17', title: 'Студенческая стрижка (пн-ср)(с 12-00 до 16-00)', time: '45 мин', price: 1000, type: 'barber' },
        { id: 'b18', title: 'Стрижка "счастливые Часы" (пн-ср 12:00-16:00)', time: '45 мин', price: 1100, type: 'barber' }
    ]
};


const barbersData = [
    { id: 'b_al', name: 'Али', role: 'ТОП-БАРБЕР', photo: 'img/Ali.jpg', type: 'top' },
    { id: 'b_ben', name: 'Бенджо', role: 'Барбер', photo: 'img/Benjo.jpg', type: 'barber' },
    { id: 'b_ism', name: 'Исмаил', role: 'Барбер', photo: 'img/Ismail.jpg', type: 'barber' }
];

const allTimeSlots = ['10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '15:00', '16:00', '17:30', '18:00', '19:00'];
let mockBookedTimes = {};

function initMockData() {
    const today = new Date().toLocaleDateString('ru-RU');
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('ru-RU');
    mockBookedTimes = {
        'b_al': { [today]: ['10:30', '12:00', '16:00'], [tomorrow]: ['13:00'] },
        'b_ben': { [today]: ['11:00', '15:00'] },
        'b_ism': { [today]: ['13:00', '18:00'] }
    };
}

let cart = [];
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;
let currentUser = JSON.parse(localStorage.getItem('menfire_user')) || null;
let rawBookings = JSON.parse(localStorage.getItem('menfire_bookings')) || [];
// Добавляем статус, если его нет
rawBookings.forEach(b => { if (!b.status) b.status = 'active'; });
let bookings = rawBookings.filter(b => b && b.barber && b.appointmentDate && b.time);
let isProfileExpanded = false; // Новое состояние для Личного кабинета
let bookingToEdit = null;
let previousLevelName = null; 
let fromPromo = false;

// Функция для расчета уровней (от 0 до 6)
function getLevelInfo(count) {
    if (count < 10) return {
        level: "Бронзовый",
        nextLevel: "Серебряный",
        current: count,
        target: 10,
        base: 0,
        percent: 1
    };
    if (count < 20) return {
        level: "Серебряный",
        nextLevel: "Золотой",
        current: count - 10,
        target: 10,
        base: 10,
        percent: 2
    };
    return {
        level: "Золотой",
        nextLevel: "Максимум",
        current: 10,
        target: 10,
        base: 20,
        percent: 3
    };
}

function getPointsHistory() {
    const validVisits = bookings
        .filter(b => (b.status === 'active' || b.status === 'completed'))
        .filter(b => (b.total || 0) > 1000)
        .map(b => ({
            date: parseDate(b) || 0,
            dateStr: b.appointmentDate,
            barber: b.barber?.name || '—',
            total: b.total || 0,
            status: b.status
        }))
        .sort((a, b) => a.date - b.date);

    let runningPoints = 0;
    return validVisits.map((v, i) => {
        let rate;
        if (i < 10) rate = 0.01;
        else if (i < 20) rate = 0.02;
        else rate = 0.03;
        const points = Math.floor(v.total * rate);
        runningPoints += points;
        return { ...v, rate, points, runningPoints };
    });
}

function calculatePoints() {
    const history = getPointsHistory();
    return history.length > 0 ? history[history.length - 1].runningPoints : 0;
}

function openPointsHistory() {
    renderPointsHistory();
    document.getElementById('pointsHistoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderPointsHistory() {
    const list = document.getElementById('pointsHistoryList');
    const totalEl = document.getElementById('pointsHistoryTotal');
    if (!list) return;

    if (!currentUser) {
        list.innerHTML = `<div class="points-history-empty">Войдите, чтобы видеть историю начислений</div>`;
        if (totalEl) totalEl.style.display = 'none';
        return;
    }

    const history = getPointsHistory();
    if (history.length === 0) {
        list.innerHTML = `<div class="points-history-empty">Пока нет начислений.<br>Запишитесь на услугу от 1000 ₽</div>`;
        if (totalEl) totalEl.style.display = 'none';
        return;
    }

    const totalPoints = history[history.length - 1].runningPoints;
    const reversed = [...history].reverse();

    // Итог — отдельно, НАД скроллом
    if (totalEl) {
        totalEl.style.display = '';
        totalEl.innerHTML = `Всего накоплено: <span>${totalPoints} баллов</span>`;
    }

    // Записи — только они скроллятся
    list.innerHTML = reversed.map(item => `
        <div class="points-history-item">
            <div class="phi-left">
                <div class="phi-date">${item.dateStr}</div>
                <div class="phi-barber">${item.barber}</div>
                <div class="phi-detail">${item.total} ₽ × ${(item.rate * 100).toFixed(0)}%</div>
            </div>
            <div class="phi-points">+${item.points}</div>
        </div>
    `).join('');
}

// Рандомные приветствия на разных языках
const greetingsList = [
    (name) => `Здравствуйте, ${name}!`,
    (name) => `Hello, ${name}!`,
    (name) => `Bonjour, ${name}!`,
    (name) => `Hola, ${name}!`,
    (name) => `Ciao, ${name}!`,
    (name) => `Hallo, ${name}!`,
    (name) => `Приветствую, ${name}!`,
    (name) => `Salve, ${name}!`,
    (name) => `Olá, ${name}!`,
    (name) => `Hej, ${name}!`
];

window.addEventListener('DOMContentLoaded', () => {
    try {

        /* =========================================
        АВТООБНОВЛЕНИЕ ПРИЛОЖЕНИЯ (PWA)
        ========================================= */
        if ('serviceWorker' in navigator) {
            let refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (refreshing) return;
                window.location.reload();
                refreshing = true;
            });

            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js').then(reg => {
                    reg.onupdatefound = () => {
                        const installingWorker = reg.installing;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // Вместо confirm используем ваш красивый Toast
                                    showToast('Доступно обновление! Нажмите, чтобы обновить.', 'success', () => {
                                        installingWorker.postMessage({ type: 'SKIP_WAITING' });
                                    });
                                    // Через 2 секунды автоматически применяем обновление
                                    // (можно убрать, если хотите, чтобы пользователь сам нажимал)
                                    setTimeout(() => {
                                        installingWorker.postMessage({ type: 'SKIP_WAITING' });
                                    }, 2000);
                                }
                            }
                        };
                    };
                });
            });
        }
        // Принудительная проверка обновлений при возвращении на экран (для iOS)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistration().then(reg => {
                    if (reg) reg.update();
                });
            }
        });

        if (isStandalone && localStorage.getItem('menfire_just_installed') === 'true') {
            setTimeout(() => {
                showToast('Спасибо за установку!', 'success');
                localStorage.removeItem('menfire_just_installed');
            }, 4000); // Ждем 4 секунды, пока прогрузится приложение
        }

        initMockData();

        const splashGreeting = document.getElementById('splashGreeting');
        if (currentUser) {
            const randomGreetingFunc = greetingsList[Math.floor(Math.random() * greetingsList.length)];
            const text = randomGreetingFunc(currentUser.name);
            splashGreeting.innerHTML = text.replace(currentUser.name, `<span>${currentUser.name}</span>`);
        } else {
            splashGreeting.innerHTML = `Добро пожаловать в <span>MENSFIRE</span>`;
        }

        // Открываем приложение через 3.5 секунды
        setTimeout(() => {
            document.getElementById('splashScreen').classList.add('hidden');
            
            const appContainer = document.getElementById('appContainer');
            appContainer.classList.add('visible');
            
            // Запускаем анимацию вылета
            setTimeout(() => {
                appContainer.classList.add('animate-in'); 
            }, 50);

            // ВАЖНО: Удаляем класс через 1.5 секунды, 
            // чтобы он не мешал старой логике переключения вкладок (свайпам)
            setTimeout(() => {
                appContainer.classList.remove('animate-in');
            }, 1500);
            
            updateAuthUI();
            renderServices('top');
            renderMasters();
            initNavBubble();
            initPromoCarousel();
            renderNishmanProducts();
            
        }, 3500);

    } catch (error) {
        // Если случилась ошибка, принудительно открываем приложение
        console.error("Ошибка при загрузке:", error);
        document.getElementById('splashScreen').classList.add('hidden');
        document.getElementById('appContainer').classList.add('visible');
    }
});

        // Порядок вкладок для свайпов (слева направо)
const viewOrder = ['viewHome', 'viewBook', 'viewNishman', 'viewProfile'];

function switchView(viewId, navElement) {
    const currentView = document.querySelector('.view.active');
    if (currentView && currentView.id === viewId) return; // Если мы уже на этой вкладке, ничего не делаем

    let animationClass = 'slide-from-right'; // По умолчанию въезжает справа

    if (currentView) {
        const currentIndex = viewOrder.indexOf(currentView.id);
        const targetIndex = viewOrder.indexOf(viewId);
        // Если переключаемся на вкладку левее (например, с "Личный кабинет" на "Главную"), анимация слева
        if (currentIndex !== -1 && targetIndex !== -1 && targetIndex < currentIndex) {
            animationClass = 'slide-from-left';
        }
    }

    // Скрываем все вкладки
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active', 'slide-from-right', 'slide-from-left');
    });

    // Показываем новую с нужной анимацией
    const newView = document.getElementById(viewId);
    newView.classList.add('active', animationClass);

    // Убираем класс анимации после её завершения
    setTimeout(() => {
        newView.classList.remove('slide-from-right', 'slide-from-left');
    }, 400);

    // Обновляем нижнее меню
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    let targetNav = navElement;
    if (!targetNav) {
        // Если переключились свайпом, ищем нужную кнопку в меню по ID
        targetNav = document.getElementById('nav' + viewId.replace('view', ''));
    }

    if (targetNav) {
        targetNav.classList.add('active');
        updateNavBubble(targetNav);
    }

    const titleEl = document.getElementById('headerTitle');
    const titles = {
        'viewHome': 'Главная',
        'viewBook': 'Записаться',
        'viewNishman': 'Магазин', 
        'viewProfile': 'Профиль', 
        'viewBookings': 'Мои записи'
    };
    
    if (titleEl && titles[viewId]) {
        titleEl.innerText = titles[viewId];
        // Перезапускаем анимацию подчеркивания
        titleEl.classList.remove('animate-title');
        void titleEl.offsetWidth; // Форсируем перерасчет
        titleEl.classList.add('animate-title');
    }
    if (viewId === 'viewProfile') {
        document.body.classList.remove('header-hidden');
    } else {
        document.body.classList.add('header-hidden');
    }
    if (viewId === 'viewHome') {
        renderHomeScreen();
    }
    
    if (viewId === 'viewProfile') {
        renderProfileBookings();
    

        // --- АНИМАЦИЯ БЕГУЩИХ ЛИНИЙ В ПРОФИЛЕ ---
        const profileCard = document.querySelector('.profile-main-card');
        if (profileCard) {
            profileCard.classList.remove('animate-profile-border');
            void profileCard.offsetWidth; // Форсируем перерасчет (сбрасываем анимацию)
            profileCard.classList.add('animate-profile-border');
            
            // Убираем класс после завершения анимации (через 2.2 секунды)
            clearTimeout(window.profileAnimTimer);
            window.profileAnimTimer = setTimeout(() => {
                profileCard.classList.remove('animate-profile-border');
            }, 2200);
        }
    }
}

/* ==========================
    ЛОГИКА СВАЙПОВ (ЛИСТАНИЕ)
    ========================== */
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
    // ДОБАВЛЯЕМ .promo-carousel-wrapper в исключения
    if (e.target.closest('.date-grid') || e.target.closest('.booking-scroll-wrapper') || e.target.closest('.promo-carousel-wrapper')) return;
    
    if (e.target.closest('.date-grid') ||
        e.target.closest('.promo-carousel-wrapper') ||
        e.target.closest('.home-scroll-area') ||
        e.target.closest('.profile-history-scroll') ||
        e.target.closest('#viewProfile')) return; 

    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    // ДОБАВЬ .promo-carousel-wrapper СЮДА
    if (e.target.closest('.date-grid') || e.target.closest('.bookings-scroll-wrapper') || e.target.closest('.promo-carousel-wrapper')) return;

    if (e.target.closest('.date-grid') ||
        e.target.closest('.promo-carousel-wrapper') ||
        e.target.closest('.home-scroll-area') ||
        e.target.closest('.profile-history-scroll') ||
        e.target.closest('#viewProfile')) return; 

    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
}, { passive: true });

function handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Условия свайпа: смещение по X больше 50px, а по Y меньше 60px (чтобы не мешать скроллу)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60) {
        const currentView = document.querySelector('.view.active');
        if (!currentView) return;
        
        const currentIndex = viewOrder.indexOf(currentView.id);
        if (currentIndex === -1) return; // Если открыта вкладка "Мои записи" (её нет в меню), свайп не работает

        if (deltaX < 0) {
            // Свайп влево -> следующая вкладка
            if (currentIndex < viewOrder.length - 1) {
                switchView(viewOrder[currentIndex + 1], null);
            }
        } else {
            // Свайп вправо -> предыдущая вкладка
            if (currentIndex > 0) {
                switchView(viewOrder[currentIndex - 1], null);
            }
        }
    }
}

function updateNavBubble(el, isInit = false) {
    const bubble = document.getElementById('navBubble');
    const nav = document.getElementById('bottomNav');
    if (!bubble || !nav || !el) return;
    
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const padX = 0; 
    const padY = 0;
    
    if (isInit) {
        bubble.style.width = (elRect.width + padX * 2) + 'px';
        bubble.style.height = (elRect.height + padY * 2) + 'px';
        bubble.style.left = (elRect.left - navRect.left - padX) + 'px';
        bubble.style.top = (elRect.top - navRect.top - padY) + 'px';
        return;
    }

    // Сбрасываем предыдущие таймеры, чтобы не было багов при быстрых кликах
    clearTimeout(window.bubbleTimer1);
    clearTimeout(window.bubbleTimer2);

    // --- ЭТАП 1: Раздуваем пузырь на месте (100мс, было 150мс) ---
    bubble.classList.remove('squashing');
    bubble.classList.add('expanding');

    // --- ЭТАП 2: Начинаем движение (через 100мс) ---
    window.bubbleTimer1 = setTimeout(() => {
        bubble.style.width = (elRect.width + padX * 2) + 'px';
        bubble.style.height = (elRect.height + padY * 2) + 'px';
        bubble.style.left = (elRect.left - navRect.left - padX) + 'px';
        bubble.style.top = (elRect.top - navRect.top - padY) + 'px';

        // Синхронизируем прыжок иконки
        const currentActive = document.querySelector('.nav-item.active');
        if (currentActive) {
            const svg = currentActive.querySelector('svg');
            if (svg) {
                svg.classList.remove('bounce');
                void svg.offsetWidth; 
                svg.classList.add('bounce');
                setTimeout(() => svg.classList.remove('bounce'), 300);
            }
        }
    }, 100);

    // --- ЭТАП 3: Плюх при приземлении (через 100 + 250 = 350мс) ---
    window.bubbleTimer2 = setTimeout(() => {
        bubble.classList.remove('expanding'); // Убираем вертикальное растяжение
        bubble.classList.add('squashing');    // Включаем "плюх"

        // Убираем плюх через 150мс, чтобы он плавно вернулся в исходные размеры
        setTimeout(() => {
            bubble.classList.remove('squashing');
        }, 150);

    }, 350); 
}

function initNavBubble() {
    const bubble = document.getElementById('navBubble');
    const activeNav = document.querySelector('.nav-item.active');
    if (!bubble || !activeNav) return;

    bubble.classList.remove('expanding');
    bubble.classList.remove('squashing');
    

    bubble.style.transition = 'none';
    updateNavBubble(activeNav, true);
    void bubble.offsetWidth; 
    bubble.style.transition = '';
}

    /* ==========================
    ЛОГИКА ГЛАВНОГО ЭКРАНА
    ========================== */
function renderHomeScreen() {
    renderHomeLevel();
    renderHomeBookings();
}

function renderHomeLevel() {
    const circle = document.getElementById('homeProgressCircle');
    const circleText = document.getElementById('homeProgressText');
    const statusText = document.getElementById('homeStatStatusText');
    const statusSub = document.getElementById('homeStatStatusSub');
    const levelCard = document.querySelector('.home-level-card');
    const levelInfo = document.querySelector('.home-level-info');

    if (!currentUser) {
        statusText.innerText = "Гость";
        statusSub.innerText = "Войдите, чтобы копить визиты";
        circle.style.strokeDashoffset = 100;
        circleText.innerText = "0/0";
        levelCard.style.setProperty('--level-color', '#555555');
        levelInfo?.querySelector('.status-points')?.remove();
        return;
    }

    // Считаем только визиты с суммой > 1000₽
    const validVisitsCount = bookings.filter(b =>
        (b.status === 'active' || b.status === 'completed') &&
        (b.total || 0) > 1000
    ).length;

    const info = getLevelInfo(validVisitsCount);
    const points = calculatePoints();

    // --- Анимация бегущей линии (без изменений) ---
    const isHomeActive = document.getElementById('viewHome').classList.contains('active');
    if (isHomeActive && previousLevelName !== info.level) {
        levelCard.classList.remove('animate-border');
        void levelCard.offsetWidth;
        levelCard.classList.add('animate-border');
        previousLevelName = info.level;
        clearTimeout(window.lineAnimTimer);
        window.lineAnimTimer = setTimeout(() => {
            levelCard.classList.remove('animate-border');
        }, 3000);
    } else if (isHomeActive) {
        levelCard.classList.remove('animate-border');
    } else {
        levelCard.classList.remove('animate-border');
    }

    // --- Цвета: 3 уровня ---
    const isLight = document.documentElement.classList.contains('light-theme');

    const levelColorsDark = {
        "Бронзовый":  "#CD7F32",
        "Серебряный": "#C0C0C0",
        "Золотой":    "#D4AF37"
    };

    const levelColorsLight = {
        "Бронзовый":  "#A65D26",
        "Серебряный": "#8C8C8C",
        "Золотой":    "#C79A2A"
    };

    const currentColor = (isLight ? levelColorsLight[info.level] : levelColorsDark[info.level]) || "#D4AF37";
    levelCard.style.setProperty('--level-color', currentColor);

    statusText.innerText = info.level;
    statusSub.innerText = `Кэшбэк ${info.percent}%`;
    // --- Баллы в карточке уровня ---
    levelInfo?.querySelector('.status-points')?.remove();
    if (levelInfo) {
        const pointsEl = document.createElement('div');
        pointsEl.className = 'status-points';
        pointsEl.innerHTML = `<span class="points-icon">💎</span>${points} баллов`;
        pointsEl.onclick = (e) => { e.stopPropagation(); openPointsHistory(); };
        levelInfo.appendChild(pointsEl);
    }
    // --- Прогресс-круг ---
    const radius = 42, circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    const progress = info.current / info.target;
    circle.style.strokeDashoffset = circumference - (progress * circumference);

        if (info.level === "Золотой") {
        circle.style.strokeDashoffset = 0;
        circleText.innerText = "MAX";
    } else {
        circleText.innerText = `${info.current}/${info.target}`;
    }
    // Убеждаемся, что текст внутри круга активен
    circleText.style.display = "block"; 
}

function renderHomeBookings() {
    const list = document.getElementById('homeHistoryList');
    
    const activeBookings = bookings.filter(b => b.status === 'active').sort((a,b) => parseDate(a) - parseDate(b));

    // Если пользователь не авторизован
    if (!currentUser) {
        list.innerHTML = `<div class="empty-bookings-msg" style="font-size:13px;">Войдите, чтобы видеть записи</div>`;
        return;
    }

    // Если записей нет — показываем случайную фразу
    if (activeBookings.length === 0) {
        const funPhrases = [
            "Как насчёт свежей стрижки? 💈",
            "Твой любимый барбер уже скучает 🥺",
            "Пора обновить причёску? ✂️",
            "Самое время заглянуть на огонёк ☕️",
            "Борода заросла? Мы это исправим! 🧔",
            "Подари себе час релакса 💆‍♂️",
            "Хочешь выглядеть на все 100%? 😎",
            "Свободные слоты уже ждут тебя 📅",
            "Время привести голову в порядок! 🧢",
            "Запишись, пока все места не разобрали! 🔥",
            "Зеркало уже заждалось твоей новой стрижки 🪞",
            "Хорошая стрижка добавляет +10 к уверенности 🕶️",
            "Утро добрым не бывает без похода к барберу ☕",
            "Наш барбер — психолог, только с ножницами ✂️🧠",
            "Причёска шепчет: «Помоги мне» 👋",
            "Новый образ ждёт тебя, как старый друг 🫂",
            "Меньше слов, больше стиля! 🚀",
            "Отрастил бороду — не забудь про уход 🧴",
            "Пока пусто, но это легко исправить! 👇",
            "Время стать лучшей версией себя ⭐",
            "Хочешь причёску как у модели из журнала? Мы поможем 📸",
            "Стрижка — лучшая инвестиция в себя 📈",
            "Приведи голову в порядок — и мысли тоже 🧠",
            "Твои волосы заслуживают лучшего ✨",
            "Готов к комплиментам в свой адрес? 😉",
            "У нас пахнет кофе, деревом и хорошим настроением ☕🪵",
            "Кресло барбера уже прогрето для тебя 💺",
            "Музыка играет, машинка жужжит — все на месте 🎶",
            "Говорят, у нас лучшие барберы в городе... Проверишь? 🏆",
            "Идеальная стрижка начинается с записи 📲",
            "Борода — это искусство, а мы — художники 🎨",
            "Пора подравнять растительность на лице 🌿",
            "Твоя борода скажет спасибо 🧔‍♂️",
            "Не дай волосам победить в этой битве ⚔️",
            "Волосы отрастут, а записаться можно прямо сейчас ⏳",
            "Запись откладывается только на завтра, а стрижка нужна сегодня 📅",
            "Хочешь выглядеть дороже, чем твоя машина? Легко! 🚗💸",
            "Начни новую жизнь с понедельника, а стрижку сделай сегодня 🚀",
            "Барбершоп — место, где можно помолчать и просто кайфануть 🧘‍♂️",
            "Твой внутренний стиляга требует выхода наружу! 🕺"
    ];
       clearInterval(window.emptyPhrasesTimer);

        // Функция для смены фразы
        const changePhrase = () => {
            const msgDiv = document.querySelector('.empty-bookings-msg');
            if (!msgDiv) return; // Если пользователь уже ушёл с экрана

            // Плавно скрываем текущий текст
            msgDiv.style.opacity = '0';
            msgDiv.style.transform = 'translateY(-10px)';

            // Ждем 300мс, пока пройдет анимация скрытия, и меняем текст
            setTimeout(() => {
                const randomPhrase = funPhrases[Math.floor(Math.random() * funPhrases.length)];
                msgDiv.innerText = randomPhrase;
                
                // Плавно показываем новый текст
                msgDiv.style.opacity = '1';
                msgDiv.style.transform = 'translateY(0)';
            }, 300);
        };

        // 2. ВЫВОДИМ ПЕРВУЮ ФРАЗУ СРАЗУ
        const initialPhrase = funPhrases[Math.floor(Math.random() * funPhrases.length)];
        list.innerHTML = `<div class="empty-bookings-msg">${initialPhrase}</div>`;

        // 3. ЗАПУСКАЕМ ТАЙМЕР НА 5 СЕКУНД (5000 мс)
        window.emptyPhrasesTimer = setInterval(changePhrase, 15000);

        return;
    } else {
        // Если записи есть, очищаем таймер, чтобы он не тратил ресурсы
        clearInterval(window.emptyPhrasesTimer);
    
    }

    // Создаем карточку (кнопка справа)
    const createHTML = (b) => `
        <div class="home-booking-item" style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <div class="hb-info" style="flex-grow: 1; min-width: 0;">
                <div class="hb-date">${b.appointmentDate} в ${b.time}</div>
                <div class="hb-master">Мастер: ${b.barber.name}</div>
                <div class="hb-services">${b.services.map(s => s.title).join(', ')}</div>
            </div>
            <button class="btn-cancel-small" onclick="openActionModal(${b.id})">Отменить</button>
        </div>
    `;
    
    list.innerHTML = activeBookings.map(createHTML).join('');
}


function toggleProfileBookings() {
    isProfileExpanded = !isProfileExpanded;

    const card = document.getElementById('profileMainCard');
    if (!card) return;
    // Элементы, чьё положение в потоке меняется из-за flex-wrap.
    const tracked = [
        card.querySelector('.profile-avatar-gold'),
        card.querySelector('.profile-info'),
        card.querySelector('.profile-contact-block') // <-- ДОБАВИЛИ БЛОК ТЕЛЕФОНОВ
    ].filter(Boolean);
    // 1. FIRST — запоминаем позиции ДО изменения layout
    const first = tracked.map(el => el.getBoundingClientRect());

    // 2. Временно отключаем ВСЕ transition у профиля,
    //    чтобы переключение класса произошло мгновенно и мы прочли честный LAST
    const blocker = document.createElement('style');
    blocker.id = '__profile_flip_block__';
    blocker.textContent = '#profileMainCard, #profileMainCard * { transition: none !important; }';
    document.head.appendChild(blocker);

    // 3. Меняем класс — layout перестраивается мгновенно
    if (isProfileExpanded) card.classList.add('collapsed');
    else                   card.classList.remove('collapsed');

    // 4. Форсируем reflow, чтобы браузер применил новые размеры
    void card.offsetHeight;

    // 5. LAST — читаем новые позиции (без анимаций)
    const last = tracked.map(el => el.getBoundingClientRect());

    // 6. Возвращаем transition (для размеров) — но пока НЕ включаем на transform
    blocker.remove();

    // 7. FLIP: сдвигаем элементы обратно в старую позицию через transform,
    //    затем плавно возвращаем в 0. Это и есть «переезд».
    tracked.forEach((el, i) => {
        const dx = first[i].left - last[i].left;
        const dy = first[i].top  - last[i].top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

        // Инлайново отключаем CSS-transition именно на transform,
        // чтобы не было конфликта с CSS-transition на width/height/font-size
        el.style.transition = 'none';
        el.style.transform  = `translate(${dx}px, ${dy}px)`;

        // Двойной rAF — гарантирует, что браузер увидел стартовый transform
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                el.style.transform  = 'translate(0, 0)';
            });
        });
    });

    // 8. Чистим инлайн-стили после окончания FLIP
    clearTimeout(window.profileFlipTimer);
    window.profileFlipTimer = setTimeout(() => {
        tracked.forEach(el => {
            el.style.transition = '';
            el.style.transform  = '';
        });
    }, 450);

    renderProfileBookings();
}
function renderProfileBookings() {
    const list = document.getElementById('profileHistoryList');
    const scrollArea = document.getElementById('profileBookingsScroll');
    const toggleBtn = document.getElementById('profileToggleBtn');

    // Если нет записей
    if (!currentUser || bookings.length === 0) {
        list.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-size:13px; padding: 10px 0;">Нет записей</div>`;
        toggleBtn.style.display = 'none';
        scrollArea.classList.remove('expanded');
        return;
    }

    // Сортируем (сначала новые)
    const sorted = [...bookings].sort((a,b) => parseDate(b) - parseDate(a));
    const total = sorted.length;

    // Определяем, сколько записей показывать
    // Если раскрыто — все, если нет — максимум 3
    const displayCount = isProfileExpanded ? total : Math.min(2, total);
    const displayBookings = sorted.slice(0, displayCount);

    const createHTML = (b) => {
        // Авто-обновление статуса
        if (b.status === 'active' && parseDate(b) < Date.now()) {
            b.status = 'completed';
            localStorage.setItem('menfire_bookings', JSON.stringify(bookings));
        }

        let badgeHTML = '';
        let itemClass = '';
        
        if (b.status === 'active') badgeHTML = `<div class="status-badge active">Активная</div>`;
        else if (b.status === 'completed') { badgeHTML = `<div class="status-badge completed">Завершена</div>`; itemClass = 'completed'; }
        else if (b.status === 'cancelled') { badgeHTML = `<div class="status-badge cancelled">Отменена</div>`; itemClass = 'cancelled'; }

        // Используем тот же класс карточки, что и на главной (без кнопки отмены)
        return `
            <div class="home-booking-item ${itemClass}" style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                <div class="hb-info" style="flex-grow: 1; min-width: 0;">
                    ${badgeHTML}
                    <div class="hb-date">${b.appointmentDate} в ${b.time}</div>
                    <div class="hb-master">Мастер: ${b.barber.name}</div>
                    <div class="hb-services">${b.services.map(s => s.title).join(', ')}</div>
                </div>
            </div>
        `;
    };

    // Выводим записи
    list.innerHTML = displayBookings.map(createHTML).join('');

    // Настраиваем высоту и стрелку
    if (total >= 3) {
        // Если 4 и больше — показываем стрелку
        toggleBtn.style.display = 'flex';
        
        if (isProfileExpanded) {
            // РАСКРЫТО: стрелка вверх, скролл включен, рендерим все
            toggleBtn.classList.add('expanded');
            scrollArea.classList.add('expanded');
        } else {
            // СВЕРНУТО: стрелка вниз, скролла нет, рендерим 3
            toggleBtn.classList.remove('expanded');
            scrollArea.classList.remove('expanded');
        }
    } else {
        // Если 1, 2 или 3 записи — стрелку прячем, высота подстраивается автоматически
        toggleBtn.style.display = 'none';
        scrollArea.classList.remove('expanded');
    }
}

function goHomeFromHeader() {
    const homeView = document.getElementById('viewHome');
    // Переключаем только если мы НЕ на главной странице
    if (!homeView.classList.contains('active')) {
        switchView('viewHome', document.getElementById('navHome'));
    }
}

function showToast(message, type = 'info', onClick = null) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type==='error'?'⚠️':type==='success'?'✅':'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    if (onClick) {
        toast.style.cursor = 'pointer';
        toast.onclick = () => { onClick(); toast.remove(); };
    }

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function renderServices(category) {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';
    servicesData[category].forEach(service => {
        const isSelected = cart.some(item => item.id === service.id);
        const card = document.createElement('div');
        card.className = `service-card ${isSelected ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="checkbox"></div>
            <div>
                <h3>${service.title}</h3>
                <div class="time">${service.time}</div>
            </div>
            <div class="price">${service.price} ₽</div>
        `;
        card.onclick = () => toggleService(service);
        grid.appendChild(card);
    });
}

function filterServices(category, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderServices(category);
    checkMasterAvailability();
}

function toggleService(service) {
    const index = cart.findIndex(item => item.id === service.id);
    
    if (index === -1) {
        if (cart.length > 0 && cart[0].type !== service.type) {
            cart = [];
            selectedBarber = null;
        }
        cart.push(service);
    } else {
        cart.splice(index, 1);
    }
    
    renderServices(service.type);
    checkMasterAvailability();

    // Если услугу ДОБАВИЛИ (а не убрали)
    if (index === -1) {
        if (service.type === 'top') {
            // Если это ТОП-услуга — ВСЕГДА скроллим вниз к Али
            setTimeout(() => {
                const viewBook = document.getElementById('viewBook');
                const mastersGrid = document.getElementById('mastersGrid');
                if (viewBook && mastersGrid) {
                    viewBook.scrollTo({ 
                        top: mastersGrid.offsetTop - 60, // 60px отступ сверху
                        behavior: 'smooth' 
                    });
                }
            }, 150);
        } else {
            // Для обычных услуг Барбера:
            if (selectedBarber) {
                // Если мастер УЖЕ выбран — сразу открываем корзину
                openDrawer();
            } else {
                // Если мастера нет — скроллим к блоку с мастерами
                setTimeout(() => {
                    const viewBook = document.getElementById('viewBook');
                    const mastersGrid = document.getElementById('mastersGrid');
                    if (viewBook && mastersGrid) {
                        viewBook.scrollTo({ 
                            top: mastersGrid.offsetTop - 60, 
                            behavior: 'smooth' 
                        });
                    }
                }, 150);
            }
        }
    }
}

function renderMasters() {
    const grid = document.getElementById('mastersGrid');
    grid.innerHTML = '';
    const hasTopService = cart.some(item => item.type === 'top');
    const hasBarberService = cart.some(item => item.type === 'barber');

    barbersData.forEach(barber => {
        if (hasTopService && !hasBarberService && barber.type !== 'top') return;
        if (hasBarberService && !hasTopService && barber.id === 'b_al') return;
        if (hasTopService && hasBarberService && barber.type !== 'top') return;

        const card = document.createElement('div');
        card.className = `master-card ${selectedBarber?.id === barber.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="master-img">
                <img src="${barber.photo}" alt="${barber.name}">
            </div>
            <h3>${barber.name}</h3>
            <p>${barber.role}</p>
        `;
        card.onclick = () => selectBarber(barber);
        grid.appendChild(card);
    });
}

function selectBarber(barber) {
    if (selectedBarber?.id !== barber.id) selectedTime = null;
    selectedBarber = barber;
    renderMasters();

    if (cart.length > 0) {
        // Если услуги уже выбраны, открываем корзину
        openDrawer();
    } else {
        // Если клиент выбрал мастера ПЕРВЫМ (услуг еще нет)
        showToast(`Выберите услуги для ${barber.name}`, 'info');
        
        const targetTab = document.querySelector(`.tab-btn[onclick*="'${barber.type}'"]`);
        if (targetTab) {
            filterServices(barber.type, targetTab);
        }
        
        // Плавно скроллим ВВЕРХ к списку услуг
        setTimeout(() => {
            const viewBook = document.getElementById('viewBook');
            const servicesSection = document.querySelector('.category-tabs');
            if (viewBook && servicesSection) {
                viewBook.scrollTo({ 
                    top: servicesSection.offsetTop - 20, // Отступ сверху
                    behavior: 'smooth' 
                });
            }
        }, 150);
    }
}

function checkMasterAvailability() {
    const hasTop = cart.some(item => item.type === 'top');
    if (hasTop) {
        const ali = barbersData.find(b => b.id === 'b_al');
        if (selectedBarber?.id !== 'b_al') { selectedBarber = ali; selectedTime = null; }
    } else if (selectedBarber?.id === 'b_al' && cart.length > 0) {
        selectedBarber = null; selectedTime = null;
    }
    renderMasters();
    updateCartUI();
}

function openDrawer() {
    if (cart.length === 0) return showToast("Выберите хотя бы одну услугу", "error");
    document.getElementById('drawer').classList.add('active');
    document.getElementById('drawerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';

    updateCartUI();
    renderDates();
    updateTimeOptions();
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
    document.getElementById('drawerOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function updateCartUI() {
    const list = document.getElementById('selectedServicesList');
    list.innerHTML = cart.map(item => `<div class="selected-item"><span>${item.title}</span><b>${item.price} ₽</b></div>`).join('');
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('totalPrice').innerText = `${sum} ₽`;
}

        // Проверяет, есть ли на выбранный день хотя бы один доступный слот
function hasAvailableTimeForDate(dateStr) {
    const now = new Date();
    const todayStr = now.toLocaleDateString('ru-RU');
    
    // Если это будущий день, считаем, что время есть (занятость конкретного времени проверится позже)
    if (dateStr !== todayStr) return true;

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    for (let time of allTimeSlots) {
        const [h, min] = time.split(':').map(Number);
        // Если время еще не прошло
        if (h > currentHour || (h === currentHour && min > currentMinute)) {
            // Если мастер выбран, проверяем, не занято ли это время
            if (selectedBarber) {
                const booked = (mockBookedTimes[selectedBarber.id] && mockBookedTimes[selectedBarber.id][dateStr]) || [];
                if (!booked.includes(time)) return true; // Есть свободное время
            } else {
                return true; // Если мастер не выбран, считаем время доступным
            }
        }
    }
    return false; // Все время прошло или занято
}

function renderDates() {
    const container = document.getElementById('dateOptions');
    container.innerHTML = '';
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const now = new Date();
    
    let daysAdded = 0;
    let offset = 0;
    
    // Ищем, пока не наберем 20 доступных дней
    while (daysAdded < 20) {
        const d = new Date();
        d.setDate(now.getDate() + offset);
        const dateStr = d.toLocaleDateString('ru-RU');
        
        // Если на этот день еще есть время — добавляем его
        if (hasAvailableTimeForDate(dateStr)) {
            const dayName = (offset === 0) ? 'Сегодня' : (offset === 1) ? 'Завтра' : days[d.getDay()];
            const div = document.createElement('div');
            div.className = `date-opt ${selectedDate === dateStr ? 'selected' : ''}`;
            div.innerHTML = `<div style="font-size:10px; opacity:0.7;">${dayName}</div><div style="font-size:15px; font-weight:bold;">${d.getDate()}</div>`;
            
            div.onclick = () => { 
                selectedDate = dateStr; 
                selectedTime = null; 
                renderDates(); 
                updateTimeOptions(); 
            };
            
            container.appendChild(div);
            daysAdded++;
        }
        
        offset++;
        
        // Защита от бесконечного цикла (на случай, если барбер не работает 2 месяца)
        if (offset > 60) break; 
    }
    
    // Если выбранная ранее дата исчезла (например, сегодня уже 20:00), автоматически выбираем первый день
    if (!selectedDate || !container.querySelector('.selected')) {
        const firstOpt = container.querySelector('.date-opt');
        if (firstOpt) firstOpt.click();
    }
}

function updateTimeOptions() {
    const container = document.getElementById('timeOptions');
    container.innerHTML = '';
    if (!selectedBarber) return container.innerHTML = '<div style="font-size:13px; color:#888; grid-column: 1/-1;">Сначала выберите мастера</div>';

    const booked = (mockBookedTimes[selectedBarber.id] && mockBookedTimes[selectedBarber.id][selectedDate]) || [];
    
    const now = new Date();
    const todayStr = now.toLocaleDateString('ru-RU');
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let hasVisibleSlots = false; // Флаг, есть ли хоть одно время

    allTimeSlots.forEach(time => {
        const isBooked = booked.includes(time);
        
        let isPast = false;
        if (selectedDate === todayStr) {
            const [h, min] = time.split(':').map(Number);
            if (h < currentHour || (h === currentHour && min <= currentMinute)) {
                isPast = true;
            }
        }

        // Если время прошло — просто пропускаем (не рисуем)
        if (isPast) return;

        hasVisibleSlots = true;
        const div = document.createElement('div');
        div.className = `time-opt ${selectedTime === time ? 'selected' : ''} ${isBooked ? 'disabled' : ''}`;
        div.innerText = time;
        
        if (!isBooked) {
            div.onclick = () => { selectedTime = time; updateTimeOptions(); };
        }
        container.appendChild(div);
    });

    // Если на этот день свободного времени не осталось (например, всё занято или прошло)
    if (!hasVisibleSlots) {
        container.innerHTML = '<div style="font-size:13px; color:#888; grid-column: 1/-1; text-align: center;">Нет доступного времени</div>';
    }
}

function startCheckout() {
    if (!selectedBarber) return showToast("Выберите мастера", "error");
    if (!selectedDate) return showToast("Выберите дату", "error");
    if (!selectedTime) return showToast("Выберите время", "error");
    if (!currentUser) { closeDrawer(); openAuth(); return; }
    completeBooking();
}

function completeBooking() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    if (!mockBookedTimes[selectedBarber.id]) mockBookedTimes[selectedBarber.id] = {};
    if (!mockBookedTimes[selectedBarber.id][selectedDate]) mockBookedTimes[selectedBarber.id][selectedDate] = [];
    mockBookedTimes[selectedBarber.id][selectedDate].push(selectedTime);

    const newBooking = {
        id: Date.now(),
        services: [...cart],
        barber: selectedBarber,
        time: selectedTime,
        appointmentDate: selectedDate,
        total: total,
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'active'
    };

    bookings.push(newBooking);
    localStorage.setItem('menfire_bookings', JSON.stringify(bookings));
    cart = []; selectedBarber = null; selectedTime = null; selectedDate = null;

    renderServices('top'); checkMasterAvailability(); closeDrawer();
    document.getElementById('successModal').classList.add('active');
    renderHomeScreen();
    renderProfileBookings();
}

function goToCabinetFromSuccess() {
    document.getElementById('successModal').classList.remove('active');
    switchView('viewProfile', document.getElementById('navProfile'));
    updateAuthUI();
    fromPromo = false;
}
function closeSuccessAndGoHome() {
    document.getElementById('successModal').classList.remove('active');
    
    if (fromPromo) {
        switchView('viewHome', document.getElementById('navHome'));
        fromPromo = false; // Сбрасываем флаг
    } else {
        switchView('viewBook', document.getElementById('navBook'));
    }
}

function openAuth() {
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function handleAuth(event) {
    event.preventDefault();
    document.getElementById('authModal').classList.remove('active');
    document.getElementById('smsModal').classList.add('active');
}
function verifySms() {
    if (document.getElementById('smsCode').value === '1234') {
        currentUser = { name: document.getElementById('regName').value, phone: document.getElementById('regPhone').value };
        localStorage.setItem('menfire_user', JSON.stringify(currentUser));
        document.getElementById('smsModal').classList.remove('active');
        document.body.style.overflow = '';
        updateAuthUI();
        if (cart.length > 0) completeBooking();
        else showToast('Вы успешно вошли!', 'success');
    } else showToast("Неверный код", "error");
}
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtnProfile');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) loginBtn.style.display = currentUser ? 'none' : 'block';
    if (logoutBtn) logoutBtn.style.display = currentUser ? 'block' : 'none';
    
    const userPhoneRow = document.getElementById('profileUserPhoneRow');
    const userPhoneVal = document.getElementById('profileUserPhoneVal');
    if (currentUser) {
        document.getElementById('profileHeader').innerHTML = `
            <div class="profile-avatar-gold">
                <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div class="profile-info">
                <h1>${currentUser.name}</h1>
                <p>Клиент MENSFIRE</p>
            </div>
        `;
        
        // Показываем номер пользователя
        if (userPhoneRow && userPhoneVal) {
            userPhoneRow.style.display = 'flex';
            userPhoneVal.innerText = currentUser.phone;
            userPhoneRow.setAttribute('onclick', `copyPhoneNumber('${currentUser.phone}')`);
        }
    } else {
        document.getElementById('profileHeader').innerHTML = `
            <div class="profile-avatar-gold">
                <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div class="profile-info">
                <h1>Гость</h1>
                <p>Войдите, чтобы видеть записи</p>
            </div>
        `;
        
        // Скрываем номер пользователя, если он не авторизован
        if (userPhoneRow) userPhoneRow.style.display = 'none';
    }
    renderHomeScreen();
    renderProfileBookings();
}

function logout() {
    localStorage.removeItem('menfire_user'); currentUser = null;
    previousLevelName = null; 
    updateAuthUI();
    switchView('viewBook', document.getElementById('navBook'));
    showToast('Вы вышли', 'info');
}

function parseDate(b) {
    if (!b.appointmentDate) return Infinity;
    const [d,m,y] = b.appointmentDate.split('.'); const [h,min] = b.time.split(':');
    return new Date(y, m-1, d, h, min).getTime();
}

function openActionModal(id) {
    bookingToEdit = bookings.find(b => b.id === id);
    document.getElementById('actionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeActionModal() {
    document.getElementById('actionModal').classList.remove('active');
    document.body.style.overflow = '';
}
function rescheduleBooking() {
    if (!bookingToEdit) return;
    
    // Переносим услуги и мастера в корзину
    cart = [...bookingToEdit.services]; 
    selectedBarber = bookingToEdit.barber;
    
    // Удаляем старую запись
    bookings = bookings.filter(b => b.id !== bookingToEdit.id);
    localStorage.setItem('menfire_bookings', JSON.stringify(bookings));
    
    closeActionModal();
    
    // Обновляем экраны (вместо удаленной renderBookings)
    renderHomeScreen(); 
    renderProfileBookings(); 
    updateAuthUI();
    
    // Перекидываем на вкладку Записаться и открываем корзину
    switchView('viewBook', document.getElementById('navBook'));
    setTimeout(openDrawer, 300);
}
function confirmCancel() {
    if (!bookingToEdit) return;
    
    // Вместо удаления меняем статус на "Отменена"
    const index = bookings.findIndex(b => b.id === bookingToEdit.id);
    if (index !== -1) {
        bookings[index].status = 'cancelled';
    }
    localStorage.setItem('menfire_bookings', JSON.stringify(bookings));
    
    closeActionModal();
    
    // Очищаем текущую запись, чтобы модалка при следующем открытии работала корректно
    bookingToEdit = null; 
    
    renderHomeScreen(); 
    renderProfileBookings(); 
    updateAuthUI();
    showToast('Запись отменена', 'success');
}

window.addEventListener('resize', () => {
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) updateNavBubble(activeNav, true);
});

function copyPhoneNumber(phone) {
    // Если аргумент не передан — копируем номер из шапки (кнопка справа вверху)
    const phoneToCopy = phone || "+7 927 789-56-21";

    navigator.clipboard.writeText(phoneToCopy).then(() => {
        showToast("Номер скопирован!", "success");
    }).catch(err => {
        showToast("Не удалось скопировать", "error");
    });
}

    /* =========================================
    КАРУСЕЛЬ АКЦИЙ (БЕСКОНЕЧНАЯ)
    ========================================= */
const promosData = [
    // ТОП-БАРБЕР
    { type: 'top', title: "Папа + Сын", desc: "Скидка 200 ₽", oldPrice: "2700", price: "2500", icon: "👨‍👦", serviceId: "t9", barberId: "b_al" },
    { type: 'top', title: "Друг + Друг", desc: "Приведи друга", oldPrice: "3000", price: "2800", icon: "🤝", serviceId: "t8", barberId: "b_al" },
    { type: 'top', title: "Стрижка + Борода", desc: "Комплекс", oldPrice: "2700", price: "2500", icon: "✂️", serviceId: "t4", barberId: "b_al" },
    
    // БАРБЕР
    { type: 'barber', title: "Папа + Сын", desc: "Скидка 200 ₽", oldPrice: "2300", price: "2100", icon: "👨‍👦", serviceId: "b9", barberId: "b_ben" },
    { type: 'barber', title: "Друг + Друг", desc: "Приведи друга", oldPrice: "2600", price: "2400", icon: "🤝", serviceId: "b8", barberId: "b_ben" },
    { type: 'barber', title: "Счастливые часы", desc: "Пн-Ср 12:00-16:00", oldPrice: "1300", price: "1100", icon: "⏰", serviceId: "b18", barberId: "b_ben" }
];
        // --- ЛОГИКА АКЦИЙ (ТАБЫ + БЕСКОНЕЧНАЯ КАРУСЕЛЬ + КОРЗИНА) ---
let currentPromoType = 'top';

function initPromoCarousel() {
    renderPromos(currentPromoType);
}

function renderPromos(type) {
    const track = document.getElementById('promoTrack');
    if (!track) return;

    const filteredPromos = promosData;

    let cardsHTML = '';
    for (let i = 0; i < 3; i++) {
        filteredPromos.forEach((promo) => {
            cardsHTML += createPromoHTML(promo);
        });
    }

    track.innerHTML = cardsHTML;
    const items = track.querySelectorAll('.promo-item');

    // Подсветка центральной карточки
    const setActivePromo = () => {
        if (!items.length) return;
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        let closestItem = null, minDist = Infinity;
        items.forEach(item => {
            const r = item.getBoundingClientRect();
            const d = Math.abs(centerX - (r.left + r.width / 2));
            if (d < minDist) { minDist = d; closestItem = item; }
        });
        items.forEach(item => item.classList.remove('is-active-card'));
        if (closestItem) {
            void closestItem.offsetWidth;
            closestItem.classList.add('is-active-card');
        }
    };

    // 3D-эффект
    const update3DEffect = () => {
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        items.forEach(item => {
            const r = item.getBoundingClientRect();
            const distance = centerX - (r.left + r.width / 2);
            const offset = distance / (trackRect.width / 2);
            const absOffset = Math.min(Math.abs(offset), 1.5);
            const rotateY = offset * -15;
            const translateY = absOffset * 15;
            const scale = 1 - (absOffset * 0.1);
            const opacity = 1 - (absOffset * 0.3);
            const zIndex = 10 - Math.round(absOffset * 10);
            item.style.transform = `translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
            item.style.opacity = Math.max(opacity, 0.3);
            item.style.zIndex = zIndex;
        });
    };

    setTimeout(() => {
        update3DEffect();
        setActivePromo();
    }, 50);

    // Ширина одной копии (3 карточки + 3 gap)
    let singleSetWidth = 0;
    if (items.length > filteredPromos.length) {
        const firstItem = items[0];
        const firstItemOfSecondSet = items[filteredPromos.length];
        singleSetWidth = firstItemOfSecondSet.offsetLeft - firstItem.offsetLeft;
    }

    // ===== Хелперы =====
    function getCenterIndex() {
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        let closest = 0, minDist = Infinity;
        items.forEach((item, i) => {
            const r = item.getBoundingClientRect();
            const d = Math.abs(centerX - (r.left + r.width / 2));
            if (d < minDist) { minDist = d; closest = i; }
        });
        return closest;
    }

    function smoothScrollTo(el, target, duration, onDone) {
        const start = el.scrollLeft;
        const distance = target - start;
        if (Math.abs(distance) < 1) { if (onDone) onDone(); return; }
        const startTime = performance.now();
        function tick(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.scrollLeft = start + distance * eased;
            if (t < 1) requestAnimationFrame(tick);
            else if (onDone) onDone();
        }
        requestAnimationFrame(tick);
    }

    function jumpScroll(track, targetLeft, items) {
        isSettling = true;
        items.forEach(item => item.style.transition = 'none');
        track.scrollLeft = targetLeft;
        update3DEffect();
        void track.offsetWidth;
        requestAnimationFrame(() => {
            items.forEach(item => item.style.transition = '');
            requestAnimationFrame(() => { isSettling = false; });
        });
    }

    function scrollToIndex(index, duration, onDone) {
        const targetItem = items[index];
        if (!targetItem) { if (onDone) onDone(); return; }
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        const r = targetItem.getBoundingClientRect();
        const targetScroll = track.scrollLeft + (centerX - (r.left + r.width / 2));
        isSettling = true;
        smoothScrollTo(track, targetScroll, duration, () => {
            isSettling = false;
            if (onDone) onDone();
        });
    }

    // ===== Состояние =====
    let lastSettledIndex = null;
    let scrollTimeout;
    let isSettling = false;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const maxSwipe = isTouchDevice ? 2 : Infinity;

    // ===== Главный обработчик остановки =====
    const handleScrollEnd = () => {
        if (singleSetWidth === 0 || isSettling) return;
        const scrollLeft = track.scrollLeft;

        // 1. Бесшовный переход через край
        if (scrollLeft >= singleSetWidth * 2 - 1) {
            jumpScroll(track, scrollLeft - singleSetWidth, items);
            lastSettledIndex = getCenterIndex();
            setActivePromo();
            return;
        } else if (scrollLeft <= 1) {
            jumpScroll(track, scrollLeft + singleSetWidth, items);
            lastSettledIndex = getCenterIndex();
            setActivePromo();
            return;
        }

        const currentIndex = getCenterIndex();

        // 2. ОГРАНИЧЕНИЕ: на тач — не больше 2, на ПК — без лимита
        if (lastSettledIndex !== null && Math.abs(currentIndex - lastSettledIndex) > maxSwipe) {
            const direction = Math.sign(currentIndex - lastSettledIndex);
            const clampedIndex = lastSettledIndex + direction * maxSwipe;
            scrollToIndex(clampedIndex, 300, () => {
                lastSettledIndex = clampedIndex;
                setActivePromo();
            });
            return;
        }

        // 3. Всё в порядке — просто обновляем
        lastSettledIndex = currentIndex;
        setActivePromo();
    };

    // ===== Подписки =====
    track.onscroll = null;
    track.onscroll = () => {
        update3DEffect();
        items.forEach(item => item.classList.remove('is-active-card'));
        window.clearTimeout(scrollTimeout);
        if (!('onscrollend' in window)) {
            scrollTimeout = setTimeout(handleScrollEnd, 250);
        }
    };

    if ('onscrollend' in track) {
        track.onscrollend = handleScrollEnd;
    }


    // Центрируем при старте — без smoothScrollTo, без scrollSnapType
    setTimeout(() => {
        if (singleSetWidth > 0) {
            isSettling = true;
            track.scrollLeft = singleSetWidth;
            update3DEffect();
            setActivePromo();
            lastSettledIndex = getCenterIndex();   // ← добавили
            requestAnimationFrame(() => { isSettling = false; });
        }
    }, 50);
}

function createPromoHTML(promo) {
    const badgeText = promo.type === 'top' ? 'ТОП' : 'БАРБЕР';

    return `
        <div class="promo-item" onclick="openPromoCart('${promo.serviceId}', '${promo.barberId}')">
            <!-- Бейдж (на сайте виден, в приложении скрыт через CSS) -->
            <div class="promo-badge">${badgeText}</div>
            
            <div class="promo-bg-icon">${promo.icon}</div>
            <div>
                <h4>${promo.title}</h4>
                <p>${promo.desc}</p>
            </div>
            <div class="promo-price">
                <span>${promo.oldPrice} ₽</span>${promo.price} ₽
            </div>
        </div>
    `;
}

// Функция, которая кладет услугу и мастера в корзину и открывает её
function openPromoCart(serviceId, barberId) {
    fromPromo = true; // Запоминаем, что перешли с акции
    let service = servicesData.top.find(s => s.id === serviceId) || servicesData.barber.find(s => s.id === serviceId);
    
    if (service) {
        cart = [service];
        selectedDate = null;
        selectedTime = null;
        
        // Принудительно обновляем доступных мастеров (Али для ТОПа, пусто для Барбера)
        checkMasterAvailability(); 
        
        // Переключаем на вкладку Записаться
        switchView('viewBook', document.getElementById('navBook'));
        renderServices(service.type);
        renderMasters();
        
        // УБРАЛИ автоматический вызов openDrawer()
        if (selectedBarber) {
            // Если это ТОП-акция (Али уже выбран визуально), просто подсказываем пользователю
            showToast(`Выбран ${selectedBarber.name}. Нажмите на него, чтобы продолжить`, "info");
        } else {
            // Если Барбер, просим выбрать мастера
            showToast("Выберите мастера для записи", "info");
        }

        // Плавно пролистываем вниз к мастерам, чтобы пользователь их увидел
        setTimeout(() => {
            const mastersSection = document.getElementById('mastersGrid');
            if (mastersSection) {
                mastersSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
}

    /* =========================================
    PWA УСТАНОВКА (УМНАЯ ЛОГИКА)
    ========================================= */
let deferredPrompt;
const installBtn = document.getElementById('installAppBtn');

// Проверяем устройство и браузер
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Проверяем Яндекс.Браузер (он не поддерживает нативную установку)
const isYandex = navigator.userAgent.includes('YaBrowser');

// Если это iOS (Safari), НЕ Яндекс, и мы НЕ в установленном приложении — показываем кнопку
if (isIOS && isSafari && !isStandalone && !isYandex) {
    if (installBtn) installBtn.style.display = 'flex';
}

// Ловим событие готовности к установке (Chrome, Edge, Opera)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Показываем кнопку ТОЛЬКО если это не Яндекс и не PWA
    if (installBtn && !isStandalone && !isYandex) {
        installBtn.style.display = 'flex'; 
    }
});

// Если приложение УСПЕШНО установилось — сразу прячем кнопку
window.addEventListener('appinstalled', (evt) => {
    if (installBtn) installBtn.style.display = 'none';
    localStorage.setItem('menfire_just_installed', 'true');
});

function handleInstallClick() {
    if (isIOS) {
        // Показываем инструкцию для iPhone
        document.getElementById('iosInstallModal').classList.add('active');
    } else if (deferredPrompt) {
        // Нативная установка для Android/PC
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showToast('Установка началась', 'success');
            }
            deferredPrompt = null;
            // Прячем кнопку после попытки установки
            if (installBtn) installBtn.style.display = 'none';
        });
    } else {
        showToast('Приложение уже установлено или недоступно в этом браузере', 'info');
    }
}

/* =========================================
ТАКТИЛЬНЫЙ ОТКЛИК + ОТМЕНА ДОЛГОГО НАЖАТИЯ (2 СЕК)
========================================= */
(function() {
    const PRESSABLE = [
        '.status-points',
        'button',
        '.nav-item',       
        '.home-level-card',
        '.home-cta-btn',
        '.service-card',
        '.master-card',
        '.promo-item',
        '.promo-tab',
        '.tab-btn',
        '.date-opt',
        '.time-opt',
        '.header-pill',
        '.action-modal-btn',
        '.checkout-btn',
        '.install-app-btn',
        '.history-toggle-btn',
        '.btn-cancel-small',
        '.logout-btn',
        '.close-btn',
        '[onclick]'
    ].join(', ');

    let holdTimer = null;
    let pressedEl = null;
    let longPressFired = false;

    document.addEventListener('pointerdown', (e) => {
        // Только ЛКМ / касание, не правая кнопка
        if (e.button !== undefined && e.button !== 0) return;

        const el = e.target.closest(PRESSABLE);
        if (!el) return;
        if (el.disabled || el.classList.contains('disabled')) return;

        // Сброс предыдущего
        clearTimeout(holdTimer);
        if (pressedEl) pressedEl.classList.remove('is-pressing');

        pressedEl = el;
        longPressFired = false;
        el.classList.add('is-pressing');

        holdTimer = setTimeout(() => {
            longPressFired = true;
            el.classList.remove('is-pressing');
            
            // МЫ УБРАЛИ ОТСЮДА ВСЁ:
            // уведомление (showToast), вибрацию и анимацию тряски (is-cancelled)
            // Теперь пользователь просто держит палец, и если отпустит после 2 секунд — клик не сработает.
            
        }, 2000);
    }, { passive: true });

    const endPress = () => {
        clearTimeout(holdTimer);
        holdTimer = null;
        if (pressedEl) pressedEl.classList.remove('is-pressing');
    };

    document.addEventListener('pointerup', endPress, { passive: true });
    document.addEventListener('pointercancel', endPress, { passive: true });
    document.addEventListener('pointerleave', endPress, { passive: true });

    // Отмена клика после 2-секундного удержания
    document.addEventListener('click', (e) => {
        if (longPressFired) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            longPressFired = false;
        }
    }, true); 
})();

/* ============================================
ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (светлая / тёмная)
============================================ */
function initTheme() {
    const saved = localStorage.getItem('mensfire_theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (saved === 'light') {
        document.documentElement.classList.add('light-theme');
        if (themeIcon) themeIcon.innerText = '🌙'; // В светлой теме показываем луну
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F5F5F7');
    } else {
        if (themeIcon) themeIcon.innerText = '☀️'; // В темной теме показываем солнце
    }
}

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('light-theme');
    const isLight = html.classList.contains('light-theme');
    localStorage.setItem('mensfire_theme', isLight ? 'light' : 'dark');
    
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#F5F5F7' : '#0a0a0a');
    // Меняем иконку
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.innerText = isLight ? '🌙' : '☀️';
    }

    // ПЕРЕРИСОВЫВАЕМ ЭЛЕМЕНТЫ С ЦВЕТАМИ
    if (typeof renderHomeLevel === 'function') renderHomeLevel();
    
    showToast(isLight ? 'Светлая тема' : 'Тёмная тема', 'info');
}

// Применяем сохранённую тему при загрузке
initTheme();      

/* =========================================
   НЕЖНАЯ ВИБРАЦИЯ ПРИ НАЖАТИИ (ТОЛЬКО ANDROID)
   ========================================= */
(function() {
    // Если устройство не поддерживает вибрацию (iOS) — просто выходим
    if (!('vibrate' in navigator)) return;

    const VIBRATE_SELECTORS = [
        'button',
        '.nav-item',
        '.home-level-card',
        '.home-cta-btn',
        '.service-card',
        '.master-card',
        '.promo-item',
        '.promo-tab',
        '.tab-btn',
        '.date-opt',
        '.time-opt',
        '.header-pill',
        '.action-modal-btn',
        '.checkout-btn',
        '.install-app-btn',
        '.history-toggle-btn',
        '.btn-cancel-small',
        '.logout-btn',
        '.close-btn',
        '[onclick]'
    ].join(', ');

    document.addEventListener('pointerdown', (e) => {
        // Только ЛКМ / касание, не правая кнопка
        if (e.button !== undefined && e.button !== 0) return;

        const el = e.target.closest(VIBRATE_SELECTORS);
        if (!el) return;
        if (el.disabled || el.classList.contains('disabled')) return;

        // Нежная короткая вибрация — 8мс, очень мягкий импульс
        try { navigator.vibrate(8); } catch (_) {}
    }, { passive: true });
})();

/* =========================================
   ВИБРАЦИЯ ДЛЯ iOS (ОТДЕЛЬНЫЙ БЛОК)
   ========================================= */
(function() {
    // 1. Проверяем, что мы на iOS и библиотека загрузилась
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS || typeof window.iosHaptic !== 'function') return;

    // 2. Список элементов, при нажатии на которые должна быть вибрация
    const HAPTIC_SELECTORS = [
        'button', '.nav-item', '.home-level-card', '.home-cta-btn',
        '.service-card', '.master-card', '.promo-item', '.promo-tab',
        '.tab-btn', '.date-opt', '.time-opt', '.header-pill',
        '.action-modal-btn', '.checkout-btn', '.install-app-btn',
        '.history-toggle-btn', '.btn-cancel-small', '.logout-btn',
        '.close-btn', '[onclick]'
    ].join(', ');

    // 3. Слушаем касания
    document.addEventListener('pointerdown', (e) => {
        // Только ЛКМ / касание
        if (e.button !== undefined && e.button !== 0) return;

        const el = e.target.closest(HAPTIC_SELECTORS);
        if (!el) return;
        if (el.disabled || el.classList.contains('disabled')) return;

        // 4. Вызываем вибрацию
        try {
            window.iosHaptic(); // Одиночный мягкий "клик"
        } catch (_) {
            // Если что-то пошло не так (например, iOS не поддерживает), просто игнорируем
        }
    }, { passive: true });
})();


function renderNishmanProducts() {
    const grid = document.getElementById('nishmanGrid');
    if (!grid) return;

    // Группируем товары по категориям
    const categories = [...new Set(nishmanProducts.map(p => p.category))];

    grid.innerHTML = categories.map(cat => {
        const productsInCat = nishmanProducts.filter(p => p.category === cat);
        
        return `
            <div class="nishman-category-title">${cat}</div>
            ${productsInCat.map(prod => `
                <div class="service-card" onclick="openProductDetail('${prod.id}')">
                    <div style="height: 80px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0,0,0,0.3)); border-radius: 10px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; color: var(--gold); font-weight: 800; font-size: 12px; letter-spacing: 1px; border: 1px solid rgba(212, 175, 55, 0.2);">
                        NISHMAN
                    </div>
                    <h3 style="font-size: 12px; margin-bottom: 4px;">${prod.title}</h3>
                    <div class="time" style="font-size: 10px; margin-bottom: 8px; line-height: 1.2;">${prod.desc}</div>
                    <div class="price" style="font-size: 14px;">${prod.price} ₽</div>
                </div>
            `).join('')}
        `;
    }).join('');
}