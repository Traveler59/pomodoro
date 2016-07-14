window.Button = React.createClass({
  render: function() {
    return <button onClick={this.props.onBtnClick}>{this.props.type}</button>;
  }
});
