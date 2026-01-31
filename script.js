// --- DATA ---
const photos = [
    { url: '/image/AwalTercipta.webp', title: 'Awal Tercipta', category: 'sosial' },
    { url: '/image/Sosialisasi.jpg', title: 'Sosialisasi', category: 'sosial' },
    { url: "/image/MakanBersama.jpg", title: 'Makan Bersama', category: 'random' },
    { url: '/image/Bolang.png', title: 'Bolang', category: 'random' },
    { url: '/image/KunjunganUMKM.webp', title: 'UMKM Poncogati', category: 'sosial' },
    { url: '/image/Makrab.webp', title: 'Malam Akrab', category: 'random' },
];

const kknMembers = [
    { name: "Safira Nur Amaliyah", role: "Kordes", photo: "/image/1.webp" },
    { name: "Nur Mustafida", role: "Sekretaris", photo: "/image/2.webp" },
    { name: "Dea Novela Ramadani", role: "Bendahara", photo: "/image/3.webp" },
    { name: "Dini Amalia Irvanti", role: "Acara", photo: "/image/4.webp" },
    { name: "Chika Dyah Fishanta", role: "Acara", photo: "/image/5.webp" },
    { name: "Melin Silvika Nur'aini", role: "Acara", photo: "/image/6.webp" },
    { name: "Shinta Nuriyah Maulidi", role: "Humas", photo: "/image/7.webp" },
    { name: "Amanda Putri Agung Pratama", role: "Humas", photo: "/image/8.webp" },
    { name: "Mohammad Faqih", role: "Perlengkapan", photo: "/image/9.webp" },
    { name: "Muhammad Rico Prasetya", role: "Perlengkapan", photo: "/image/10.webp" },
    { name: "Rifqi Ardiyansyah", role: "Pubdekdok", photo: "/image/11.webp" },
    { name: "Nugroho Tri Purnomo", role: "Pubdekdok", photo: "/image/12.webp" }
];

// --- CORE LOGIC ---
const galleryWrapper = document.getElementById('gallery-container');
const membersList = document.getElementById('members-list');
const html = document.documentElement;

// Render Gallery
function renderGallery(filter = 'all') {
    galleryWrapper.innerHTML = '';
    const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);
    filtered.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="photo-card aspect-video" onclick="openModal('${photo.url}')">
                <img src="${photo.url}" class="w-full h-full object-cover" loading="lazy">
                <div class="overlay">
                    <div class="text-white">
                        <h4 class="font-bold text-lg">${photo.title}</h4>
                        <span class="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 rounded">${photo.category}</span>
                    </div>
                </div>
            </div>
        `;
        galleryWrapper.appendChild(item);
    });
}

function filterGallery(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        const isMatch = text === category || (category === 'all' && text === 'semua');
        btn.className = isMatch ? 'filter-btn active px-4 py-2 rounded-full text-sm font-semibold transition bg-kkn-primary text-white' 
                                : 'filter-btn px-4 py-2 rounded-full text-sm font-semibold transition bg-white dark:bg-slate-800 text-slate-600 border border-slate-200';
    });
    renderGallery(category);
}

function scrollGallery(dir) {
    const width = galleryWrapper.clientWidth;
    galleryWrapper.scrollBy({ left: dir * (width * 0.8), behavior: 'smooth' });
}

// Render Members
function renderMembers() {
    membersList.innerHTML = '';
    kknMembers.forEach(m => {
        const card = document.createElement('div');
        card.className = 'text-center group';
        card.innerHTML = `
            <div class="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-kkn-soft/20 group-hover:ring-kkn-accent transition-all duration-300 shadow-lg transform group-hover:scale-105">
                <img src="${m.photo}" alt="${m.name}" class="w-full h-full object-cover">
            </div>
            <h4 class="font-bold text-slate-900 dark:text-white text-xs md:text-sm line-clamp-1">${m.name}</h4>
            <p class="text-[9px] md:text-[10px] text-kkn-primary font-bold uppercase mt-1">${m.role}</p>
        `;
        membersList.appendChild(card);
    });
}

// UI Interactions
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    html.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    icon.className = html.classList.contains('dark') ? 'fas fa-sun text-xl' : 'fas fa-moon text-xl';
});

function openModal(url) {
    document.getElementById('modalImage').src = url;
    document.getElementById('imageModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Form Logic
const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const txt = document.getElementById('btnText');
    
    btn.disabled = true;
    txt.innerHTML = '<div class="spinner"></div>';
    
    setTimeout(() => {
        document.getElementById('successOverlay').classList.remove('hidden');
        btn.disabled = false;
        txt.innerText = 'Kirim Pesan';
    }, 1500);
});

function resetForm() {
    messageForm.reset();
    document.getElementById('successOverlay').classList.add('hidden');
}

// Init
renderGallery();
renderMembers();