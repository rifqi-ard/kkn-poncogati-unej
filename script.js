// --- KONFIGURASI EMAILJS ---
const PUBLIC_KEY = ""; 
const SERVICE_ID = ""; 
const TEMPLATE_ID = ""; 

(function() {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
})();

// Data Foto Galeri - 10 Sosial + 10 Random
const photos = [
    { url: '#', title: 'Sosialisasi Pendidikan', category: 'sosial' },
    { url: '#', title: 'Kerja Bakti Desa', category: 'sosial' },
    { url: '#', title: 'Rapat Koordinasi', category: 'sosial' },
    { url: '#', title: 'Bakti Sosial', category: 'sosial' },
    { url: '#', title: 'Penyuluhan Kesehatan', category: 'sosial' },
    { url: '#', title: 'Belajar Mengajar', category: 'sosial' },
    { url: '#', title: 'Posyandu Lansia', category: 'sosial' },
    { url: '#', title: 'Diskusi Karang Taruna', category: 'sosial' },
    { url: '#', title: 'Workshop UMKM', category: 'sosial' },
    { url: '#', title: 'Pawai Budaya', category: 'sosial' },

    { url: '#', title: 'Makan Malam Bersama', category: 'random' },
    { url: '#', title: 'Senja di Balai Desa', category: 'random' },
    { url: '#', title: 'Keseruan di Posko', category: 'random' },
    { url: '#', title: 'Malam Akrab', category: 'random' },
    { url: '#', title: 'Persiapan Masak', category: 'random' },
    { url: '#', title: 'Selfie Kelompok', category: 'random' },
    { url: '#', title: 'Pasar Pagi', category: 'random' },
    { url: '#', title: 'Hiking Pagi', category: 'random' },
    { url: '#', title: 'Tawa Bersama Warga', category: 'random' },
    { url: '#', title: 'Momen Farewell', category: 'random' }
];

// --- DATA ANGGOTA (Para Pejuang) ---
// Ganti URL foto di properti 'photo' untuk mengganti foto avatar.
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

const galleryWrapper = document.getElementById('gallery-container');

// Render Galeri
function renderGallery(filter = 'all') {
    galleryWrapper.innerHTML = '';
    const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter);
    filteredPhotos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="photo-card aspect-[4/3]" onclick="openModal('${photo.url}')">
                <img src="${photo.url}" class="w-full h-full object-cover" loading="lazy">
                <div class="overlay">
                    <div class="text-white">
                        <h4 class="font-bold text-lg leading-tight mb-1">${photo.title}</h4>
                        <span class="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase tracking-widest font-semibold">${photo.category}</span>
                    </div>
                </div>
            </div>
        `;
        galleryWrapper.appendChild(item);
    });
    galleryWrapper.scrollLeft = 0;
}

// Filter Galeri
function filterGallery(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        const btnText = btn.innerText.toLowerCase();
        if(btnText === category || (category === 'all' && btnText === 'semua')) {
            btn.className = 'filter-btn px-4 py-2 rounded-lg bg-kkn-primary text-white shadow-md transition-all';
        } else {
            btn.className = 'filter-btn px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-kkn-soft dark:border-kkn-primary text-kkn-primary dark:text-kkn-accent hover:bg-kkn-soft/20 transition shadow-sm';
        }
    });
    renderGallery(category);
}

// Scroll Galeri
function scrollGallery(dir) {
    const scrollAmount = galleryWrapper.clientWidth / 2;
    galleryWrapper.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

// Ganti Tema
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        html.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Modal Gambar
function openModal(url) {
    document.getElementById('modalImage').src = url;
    document.getElementById('imageModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Render Daftar Anggota secara dinamis dari kknMembers
const membersList = document.getElementById('members-list');
function renderMembers() {
    membersList.innerHTML = '';
    kknMembers.forEach((member) => {
        const div = document.createElement('div');
        div.className = 'text-center group';
        div.innerHTML = `
            <div class="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-kkn-soft/20 dark:ring-slate-800 group-hover:ring-kkn-accent transition-all duration-300 shadow-lg transform group-hover:scale-105">
                <img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover">
            </div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">${member.name}</h4>
            <p class="text-[10px] text-kkn-primary dark:text-kkn-accent font-medium uppercase tracking-wider">${member.role}</p>
        `;
        membersList.appendChild(div);
    });
}

// Logika Form Pesan
const messageForm = document.getElementById('messageForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const successOverlay = document.getElementById('successOverlay');

messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!PUBLIC_KEY) {
        simulateSending();
        return;
    }
    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> Mengirim...';
    const templateParams = {
        from_name: document.getElementById('from_name').value,
        message: document.getElementById('message_text').value,
        to_email: "kknponcogatiunej2025@gmail.com"
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
            successOverlay.classList.remove('hidden');
            submitBtn.disabled = false;
            btnText.innerText = 'Kirim Pesan';
        }, function(error) {
            alert("Gagal mengirim: " + JSON.stringify(error));
            submitBtn.disabled = false;
            btnText.innerText = 'Kirim Pesan';
        });
});

function simulateSending() {
    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> Mengirim...';
    setTimeout(() => {
        successOverlay.classList.remove('hidden');
        submitBtn.disabled = false;
        btnText.innerText = 'Kirim Pesan';
    }, 1500);
}

function resetForm() {
    messageForm.reset();
    successOverlay.classList.add('hidden');
}

// Inisialisasi Tampilan
renderGallery('all');
renderMembers();