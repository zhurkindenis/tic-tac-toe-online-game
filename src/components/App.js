import React, { Component, PropTypes } from 'react'
import calculateWinner from './helpers/calculateWinner'
import {transport} from "./helpers/socket"
var role = "";
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    // Массив для хранения информации о сделанных ходах
        stepArray : new Array(9),
    // Номер шага
        numberStep : 1,
    // Результат игры
        result : "",
    // Первый подключенный игрок
        firstPlayer : "",
    // Номер комнаты
        room : "",
    // Второй подключенный игрок
        secondPlayer : ""}
    //Обновление данных, полученных от сервера после хода игрока
    transport.getState(function(state) {
      this.setState({
        stepArray: state.stepArray,
        numberStep: state.numberStep,
        result : state.result
      })
    }.bind(this));
    //Устанавливаем текущих игроков и номер комнаты; в зависимости от того чей сейчас
    // ход, firstPlayer или secondPlayer будет равен undefinded
    transport.setPlayer (function(state) {
      this.setState({
        'firstPlayer': state.firstPlayer,
        'room': state.room,
        'secondPlayer': state.secondPlayer
      })
    }.bind(this));
  }
  move(id) {
    // Если данная ячейка уже занята либо игра окончена выходим из функции
    if(this.state.stepArray[id] || this.state.result){ return;}
    // Проверка хода  (Если  нечётный номер хода, то должен ходить 1 игрок(X),
    // если  чётный номер хода, то должен ходить 2 игрок(О), иначе ошибка)
    if ((((this.state.numberStep % 2==0)&& (this.state.firstPlayer)))||
        ((!(this.state.numberStep % 2==0)) && (this.state.secondPlayer))){
      alert("Не Ваш ход!");
      return;}
    // Заносим в массив на позицию номера ячейки имя игрока, сделавшего ход
       if (this.state.numberStep % 2==0)
      role = "secondPlayer";
    else
      role = "firstPlayer";
    this.state.stepArray[id] = role;
    // Обновляем массив и увеличиваем шаг
    this.setState({
      stepArray : this.state.stepArray,
      numberStep : ++this.state.numberStep,
    });
    // Вычисляем результат игры и обновляем соответствующую переменную
    const result = calculateWinner(this.state.stepArray);
    this.setState({result : result});
    // Отправляем изменённое состояние на сервер
    transport.sendState ({
      stepArray: this.state.stepArray,
      numberStep: this.state.numberStep,
      result : result,
      room : this.state.room}
    )
  }
    // Функция, динамически меняющая класс элемента при помощи массива сделанных ходов
  isActive(id){
    return 'cell '+ (this.state.stepArray[id]!= undefined ? this.state.stepArray[id] : " ");
  }
  render() {
    return (
        <div id="game">
          <div className="head"><h1>Крестики-нолики</h1></div>
          <div className="board">
            <div>
              <div className={this.isActive(0)}   onClick={() => this.move(0)}></div>
              <div className={this.isActive(1)}   onClick={() => this.move(1)}></div>
              <div className={this.isActive(2)}   onClick={() => this.move(2)}></div>
              <div className={this.isActive(3)}   onClick={() => this.move(3)}></div>
              <div className={this.isActive(4)}   onClick={() => this.move(4)}></div>
              <div className={this.isActive(5)}   onClick={() => this.move(5)}></div>
              <div className={this.isActive(6)}   onClick={() => this.move(6)}></div>
              <div className={this.isActive(7)}   onClick={() => this.move(7)}></div>
              <div className={this.isActive(8)}   onClick={() => this.move(8)}></div>
            </div>
          </div>
          <div className="result"><h2>{this.state.result}</h2></div>
        </div>
    );
  }
}












