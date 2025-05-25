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
