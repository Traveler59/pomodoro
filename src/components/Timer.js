window.Timer = React.createClass({
  getInitialState: function() {
    return { remaining: 10000};
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
  this.setState({remaining:nextProps.mode});
  clearInterval(this.timer);
  this.timer = setInterval(this.tick, 1000);
},

  tick: function(){
//Тик таймера раз в секунду
      this.setState({remaining: this.state.remaining - 1000});
  },
  render: function() {
//Вычисление минут/секунд и их рендер
    var remaining = this.state.remaining / 1000;
    var minutes = Math.floor(remaining / 60);
    var seconds = remaining - 60 * minutes;
    return <p>{minutes}:{seconds}</p>;
  }
});
