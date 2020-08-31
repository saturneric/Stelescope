var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/users';
// Use connect method to connect to the Server 

function connect (callback) {
	//Connect mongodb
  MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  callback(mongodb);
});
}
//Insert user's informaiton
function insertuser(db, u_username, u_undername, u_MD5, callback) {
  // Get the documents collection 
  var collection = db.collection('usersinfo');
  // Insert some documents 
  collection.insert([
    {username : u_username, name : u_undername, MD5 : u_MD5}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(db,result);
  });
}
//End connection
function dbclose (db) {
  db.close();
}
exports.connect = connect;
exports.insertuser = insertuser;
exports.dbclose = dbclose;