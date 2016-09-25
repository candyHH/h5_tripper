var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '十一出行先看看旅伴靠谱啵！' });
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
              console.log(openid);
              client.hget('tripperUserOpenId',openid,function (err,flag) {
                if(flag == null || flag == ''){
                  console.log('不存在');
                  superagent
                    .get(global.wechatURL + '/wechat_api/jsconfig?url=' + shareUrl)
                    .end(function(err2, res2) {
                      if (res2 !== undefined && res2.ok) {
                        res2.body.browserUrl = global.browserURL;
                        res2.body.nickname = userInfo.nickname;
                        res.body.img = userInfo.headimgurl;
                        var string2= JSON.stringify(res2.body);
                        console.log('分享成功啦！'+string2);
                        res.render('welcome',res2.body);
                      } else {
                        console.error('微信分享api错误。');
                      }
                    });
                }else{
                  console.log('存在');
                  console.log(flag);
                  // res.redirect('success?id='+uid);
                }
                res.render('index', { title: 'Express' });
              });
          }
      });

});

router.get('/index', function(req, res, next) {
  var shareId = req.query.id;
  //微信授权
  if(shareId){
    client.hget('tripperuser',id,function (err,result) {
      if(err){
        console.log(err);
      }else{
        result.id = id;
        console.log('result...'+result);
        var info = JSON.parse(result);
        res.render('index',{result:info});
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

router.get('/result', function(req, res, next) {
  res.render('result', { title: '十一出行先看看旅伴靠谱啵！' });
});

module.exports = router;
