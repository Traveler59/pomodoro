window.work = 1500000;
window.smallRest = 300000;
window.bigRest = 1200000;
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
  this.setState({remaining:nextProps.mode});
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
    return <p>{minutes} minutes {seconds} seconds remaining.</p>;
  }
});
