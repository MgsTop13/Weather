let hours = document.getElementById("h");
let minutes = document.getElementById("m");
let seconds = document.getElementById("s");
let today = document.getElementById("t");

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
   //console.log(`${h}:${m}:${s}`);
   //console.log(`Today: ${t}`)
}

setInterval(() => {
    //console.clear();
    date();
}, 1000)
