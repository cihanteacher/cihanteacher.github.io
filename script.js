// MEB Müfredatına Uygun 5, 6, 7 ve 8. Sınıf Ünite İsimleri ve İkon Haritası
const unitData = {
    "5": [
        { name: "Hello", icon: "fa-comments" },
        { name: "My Town", icon: "fa-city" },
        { name: "Games and Hobbies", icon: "fa-gamepad" },
        { name: "My Daily Routine", icon: "fa-clock" },
        { name: "Health", icon: "fa-heart-pulse" },
        { name: "Movies", icon: "fa-film" },
        { name: "Party", icon: "fa-cake-candles" },
        { name: "Fitness", icon: "fa-person-running" },
        { name: "Animal Shelter", icon: "fa-paw" },
        { name: "Festivals", icon: "fa-masks-theater" }
    ],
    "6": [
        { name: "Life", icon: "fa-sun" },
        { name: "Yummy Breakfast", icon: "fa-utensils" },
        { name: "Downtown", icon: "fa-building-user" },
        { name: "Weather and Emotions", icon: "fa-cloud-sun-rain" },
        { name: "At the Fair", icon: "fa-ferris-wheel" },
        { name: "Occupations", icon: "fa-user-tie" },
        { name: "Holidays", icon: "fa-plane-departure" },
        { name: "Bookworms", icon: "fa-book-open" },
        { name: "Saving the Planet", icon: "fa-earth-americas" },
        { name: "Democracy", icon: "fa-check-to-slot" }
    ],
    "7": [
        { name: "Appearance & Personality", icon: "fa-user-astronaut" },
        { name: "Sports", icon: "fa-futbol" },
        { name: "Biographies", icon: "fa-landmark" },
        { name: "Wild Animals", icon: "fa-hippo" },
        { name: "Television", icon: "fa-tv" },
        { name: "Celebration", icon: "fa-champagne-glasses" },
        { name: "Dreams", icon: "fa-wand-magic-sparkles" },
        { name: "Public Buildings", icon: "fa-hospital" },
        { name: "Environment", icon: "fa-leaf" },
        { name: "Planets", icon: "fa-shuttle-space" }
    ],
    "8": [
        { name: "Friendship", icon: "fa-user-group" },
        { name: "Teen Life", icon: "fa-headphones" },
        { name: "In the Kitchen", icon: "fa-kitchen-set" },
        { name: "On the Phone", icon: "fa-mobile-screen-button" },
        { name: "The Internet", icon: "fa-wifi" },
        { name: "Adventures", icon: "fa-compass" },
        { name: "Tourism", icon: "fa-camera-retro" },
        { name: "Chores", icon: "fa-broom" },
        { name: "Science", icon: "fa-flask" },
        { name: "Natural Forces", icon: "fa-volcano" }
    ]
};

let currentSelectedGrade = '5';
let currentSelectedUnit = 'all';

// Sayfa yüklendiğinde varsayılan olarak 5. Sınıf ünitelerini yükle
document.addEventListener('DOMContentLoaded', () => {
    loadUnitsForGrade('5');
    filterWorksheets();
});

// Sınıf seçildiğinde çalışır
function selectGrade(grade) {
    currentSelectedGrade = grade;
    currentSelectedUnit = 'all';

    document.querySelectorAll('.card').forEach(card => card.classList.remove('selected-card'));
    const selectedCard = document.querySelector(`.card-${grade}`);
    if (selectedCard) {
        selectedCard.classList.add('selected-card');
    }

    loadUnitsForGrade(grade);
    filterWorksheets();

    document.getElementById('unit-section').scrollIntoView({ behavior: 'smooth' });
}

