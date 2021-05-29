var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3200);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
var col=null

// require('dotenv').config()
app.get('/maps',function(req,res){
  res.render('maps')
});
app.get('/resources',function(req,res){
  res.render('resources')
});
// app.get('/',function(req,res){
//   res.render('home')
// });
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get('/newsgrabber',function(req,res){
  let Parser = require('rss-parser');
  let parser = new Parser();
  (async () => {
    let feed = await parser.parseURL('https://news.google.com/rss/topics/CAAqBwgKMLH2lwswzJ-vAw?hl=en-CA&gl=CA&ceid=CA%3Aen');
    res.send(feed)
  })();
});
app.get('/news',function(req,res){
  res.render('news',pagenav)
})
app.get('/tables',function(req,res){
  res.render("tables")

})

app.get('/countydata',function(req,res){
  var cases=null
  var newcases=null
  var deaths=null
  var newdeaths=null
  var pop=null
  var index=0
  var date=null
  if (col==null){
    console.log("Waiting for Database")
    return
  }
  daterange=req.query["date"]
  state=req.query["state"]
  county=req.query["county"]
  if (state==null || county==null || daterange==null){
    console.log("mising info")
    res.send(null)
  }

  col.find({"County Name":county,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    if (Object.keys(results).length==0){
      cases="null"
      newcases="null"
    }
    //First Check
    else if(daterange!="today")
    {
    cases=results[0]
    }
    else{
      cases=results[0]
      dict=Object.keys(cases)
      index=dict.length-1
      date=dict[index]
      date2=dict[index-1]
      newcases=parseInt(cases[date])-parseInt(cases[date2])
      cases=cases[date]


    }

  })


  col2.find({"County Name":county,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    if (Object.keys(results).length==0){
      deaths="null"
      newdeaths="null"
    }
    else if(daterange!="today")
    {
    deaths=results[0]

    }

    else{
      deaths=results[0]
      dict=Object.keys(deaths)
      index=dict.length-1
      date=dict[index]
      date2=dict[index-1]
      newdeaths=parseInt(deaths[date])-parseInt(deaths[date2])
      deaths=deaths[date]



    }

    //First Check

  })

    col3.find({"County Name":county,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0,"County Name":0,State:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    if (Object.keys(results).length==0){
        pop="null"
    }
    //First Check
    else if(daterange!="today")
    {
    deaths=results
    }
    else{
      pop=results[0]
      dict=Object.keys(pop)
      index=dict.length-1
      date=dict[index]
      date2=dict[index-1]
      pop=pop[date]

    }

  })



async function datatoday(){
  if (cases==null || newcases==null || deaths==null || newdeaths==null ||pop==null)
{
  console.log("Waiting for Data to return")
  setTimeout(datatoday,3000)
}
else{
  console.log("Data: ",cases,newcases,deaths,newdeaths,pop)
  var dict={}
  dict.pop=pop
  dict.deaths=deaths
  dict.newdeaths=newdeaths
  dict.cases=cases
  dict.newcases=newcases
  res.send(dict)


}
}


async function data_all(){
  if (cases==null || deaths==null)
{

  console.log("Waiting for Data to return")
  console.log("cases ",cases,"Deeah",deaths)
  setTimeout(data_all,3000)
}
else{
  var dict={}
  dict.deaths=deaths
  dict.cases=cases
  res.send(dict)


}
}

if (daterange=="today"){
datatoday()
}

if (daterange!="today"){
data_all()
}




})














app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

// Do mongo Later

// //Mongo
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'covid';
// // Create a new MongoClient
// const client = new MongoClient(url,{ useUnifiedTopology: true });
// // Use connect method to connect to the Server
// client.connect(function(err, client) {
//   console.log("Connected correctly to Covid Database");
//   const db = client.db(dbName)
//   col = db.collection('covid_confirmed_usafacts');
//   col2 = db.collection('covid_deaths_usafacts');
//   col3= db.collection('covid_county_population_usafacts');
// });
