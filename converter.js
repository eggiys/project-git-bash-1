// --- DATA SAMPLE LAPORAN KARHUTLA ---
// Catatan: Data ini merupakan contoh faktual/historis berlabel jelas untuk edukasi
const reportsData = [
    {
        id: 1,
        title: "Patroli Terpadu Pencegahan Karhutla Ditigkatkan di Area Gambut",
        summary: "Tim gabungan melakukan pembasahan lahan gambut rawan kering untuk mencegah potensi timbulnya titik api.",
        province: "Kalimantan Tengah",
        date: "12 Mei 2024",
        source: "Antara News",
        link: "https://www.antaranews.com"
    },
    {
        id: 2,
        title: "Pemantauan Titik Panas Melalui Satelit BMKG",
        summary: "BMKG mendeteksi sebaran titik panas skala rendah dan mengimbau warga tidak melakukan pembakaran lahan.",
        province: "Kalimantan Barat",
        date: "20 Juni 2024",
        source: "BMKG",
        link: "https://www.bmkg.go.id"
    },
    {
        id: 3,
        title: "Edukasi Bahaya Karhutla Kepada Kelompok Tani Local",
        summary: "Sosialisasi pembukaan lahan tanpa bakar (PLTB) diselenggarakan untuk mencegah bahaya asap tahunan.",
        province: "Kalimantan Selatan",
        date: "02 Juli 2024",
        source: "BNPB",
        link: "https://www.bnpb.go.id"
    },
    {
        id: 4,
        title: "Apel Siaga Bencana Kebakaran Hutan dan Lahan",
        summary: "Kesiapsiagaan personil dan peralatan pemadam karhutla diperiksa menjelang puncak musim kemarau.",
        province: "Kalimantan Timur",
        date: "15 Agustus 2024",
        source: "SiPongi KLHK",
        link: "https://sipongi.menlhk.go.id"
    },
    {
        id: 5,
        title: "Pengawasan Area Perbatasan Hutan Lindung",
        summary: "Manggala Agni meningkatkan frekuensi pemantauan lapangan di wilayah hutan lindung pesisir.",
        province: "Kalimantan Utara",
        date: "28 September 2024",
        source: "Kementerian Kehutanan",
        link: "https://www.menlhk.go.id"
    }
];

// --- RENDER LAPORAN KE DOM ---
function renderReports(reports) {
    const reportsGrid = document.getElementById('reports-grid');
    const noResults = document.getElementById('no-results');
    
    reportsGrid.innerHTML = '';

    if (reports.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    reports.forEach(report => {
        const card = document.createElement('div');
        card.className = 'card report-card';
        card.innerHTML = `
            <div>
                <div class="report-meta">
                    <span class="report-tag">${report.province}</span> • ${report.date}
                </div>
                <h3>${report.title}</h3>
                <p>${report.summary}</p>
            </div>
            <div>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Sumber: ${report.source}</p>
                <a href="${report.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">Baca Selengkapnya</a>
            </div>
        `;
        reportsGrid.appendChild(card);
    });
}

// --- PENCARIAN DAN FILTER ---
function filterReports() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const provinceSelect = document.getElementById('province-filter').value;

    const filtered = reportsData.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchInput) || 
                              report.summary.toLowerCase().includes(searchInput) ||
                              report.province.toLowerCase().includes(searchInput);
        
        const matchesProvince = provinceSelect === 'all' || report.province === provinceSelect;

        return matchesSearch && matchesProvince;
    });

    renderReports(filtered);
}

// --- FILTER DARI KARTU WILAYAH ---
function filterByProvince(provinceName) {
    const provinceSelect = document.getElementById('province-filter');
    provinceSelect.value = provinceName;
    filterReports();
    
    // Scroll halus ke bagian laporan
    document.getElementById('informasi').scrollIntoView({ behavior: 'smooth' });
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Render awal
    renderReports(reportsData);

    // Event listener input pencarian dan filter
    document.getElementById('search-input').addEventListener('input', filterReports);
    document.getElementById('province-filter').addEventListener('change', filterReports);

    // Menu Hamburger Mobile
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Tutup nav menu saat tautan diklik (Mobile)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Tombol Back to Top
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
