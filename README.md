# meal-ticket

前端基于webpack+vue+vux，后端基于express+lowdb。有了这些，开发一个项目将会变得很轻松。

项目开源，通过这些步骤就可以在本地预览效果。

## 创建初始数据库文件
重命名 www/data/db2.json.bak 为 www/data/db2.json

## 开发环境

```bash
# 启动 api 服务
cd ./www
npm i
npm start
cd ..

# 启动 app
cd ./app
npm i
npm run dev
cd ..
```

## 生产环境

进入 app 目录，创建 locals.config.prod.js，生产环境优先读取是 locals.config.prod.js 配置文件，然后执行启动脚本

```bash
sh start.sh
```

生产环境中为了避免执行 npm run build 时客户端请求出现 404，因此 nginx 将静态目录代理到 dist-prod，并在 npm run build 之后执行 rsync 将 dist 目录同步到 dist-prod 目录

nginx 配置见文章[webpack+vue+vux+express+lowdb](http://imlianer.com/a/webpack-vue-vux-express-lowdb)
