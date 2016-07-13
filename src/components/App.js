window.App = React.createClass({
  onTimerClick: function(e){
//Установка типа таймера по нажатию кнопки
    this.setState({mode: e.target.innerText});
  },
  getInitialState: function() {
    return { mode: "Помодоро"};
  },
  render: function() {
    var mode = 0;
    switch (this.state.mode) {
      case 'Помодоро':
        mode = window.work;
        break;
      case 'Пауза':
        mode = window.smallRest;
        break;
      case 'Длинная пауза':
        mode = bigRest;
        break;
    }
    return <div>
      <Timer mode={mode}/>
      <Button type="Помодоро" action={this.onTimerClick}/>
      <Button type="Пауза" action={this.onTimerClick}/>
      <Button type="Длинная пауза" action={this.onTimerClick}/>
    </div>;
  }
});
