var express = require('express');
var router = express.Router();
var low = require('lowdb')
var path = require('path');
var moment = require('moment');
var _ = require('lodash');
var xlsx = require('node-xlsx');
var queuee = require('queuee');

var q = queuee();

var db = low(path.join(__dirname, '../data/db2.json'), {
  storage: require('lowdb/lib/file-async')  // 使用异步存储
});
db.defaults({})

var logdb = low(path.join(__dirname, '../data/logdb.json'), {
  storage: require('lowdb/lib/file-async')  // 使用异步存储
});
logdb.defaults({
  apply: []  // 申请记录
});

const TOKEN = '20160926'

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || 
    req.headers['x-real-ip'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress;
}

// function getClientIp(req) {
//   var forwardedFor = req.headers['x-forwarded-for'];
//   if (forwardedFor !== undefined) return forwardedFor.split(',')[0];
//   var cf = req.headers['cf-connecting-ip'];
//   if (cf !== undefined) return cf;
//   return req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;
// }

function setUserInfo(teamId, date, userName, avatar /* 头像，可选 */, intro /* 介绍，可选 */) {
  db.update(`${teamId}.info.date${date}`, function (info) {
    if(!info){
      info = [];
    }
    if(!_.find(info, {name: userName})){
      info.push({
        name: userName,
        avatar: avatar || Math.floor(Math.random() * 41) + "",
        intro: intro || "我为加班而自豪"
      });
    }
    return info;
  }).value();
}

function getUserInfo(teamId, date, userName) {
  return db.get(`${teamId}.info.date${date}`).find({
    name: userName
  }).value() || null;
}

// 获取团队列表
router.get('/teams', function (req, res, next) {
  // 遍历对象的属性，返回每个属性的新值
  var teams = db.mapValues(function (item) {
    return {
      teamName: item.teamName
    }
  }).value();

  // 省略指定属性
  // var teams = db.omit(['apply']).value();

  // 选取指定属性
  // var teams = db.pick(['yypt']).value();

  // 删除指定路径的属性
  // var teams = db.unset('yypt.apply').value();  // => true

  res.json({
    err: 0,
    msg: '',
    data: teams
  })
});

// 新增团队
router.post('/team', function (req, res, next) {
  var token = req.headers.token;
  var teamId = req.body.teamId;
  var teamName = req.body.teamName;

  if(token !== TOKEN){
    res.json({
      err: 3,
      msg: '无权限'
    });
    return;
  }
  if(!teamId || !teamName){
    res.json({
      err: 1,
      msg: 'id或name为空'
    });
    return;
  }
  if(db.get(teamId).value()){
    res.json({
      err: 2,
      msg: '团队id已存在'
    });
    return;
  }
  var data = {
    teamName: teamName,
    apply: {}
  };
  db.set(teamId, data).value();
  res.json({
    err: 0,
    msg: '',
    data: data
  })
});

