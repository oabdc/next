> 项目目录结构

pages 放置next所有页面，且会根据此目录生成路由

package.json
```js
    "dev": "next", //本地开发编译
    "build": "next build", //部署生产环境
    "start": "next start"  //build完成后启动正式服务
```

正常使用react输出页面 ，需要react.createElement
next 已经在全局处理过,因此可直接export输出html

> 使用node原因
next自身带有服务器 只处理ssr渲染

处理http请求

数据接口

数据库状态

session

> mac 安装redis

redis.io 下载

make

sudo make install 安装

redis-server 启动

默认 6379

redis-cli 连接数据库

set a 123 设置

get a  获取

123

> redis 基本·使用

内存数据解构存储

可持久存储

支持多种数据结构

> 更改配置文件redis.conf

6379 -> 6378

requirepass 123456

编辑保存

redis-server ./redis.conf 启动

redis-cli -p 6378 指定端口号

auth 123456 登录

> redis 数据操作

get

set

setex c 10 1   设置key过期时间 c = 1 10秒后删除

DEL a  删除

KEYS * 查询所有KEY

> node 连接 redis

ioredis

> nextjs 不支持 css import

>

lib 非组件类公用型代码，类库，util

static 静态资

>路由映射
```js
    function goToTest(){
        Router.push({
            pathname: '/test/b',
            query: {
                id: 2
            }
        }, 'test/b/2')
    }

```

link as

push 第二个参数

缺点 刷新404

解决服务器渲染404
next

## 3.6 
> getInitialProps

数据获取

在app中获取全局数据

帮助客户端和服务端数据同步

自动复用服务端返回数据，不会重复执行

## 自定义App
作用：
固定页面布局
保持公用状态
给具体页面传入自定义数据
自定义错误处理

## 3.8自定义document

只有服务端渲染才会被调用

用来修改服务端渲染的内容

配合第三方css-in-js 使用

# 3.9 next样式定义

1. styled-js 生成唯一class名

 `jsx-839138`

保证组件间的样式是隔离的

2. 组件里 styled-jsx 虽然可以设置全局样式

但是如果组件渲染或者已经卸载，那此样式也是失效的的

3. 因为内部集成 styled-jsx 所以 服务端渲染时，
就已经返回有样式的内容





