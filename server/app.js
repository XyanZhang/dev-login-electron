const Koa = require('koa');
const proxy = require('koa2-proxy-middleware');
const path = require('path');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');

const app = new Koa();

// 设置静态资源目录，例如 'public' 文件夹
const staticDir = path.join(__dirname, 'public');

app.use(serve(staticDir));

// 目标服务器的 URL
const target = 'https://www.huajin.com';


const options = {
  targets: {
    '/api/(.*)': {
      // this is option of http-proxy-middleware
      target: target, // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
  }
}
 
app.use(proxy(options));

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

app.listen(7788);

module.exports = app;