import * as React from 'react';

import { Settings } from './Settings.jsx';
import { Timer } from './Timer.jsx';

require('./../styles/app.scss');



export class App extends React.Component {
  constructor() {
    super();
    const defaultShortBreak = 300000;
    const defaultLongBreak = 1200000;
    this.state = {
      mode: "Помодоро",
      shortBreak: defaultShortBreak,
      longBreak: defaultLongBreak,
      alarm: true
    }
  }

  toggleMenu = () => {
    const menuDisplay =
      getComputedStyle(document.getElementsByClassName('menu-background')[0]).display;
    document.getElementsByClassName('menu-background')[0].style.display =
      menuDisplay == 'none' ? 'block' : 'none';
  }

  parseToMilliseconds = (string) => parseInt(string) * 1000 * 60;

  onBtnClick = (e) => this.setState({ mode: e.target.innerText });

  onSelectChange = (e) => this.setState({ longBreak: this.parseToMilliseconds(e.target.value) });

  onSettingsSubmit = (e) => {
    //Обработчик выбора настроек в меню
    const isAlarm = document.getElementById('alarm').checked ? true : false;

    if (document.getElementsByName('app-mode')[0].checked) {
      let shortBreak = this.state.shortBreak;
      let longBreak = this.state.longBreak;
      const short = document.getElementsByName('short');
      for (let i = 0; i < short.length; i++)
        if (short[i].checked) shortBreak = this.parseToMilliseconds(short[i].value);

      const long = document.getElementsByName('long');
      for (let i = 0; i < long.length; i++)
        if (long[i].checked) longBreak = this.parseToMilliseconds(long[i].value);

      this.setState({
        mode: 'Помодоро',
        longBreak: longBreak,
        shortBreak: shortBreak,
        alarm: isAlarm
      });

    } else {
      const timerInput = document.getElementsByName('timer')[0];
      const timer = isNaN(this.parseToMilliseconds(timerInput.value))
        ? timerInput.value
        : this.parseToMilliseconds(timerInput.placeholder);
      this.setState({ mode: "Таймер", setTime: timer, alarm: isAlarm });
    }
    this.toggleMenu();
  }

  onSettingsCall = () => this.toggleMenu();

  render() {
    const workTime = 1500000;
    let mode = 0;
    switch (this.state.mode) {
      case 'Помодоро':
        mode = workTime;
        break;
      case 'Пауза':
        mode = this.state.shortBreak;
        break;
      case 'Длинная пауза':
        mode = this.state.longBreak;
        break;
      case 'Таймер':
        mode = this.state.setTime;
        break;
    }
    return <div>
      <div className="center">
        <img onClick={this.onSettingsCall} src="src/images/settings.png" alt="Настройки" />
        <Timer mode={mode} modeName={this.state.mode} alarmTimout={this.state.alarm} />
        <div className="block-center">
          <button className="btn" onClick={this.onBtnClick}>Помодоро</button>
          <button className="btn" onClick={this.onBtnClick}>Пауза</button>
          <button className="btn" onClick={this.onBtnClick}>Длинная пауза</button>
        </div>
      </div>
      <Settings onClick={this.onSettingsSubmit} />

    </div>;
  }
}
