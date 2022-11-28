
let news = [];

const getLatestNews = async () => {
   let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`);
   let header = new Headers({"x-api-key":"-YzI4Hp6S-LDNHwBGtY01TYCeF1LaXFbbwZh0ng2ZZA"});

   let response = await fetch(url, {headers: header});
   let data = await response.json(); // json = 데이터 타입, 객체랑 똑같음
   news = data.articles
   console.log(news);
};

getLatestNews();

