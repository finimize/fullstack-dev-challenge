import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput'
import SliderInput from './components/SliderInput'
import DisplayGraph from './components/DisplayGraph'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
		}
	}
	componentWillMount() {
		fetch('/test')
			.then((res) => res.json)
			.then(res => this.setState({message: res.message}))
	}
  render() {
    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
				<div className="financial-inputs">
					<p className="input-label">How much have you saved?</p>
					<CurrencyInput defaultValue={0}/>
{this.state.message}
					<p className="input-label">How much will you save each month?</p>
					<CurrencyInput defaultValue={0}/>

					<p className="input-label">How much interest will you earn per year?</p>
					<SliderInput defaultValue={4}/>
				</div>
				<div className="financial-display">
					<DisplayGraph data={[
						{
							year: 1,
							amount:500
						},
						{
							year: 2,
							amount:700
						},
						{
							year: 3,
							amount:1000
						},
						{
							year: 4,
							amount:1500
						}
					]}/>
				</div>
      </div>
    );
  }
}

export default App;
