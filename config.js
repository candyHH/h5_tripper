var express = require('express');
var app = express();
var localhost = {
	// redis数据库配置
	redis : {
		port : 6379,
		ip : 'dev.lalocal.cn',
		pwd : 'lalocal',
		db : 3
	}
};

var produ = {
		// redis数据库配置
		redis : {
			port : 6379,
			ip : '10.168.39.181',
			pwd : 'lalocal',
			db : 1
		}
	};

var dev = {
		// redis数据库配置
		redis : {
			port : 6379,
			ip : 'dev.lalocal.cn',
			pwd : 'lalocal',
			db : 3
		}
	};

if(app.get('env') === 'development'){
	module.exports = dev;
}else if(app.get('env') === 'production'){
	module.exports = produ;
}else if(app.get('env') === 'localhost'){
	module.exports = localhost;
}
