document.addEventListener("DOMContentLoaded", function(event) {
      var req = new XMLHttpRequest();
      url="/newsgrabber"
      req.open("GET", url, true)
      req.addEventListener('load',function(){

     if(req.status >= 200 && req.status < 400)
     {
     dict=JSON.parse(req.responseText)
     console.log(dict)
     length=Object.keys(dict["items"]).length
     var index=0
     console.log("Max Stories",length)

     for (i = 0; i < length; i++) {
       var listhtml=document.getElementById('news')
       var node=document.createElement("li")
       node.setAttribute("id","news")
       var link=document.createElement("a")
       currentlink=dict["items"][index]["link"]
       link.setAttribute("href",currentlink)
       link.textContent=dict["items"][index]["title"]
       listhtml.appendChild(node)
       currentnode=listhtml.children[index]
       currentnode.appendChild(link)
       index=index+1
     }




     }
     else
     {
     console.log("Error in network request: " + req.statusText);

     }

     })
     req.send(null);
})
