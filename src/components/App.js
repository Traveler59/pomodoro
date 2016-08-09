const WORK_TIME = 1500000;
const SHORT_BREAK = 300000;
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
  getInitialState: function() {
    return { mode: "Помодоро", longBreak:DEFAULT_LONG_BREAK};
  },
  render: function() {
    var mode = 0;
    switch (this.state.mode) {
      case 'Помодоро':
        mode = WORK_TIME;
        break;
      case 'Пауза':
        mode = SHORT_BREAK;
        break;
      case 'Длинная пауза':
        mode = this.state.longBreak;
        break;
    }
    return <div className="center">
      <Timer mode={mode} modeName={this.state.mode}/>
      <div className="block-center">
        <Button type="Помодоро" onBtnClick={this.onBtnClick}/>
        <Button type="Пауза" onBtnClick={this.onBtnClick}/>
        <Button type="Длинная пауза" onBtnClick={this.onBtnClick}/>
        <Select onChange={this.onSelectChange}/>
      </div>
    </div>;
  }
});
