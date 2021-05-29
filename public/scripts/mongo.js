const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/cases';

// Database Name
const dbName = 'cases';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  console.log("Connected correctly to server");

  const db = client.db(dbName)
  const col = db.collection('covid_confirmed_usafacts');
  var county="Baldwin County"
  var state="AL"
  t=col.find({"County Name":county,"State":state}).toArray(function(err,result){
    if(err){
      console.log("Issue Getting Data")
    }
    else{
      console.log(result)
    }
  }
)
  });
