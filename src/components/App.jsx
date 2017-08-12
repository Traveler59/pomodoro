import * as React from 'react';

import { SettingsMenu } from './SettingsMenu';
import { Timer } from './Timer';

require('./../styles/app.scss');

export class App extends React.Component {
  constructor() {
    super();
    const defaultShortBreak = 300000;
    const defaultLongBreak = 1200000;
    this.state = {
      mode: 'Помодоро',
      settingsShow: false,
      shortBreak: defaultShortBreak,
      longBreak: defaultLongBreak,
      setTime: defaultShortBreak,
      alarm: true
    }
  }

  toggleMenu = () => this.setState({ settingsShow: !this.state.settingsShow });
  onAppModeChange = e => this.setState({ mode: e.target.value });
  onShortPauseChange = e => this.setState({ shortBreak: this.parseToMilliseconds(e.target.value) });
  onLongPauseChange = e => this.setState({ longBreak: this.parseToMilliseconds(e.target.value) });
  onCustomTimerChange = e => this.setState({ setTime: this.parseToMilliseconds(e.target.value) });
  onAlarmSet = e => this.setState({ alarm: e.checked });
  onPomodoroButtonClick = e => this.setState({ mode: e.target.innerText });
  onSettingsCall = () => this.toggleMenu();

  parseToMilliseconds = minutes => parseInt(minutes) * 1000 * 60;

  render() {
    const workTime = 1500000;

    const modeToMinutes = mode => {
      switch (mode) {
        case 'Помодоро':
          return workTime;
        case 'Пауза':
          return this.state.shortBreak;
        case 'Длинная пауза':
          return this.state.longBreak;
        case 'Таймер':
          return this.state.setTime;
      }
    }

    return <div>
      <div className="center">
        <img onClick={this.onSettingsCall} src="src/images/settings.png" alt="Настройки" />
        <Timer mode={modeToMinutes(this.state.mode)} modeName={this.state.mode} alarmTimout={this.state.alarm} />
        <div className="button-menu">
          <button className="btn" onClick={this.onPomodoroButtonClick}>Помодоро</button>
          <button className="btn" onClick={this.onPomodoroButtonClick}>Пауза</button>
          <button className="btn" onClick={this.onPomodoroButtonClick}>Длинная пауза</button>
        </div>
      </div>
      {this.state.settingsShow && <SettingsMenu onAppModeChange={this.onAppModeChange} onLongPauseChange={this.onLongPauseChange} onShortPauseChange={this.onShortPauseChange}
        onCustomTimerChange={this.onCustomTimerChange} onAlarmSet={this.onAlarmSet} onOk={this.toggleMenu} />}
    </div>;
  }
}
