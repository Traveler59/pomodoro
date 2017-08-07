import * as React from 'react';

import { Settings } from './Settings.jsx';
import { Timer } from './Timer.jsx';

const WORK_TIME = 1500000;
const DEFAULT_SHORT_BREAK = 300000;
const DEFAULT_LONG_BREAK = 1200000;

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "Помодоро",
      shortBreak: DEFAULT_SHORT_BREAK,
      longBreak: DEFAULT_LONG_BREAK,
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
      var shortBreak = this.state.shortBreak;
      var longBreak = this.state.longBreak;
      var radio = document.getElementsByName('short');
      for (var i = 0; i < radio.length; i++)
        if (radio[i].checked) shortBreak = this.parseToMilliseconds(radio[i].value);

      radio = document.getElementsByName('long');
      for (var i = 0; i < radio.length; i++)
        if (radio[i].checked) longBreak = this.parseToMilliseconds(radio[i].value);

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
    var mode = 0;
    switch (this.state.mode) {
      case 'Помодоро':
        mode = WORK_TIME;
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
