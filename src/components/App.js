const WORK_TIME = 1500000;
const DEFAULT_SHORT_BREAK = 300000;
const DEFAULT_LONG_BREAK = 1200000;
window.App = React.createClass({
  onBtnClick: function(e){
//Обработчик клика по кнопкам
//Устанавливает тип таймера в соответствии с нажатой кнопкой
    this.setState({mode: e.target.innerText});
  },
  onSelectChange: function(e){
//Обработчик выпадающего списка
//Устанавливает продолжительность длинной паузы по выбранной опции
    this.setState({longBreak: parseInt(e.target.value)*1000*60});
  },
  onSettingsSubmit: function(e) {
    var isAlarm = true;
    if(document.getElementById('alarm').checked) isAlarm = true;
    else isAlarm = false;

    if(document.getElementsByName('app-mode')[0].checked) {
      var shortBreak = this.state.shortBreak;
      var longBreak = this.state.longBreak;
      var radio = document.getElementsByName('short');
      for (var i = 0; i < radio.length; i++)
        if (radio[i].checked) shortBreak = parseInt(radio[i].value)*1000*60;

      radio = document.getElementsByName('long');
      for (var i = 0; i < radio.length; i++)
        if (radio[i].checked) longBreak = parseInt(radio[i].value)*1000*60;

      this.setState({mode:'Помодоро', longBreak: longBreak, shortBreak: shortBreak, alarm: isAlarm});

    } else if (document.getElementsByName('app-mode')[1].checked) {
      var timer = 0;
      timer = parseInt(document.getElementsByName('timer')[0].value)*1000*60;
      this.setState({mode: "Таймер", setTime: timer, alarm: isAlarm});

    }

    document.getElementsByClassName('menu-background')[0].style.display='none';
    document.getElementsByClassName('menu')[0].style.display='none';
  },

  onSettingsCall: function() {
    document.getElementsByClassName('menu-background')[0].style.display='block';
    document.getElementsByClassName('menu')[0].style.display='block';
  },

  componentDidMount: function(){
    document.getElementsByClassName('menu-background')[0].style.display='none';
    document.getElementsByClassName('menu')[0].style.display='none';
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
          <Button type="Помодоро" onBtnClick={this.onBtnClick}/>
          <Button type="Пауза" onBtnClick={this.onBtnClick}/>
          <Button type="Длинная пауза" onBtnClick={this.onBtnClick}/>
        </div>
      </div>
      <Settings onClick={this.onSettingsSubmit}/>

    </div>;
  }
});