// Seçilen sınıfa göre 10 adet görsel ünite kartını dinamik oluşturur
function loadUnitsForGrade(grade) {
    const unitGrid = document.getElementById('unitGrid');
    const selectedGradeText = document.getElementById('selectedGradeText');
    
    selectedGradeText.textContent = `${grade}. Sınıf`;
    unitGrid.innerHTML = '';

    const allCard = document.createElement('div');
    allCard.className = `all-units-card ${currentSelectedUnit === 'all' ? 'active' : ''}`;
    allCard.innerHTML = `
        <div class="all-icon">
            <i class="fa-solid fa-layer-group"></i>
            <span>${grade}. Sınıf — Tüm Üniteleri Listele</span>
        </div>
        <i class="fa-solid fa-arrow-right"></i>
    `;
    allCard.onclick = () => selectUnit('all', allCard);
    unitGrid.appendChild(allCard);

    const units = unitData[grade] || [];
    units.forEach((unitObj, index) => {
        const unitNum = index + 1;
        const formattedNum = unitNum < 10 ? `0${unitNum}` : `${unitNum}`;
        const card = document.createElement('div');
        card.className = `modern-unit-card ${currentSelectedUnit == unitNum ? 'active' : ''}`;
        
        card.innerHTML = `
            <div class="unit-card-top">
                <span class="unit-number-badge">ÜNİTE ${formattedNum}</span>
                <div class="unit-visual-icon">
                    <i class="fa-solid ${unitObj.icon}"></i>
                </div>
            </div>
            <div class="unit-card-body">
                <h4 class="unit-card-title">${unitObj.name}</h4>
                <i class="fa-solid fa-chevron-right unit-arrow"></i>
            </div>
        `;

        card.onclick = () => selectUnit(unitNum, card);
        unitGrid.appendChild(card);
    });
}

// Ünite seçildiğinde çalışır
function selectUnit(unitNum, clickedCard) {
    currentSelectedUnit = unitNum;

    document.querySelectorAll('.modern-unit-card, .all-units-card').forEach(card => card.classList.remove('active'));
    clickedCard.classList.add('active');

    filterWorksheets();
}

// PDF Çalışma kağıtlarını filtreleme mantığı
function filterWorksheets() {
    const items = document.querySelectorAll('.pdf-item');
    const badge = document.getElementById('activeFilterBadge');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    if (currentSelectedUnit === 'all') {
        badge.innerHTML = `<i class="fa-solid fa-filter"></i> Filtre: <strong>${currentSelectedGrade}. Sınıf (Tüm Üniteler)</strong>`;
    } else {
        const unitObj = unitData[currentSelectedGrade][currentSelectedUnit - 1];
        const unitTitle = unitObj ? `${currentSelectedUnit}. Ünite (${unitObj.name})` : `${currentSelectedUnit}. Ünite`;
        badge.innerHTML = `<i class="fa-solid fa-filter"></i> Filtre: <strong>${currentSelectedGrade}. Sınıf - ${unitTitle}</strong>`;
    }

    items.forEach(item => {
        const itemGrade = item.getAttribute('data-grade');
        const itemUnit = item.getAttribute('data-unit');

        const matchGrade = (itemGrade === currentSelectedGrade);
        const matchUnit = (currentSelectedUnit === 'all' || itemUnit == currentSelectedUnit);

        if (matchGrade && matchUnit) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// ==========================================
// Google Docs Viewer Destekli Modal Yapısı
// ==========================================

function openPdfModal(pdfUrl, pdfTitle) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfFrame');
    const titleElem = document.getElementById('modalPdfTitle');
    const downloadBtn = document.getElementById('modalDownloadBtn');

    // Göreli (relative) URL'yi tam/mutlak (absolute) URL'ye dönüştürür:
    const absolutePdfUrl = new URL(pdfUrl, window.location.href).href;

    // Google Docs Viewer Embed URL'si:
    // Eğer site yerelde (file://) çalışıyorsa doğrudan pdfUrl'ye, sunucuda çalışıyorsa Google Docs Viewer'a yönlendirilir.
    if (window.location.protocol.startsWith('http')) {
        iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`;
    } else {
        // Çevrimdışı/Yerel test durumu için
        iframe.src = pdfUrl;
    }

    titleElem.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${pdfTitle}`;
    downloadBtn.href = pdfUrl;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Arka plan kaydırmasını kilitle
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfFrame');

    modal.style.display = 'none';
    iframe.src = ''; // Iframe içeriğini temizle
    document.body.style.overflow = 'auto'; // Kaydırmayı aç
}

// Dışarı tıklanınca kapatma
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closePdfModal();
    }
};

// ESC tuşu ile kapatma
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePdfModal();
    }
});
