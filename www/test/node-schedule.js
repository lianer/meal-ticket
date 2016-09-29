var schedule = require('node-schedule');

var j = schedule.scheduleJob('1-60 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

setTimeout(function () {
  process.exit()
}, 20000);