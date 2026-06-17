let hours = document.getElementById("h");
let minutes = document.getElementById("m");
let seconds = document.getElementById("s");
let today = document.getElementById("t");
let weather = document.getElementById("w");


async function getWeatherInfo() {
    const coordLat = "-23.8464003"; //Latitude do lugar desejado
    const coordLon = "-46.7388715"; //Longitude do lugar desejado
    const api_key = "SuaApiKey";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&appid=${api_key}`;
    
    const response = await fetch(url);
    const data = await response.json();
    let max = data.main.temp - 273.15;
    max = max.toFixed(1);
    weather.innerText = `${max}º`
}

getWeatherInfo();


function VerfT(t){
    if(t === 0){
        return "Sunday";
    } else if(t === 1){
        return "Monday";
    } else if(t === 2){
        return "Tuesday";
    } else if(t === 3){
        return "Wednesday";
    } else if(t === 4){
        return "Thursday";
    } else if(t === 5){
        return "Friday";
    } else if(t === 6){
        return "Saturday";
    }
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
   t = VerfT(t);
   
   hours.textContent = `${h}`;
   minutes.textContent = `${m}`;
   seconds.textContent = s;
   today.textContent = t
}

setInterval(() => {
    date();
}, 1000)
