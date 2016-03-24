import Koa from 'koa'
import serve from 'koa-static'
import socketIO from 'socket.io'
import http from 'http'

const app = new Koa()
app.use(serve('public'))

const server = http.createServer(app.callback())
const io = socketIO(server)

io.on('connection', function(socket) {
  socket.on('message', function(data) {
    io.emit('message', JSON.stringify({
      time: Date.now(),
      msg: data
    }));
  });
});

server.listen(3000);