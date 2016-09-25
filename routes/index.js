var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var redis = require('redis');
var config = require('../config.js');
var userInfo = require('../majia.js');
var client  = redis.createClient(config.redis.port,config.redis.ip);
// var client  = redis.createClient(config.redis.port,'127.0.0.1');
client.auth(config.redis.pwd);
client.select(config.redis.db);
// client.select('4');

/* GET home page. */
router.get('/', function(req, res, next) {
  var thisUrl = req.url;
  var shareId = req.query.id;
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
  //微信授权
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
              var selfInfo = JSON.parse(res4.text);
              console.log('玩家信息:'+info.text);
              // 判断玩家是否存在集合
              var openid = selfInfo.openid;
              console.log(openid);
              client.hget('tripperUserOpenId',openid,function (err,selfid) {
                if(selfid == null || selfid == ''){
                  console.log('不存在');
                  // isShare(shareId,shareUrl,selfInfo);
                  //判断是否由他人分享
                  if(shareId){
                    client.hget('tripperuser',id,function (err,result) {
                      if(err){
                        console.log(err);
                      }else{
                        result.id = id;
                        console.log('result...'+result);
                        var shareInfo = JSON.parse(result);
                        // wechatShare(shareUrl,selfInfo,shareInfo);
                        superagent
                          .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
                          .end(function(err2, res2) {
                            if (res2 !== undefined && res2.ok) {
                              res2.body.browserUrl = global.browserURL;
                              res2.body.selfInfo = selfInfo;
                              res2.body.shareInfo = shareInfo;
                              var string2= JSON.stringify(res2.body);
                              console.log('分享成功啦！'+string2);
                              res.render('index',res2.body);
                            } else {
                              console.error('微信分享api错误。');
                            }
                          });
                      }
                    })
                  }else{
                    var num = Math.floor(Math.random()*27+1);
                    console.log(num);
                    client.hget('tripperuser',num,function (err,result) {
                      if(err){
                        console.log(err);
                      }else{
                        // result.id = num;
                        console.log('result...'+result);
                        var shareInfo = JSON.parse(result);
                        shareInfo.id = num;
                        // wechatShare(shareUrl,selfInfo,shareInfo);
                        superagent
                          .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
                          .end(function(err2, res2) {
                            if (res2 !== undefined && res2.ok) {
                              res2.body.browserUrl = global.browserURL;
                              res2.body.selfInfo = selfInfo;
                              res2.body.shareInfo = shareInfo;
                              var string2= JSON.stringify(res2.body);
                              console.log('分享成功啦！'+string2);
                              res.render('index',res2.body);
                            } else {
                              console.error('微信分享api错误。');
                            }
                          });
                      }
                    })
                  }
                }else{
                  console.log('存在');
                  console.log(selfid);
                  if(shareId){
                    res.redirect('result?selfid='+selfid+'&&shareid='+shareId);
                  }else{
                    res.redirect('result?selfid='+selfid);
                  }
                }
              });
            }
      });
});

router.get('/index', function(req, res, next) {
  var thisUrl = req.url;
  var shareId = req.query.id;
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
  //微信授权
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
              var selfInfo = JSON.parse(res4.text);
              // 判断玩家是否存在集合
              var openid = selfInfo.openid;
              console.log(openid);
              client.hget('tripperUserOpenId',openid,function (err,selfid) {
                if(selfid == null || selfid == ''){
                  console.log('不存在');
                  isShare(shareId,shareUrl,selfInfo);
                }else{
                  console.log('存在');
                  console.log(selfid);
                  if(shareId){
                    res.redirect('result?selfid='+selfid+'&&shareid='+shareId);
                  }else{
                    res.redirect('result?selfid='+selfid);
                  }
                }
              });
            }
      });
});


router.get('/result',function (req,res,next) {
  var selfId = req.query.selfid;
  var shareId = req.query.shareid;

  //获取分享者的答案和答题者的答案
  res.render('result', { title: 'Express' });
})

router.get('/addData', function(req, res, next) {
  for(var i =0;i<27;i++){
    client.incr('uid');
    client.get('uid',function (err,uid) {
      var num = uid-1;
      client.hmset('tripperuser',uid,JSON.stringify({
        name:userInfo.nickname[num],
        img:global.browserURL+'/images/imgMajia/'+userInfo.img[num],
        answer:userInfo.answer[num],
        match:''
      }))
    })
  }
  res.render('/addData');
  //存储openid与id对应的关系
  // client.hset('tripperUserOpenId','name','id');
});

router.post('/post',function (req,res,next) {
  var userInfo = {
    name:req.body.name,
    img:req.body.img,
    answer:req.body.answer,
  }
  var openid = req.body.openid;
  client.incr('uid');
  client.get('uid',function (err,uid) {
    client.hset('tripperUserOpenId',openid,id);
    client.hset('tripperuser',uid,JSON.stringify(userInfo));
    // res.send({id:'存储完成'});
  })
})

module.exports = router;
