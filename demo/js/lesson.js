// phone checker

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');


const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.onclick = () =>{
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = "OK"
        phoneResult.style.color = "green"
    }else{
        phoneResult.innerHTML = "NOT OK"
        phoneResult.style.color = "red"
    }
}

// tab slider

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = "none"
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = "block"
    tabs[id].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

let showIndex = 0
setInterval(() => {
    hideTabContent();
    showIndex = (showIndex + 1) % tabs.length;
    showTabContent(showIndex);
}, 3000);

tabsParent.onclick = (event) =>{
    if (event.target.classList.contains('tab_content_item')){
      tabs.forEach((tab,tabIndex) => {
          if (event.target === tab){
              hideTabContent()
              showTabContent(tabIndex)
          }
      })
    }
}

/// convertor

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const fetchExchangeRates = async () => {
    try {
        const response = await fetch("../data/conventor.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        const data = await fetchExchangeRates();
        if (!data) return;

        if (element.id === "som") {
            targetElement1.value = (element.value / data.usd).toFixed(2); 
            targetElement2.value = (element.value / data.eur).toFixed(2); 
        }
        if (element.id === "usd") {
            targetElement1.value = (element.value * data.usd).toFixed(2); 
            targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(2); 
        }
        if (element.id === "eur") {
            targetElement1.value = (element.value * data.eur).toFixed(2); 
            targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(2); 
        }
        if (element.value === "") {
            targetElement1.value = "";
            targetElement2.value = "";
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


/// CardBlock
const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');
let cardIndex = 1;

const updateCard = async (index) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`);
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>Completed: ${data.completed}</p>
            <span>ID: ${data.id}</span>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

updateCard(cardIndex);

nextButton.onclick = () => {
    cardIndex++;
    if (cardIndex > 200) cardIndex = 1; 
    updateCard(cardIndex);
};

prevButton.onclick = () => {
    cardIndex--;
    if (cardIndex < 1) cardIndex = 200; 
    updateCard(cardIndex);
};
// task 2 

// const fetchcool = fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response)  => response.json())
//     .then((data) =>{
//     console.log(data);

//     } )


// weather

const searchButton = document.querySelector('#search')
const searchInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const APP_ID = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'


const Funcweather = searchButton.onclick = async () => {
    try {
        const response = await fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric`);
        const data = await response.json();

        city.innerHTML = data.name || 'City is not found';
        temp.innerHTML = `
            <span>${data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : ''}</span>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
// query params - параметры запроса 
//https://www.google.com/search?q=java+script&rlz=1C5CHFA_enKG1136KG1136&oq=java+script+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgKGIAEMgkIAhAAGAoYgAQyBwgDEAAYgAQyCQgEEAAYChiABDIHCAUQABiABDIJCAYQABgKGIAEMgkIBxAuGAoYgAQyCQgIEAAYChiABDIJCAkQABgKGIAE0gEINTAyNWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        Funcweather();
    }
});


// optional chaining - опциональная цепочка
// const url = 'https://'
// const getData = async() =>{
//     const response = await fetch(url)
//     const data  = await response.json()
//     console.log(data);
    
// }
// getData()
