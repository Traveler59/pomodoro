window.Button = React.createClass({
  render: function() {
    return <button onClick={this.props.action}>{this.props.type}</button>;
  }
});
