window.Button = React.createClass({
  render: function() {
    return <button className="btn" onClick={this.props.onBtnClick}>{this.props.type}</button>;
  }
});
