var fs = require('fs')
var xlsx = require('node-xlsx')

setTimeout(function () {
  process.exit()
}, 5000);

const data = [['楼云龙'],[2],[3]];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer

fs.writeFile('aaa.xlsx', buffer, function (err) {
  if(err){
    console.log(err);
  }
  console.log('finished');
})
