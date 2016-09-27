var _ = require('lodash');

var arr = [1,3,2,5,4,1];

console.log(_.uniq(arr));

console.log(_.dropWhile(arr, 2));

var arr = [
  {
    "teamId": "yypt",
    "teamName": "应用平台",
    "userName": "1",
    "date": "20160927",
    "timestamp": 1474945914639,
    "ip": "::ffff:192.168.119.167",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  {
    "teamId": "yypt",
    "teamName": "应用平台",
    "userName": "4",
    "date": "20160927",
    "timestamp": 1474965384293,
    "ip": "::ffff:192.168.119.167",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  {
    "teamId": "yypt",
    "teamName": "应用平台",
    "userName": "5",
    "date": "20160927",
    "timestamp": 1474965395943,
    "ip": "::ffff:192.168.119.167",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  {
    "teamId": "yypt",
    "teamName": "应用平台",
    "userName": "f",
    "date": "20160927",
    "timestamp": 1474965418181,
    "ip": "::ffff:192.168.119.167",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  }
]

console.log(_.findIndex(arr, {
  ip: '::ffff:192.168.119.167',
  date: '20160927',
  teamId: 'yypt'
}));