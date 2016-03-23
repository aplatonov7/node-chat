import Koa from 'koa'
import serve from 'koa-static'
import socketIO from 'socket.io'
import http from 'http'

const app = new Koa()
app.use(serve('public'))

const server = http.createServer(app.callback())
const io = socketIO(server)

const pad = n => ('00' + n).slice(-2)
const curTime = () => {
  let d = new Date()
  return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds())
}

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('message', curTime() + ' - ' + msg);
  });
});

server.listen(3000);