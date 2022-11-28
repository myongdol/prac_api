let news = [];
let page = 1;
let totalPage = 0;
let menus = document.querySelectorAll(".menus button");


menus.forEach((menu) => 
 menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchBtn = document.getElementById("search_btn");
let url;



const getNews = async() => {

   try{
      let header = new Headers({"x-api-key":"-YzI4Hp6S-LDNHwBGtY01TYCeF1LaXFbbwZh0ng2ZZA"});
      url.searchParams.set('page', page)
      let response = await fetch(url, {headers: header});
      let data = await response.json(); // json = 데이터 타입, 객체랑 똑같음\
      
      if(response.status == 200) {
         if(data.total_hits == 0) {
            throw new Error("검색된 결과가 없습니디.")
         }
      news = data.articles
      totalPage = data.total_pages;
      page = data.page;
      render()   
      console.log(news);
      pagenation();
      } else {
         throw new Error(data.message)
      }


} catch (error) {
   console.log("error", error.message);
   errorRender(error.message);
   }
};


const getLatestNews = async () => {
   url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&page_size=10`);
   getNews();
};

const getNewsByTopic = async(event) => { 
   console.log("clicked", event.target.textContent);
   let topic = event.target.textContent.toLowerCase();
   url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&page_size=10&topic=${topic}`);
   getNews();
}

const getNewsByKeyword = async() => {
   // 검색 키워드 읽어오기
   // url에 키워드 붙이기 
   //헤더 준비하기
   // url call
   // get data
   // show data

   let keyword = document.getElementById("search_input").value
   url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
   getNews();
}

const render = () => { 
   let newsHTML = ''

   newsHTML = news.map((item) => { 
      return ` <div class="row news">
      <div class="col-lg-4">
          <img class="news_img_size" src="${item.media}" />
      </div>
      <div class="col-lg-8">
          <h2>${item.title}</h2>
          <p>${item.summary}</p>
          <div>
          ${item.rights}
          ${item.published_date}
          </div>
      </div>
  </div>`;
   }).join('');
   
   document.getElementById("news_board").innerHTML=newsHTML
}

const errorRender = (message) => {
   let errorHTML = `<div class="alert alert-danger text-center" role="alert">
   ${message}
 </div>`
   document.getElementById("news_board").innerHTML = errorHTML

}

const pagenation = () => { 
    let pageGroup = Math.ceil(page/5);
    let last = pageGroup*5;
    let first = last - 4;
    let pagenationHTML = '';

    if (first >= 6) {
    pagenationHTML = ` <li class="page-item" onclick="pageClick(1)">
    <a class="page-link" href="#js-bottom">&lt;&lt'</a>
    </li>
    <li class="page-item" onclick="pageClick(${page - 1})">
    <a class=page-link" href='#js-bottom'>&lt;</a>
  </li>`;
   }

    for(let i = first; i <= last; i++) {
      pagenationHTML += ` <li class="page-item ${page == i ? "active" : ""}">
      <a class="page-link" href="#js-bottom" onclick="moveToPage(${i})">${i}</a>
      </li>`
    }

    if (last < totalPage) {
    pagenationHTML = `    <li class="page-item" onclick="pageClick(${page + 1})">
    <a class="page-link" href="#js-program-detail-bottom">
    &gt;
    </a>
    <li class="page-item" onclick="pageClick(${totalPage})">
    <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
    </li>
  </li>`
    }

    document.querySelector(".pagination").innerHTML = pagenationHTML;
}

const pageClick = (pageNum) => {
   page = pageNum;
   window.scrollTo({ top: 0, behavior: "smooth"});
   getNews(); 
};


const moveToPage = (pageNum) => {
   page = PageNum;

}


searchBtn.addEventListener("click", getNewsByKeyword);

getLatestNews();

