const WORK_TIME = 1500000;
const DEFAULT_SHORT_BREAK = 300000;
const DEFAULT_LONG_BREAK = 1200000;
window.App = React.createClass({
  toggleMenu: function() {
    var menuDisplay =
      getComputedStyle(document.getElementsByClassName('menu-background')[0]).display;
    document.getElementsByClassName('menu-background')[0].style.display =
      menuDisplay == 'none' ? 'block' : 'none';
  },
  parseToMilliseconds: function(string) {
    return parseInt(string)*1000*60;
  },

  onBtnClick: function(e) {
//Обработчик клика по кнопкам
//Устанавливает тип таймера в соответствии с нажатой кнопкой
    this.setState({mode: e.target.innerText});
  },
  onSelectChange: function(e) {
//Обработчик выпадающего списка
//Устанавливает продолжительность длинной паузы по выбранной опции
    this.setState({longBreak: this.parseToMilliseconds(e.target.value)});
  },
  onSettingsSubmit: function(e) {
//Обработчик выбора настроек в меню
    var isAlarm = true;
    isAlarm = document.getElementById('alarm').checked ?  true: false;

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
        mode:'Помодоро',
        longBreak: longBreak,
        shortBreak: shortBreak,
        alarm: isAlarm});

    } else {
      var timer = 0;
      var timerInput = document.getElementsByName('timer')[0];
      timer =
        this.parseToMilliseconds(timerInput.value);
      if(isNaN(timer))
        timer = this.parseToMilliseconds(timerInput.placeholder);
      this.setState({mode: "Таймер", setTime: timer, alarm: isAlarm});
    }

    this.toggleMenu();
  },

  onSettingsCall: function() {
    this.toggleMenu();
  },

  getInitialState: function() {
    return {
      mode: "Помодоро",
      shortBreak:DEFAULT_SHORT_BREAK,
      longBreak:DEFAULT_LONG_BREAK,
      alarm: true };
  },
  render: function() {
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
        <Timer mode={mode} modeName={this.state.mode} alarmTimout={this.state.alarm}/>
        <div className="block-center">
          <button className="btn" onClick={this.onBtnClick}>Помодоро</button>
          <button className="btn" onClick={this.onBtnClick}>Пауза</button>
          <button className="btn" onClick={this.onBtnClick}>Длинная пауза</button>
        </div>
      </div>
      <Settings onClick={this.onSettingsSubmit}/>

    </div>;
  }
});
