import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
				<div className="financial-content">
					<p className="input-label">How much have you saved?</p>
					<CurrencyInput defaultValue={0}/>
					<p className="input-label">How much will you save each month?</p>
					<CurrencyInput defaultValue={0}/>
				</div>
      </div>
    );
  }
}

export default App;