// 获取团队名称
router.get('/team/name', function (req, res, next) {
  var teamId = req.query.teamId
  var teamName = db.get(`${teamId}.teamName`).value();
  if(!teamName){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  res.json({
    err: 0,
    msg: '',
    data: {
      teamName: teamName
    }
  })
});

// 获取团队成员列表，仅返回当日已添加的成员
router.get('/team/apply', function (req, res, next) {
  var date = moment().format("YYYYMMDD").toString();
  var teamId = req.query.teamId;
  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  var apply = db.get(`${teamId}.apply.date${date}`, []).cloneDeep().reverse().value();
  var member = apply.map(function (userName) {
    return getUserInfo(teamId, date, userName);
  }).filter(function (item) {
    return !!item;
  });
  res.json({
    err: 0,
    msg: '',
    data: member
  });
});

// 新增团队成员
router.post('/team/apply', function (req, res, next) {
  var date = moment().format("YYYYMMDD").toString();
  var teamId = req.body.teamId;
  var teamName = db.get(`${teamId}.teamName`).value();
  var userName = req.body.userName;
  var ip = getClientIp(req);

  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  if(!userName){
    res.json({
      err: 2,
      msg: '请输入姓名'
    });
    return;
  }

  // 屏蔽重复ip提交
  var match = {
    ip: ip,
    date: date,
    teamId: teamId
  }

  req.log.info(match, 'ip提交日志');

  if(logdb.get('apply').findIndex(match).value() > -1){
    req.log.warn(match, 'ip重复提交');
    // res.json({
    //   err: 3,
    //   msg: ''
    // });
    // return;
  }

  // 记录日志
  logdb.update('apply', function (logs) {
    if(!logs){
      logs = [];
    }
    logs.push({
      "teamId": teamId,
      "teamName": teamName,
      "userName": userName,
      "date": date,
      "timestamp": new Date().getTime(),
      "ip": ip,
      "userAgent": req.headers['user-agent']
    });
    return logs;
  }).value();

  db.update(`${teamId}.apply.date${date}`, function (users) {
    users = (users || []).filter(function (name) {
      return name !== userName
    });
    users.push(userName);
    return users;
  }).value();

  setUserInfo(teamId, date, userName);

  var apply = db.get(`${teamId}.apply.date${date}`).value();
  res.json({
    err: 0,
    msg: '',
    data: apply
  });
});

// 删除团队成员
router.delete('/team/apply', function (req, res, next) {
  var date = moment().format("YYYYMMDD").toString();
  var teamId = req.body.teamId;
  var userName = req.body.userName;
  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  if(!userName){
    res.json({
      err: 2,
      msg: '成员不存在'
    });
    return;
  }
  db.update(`${teamId}.apply.date${date}`, function (users) {
    users = (users || []).filter(function (name) {
      return name !== userName
    });
    return users;
  }).value();
  var apply = db.get(`${teamId}.apply.date${date}`).value();
  res.json({
    err: 0,
    msg: '',
    data: apply
  });
});

// 删除全部团队成员
router.delete('/team/clear', function (req, res, next) {
  var date = moment().format("YYYYMMDD").toString();
  var teamId = req.body.teamId;
  var token = req.body.token;
  if(token !== TOKEN){
    res.json({
      err: 2,
      msg: '无权限'
    });
    return;
  }
  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  db.update(`${teamId}.apply.date${date}`, function (users) {
    return [];
  }).value();
  var apply = db.get(`${teamId}.apply.date${date}`).value();
  res.json({
    err: 0,
    msg: '',
    data: apply
  });
});

// 获取成员信息
router.get('/user', function (req, res, next) {
  var date = moment().format("YYYYMMDD").toString();
  var teamId = req.query.teamId;
  var userName = req.query.userName;
  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  if(!userName){
    res.json({
      err: 2,
      msg: '请输入姓名'
    });
    return;
  }
  // 获取所有报名记录，统计天数
  var apply = db.get(`${teamId}.apply`).value();
  var count = [];
  _.each(apply, function (users, date) {
    if(!_.isArray(users)){
      users = [];
    }
    if(users.indexOf(userName) > -1){
      count.push(date.replace('date', ''));
    }
  });
  // 获取成员信息，头像和介绍
  var info = getUserInfo(teamId, date, userName);
  res.json({
    err: 0,
    msg: '',
    data: {
      count: count,
      info: info
    }
  })
});

// 导出当天成员excel
router.get('/team/export', function (req, res, next) {
  var queryDate = req.query.date || new Date();
  var date = moment(queryDate).format("YYYYMMDD").toString();
  var teamId = req.query.teamId;
  var teamName = '';
  var teamMember;
  var data;
  if(!db.has(teamId).value()){
    res.json({
      err: 1,
      msg: '该团队不存在'
    })
    return;
  }
  teamName = db.get(`${teamId}.teamName`).value();
  teamMember = db.get(`${teamId}.apply.date${date}`, []).cloneDeep().value();
  data = _.map(teamMember, function (user) {
    return [user]
  });
  q.push(function (cb) {
    var t1 = new Date();
    var xlsxBuffer = xlsx.build([{name: "Sheet1", data: data}]);
    res.attachment(`加班报名-${teamName}-${date}.xlsx`);  // 设置文件名
    res.send(xlsxBuffer);  // 发送buffer
    var t2 = new Date();
    setTimeout(cb, 200);
  });
});


module.exports = router;
