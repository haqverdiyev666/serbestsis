const newsList = document.querySelector('.news-list');

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
  {
    image: 'https://images.report.az/photo/25bc9879-906b-36e0-9b5f-ea8c7d95c6b9_290.jpeg',
    title: 'AQTA sədri: “Qırmızı körpü” Qida təhlükəsizliyi nəzarəti məntəqəsi bütün avadanlıqlarla təchiz edilib',
    date: '13 may 2025 - 10:38',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/92d2c4b6-05c3-3b3f-928c-1aa3df37b23c_850.jpg',
    title: 'Premyer Liqada sonuncu turun oyun cədvəli müəyyənləşib',
    date: '18 may 2025 - 21:51',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/a0b69b8e-2ee3-35b8-8003-c7f0cf1aba69_290.jpg',
    title: 'Hikmət Hacıyev: Azərbaycan və İran iqtisadi əməkdaşlığı davam etdirməli, əlaqələr gücləndirilməlidir',
    date: '18 may 2025 - 21:48',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/394012a3-fb44-35a9-90eb-7b8334fae4af_290.jpg',
    title: 'Nigeriyada bərə qəzası nəticəsində 37 nəfər ölüb',
    date: '18 may 2025 - 17:58',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/2986fd33-c788-31c4-ad74-cb01862a9368_290.jpg',
    title: 'Somalidə hərbi xidmətə çağırış məntəqəsində partlayış nəticəsində 20 nəfər ölüb',
    date: '18 may 2025 - 17:39',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/16ecea3d-9ff1-38f4-b951-a135ce6fbfb6_290.jpg',
    title: 'Hindistanda yanğında 17 nəfər ölüb',
    date: '18 may 2025 - 17:05',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/40817470-131c-3efe-932d-a38859f5823e_850.png',
    title: 'Qalatasaray" 25-ci dəfə Türkiyə çempionu olub',
    date: '13 may 2025 - 21:49',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/4bf78915-c9bd-3732-a9f3-25cd8b667dc7_850.jpg',
    title: 'Roma Papası Ukrayna nümayəndə heyətini qəbul edib',
    date: '13 may 2025 - 10:38',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/1b08133d-2cdb-3590-bba7-bd25632d6cd2_850.jpeg',
    title: 'Sahibə Qafarova Papa XIV Leoya Azərbaycan Prezidentinin təbriklərini çatdırıb',
    date: '18 may 2025 - 21:51',
    updated: false,
  },
  {
    image: 'https://images.report.az/photo/9bbb9748-1d16-3661-b1cd-88d8ae13cd41_850.jpg',
    title: 'Azərbaycanda narkotik dövriyyəsi ilə bağlı cəzaların ağırlaşdırılması təklif olunur',
    date: '18 may 2025 - 21:48',
    updated: false,
  },
];

newsList.innerHTML = sampleNews.map(news => `
  <div class="news-card ${news.updated ? 'updated' : ''}">
    <img src="${news.image}" alt="news" />
    <div class="news-content">
      <div class="news-title ${news.updated ? 'red' : ''}">${news.title}</div>
      <div class="news-date">${news.date}</div>
    </div>
  </div>
`).join('');
