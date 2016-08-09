window.audio = new Audio('src/songs/alarm.mp3');
window.Timer = React.createClass({
  getInitialState: function() {
    return { remaining: 10000, currentMode:'Помодоро' };
  },
  componentDidMount: function(){
    this.setState({remaining:this.props.mode});
    this.timer = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function(){
      clearInterval(this.timer);
  },
  componentWillReceiveProps: function(nextProps) {
//Обновление таймера при получении новых свойств
    this.setState({remaining:nextProps.mode, currentMode:nextProps.modeName});
    clearInterval(this.timer);
    this.timer = setInterval(this.tick, 1000);
    audio.pause();
  },

  timerExpired: function(){
    clearInterval(this.timer);
//Сигнал
    audio.load();
    audio.play();
  },
  tick: function(){
//Тик таймера раз в секунду
    this.setState({remaining: this.state.remaining - 1000});
//Истечение времени таймера
    if(this.state.remaining == 0) this.timerExpired();
  },

  render: function() {

//Вычисление минут/секунд и их рендер
    var remaining = this.state.remaining / 1000;
    var minutes = Math.floor(remaining / 60);
    var seconds = remaining - 60 * minutes;
    if(seconds < 10) seconds = '0' + seconds;
    return <div>
      <p className="clock">{minutes}:{seconds}</p>
      <p className="mode">{this.state.currentMode.toUpperCase()}</p>
    </div>;
  }
});
