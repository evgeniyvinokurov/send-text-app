const cryptoModule = require('../libs/cryptoModule');
const funcs = require('../interfaces/funcs');


let dbLayer = {};

dbLayer.authUser = async function(db, user) {
  // Get the documents collection
  const collection = db.collection('users');
  // Find some documents
  return await collection.findOne({$or: [{sessionId: user.sessionId}, {name: user.name || null}]}).then(async function(user) {
  	return await !user ? null : ((cryptoModule.hashPassword(user.pass) === user.pass || user.sessionId === user.sessionId) ? user : null);
  });
}

dbLayer.updateUser = async function(db, user) {
  // Get the documents collection
  const collection = db.collection('users');
  var sessionId = cryptoModule.getSessionId();
  // Find some documents
  return await collection.updateOne({name: user.name}, { $set: { sessionId : sessionId } }).then(async function(data) {
    return await (user.sessionId = sessionId, user);
  });
}

dbLayer.logoutUser = async function(db, user) {
  // Get the documents collection
  const collection = db.collection('users');
  var sessionId = cryptoModule.getSessionId();
  // Find some documents
  return await collection.updateOne({name: user.name}, { $set: { sessionId : null } }).then(async function(data) {
    return await (user.sessionId = null, user);
  });
}

dbLayer.updateUserPosts = async function(db, options, destination) {
  // Get the documents collection
  const collection = db.collection('users');
  // Find some documents
  return await collection.updateOne({name: destination == 'from' ? options.transaction.userfrom : options.transaction.userto }, { $set: { balance : destination == 'from' ? options.balancefrom : options.balanceto} }).then(async function(data) {
    return await data;
  });
}

dbLayer.regUser = async function(db, user) {
  // Get the documents collection
  const collection = db.collection('users');
  // Find some documents
  return await collection.insertOne(user).then(async function(result) {
  	result.sessionId = user.sessionId;
    return await result;
  });
}

dbLayer.listUserDocument = async function(db, options) {
  // Get the documents collection
  const collection = db.collection('users');
  return await collection.find({ name: new RegExp("^" + options.name + ".*$")}).skip(options.page * options.pageSize).limit(options.pageSize).toArray().then(async function(docs) {
      return await docs;
  });
}

dbLayer.insertPostDocument = async function(db, options) {
  // Get the documents collection
  const collection = db.collection('posts');
  // Insert some documents
  return await collection.insertOne(options.transaction).then(async function(result) {
      return await result;   
  });
}

dbLayer.listPostDocument = async function(db, options) {
  // Get the documents collection
  const collection = db.collection('posts');

  return await collection.find({userto: options.user}).skip(options.page * options.pageSize).limit(options.pageSize).toArray().then(async function(docs) {
    return await docs;
  });
}



module.exports = dbLayer;