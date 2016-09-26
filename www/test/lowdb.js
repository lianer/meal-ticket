var lowdb = require('lowdb')
var db = lowdb('db.json', {
  storage: require('lowdb/lib/file-async')  // 使用异步存储
})
var fs = require('fs')

// var list = [1,2,3]
// db.set('a.b', list).value()

// 数组，删除第一条数据
// db.get('a.b').splice(0, 1).value()

// 数组，增加一条数据
// db.get('a.b').push(0, 1).value()

// 数组，增加一条数据在前面
// db.get('a.b').splice(0, 0, 1).value()

// 数组，合并更新，将新数组的值对应的覆盖旧数组，_.assign([1,2,3], [4]) => [4,2,3]
// db.get('a.b').assign([2]).value()

// 默认值[]
// var val = db.get('a.b.c', []).value()
// console.log(val);

// 更新数据，如果路径不存在，则会增加路径，与set唯一不同的就是多了updater这个支持重新赋值的回调函数
// db.update('a.d', function updater(data) {
//   return (data || 0) + 1
// }).value()

// 同步插入数据测试，结论：lowdb默认写文件是同步的，要考虑性能问题
// 配置 {storage: require('lowdb/lib/file-async')} 使用异步存储
// db.update('a.e', function (data) {
//   return (data || 0) + 1
// }).value()
// console.log(require('./db.json').a.e);
// setTimeout(function () {
//   console.log(JSON.parse(fs.readFileSync('./db.json').toString()).a.e);
// }, 10);
