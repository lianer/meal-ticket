# meal-ticket

前端基于webpack+vue+vux，后端基于express+lowdb。有了这些，开发一个项目将会变得很轻松。

项目开源，通过这些步骤就可以在本地预览效果。

## 启动api服务

所有数据都走api跨域请求，默认使用4003端口，在./bin/www文件中修改

```bash
cd ./www
npm i
node ./bin/www
```

## 开发app（本地开发模式）

webpack的开发模式，浏览器访问 http://localhost:8080

```bash
cd ./app
npm i
npm run dev
```

## 编译app（打包发布模式）

打包发布模式下读取的是locals.config.prod.js配置文件

打开locals.config.prod.js配置文件，将api改为本地的api地址http://localhost:4003

```bash
cd ./app
npm i
npm run build
```

## 本地预览

通过express实现的简单静态服务，浏览器访问 http://localhost:4000

打开locals.config.prod.js配置文件，将api改为本地的api地址http://localhost:4003

```bash
cd ./app
npm i
node ./server.js
```

## 发布线上

发布到线上使用nginx托管，还需要做很多工作，见文章[webpack+vue+vux+express+lowdb](http://imlianer.com/a/webpack-vue-vux-express-lowdb)

