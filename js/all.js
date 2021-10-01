window.onload = () => {
  getTravelData();
};

function getTravelData() {
  const url = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
  getData(url).then(res => {
    new TravelList(res);
    new goTop(document.querySelector('.jq-goTop'));
  });
}

function getData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(JSON.parse(xhr.responseText).result.records);
      } else {
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  });
}

class goTop {
  constructor(elem, distance) {
    this.elem = elem;
    this.distance = distance;
    this.handle();
  }
  handle() {
    this.elem.onclick = function(){
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.onscroll = this.throttle(() => {
      this.toggleDomE();
    }, 100);
  }
  toggleDomE(){
    this.elem.style.display = (document.documentElement.scrollTop || document.body.scrollTop) > (this.distance || 300) ? 'block' : 'none';
  }
  throttle(func, wait) {
    let timer = null;
    return function() {
      if (timer) {clearTimeout(timer)};
      timer = setTimeout(() => {
        return typeof func === 'function' && func.apply(this, arguments);
      }, wait);
    }
  }
}

class TravelList {
  constructor(data) {
    this.travelList = data;
    this.init();
  }
  init() {
    this.handle();
  }
  handle() {
    const district = document.querySelector('.js-district');
    const areaTitle = document.querySelector('.js-areaTitle');
    const areaContent = document.querySelector('.js-areaContent');
    const hotArea = document.querySelector('.js-hotArea-btn');
    
    district.addEventListener('change', renderHTML.bind(this));
    hotArea.addEventListener('click', renderHTML.bind(this));

    function renderHTML(e) {
      const template = this.template(e.target.value, this.travelList);
      areaTitle.textContent = e.target.value;
      areaContent.innerHTML = template;
    }
  }
  template(select, travelList) {
    let str = '';
    for (let i = 0; i < travelList.length; i++) {
      if (select === travelList[i].Zone) {
          str += `
          <div class="attractions">
              <div class="attractions__place">
                  <img class="attractions__place__img" src=${travelList[i].Picture1}>
                  <h2 class="attractions__place__name">${travelList[i].Name}</h2>
                  <h3 class="attractions__place__area">${travelList[i].Zone}</h3>
              </div>
              <div class="attractions__info">
                  <div class="attractions__info__time">
                      <img src="images/icons_clock.png">
                      <span>${travelList[i].Opentime}</span>
                  </div>
                  <div class="attractions__info__address">
                      <img src="images/icons_pin.png">
                      <span>${travelList[i].Add}</span>
                  </div>
                  <div class="attractions__info__phone">
                      <img src="images/icons_phone.png">
                      <span>${travelList[i].Tel}</span>
                      <div class="phone-fl-right">
                          <img src="images/icons_tag.png">
                          <span>免費參觀</span>
                      </div>
                  </div> 
              </div>
          </div>
          `;
      }
    }
    return str;
  }
}
