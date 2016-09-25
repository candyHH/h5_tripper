var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var redis = require('redis');
var config = require('../config.js');
var userInfo = require('../majia.js');
console.log(userInfo.nickname[0]);
var client  = redis.createClient(config.redis.port,'127.0.0.1');
// client.auth(config.redis.pwd);
client.select('4');

/* GET home page. */
router.get('/', function(req, res, next) {
  var thisUrl = req.url;
  var shareUrl = encodeURIComponent((global.browserURL + thisUrl).split('#')[0]);
  console.log('shareUrl.................'+(global.browserURL + thisUrl).split('#')[0]);
  var isPhone = false;
  var agentID = req.headers['user-agent'].toLowerCase().search(/(iphone|ipod|ipad|android)/);
  if (agentID) {
      isPhone = true;
  } else {
      isPhone = false;
  }
  var openid = req.query.openid || '';
  var access_token = req.query.access_token || '';
  superagent
      .get('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN')
      .end(function(err, res4) {
          if (res4.text.indexOf('errcode') > 0 && isPhone) {
              var state = encodeURIComponent((req.url).split('&openid')[0]);
              // var state = encodeURIComponent('/pay/pay?id=960'.split('&openid')[0]);
              console.log(state);
              console.log(global.wechatURL + '/wechat_oauth/getAuthorizeURL?state=' + state+'&finalbase='+global.browserURL);
              superagent
                  .get(global.wechatURL + '/wechat_oauth/getAuthorizeURL?state=' + state+'&finalbase='+global.browserURL)
                  .end(function(err, res3) {
                      if (res3 !== undefined && res3.ok) {
                          res.redirect(res3.text);
                          return;
                      } else {
                          console.error('微信授权错误。');
                          logger.error('微信授权错误。');
                          res.render('error', {});
                      }
                  });
          } else {
              console.log(' 正常请求---------- ');
              var info = JSON.stringify(res4);
              var userInfo = JSON.parse(res4.text);

              // 判断openid是否存在集合
              var openid = userInfo.openid;
              superagent
                .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
                .end(function(err2, res2) {
                  if (res2 !== undefined && res2.ok) {
                    res2.body.browserUrl = global.browserURL;
                    res2.body.nickname = userInfo.nickname;
                    res.body.openid = userInfo.openid;
                    res.body.img = userInfo.headimgurl;
                    var string2= JSON.stringify(res2.body);
                    console.log('分享成功啦！'+string2);
                    res.render('welcome',res2.body);
                  } else {
                    console.error('微信分享api错误。');
                  }
                });
          }
      });
});

router.get('/index', function(req, res, next) {
  var id = req.query.id;
  //微信授权
  if(id){
    client.hget('tripperuser',id,function (err,result) {
      if(err){
        console.log(err);
      }else{
        result.id = id;
        console.log('result...'+result);
        res.render('index',JSON.parse(result));
      }
    })
  }else{
    var num = Math.floor(Math.random()*27+1);
    console.log(num);
    client.hget('tripperuser',num,function (err,result) {
      if(err){
        console.log(err);
      }else{
        result.id = num;
        console.log('result...'+result);
        var info = JSON.parse(result);
        res.render('index',{result:info});
      }
    })
  }
});

router.get('/result',function (req,res,next) {
  var num = Math.floor(Math.random()*27+1);
  res.render('index', { title: 'Express' });
})

router.get('/addData', function(req, res, next) {
  // for(var i =0;i<27;i++){
  //   client.incr('uid');
  //   client.get('uid',function (err,uid) {
  //     var num = uid-1;
  //     client.hmset('tripperuser',uid,JSON.stringify({
  //       name:userInfo.nickname[num],
  //       img:global.browserURL+'/images/'+userInfo.img[num],
  //       answer:userInfo.answer[num],
  //       match:''
  //     }))
  //   })
  // }
  // client.hset('tripperuserId','name','id');
  client.hget('tripperuserId','userid',function (err,flag) {
    if(flag == null || flag == ''){
      console.log('不存在');
    }else{
      console.log('存在');
      console.log(flag);
    }
    res.render('addData', { title: 'Express' });
  });
});

router.post('/post',function (req,res,next) {
  var userInfo = {
    name:req.body.name,
    img:req.body.img,
    answer:req.body.answer
  }
  client.incr('uid');
  client.get('uid',function (err,uid) {
    client.hset('tripperuser',uid,JSON.stringify(userInfo));
  })
})

module.exports = router;
