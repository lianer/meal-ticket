报名表数据结构设计

```
| team 团队
  | name 团队名称
  | apply 团队申请
    | date 日期 / userName list

  | info 成员信息
    | date 日期 / userInfo list
      | name 成员姓名
      | avatar 成员头像
      | intro 成员介绍
```

```
{
  "yypt": {
    "name": "应用平台",
    "apply": {
      "date20160923": {
        "member": ["楼云龙"]
      }
    },
    "info": {
      "date20160923": [{
        "name": "楼云龙",
        "avatar": "1",
        "intro": "我为加班而自豪"
      }]
    }
  }
}
```


日志表

```
| apply 申请记录
  | teamId
  | teamName
  | userName
  | date
  | timestamp
  | ip
  | userAgent
```

```
{
  "apply": [{
    "teamId": "yypt",
    "teamName": "应用平台",
    "userName": "楼云龙",
    "date": "20160927",
    "timestamp": "123123123123123",
    "ip": "127.0.0.1",
    "userAgent": "xxxxxxxxxxxxxxxxxxxxxxx"
  }]
}
```