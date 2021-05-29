document.addEventListener("DOMContentLoaded", function(event) {
      var req = new XMLHttpRequest();
      var pathlist=null
      let data=null
      var index=0
      var myinterval=null
      req.open("GET", "http://168.119.163.119:3200/css/gallery/paths.txt", true);
      function ontimer() {
      if (index==199){
        index=0
      }
      var link="url"+"("+pathlist[index].split("::")[0]+")"+" no-repeat center center";
      document.getElementById("image").style.background  = link;
      document.body.style.backgroundColor = "white"
      document.getElementById("ak").textContent="Image by " + pathlist[index].split("::")[1]
      node=document.createElement("a")
      node.textContent=" " + pathlist[index].split("::")[2]
      node.setAttribute("href",pathlist[index].split("::")[2])
      document.getElementById("ak").appendChild(node)



      index=index+1

      }

   req.addEventListener('load',function(){

   if(req.status >= 200 && req.status < 400)
   {
     data=req.responseText
     pathlist=data.split("\n")
     var link="url"+"("+pathlist[index].split("::")[0]+")"+" no-repeat center center";
     document.getElementById("image").style.background  = link;
     document.body.style.backgroundColor = "white"
     document.getElementById("ak").textContent="Image by " + pathlist[index].split("::")[1]
     node=document.createElement("a")
     node.textContent=" " + pathlist[index].split("::")[2]
     node.setAttribute("href",pathlist[index].split("::")[2])
     document.getElementById("ak").appendChild(node)
     index=index+1


    myinterval = setInterval(ontimer, 10000);


   }
   else
   {
     console.log("Error in network request: " + req.statusText);

   }

  })
  req.send(null);

  document.getElementById("prev").addEventListener("click", function(event) {
    clearInterval(myinterval)
    if (index==0){
      index=100

    }
    index=index-1

    var link="url"+"("+pathlist[index].split("::")[0]+")"+" no-repeat center center";
    document.getElementById("image").style.background  = link;
    document.body.style.backgroundColor = "white"


    document.getElementById("ak").textContent="Image by " + pathlist[index].split("::")[1]
    node=document.createElement("a")
    node.textContent=" " + pathlist[index].split("::")[2]
    node.setAttribute("href",pathlist[index].split("::")[2])
    document.getElementById("ak").appendChild(node)
    myinterval = setInterval(ontimer, 5000);
      event.preventDefault()



})


document.getElementById("next").addEventListener("click", function(event) {
  clearInterval(myinterval)
  if (index==99){
    index=-1
}
  index=index+1

  var link="url"+"("+pathlist[index].split("::")[0]+")"+" no-repeat center center";
  document.getElementById("image").style.background  = link;
  document.body.style.backgroundColor = "white"
  document.getElementById("ak").textContent="Image by " + pathlist[index].split("::")[1]
  node=document.createElement("a")
  node.textContent=" " + pathlist[index].split("::")[2]
  node.setAttribute("href",pathlist[index].split("::")[2])
  document.getElementById("ak").appendChild(node)
  myinterval = setInterval(ontimer, 5000);

    event.preventDefault()


})
});
