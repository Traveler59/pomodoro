import React from 'react';

export class SettingsMenu extends React.Component {
  render() {
    const props = this.props;

    return <div className="menu-background">
      <div className="menu">
        <input type="radio" name="mode" onChange={props.onAppModeChange} value="Помодоро" defaultChecked={true} />
        <span>Режим "Помодоро"</span>
        <form className="input-form">
            <strong>Короткая пауза:</strong>
            <input type="radio" name="short" value="3" onChange={props.onShortPauseChange}/><span>3</span>
            <input type="radio" name="short" value="5" onChange={props.onShortPauseChange}/><span>5</span>
        </form>

        <form className="input-form">
          <strong>Длинная пауза:</strong>
          <input type="radio" name="long" value="10" onChange={props.onLongPauseChange}/><span>10</span>
          <input type="radio" name="long" value="15" onChange={props.onLongPauseChange}/><span>15</span>
          <input type="radio" name="long" value="20" onChange={props.onLongPauseChange}/><span>20</span>
          <input type="radio" name="long" value="25" onChange={props.onLongPauseChange}/><span>25</span>
        </form>

        <input type="radio" name="mode" onChange={props.onAppModeChange} value="Таймер" /><span>Режим таймера</span>
        <form className="input-form">
          <strong>Время таймера:</strong>
          <input type="number" size="5" placeholder="5" onChange={props.onCustomTimerChange}/>
        </form>

        <input type="checkbox" defaultChecked={true} onChange={props.onAlarmSet}/><span>Звуковой сигнал</span>
        <button className="btn" onClick={props.onOk}>Назад</button>
      </div>
    </div>;
  }
}
