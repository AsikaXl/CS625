
function saveDaily(){
    let d = {
        water:+document.getElementById("water").value,
        sleep:+document.getElementById("sleep").value,
        weight:+document.getElementById("weight").value,
        date:new Date().toLocaleDateString()
    };

    let log = JSON.parse(localStorage.getItem("daily")||"[]")
    log.push(d);
    localStorage.setItem("daily",JSON.stringify(log));
    alert("Logged!");
}

let start=null;
function startFasting(){
    start = Date.now();
    localStorage.setItem("fastStart",start);
}
setInterval(()=>{
    let s=localStorage.getItem("fastStart"); if(!s) return;
    let diff=16*3600*1000-(Date.now()-s);
    if(diff<=0) document.getElementById("timer").innerText="Complete!";
    else{
       let h=Math.floor(diff/1000/3600);
       let m=Math.floor((diff/1000%3600)/60);
       document.getElementById("timer").innerText=`${h}h ${m}m`;
    }
},1000);

if(location.pathname.includes("weekly")){
    let data=JSON.parse(localStorage.getItem("daily")||"[]");
    let avgF = (data.reduce((a,b)=>a+b.sleep,0)/data.length).toFixed(1);

    document.getElementById("fastAvg").innerText =
        `Great job keeping an average sleep of ${avgF}h!`;

    new Chart(fastChart,{
        type:"bar",
        data:{
            labels:data.map(d=>d.date),
            datasets:[{label:"Hours Slept",data:data.map(d=>d.sleep)}]
        }
    });

    new Chart(waterChart,{
        type:"line",
        data:{
            labels:data.map(d=>d.date),
            datasets:[{label:"Water Intake",data:data.map(d=>d.water)}]
        }
    });
}