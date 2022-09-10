const body = document.body
const time = document.querySelector('.time')
const dayMonth = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const windSpeed = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const weatherError = document.querySelector('.weather-error')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
let isPlay = false;
// TIME =======================================================================
function showTime() {
	let date = new Date()
	let currentTime = date.toLocaleTimeString()
	time.textContent = currentTime
	showGreeting()
	showDate()
	setTimeout(showTime, 1000);
}
showTime();

// DATE======================================================================== 
function showDate() {
	let date = new Date()
	let options = { month: 'long', weekday: 'long', day: 'numeric' }
	let currentDate = date.toLocaleDateString('en-US', options)
	dayMonth.textContent = currentDate
	setTimeout(showTime, 1000);
}

function getTimeOfDay() {
	let date = new Date();
	let hours = date.getHours();

	if (hours > 0 && hours < 12) {
		return 'morning'
	} else if (hours >= 12 && hours < 18) {
		return 'afternoon'
	} else if (hours >= 18 && hours < 24) {
		return 'evening'
	} else {
		return 'night'
	}
}
getTimeOfDay()

// GREETING ==============================================================================================
function showGreeting() {
	let timeOfDay = getTimeOfDay()
	let greetingText = `Good ${timeOfDay}`
	greeting.textContent = greetingText
	setTimeout(showGreeting, 1000)
}

function setLocalStorage() {
	localStorage.setItem('name', name.value);
	localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city')
	}
}
window.addEventListener('load', getLocalStorage)

// SLIDER ============================================================================================
function getRandomNum(n) {
	n = Math.floor(Math.random() * 20)
	if (n === 0) {
		n = 1
	}
	return n
}
let randomNum = getRandomNum(1, 20)

// CHANGING IMAGE IN TIME=================================================================================
function setBg(timeOfDay, bgNum) {
	timeOfDay = getTimeOfDay()
	bgNum = String(randomNum)
	if (bgNum.length) {
		bgNum = bgNum.padStart(2, 0)
	}
	const image = new Image()
	const url = `https://raw.githubusercontent.com/Rammigas/bg_images_momentum/assets/images/${timeOfDay}/${bgNum}.jpg`
	image.src = url
	image.onload = () => {
		body.style.backgroundImage = `url('${url}')`;
	}
}
setBg()
randomNum = Number(randomNum)
// CHANGING IMAGE BY PRESS===================================================================================
function getSlideNext() {
	randomNum = randomNum + 1
	if (randomNum > 20) {
		randomNum = 1
	}
	setBg()
}
slideNext.addEventListener('click', getSlideNext)

function getSlidePrev() {
	randomNum = randomNum - 1
	if (randomNum < 1) {
		randomNum = 20
	}
	setBg()
}
slidePrev.addEventListener('click', getSlidePrev)

// WEATHER ===========================================================================================================
city.value = `Minsk`
async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=fd26123c99eb9ab8f9b81251b0d1bb1e&units=metric`
	const res = await fetch(url)
	const data = await res.json()
	try {
		weatherError.textContent = ''
		weatherIcon.classList.add(`owf-${data.weather[0].id}`)
		temperature.textContent = `${Math.floor(data.main.temp)} °C`
		weatherDescription.textContent = `${data.weather[0].description}`
		windSpeed.textContent = `Wind Speed: ${Math.floor(data.wind.speed)} m/s`
		humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`
	} catch (err) {
		console.log('error')
		weatherDescription.textContent = ''
		temperature.textContent = ''
		windSpeed.textContent = ''
		humidity.textContent = ''
		weatherError.textContent = 'ERROR! There is no city with this name!'
	}
	city.addEventListener('change', getWeather)
}
getWeather()

// QUOTES=========================================================================================
async function getQuotes() {
	const quotes = './assets/quotes.json';
	const res = await fetch(quotes)
	const data = await res.json()
	randomNum++
	if (randomNum === 20) {
		randomNum = 0
	} 
	quote.textContent = data[randomNum].text;
	author.textContent = data[randomNum].author;

}
getQuotes();
changeQuote.addEventListener('click', getQuotes)

// PLAYER================================================================================================
const play = document.querySelector('.play')
const playP = document.querySelector('.play-prev')
const playN = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')
const audio = new Audio()
let playNum = 0
// start-stop------------------------------------
function playAudio() {
	audio.src = playlist[playNum].src
	audio.currentTime = 0
	if (!isPlay) {
		audio.play()
		isPlay = true
	} else if (isPlay) {
		audio.pause()
		isPlay = false
	}
	
}
play.addEventListener('click', playAudio)
// button-----------------------------------------------
function toggleBtn(){
	if(isPlay){
		play.classList.add('pause')
	}else{
		play.classList.remove('pause')
	}
}
play.addEventListener('click',toggleBtn)

import playlist from "./playlist.js"
// creating list
 for(let i = 0; i < playlist.length; i++) {
	const li = document.createElement('li')
	playListContainer.append(li)
	li.classList.add('play-item')
	li.textContent = playlist[i].title
	li.setAttribute("id", i)
	
 }
//  Prev/Next ---------------------------------------------------
function playNext(){
	playNum++
	if(playNum>3){
		playNum = 0
	}
	isPlay = false
	if (!isPlay){
		play.classList.add('pause')
	}
	playAudio()
}
playN.addEventListener('click',playNext)

function playPrev(){
	playNum = playNum - 1
	if(playNum<0){
		playNum = 3
	}
	isPlay = false
	if (!isPlay){
		play.classList.add('pause')
	}
	playAudio()
}
playP.addEventListener('click',playPrev)










const selfRating = `
1.Часы и календарь +15
2.Приветсвие +10
3.Смена фонового изображения +20
4.Виджет погоды +15
5.Цитаты +10
6.Аудиоплеер +10 (не успел выполнить последние 2 пункта простого аудиоплеера)
Это все что я успел выполнить в течение 3х дней, ибо обстоятельства. Понимаю что далеко не айс, но двигаем дальше)

Итого: 15+10+20+15+10+10 = 70 баллов выходит`
console.log(selfRating)
