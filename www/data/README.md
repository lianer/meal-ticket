报名表数据结构设计

```
| team 团队
  | name 团队名称
  | apply 团队申请
    | date 日期
      | member 申请列表
```

```
{
  "yypt": {
    "name": "应用平台",
    "apply": {
      "20160923": {
        member: ["楼云龙"]
      }
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