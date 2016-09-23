var lowdb = require('lowdb')
var db = lowdb('db.json')
var list = [1,2,3]
db.set('a.b', list).value()