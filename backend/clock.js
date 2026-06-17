const coordLat = "-23.8464003"; //Latitude do lugar desejado
const coordLon = "-46.7388715"; //Longitude do lugar desejado
const api_key = "SuaApiKey";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&appid=${api_key}`;


async function getWeatherInfo(){
    const response = await fetch(url);
    const data = await response.json();
    let max = data.main.temp - 273.15;
    max = max.toFixed(1);
    return max;
}


function ReturnDate(t){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[t];
}


function date(){
   const d = new Date();
   let h = d.getHours();
   let m = d.getMinutes();
   let s = d.getSeconds();
   let t = d.getUTCDay();
   
   if(h < 10){
       h = `0${h}`;
   } 
   
   if(m < 10){
       m = `0${m}`;
   }
   
   if(s < 10){
       s = `0${s}`
   }

   t = ReturnDate(t);

   let time = [`22:${m}:${s}`, t]
   return time;
}

async function time(){
    let weather = await getWeatherInfo();
    let a = date();


    console.log("------------------------");
    console.log(` ${a[0]}`);
    console.log(` ${a[1]}    ${weather}º`);
    console.log("------------------------");
}


setInterval(() => {
    console.clear();
    time();
}, 1000)
