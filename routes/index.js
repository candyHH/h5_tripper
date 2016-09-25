var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '十一出行先看看旅伴靠谱啵！' });
});

router.get('/result', function(req, res, next) {
  res.render('result', { title: '十一出行先看看旅伴靠谱啵！' });
});

module.exports = router;
