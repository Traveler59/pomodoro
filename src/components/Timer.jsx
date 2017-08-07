window.audio = new Audio('src/songs/alarm.mp3');

import React from 'react';

export class Timer extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      remaining: 10000, currentMode: 'Помодоро'
    };
    console.log(this.state);
  }
  componentDidMount() {
    this.setState({ remaining: this.props.mode });
    console.log(this.state);
    this.timer = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    //Обновление таймера при получении новых свойств
    this.setState({ remaining: nextProps.mode, currentMode: nextProps.modeName });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      //Тик таймера раз в секунду
      this.setState({ remaining: this.state.remaining - 1000 });
      //Истечение времени таймера
      if (this.state.remaining == 0) this.timerExpired();
    }, 1000);
    audio.pause();
  }

  timerExpired = () => {
    clearInterval(this.timer);
    //Сигнал
    if (this.props.alarmTimout) {
      audio.load();
      audio.play();
    }
  }

  render() {
    //Вычисление минут/секунд и их рендер
    const remaining = this.state.remaining / 1000;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining - 60 * minutes;

    return <div>
      <p className="clock">{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>
      <p className="mode">{this.state.currentMode.toUpperCase()}</p>
    </div>;
  }
}
