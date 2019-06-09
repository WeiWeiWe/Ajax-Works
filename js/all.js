// gotop start
$(document).ready(function () {
    $(".jq-goTop").hide();
    $(window).scroll(function () {
        let h = $("body,html").scrollTop();
        // console.log(h);

        if (h > 300) {
            $(".jq-goTop").fadeIn();
        } else {
            $(".jq-goTop").fadeOut();
        };
    });
    $(".jq-goTop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        });
        return false;
    });
});
// gotop end

// Ajax 
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
let data = [];
let len;
xhr.onload = function () {
    data = JSON.parse(xhr.responseText).result.records;
    len = data.length;
}
// Ajax 

// Dom
let district = document.querySelector('.js-district');
let areaTitle = document.querySelector('.js-areaTitle');
let areaContent = document.querySelector('.js-areaContent');
let hotArea = document.querySelector('.js-hotArea-btn');
// Dom

// 監聽 
district.addEventListener('change', getData, false);
hotArea.addEventListener('click', btnClick, false);
// 監聽


function getData(e) {
    let select = e.target.value;
    let str = '';
    for (let i = 0; i < len; i++) {
        if (select == data[i].Zone) {
            str += `
            <div class="attractions">
                <div class="attractions__place">
                    <img class="attractions__place__img" src=${data[i].Picture1}>
                    <h2 class="attractions__place__name">${data[i].Name}</h2>
                    <h3 class="attractions__place__area">${data[i].Zone}</h3>
                </div>
                <div class="attractions__info">
                    <div class="attractions__info__time">
                        <img src="images/icons_clock.png">
                        <span>${data[i].Opentime}</span>
                    </div>
                    <div class="attractions__info__address">
                        <img src="images/icons_pin.png">
                        <span>${data[i].Add}</span>
                    </div>
                    <div class="attractions__info__phone">
                        <img src="images/icons_phone.png">
                        <span>${data[i].Tel}</span>
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
    areaTitle.textContent = select;
    areaContent.innerHTML = str;
}


function btnClick(e) {
    let btn = e.target.value;
    let str = '';
    for (let i = 0; i < len; i++) {
        if (btn == data[i].Zone) {
            str += `
            <div class="attractions">
                <div class="attractions__place">
                    <img class="attractions__place__img" src=${data[i].Picture1}>
                    <h2 class="attractions__place__name">${data[i].Name}</h2>
                    <h3 class="attractions__place__area">${data[i].Zone}</h3>
                </div>
                <div class="attractions__info">
                    <div class="attractions__info__time">
                        <img src="images/icons_clock.png">
                        <span>${data[i].Opentime}</span>
                    </div>
                    <div class="attractions__info__address">
                        <img src="images/icons_pin.png">
                        <span>${data[i].Add}</span>
                    </div>
                    <div class="attractions__info__phone">
                        <img src="images/icons_phone.png">
                        <span>${data[i].Tel}</span>
                        <div class="phone-fl-right">
                            <img src="images/icons_tag.png">
                            <span>免費參觀</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        areaTitle.textContent = btn;
        areaContent.innerHTML = str;
    }
}