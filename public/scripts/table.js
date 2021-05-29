document.addEventListener("DOMContentLoaded", function(event) {
  if(document.URL=="http://168.119.163.119:3200/tables"){
  state="http://168.119.163.119:3200/tablestables?state=NY&county=New York County"
  county="http://168.119.163.119:3200/tablestables?state=NY&county=New York County"

  }
  else{
    state=document.URL
    county=document.URL

  }

  error=false
try{
  state=state.split("?")
  state=state[1].split("&")
  state=state[0].split("=")
  state=state[1]
}
catch(e){
  error=true
}

try{
  county=county.split("?")
  county=county[1].split("&")
  county=county[1].split("=")
  county=county[1].split("%")
  county=county[0]
  if (county.search("County")==-1){
    county=county+" County"
  }


}
catch(e){
  error=true
}

if(error){
  county="New York County"
  state="NY"
  Swal.fire({
  title: 'Invalid',

  text: 'The Data you Entered was invalid',
  icon: 'error',
  confirmButtonText: 'Okay'
  })

}



//County Data
url="http://168.119.163.119:3200/countydata"+"?state="+state+"&county="+county+"&date=all"

  var req= new XMLHttpRequest();


   req.open("GET", url, true)
   req.addEventListener('load',function(){

  if(req.status >= 200 && req.status < 400)
  {
  countydict=JSON.parse(req.responseText)
  if(countydict["deaths"]=="null"){
    tbody=document.getElementById('countydatabody')
    trnode=document.createElement("tr")
    tdnode=document.createElement("td")
    tdnode.textContent="No Data"
    trnode.appendChild(tdnode)
    tbody.appendChild(trnode)
  }

  else{

  }

  if(countydict["cases"]=="null"){
    tbody=document.getElementById('countydatabody')
    trnode=document.createElement("tr")
    tdnode=document.createElement("td")
    tdnode.textContent="No Data"
    trnode.appendChild(tdnode)
    tbody.appendChild(trnode)
  }

  else{
    keys=Object.keys(countydict["cases"])
    document.getElementById('countycap').textContent=county+" "+state+" Data"
    for (i = 2; i < keys.length; i++){
      key=keys[i]
      tbody=document.getElementById('countydatabody')
      trnode=document.createElement("tr")
      tdnode=document.createElement("td")
      tdnode.textContent=key
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=countydict["cases"][key]
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=countydict["deaths"][key]
      trnode.appendChild(tdnode)
      tbody.appendChild(trnode)



    }

  }



  }
  else
  {
  console.log("Error in network request: " + req.statusText);

  }

  })
  req.send(null);


//State Data
  url="https://data.cdc.gov/resource/9mfq-cb36.json?state="+state

  var req2= new XMLHttpRequest();


   req2.open("GET", url, true)
   req2.addEventListener('load',function(){

  if(req2.status >= 200 && req2.status < 400)
  {
  statedict=JSON.parse(req2.responseText)
  keys=Object.keys(statedict)
  length=keys.length
  if (length==0){
    tbody=document.getElementById('statedatabody')
    trnode=document.createElement("tr")
    tdnode=document.createElement("td")
    tdnode.textContent="No Data"
    trnode.appendChild(tdnode)
    tbody.appendChild(trnode)

  }


  else{
    document.getElementById('statecap').textContent=state+" Data"
    for (i = 0; i < length; i++){
      tbody=document.getElementById('statedatabody')
      trnode=document.createElement("tr")
      tdnode=document.createElement("td")
      tdnode.textContent=statedict[i]["tot_cases"]
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=statedict[i]["tot_death"]
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=statedict[i]["new_case"]
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=statedict[i]["new_death"]
      trnode.appendChild(tdnode)
      tdnode=document.createElement("td")
      tdnode.textContent=statedict[i]["created_at"]
      trnode.appendChild(tdnode)
      tbody.appendChild(trnode)



    }

  }



  }
  else
  {
  console.log("Error in network request: " + req.statusText);

  }

  })
  req2.send(null);







document.getElementById("hide").addEventListener("click", function(event) {
if(document.getElementById("tables").style.display=="none"){
  document.getElementById("tables").style.display="Block"
  document.getElementById("hide").textContent="Hide Table"
}

else if(document.getElementById("tables").style.display!="none"){
  document.getElementById("tables").style.display="none"
    document.getElementById("hide").textContent="Show Table"
}



  event.preventDefault();
})




document.getElementById("info").addEventListener("click", function(event) {
  document.getElementById("tables").style.display="none"
  infostring="County Data is Retrived Daily from usafacts.com" +"\n" + "When avalible State Data from CDC"
Swal.fire({
title: 'Info',
text: infostring,
icon: 'info',
confirmButtonText: 'Okay'
}).then((result) => {
if (result.isConfirmed) {
document.getElementById("tables").style.display="Block"


}
})

event.preventDefault()
})


document.getElementById("datasubmit").addEventListener("click", function(event) {
  var county=document.getElementById("county").value+" County"
  var state=document.getElementById("state").value
  state=state.toUpperCase();
  url="http://168.119.163.119:3200/tables"+"?state="+state+"&county="+county+"&date=all"
  window.location.href = url;
})














});
