import React, { Component } from 'react'
import './App.css'
import { FinancialInput } from './components/FinancialInput'
import { Header } from './components/Header'
import { FinancialDisplay } from './components/FinancialDisplay'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FinancialInput />
        <FinancialDisplay />
      </div>
    )
  }
}

export default App
