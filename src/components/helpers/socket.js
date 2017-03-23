import io from 'socket.io-client'
var socket = io();

export const transport = (function (){
    return {
        getState: function(state) {
            socket.on('getState', state);
        },
        setPlayer: function(state) {
            socket.on('firstPlayer', state);
            socket.on('secondPlayer', state);
        },
        sendState : function(data) {
                socket.emit('sendState',data);
            },
        }
}());
socket.on('connect', function() {
    //Получаем Get параметры URL клиента
    var path = window.location.search;
    // Если клиент зашел на localhost:3000/ то считается 1 игроком в новой комнате
    if (path == '') {
        socket.emit('connectFirstPlayer');
    } else {
        //Передаем на сервер номер комнаты без знака '?'
        socket.emit('connectSecondPlayer', {'roomId': path.substr(1)});
    }
});
// Выводим на экран URL для подключения 2 игрока
socket.on('firstPlayer', function(data) {
    document.getElementById('link').innerHTML = window.location.href+'?'+data.room;
});
//Выводим на экран сообщение о том, что в комнате уже 2 игрока
socket.on('roomIsFull', function(data) {
    document.getElementById("lobby").innerHTML = data.message;
});
//Выводим на экран сообщение о том, что указанной комнаты не существует
socket.on('roomNotFound', function(data) {
    document.getElementById("lobby").innerHTML = data.message;
});
//Скрываем элементы, содержащие заголовок и URL комнаты
socket.on('startGame', function() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("app").style.display = "";
});