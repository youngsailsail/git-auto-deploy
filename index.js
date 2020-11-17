var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');

// 下面填写的myscrect跟github webhooks配置一样，下一步会说；path是我们访问的路径
var handler = createHandler({ path: '/', secret: 'addsacdd' });


http.createServer(function (req, res) {
    console.log('发起请求-----')
    handler(req, res, function (err) {
        console.error('Error0-----:', err.message)
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8080);


handler.on('error', function (err) {
    console.error('Error1-----', err.message)
});

// 监听到push事件的时候执行我们的自动化脚本
handler.on('push', function () {
    console.log('push-----')
    runCommand('sh', ['./auto_build.sh'], function (txt) {
        console.log(txt);
    });
});

function runCommand(cmd, args, callback) {
    var child = spawn(cmd, args);
    var resp = '';
    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}
