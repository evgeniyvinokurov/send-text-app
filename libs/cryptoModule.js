
let cryptoModule = {
	hashPassword: function(pass){
		return pass.split("").reverse().join("");
	},
	getSessionId: function(){
		return Math.ceil(Math.random()*1000000) + "";
	}
};

module.exports = cryptoModule;