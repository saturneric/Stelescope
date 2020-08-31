var mongodb = require('./mongodb');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/users';

function Words(user) {
  this.name = word.name;
  this.meaning = word.meaning;
  this.pop = word.pop;
};

module.exports = Words;


// Use connect method to connect to the Server 
Words.prototype.save=function save(callback) {

  //Read information
  var word = {
      name: this.name,
      meaning: this.meaning,
      pop: this.pop,
  };
  //Connect mongodb
  MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  //console.log("Connected correctly to server");
  
  // Get the documents collection 
    var collection = mongodb.collection('usersinfo');
  // Insert some documents 
    collection.insert(word, {safe: true}, function(err, word) {
    
  //console.log("Inserted user's documents into the document collection");
  //Close DB
    mongodb.close();
    callback(err, word);
    
  });
});
}



/*//读取用户信息
User.get = function get(u_username, callback) {
  //打开数据库
  MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);

  // Get the documents collection 
    var collection = mongodb.collection('usersinfo');
     collection.find({username:u_username}).toArray(function(err, docs) {
      console.log("Docs",docs);
      var userif = true;
      try {
        var user = new User(docs[0]);
      }
      catch(err)
      {
        
      }
      console.log("User",user);
      mongodb.close();
      callback(err, user);
     
    });   
  });
};*/









