var express = require('express');
var router = express.Router();
var low = require('lowdb')
var path = require('path');
var moment = require('moment');

var db = low(path.join(__dirname, '../data/db.json'));
db.defaults({ posts: [], user: {} })

/* GET home page. */
router.get('/:team', function(req, res, next) {
  var team = req.params.team;
  res.render('index', { title: 'Express' });
});

router.get('/:team/member', function(req, res, next) {
  var team = req.params.team;
  var member = db.get(`${team}.member`);
  var date = moment().format("YYYYMMDD").toString();
  var selectedMember = db.get(`${team}.apply.date${date}.member`).value();
  console.log(`${team}.member.date${date}.member`);
  console.log(selectedMember);
  res.json({member: member, selectedMember, selectedMember});
});

router.post('/:team/member', function(req, res, next) {
  var team = req.params.team;
  var member = req.body.member;
  db.set(`${team}.member`, member).value();
  res.json(member);
});

router.post('/:team/change', function (req, res, next) {
  var team = req.params.team;
  var member = req.body.member;
  var date = moment().format("YYYYMMDD").toString();
  db.set(`${team}.apply.date${date}.member`, member).value();
  res.json(member);
});

module.exports = router;
