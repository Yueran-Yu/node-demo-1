var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}
var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    var accept = request.headers["accept"]
    response.write(`
      <!DOCTYPE html>
      <head>
      <link rel="stylesheet" href="/style.css">
      </head>
      <body>
      <h1>Title</h1>
      <p>Hello, this is the fist I know I can write the code directly in the js file for node server to response.</p>
      <script src="/test.js"></script>
      </body>
      `)
    response.end()
  } else if (path === '/style.css') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`h1{color: red;}\n`)
    response.end()

  } else if (path === '/test.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(`console.log('This is the test.js file that can be used by the html file.')`)
    response.end()
  }
  else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`The page you visited is not exist. 404`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})
server.listen(port)
console.log('Listening' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

