// nishman-data.js
// База данных продукции NISHMAN (можно пополнять)

const nishmanProducts = [
    // ================= УКЛАДКА И СТАЙЛИНГ =================
    { 
        id: 'st1', 
        category: 'Укладка и стайлинг', 
        title: 'Матовая паста M1 Agran', 
        desc: 'Сильная фиксация, матовый финиш, 100 мл', 
        price: 1200,
        volume: '100 мл',
        hairType: 'Для всех типов волос',
        effect: 'Сильная фиксация, матовый финиш',
        usage: 'Возьмите небольшое количество пасты, разотрите между ладонями и нанесите на сухие или слегка влажные волосы. Уложите по желанию.'
    },
    { 
        id: 'st2', 
        category: 'Укладка и стайлинг', 
        title: 'Матовая глина M2 Matte Clay', 
        desc: 'Для густых волос, текстура и объем, 100 мл', 
        price: 1250,
        volume: '100 мл',
        hairType: 'Для густых и жестких волос',
        effect: 'Текстура, объем, матовый финиш',
        usage: 'Нанесите на сухие волосы для создания текстуры. Отлично подходит для коротких и средних стрижек.'
    },
    { id: 'st3', category: 'Укладка и стайлинг', title: 'Матовая паста M9 Matte Paste', desc: 'Гибкая фиксация, не склеивает волосы, 100 мл', price: 1300 },
    { id: 'st4', category: 'Укладка и стайлинг', title: 'Воск-паутина S1 Blackwidow', desc: 'Эффект художественного беспорядка, 150 мл', price: 1400 },
    { id: 'st5', category: 'Укладка и стайлинг', title: 'Воск-паутина S3 Blueweb', desc: 'Сильная фиксация, паутинообразная текстура, 150 мл', price: 1400 },
    { id: 'st6', category: 'Укладка и стайлинг', title: 'Воск на водной основе 02 Sport', desc: 'Легкая фиксация, подходит для ежедневного использования, 100 мл', price: 1100 },
    { id: 'st7', category: 'Укладка и стайлинг', title: 'Воск на водной основе 05 Keratin', desc: 'Укрепление и блеск, 150 мл', price: 1200 },
    { id: 'st8', category: 'Укладка и стайлинг', title: 'Матовая пудра P1 Sport', desc: 'Придает объем, 20 г', price: 900 },
    { id: 'st9', category: 'Укладка и стайлинг', title: 'Солевой спрей Sea Salt Spray 01', desc: 'Создает эффект пляжных волн, 200 мл', price: 1000 },
    { id: 'st10', category: 'Укладка и стайлинг', title: 'Гель для укладки Gum Effect 5+', desc: 'Ультрафиксация, 300 мл', price: 1150 },
    { id: 'st11', category: 'Укладка и стайлинг', title: 'Крем для укладки Styling Cream Blue', desc: 'Подвижный контроль, легкая фиксация, 100 мл', price: 1050 },

    // ================= УХОД ЗА ВОЛОСАМИ =================
    { id: 'hc1', category: 'Уход за волосами', title: 'Шампунь Pro-Hair Paragon Free', desc: 'Без соли и парабенов, для ежедневного использования, 400 мл', price: 1300 },
    { id: 'hc2', category: 'Уход за волосами', title: 'Шампунь 01 Keratin Complex', desc: 'Восстановление поврежденных волос, 400 мл', price: 1350 },
    { id: 'hc3', category: 'Уход за волосами', title: 'Кондиционер 2 Phase Keratin Complex', desc: 'Двухфазный, не требует смывания, 400 мл', price: 1450 },
    { id: 'hc4', category: 'Уход за волосами', title: 'Кондиционер 2 Phase Argan', desc: 'Питание и увлажнение, для волос и бороды, 400 мл', price: 1500 },
    { id: 'hc5', category: 'Уход за волосами', title: 'Тоник для волос Hair Tonic 1 Chilly', desc: 'Стимулирует рост, укрепляет фолликулы, 200 мл', price: 1200 },
    { id: 'hc6', category: 'Уход за волосами', title: 'Парфюм для бороды Adonis', desc: 'Аромат и уход, 75 мл', price: 1100 },

    // ================= БРИТЬЕ И УХОД =================
    { id: 'sh1', category: 'Бритье и уход', title: 'Гель для бритья Easy Shave', desc: 'Скольжение и защита от раздражения, 400 мл', price: 1250 },
    { id: 'sh2', category: 'Бритье и уход', title: 'Гель для бритья 03-04 Transparent', desc: 'Прозрачный, без горячих полотенец, 1000 мл', price: 1800 },
    { id: 'sh3', category: 'Бритье и уход', title: 'Крем-одеколон после бритья Gold One', desc: 'Успокаивает и освежает, 200 мл', price: 1200 },
    { id: 'sh4', category: 'Бритье и уход', title: 'Крем-одеколон после бритья City Senior', desc: '2 в 1, защита от раздражения, 400 мл', price: 1400 },
    { id: 'sh5', category: 'Бритье и уход', title: 'Тальк после бритья Barber Shave Talc', desc: 'Впитывает влагу, затягивает порезы', price: 800 },
    { id: 'sh6', category: 'Бритье и уход', title: 'Бальзам для бороды и усов', desc: 'Смягчает и укладывает, 100 мл', price: 1150 },

    // ================= УХОД ЗА КОЖЕЙ =================
    { id: 'sk1', category: 'Уход за кожей', title: 'Пилинг-гель для лица Peeling Gel', desc: 'Глубокое очищение, от черных точек, 100 мл', price: 1000 },
    { id: 'sk2', category: 'Уход за кожей', title: 'Маска для лица Clay Mask', desc: 'Очищает поры, матирует, 100 мл', price: 1100 },
    { id: 'sk3', category: 'Уход за кожей', title: 'Маска-пленка Peel-Off Black Mask', desc: 'Удаляет загрязнения и ороговевшие клетки, 200 мл', price: 1200 },
    { id: 'sk4', category: 'Уход за кожей', title: 'Крем для лица и рук Pomegranate', desc: 'Увлажнение 24 часа, 300 мл', price: 1300 },

    // ================= САЛОННЫЕ ПРОДУКТЫ (Pro Size) =================
    { id: 'sl1', category: 'Салонные продукты', title: 'Шампунь Salon Size 01', desc: 'Профессиональный объем 5000 мл', price: 4500 },
    { id: 'sl2', category: 'Салонные продукты', title: 'Кондиционер Salon Size 01', desc: 'Профессиональный объем 5000 мл', price: 4800 },
    { id: 'sl3', category: 'Салонные продукты', title: 'Воск для волос 07 Gold One', desc: 'Классическая фиксация, 100 мл', price: 1150 },
    { id: 'sl4', category: 'Салонные продукты', title: 'Воск для волос 08 Matte Look', desc: 'Матовая фиксация, 100 мл', price: 1150 },
];

/* =========================================
   ДЕТАЛИ ТОВАРА NISHMAN
   ========================================= */
function openProductDetail(productId) {
    const product = nishmanProducts.find(p => p.id === productId);
    if (!product) return;

    // Заполняем данные (если поля нет, ставим заглушку)
    document.getElementById('pdCategory').innerText = product.category || 'NISHMAN';
    document.getElementById('pdTitle').innerText = product.title;
    document.getElementById('pdPrice').innerText = `${product.price} ₽`;
    document.getElementById('pdVolume').innerText = product.volume || 'Стандартный объем';
    document.getElementById('pdHairType').innerText = product.hairType || 'Для всех типов';
    document.getElementById('pdEffect').innerText = product.effect || product.desc;
    document.getElementById('pdUsage').innerText = product.usage || 'Нанесите необходимое количество средства на волосы или бороду и распределите по всей длине.';

    // Открываем модалку
    document.getElementById('productDetailModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}