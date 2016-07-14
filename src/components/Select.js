window.Select = React.createClass({
  render: function() {
    return <div>
      <p>Продолжительность долгого отдыха</p>
      <select onChange={this.props.onChange}>
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
      </select>
    </div>;
  }
});
