import React from 'react';

export class Settings extends React.Component {
  render() {
    return <div className="menu-background">
      <div className="menu">
        <div id="std-set">
          <input type="radio" name="app-mode" defaultChecked={true} />
          Режим "Помодоро"
          <p className="pause-set">
            <b>Короткая пауза:</b>
            <input type="radio" name="short" value="3" /> 3
            <input type="radio" name="short" value="5" /> 5
          </p>

          <p className="pause-set">
            <b>Длинная пауза:</b>
            <input type="radio" name="long" value="10" /> 10
            <input type="radio" name="long" value="15" /> 15
            <input type="radio" name="long" value="20" /> 20
            <input type="radio" name="long" value="25" /> 25
          </p>
        </div>

        <div id="timer-set">
          <input type="radio" name="app-mode" /> Режим таймера
        <p className="pause-set">
            <input id="timer-input" type="number" name="timer" size="5" placeholder="5" />
          </p>
        </div>

        <p id="alarm-check">
          <input id="alarm" type="checkbox" defaultChecked={true} />
          Звуковой сигнал</p>
        <button onClick={this.props.onClick} id="apply">Принять</button>
      </div>
    </div>;
  }
}
