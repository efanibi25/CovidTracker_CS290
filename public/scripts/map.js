
//Note Google Support Docs where used as a base for this Code but I modified them for my own use
function initMap() {
//Create map center US
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.50, lng: -98.35 },
    zoom: 3,
  });
//Add search box to page, call it autocomplete
  const input = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setComponentRestrictions({
    country: ["us"],
  });
  autocomplete.setOptions({
    types: ['(cities)']
  });
  // We can only restrict to country
  // Specify only the data fields that are needed.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
  // Set initial restrict to the greater list of countries.

//infowindow is th map pop-up
  const infoWindow = new google.maps.InfoWindow();
  const marker = new google.maps.Marker({
    map,
  });
//places change trigger with search
  autocomplete.addListener("place_changed", () => {
    var county = "";
    var state = "";
    var countydict=null
    var statedict=null
    infoWindow.setContent("Waiting for Data")

    // infowindow.close();
    marker.setVisible(false);
    //get place search/switch to county

  //  const place = autocomplete.getPlace().address_components[1]["long_name"];
      const place = autocomplete.getPlace()

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    if (place.address_components) {
      county = place.address_components[1].long_name
      state = place.address_components[2].short_name
      //weird stuff going on with NY

      if (county.search("County")==-1){
        county= county +" County"
      }
      if (state=="US"){
        state=place.address_components[1].short_name
      }

    }

    var url="https://data.cdc.gov/resource/9mfq-cb36.json?state="+state



   var req = new XMLHttpRequest();


    req.open("GET", url, true)
    req.addEventListener('load',function(){

 if(req.status >= 200 && req.status < 400)
 {
   dict=JSON.parse(req.responseText)
   if(Object.keys(dict)==0){
     statedict={"new_case":"null","new_death":"null","tot_death":"null","tot_case":"null"}
   }
   else{
     index=dict.length-1
     statedict=dict[index]
   }


 }
 else
 {
   console.log("Error in network request: " + req.statusText);

 }

})
req.send(null);
url="http://168.119.163.119:3200/countydata"+"?state="+state+"&county="+county+"&date=today"

var req2= new XMLHttpRequest();


 req2.open("GET", url, true)
 req2.addEventListener('load',function(){

if(req2.status >= 200 && req2.status < 400)
{
countydict=JSON.parse(req2.responseText)
if(Object.keys(countydict)==0){
  countydict={"pop":"null","deaths":"null","newdeaths":"null","cases":"null","newcases":"null"}
}

}
else
{
console.log("Error in network request: " + req.statusText);

}

})
req2.send(null);









function createinfo(){
  if (statedict==null || countydict==null){

    console.log("waiting for responses")
    setTimeout(createinfo,300)
  }

  else{
    finalstring="State: "+ state+ "<br>"+"County :" +county+ "<br>"+"Cases in State: " + statedict["tot_cases"]+ "<br>"
    finalstring=finalstring+"Deaths in State: "+statedict["tot_death"]+ "<br>"+"New Cases in State: "+statedict["new_case"]+ "<br>" +"New Deaths in State "+statedict["new_death"]+"<br>"
    finalstring=finalstring+"County Population: "+countydict["pop"]+ "<br>"+"Cases in County: "+countydict["cases"]+ "<br>"+"Deaths in County: "+countydict["deaths"]+ "<br>"
    finalstring=finalstring+"New Cases in County: "+countydict["newcases"]+ "<br>"+" New Deaths in County: "+countydict["newdeaths"]+ "<br>"

    infoWindow.setContent(finalstring);
    infoWindow.open(map, marker);

  }

}
createinfo()





  });
}
//Events after Page loaded
document.addEventListener("DOMContentLoaded", function(event) {

 });
