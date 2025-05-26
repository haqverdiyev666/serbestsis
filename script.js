const newsList = document.querySelector('.news-list');
const searchInput = document.querySelector('.search-box input');
const filterButtons = document.querySelectorAll('.filters button');

const sampleNews = [
  {
    image: 'https://images.report.az/photo/5935a4ba-beb3-3dc9-90d3-f94cdd459ea5_290.jpg',
    title: 'Azərbaycanda “Araz – 2025” birgə təlimi keçirilir – VİDEO',
    date: '18 may 2025 - 11:07',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/52bfa8dd-116c-395b-be91-84a1a8b3b55a_290.jpg',
    title: 'Şəmkir Mərkəzi Rayon Xəstəxanasına yeni direktor təyin edilib',
    date: '13 may 2025 - 21:49',
    updated: false,
  },
];

function displayNews(newsArray) {
  newsList.innerHTML = newsArray.map(news => `
    <div class="news-card ${news.updated ? 'updated' : ''}">
      <img src="${news.image}" alt="news" />
      <div class="news-content">
        <div class="news-title ${news.updated ? 'red' : ''}">${news.title}</div>
        <div class="news-date">${news.date}</div>
      </div>
    </div>
  `).join('');
}

displayNews(sampleNews);

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredNews = sampleNews.filter(news => news.title.toLowerCase().includes(query));
  displayNews(filteredNews);
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.textContent.trim();

    const now = new Date();

    let filteredNews = sampleNews.filter(news => {
      const newsDate = new Date(news.date.split(' - ')[0].replace('may', 'May')); // Tarixi Date formatına çevirmək üçün sadə metod

      switch(filter) {
        case 'BU GÜN':
          return newsDate.toDateString() === now.toDateString();
        case 'DÜNƏN':
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          return newsDate.toDateString() === yesterday.toDateString();
        case 'BU HƏFTƏ':
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return newsDate >= startOfWeek && newsDate <= endOfWeek;
        case 'BU AY':
          return newsDate.getMonth() === now.getMonth() && newsDate.getFullYear() === now.getFullYear();
        case 'KEÇƏN HƏFTƏ':
          const startOfLastWeek = new Date(now);
          startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
          const endOfLastWeek = new Date(startOfLastWeek);
          endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
          return newsDate >= startOfLastWeek && newsDate <= endOfLastWeek;
        case 'KEÇƏN AY':
          const lastMonth = now.getMonth() - 1;
          const yearOfLastMonth = lastMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
          const monthOfLastMonth = (lastMonth + 12) % 12;
          return newsDate.getMonth() === monthOfLastMonth && newsDate.getFullYear() === yearOfLastMonth;
        default:
          return true;
      }
    });

    displayNews(filteredNews);
  });
});
// Modal açma funksiyası
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Scroll-u blokla
        
        // Modal açıldıqda animasiya
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
    }
}

// Modal bağlama funksiyası
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Scroll-u geri qaytar
        }, 300);
    }
}

// Modal kənarına kliklədikdə bağlanması
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            closeModal(modal.id);
        }
    });
}

// ESC düyməsi ilə modal bağlama
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Səhifə yüklənəndə işləyən funksiyalar
document.addEventListener('DOMContentLoaded', function() {
    
    // Breaking news animasiyası
    const breakingNews = document.querySelector('.breaking-news');
    if (breakingNews) {
        setInterval(() => {
            breakingNews.style.transform = 'scale(1.01)';
            setTimeout(() => {
                breakingNews.style.transform = 'scale(1)';
            }, 100);
        }, 3000);
    }
    
    // News card-lar üçün hover effekti
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Scroll animasiyası
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    // Scroll animasiyası üçün elementləri seç
    const animateElements = document.querySelectorAll('.news-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    // Navigation menu üçün smooth scroll
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
    images.forEach(img => imageObserver.observe(img));
}
