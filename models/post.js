var mongodb = require('./mongodb');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/stelinfo';

function Post(post) {
  this.username = post.username;
  this.data = post.data;
  this.time = post.time;
};

module.exports = Post;

Post.prototype.save = function save(callback) {

	var post = {
		username: this.username, 
		data: this.data, 
		time: this.time,
	};

 MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  //console.log("Connected correctly to server");
  
  // Get the documents collection 
    var collection = mongodb.collection('squareposts');
  // Insert some documents 
    collection.insert(post, {safe: true}, function(err, post) {
    
  //console.log("Inserted user's documents into the document collection");
  //Close DB
    mongodb.close();
    callback(err, post);
    
  });
});

}
