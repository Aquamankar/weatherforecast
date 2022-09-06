const api ={
    key:"5264262fd1c514ad8b76594c0a0e7ba6",
    base:"https://api.openweathermap.org/data/2.5/"
}
const searchi = document.getElementById("searchi");
const maintempu = document.querySelector('.main-tempu span');
const btn = document.getElementById("btn");
const city = document.getElementById("city");
const datei = document.getElementById("datei");
const dayi = document.getElementById("dayi");
const tempi = document.getElementById("tempi");
const tempmin = document.getElementById("tempmin");
const tempmax = document.getElementById("tempmax");
const iconi = document.getElementById("iconi");
const decrip = document.getElementById("decrip");
const weatpress = document.querySelector('#weatpress');
const weathumid = document.querySelector('#weathumid');
const pressinfo = document.querySelector('#pressinfo');
const humidinfo = document.querySelector('#humidinfo');
const weatwind = document.querySelector('#weatwind');
const Kelvin=273;

const mos = document.querySelector('#mos');
mos.addEventListener('click',()=>{
    mos.classList.toggle('fa-sun');
    if(mos.classList.contains('fa-sun')){
        document.querySelector('body').style.background="#ccd8d3";
        document.querySelector('.mainbox').style.background="#052545c2";

    }
    else{
        document.querySelector('.mainbox').style.background="#f06b05b0";
        document.querySelector('body').style.background="#fbf0c6";
    }
})

window.onload=(eve)=>{
   
    displayDate();

}

btn.addEventListener("click",setValue);

function displayDate(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let now = new Date();
    let yeau =now.getFullYear();
    let dateu =now.getDate();
    let maonthu= now.getMonth();
    let curdate =`${dateu}|${maonthu + 1}|${yeau}`;

    let dayu = days[now.getDay()];

    datei.innerHTML=`${curdate}&nbsp; ,`;
    dayi.innerHTML=`${dayu}`;
    // console.log(dayu);

    
}
function setValue(){
    
     let searchVal=searchi.value;
     if(!searchVal==""){
        

        getResult(searchVal);
     }
    
   
}

async function getResult(searchVal){
     const weatheri=await fetch(`${api.base}weather?q=${searchVal}&appid=${api.key}`)
     const weather= await weatheri.json()
     
     .then( weather => {
        if(!weather.ok){
                        city.innerHTML="City not found";
                        
                        
                     }
                    
        return  weather;
    }).then(displayRes).catch(err =>{
        console.log(err);
    })
    
    

}

function displayRes(weather){
    
    
    
    city.innerHTML=`Welcome to ${weather.name} , ${weather.sys.country}`;
    tempi.innerHTML=`${Math.floor(weather.main.feels_like - Kelvin)} `;
    tempmin.innerHTML=`${Math.floor(weather.main.temp_min - Kelvin)} &#8451`;
    tempmax.innerHTML=`${Math.floor(weather.main.temp_max - Kelvin)} &#8451`;
   
 

    weatpress.innerHTML=`${weather.main.pressure}mb`;
     weatwind.innerHTML=`${weather.wind.speed}km/hr`;
    weathumid.innerHTML=`${weather.main.humidity}%`;

      maintempu.innerHTML="&#8451"
     document.querySelector('#mininfo').innerHTML="min";
     document.querySelector('#maxinfo').innerHTML="max";
      document.querySelector('#windinfo').innerHTML="Wind";

   

    pressinfo.innerHTML=`Pressure`;
    humidinfo.innerHTML=`Humidity`;
    
   
    let iconfake=weather.weather[0].icon;
    let decriptionval=weather.weather[0].main;
    
   
    
   
    
       
   
    iconi.src=`http://openweathermap.org/img/wn/${iconfake}.png`;
    decrip.innerHTML=`${decriptionval}`;
    document.querySelector(".iconc").classList.add("active");
    

   

}