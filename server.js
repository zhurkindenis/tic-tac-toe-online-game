var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/src/public/index.html')
});

const server = app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("Start server on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
const io = require('socket.io')(server);
  //Список комнат
var rooms = [];

io.on('connection', function(socket) {
  //Подключение первого пользователя
  socket.on('connectFirstPlayer', function() {
  //Создание комнаты
    var room = Math.round(Math.random() * 1000);
  //подключение  пользователя к комнате
    socket.join(room);
    console.log('First player with id '+socket.id+' join into room '+ room);
  //Отправка идентификатора пользователя и номер комнаты в UI
    socket.emit('firstPlayer', {'firstPlayer' :"firstPlayer", 'room': room});
  //Добавление текущей комнаты в список комнат
    addRoom(room);
  });
  // Подключение второго пользователя
  socket.on('connectSecondPlayer', function(data) {

  // Проверка существования комнаты в списке созданных
    if (!containsTheRoom(data.roomId)) {
      socket.emit('roomNotFound', {'message': "<h1>Комната не найдена!</h1>" });
      return;
    }
  // Количество игроков в комнате
    var roomCount = io.sockets.adapter.rooms[data.roomId].length;
    if(roomCount<=1) {
  //Подключение 2 пользователя к комнате
      socket.join(data.roomId);
  //Отправка идентификатора пользователя и номер комнаты в UI
      socket.emit('secondPlayer', {'secondPlayer' :  "secondPlayer", 'room': data.roomId});
      console.log('Second player with id '+socket.id+' join into room '+ data.roomId);
  //Сообщение для инициализации игры
      io.sockets.to(data.roomId).emit('startGame');
    }
    else {
      socket.emit('roomIsFull', {'message': "<h1>Комната заполнена!</h1>"});
      return;
    }
  });
  //Событие для получения данных измененного состояния UI
  socket.on('sendState', function(data) {
    console.log(data.room);
  //Отправляем измененное состояние другому игроку в комнате
    socket.broadcast.to(data.room).emit('getState', data)
  });
});
  //Добавление созданной комнаты в список комнат
function addRoom(roomId) {
  rooms.push(roomId);
}
  //Функция поиска комнаты в списке созданных
function containsTheRoom(roomId) {
  for (var i=0; i < rooms.length; i++) {
    if (rooms[i] == roomId) {
      return true;
    }
  }
}