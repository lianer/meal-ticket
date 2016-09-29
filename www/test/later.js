var later = require('later')

// var schedule = later.parse.recur().on(18).hour().on(0).minute().on(0).second()
later.date.localTime()
// later.date.UTC()
var schedule = later.parse.recur().after(11).hour().after(41).minute().every(1).second()

var nextSchedule = later.schedule(schedule).next(10)

console.log(nextSchedule);

later.setTimeout(function () {
  console.log(1);
}, schedule)


setTimeout(function () {
  process.exit()
}, 5000);
