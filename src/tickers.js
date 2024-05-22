const APP_KEY = `7d83db6dc504b98184a2a12f1f13fc5dff050e4c93d089226ecf0f5ac99bea6c`;
const API_URL = `https://min-api.cryptocompare.com/data/price?fsym=#FSYM#&tsyms=USD&api_key=${APP_KEY}`;

const tickers = new Map();
function add(tickerName){
	subscribe(tickerName,getPrice(tickerName,(rez)=>{
		console.log(rez);
	}))
}
function subscribe(tickerName, cb) {
	if(tickers.has(tickerName)){
		const vals = tickers.get(tickerName);
		tickers.set(tickerName,vals.push(cb))
	}
	tickers.set(tickerName,[cb]);
}
function getPrice(tickerName, cb) {
	fetch(API_URL.replace("#FSYM#", tickerName))
		.then(resp => resp.json())
		.then(rez => cb(rez));
}
function updatePrices(){
	tickers.forEach((fn)=>{
		setTimeout(fn,5000);
	})
}
