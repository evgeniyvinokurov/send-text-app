const pjson = require('../package.json');
const dbConnectionString = pjson.dbConnectionString;
const dbName = pjson.dbName;
const dbLayer = require('../dbs/db');

const MongoClient = require('mongodb').MongoClient

const connect = MongoClient.connect(dbConnectionString, {useUnifiedTopology: true}).then(async function(client) {
	return await client.db(dbName);
});



let funcs = {};

funcs.auth = async function auth(user, base) {
	return await connect.then(async function(db) {
		return await dbLayer.authUser(db, user).then(async function(user) {
			return await !base ? user : ((!user ) ? null : dbLayer.updateUser(db, user));
		});
	});
}

funcs.logout = async function auth(user, base) {
	return await connect.then(async function(db) {
		return await dbLayer.logoutUser(db, user);
	});
}

funcs.reg = async function reg(user) {
	return await connect.then(async function(db){
		return await dbLayer.regUser(db, user);
	});
}

funcs.listUser = async function listUser(options, cb) {
	return await connect.then(async function(db){
		return await dbLayer.listUserDocument(db, options);
	});
}

funcs.addPost = async function addPost(options, cb) {
	return await connect.then(async function(db){
		return await dbLayer.insertPostDocument(db, options);
	});
}

funcs.listPost = async function listPost(options, cb) {
	return await connect.then(async function(db){
		return await dbLayer.listPostDocument(db, options);
	});
}


module.exports = funcs;