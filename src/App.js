import React, { Component } from 'react';
import './App.css';
import Computer from './computer.js';
import Assembler from './assembler.js';

class Memory extends Component {
  renderCell(value, index) {
    return (
      <div className='cell-container'>
        <div className='header-cell'>{index}</div>
        <div className={this.props.active === index ? 'active-cell' : 'regular-cell'}>{value}</div>
      </div>
    )
  }

  render() {
    return (
    <div>
      <h1>Memory Table</h1>
      <div className='table memory-table'>
        {this.props.memory.map((value, index) => this.renderCell(value, index))}
      </div> 
    </div>
    )
  }
}

class Reg extends Component {
  render() {
    return (
      <div>
        <h1>Reg</h1>
        <div className='table reg-table'>
          <div className='cell-container reg-cell-container'>
            <div className='header-cell'>PC</div>
            <div className='regular-cell'>{this.props.programCounter}</div>
          </div>
          <div className='cell-container reg-cell-container'>
            <div className='header-cell'>CC</div>
            <div className='regular-cell'>{this.props.cycleCount}</div>
          </div>
          <div className='cell-container reg-cell-container'>
            <div className='header-cell'>AC</div>
            <div className='regular-cell'>{this.props.accumulator}</div>
          </div>
        </div>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <button onClick={() => window.open('google.com')}>About</button>
    )
  }
}

class Load extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

class Assemble extends Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()}>Assemble</button>
    )
  }
}

class Step extends Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()}>Step</button>
    )
  }
}

class Run extends Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()}>Run</button>
    )
  }
}

class CodeInput extends Component {
  constructor() {
    super()
    this.state = {
      text: 'placeholder',
    }
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Code Input</h1>
        <textarea className='code-input' onChange={this.onChange} value={this.state.text} ></textarea>
      </div>
    )
  }
}

class Inbox extends Component {
  render() {
    return (
      <div className="io-box">
        <h1>Inbox</h1>
        <textarea className='io-input'></textarea>
      </div>
    )
  }
}

class Outbox extends Component {
  render() {
    return (
      <div className='io-box'>
        <h1>Outbox</h1>
        <textarea className='io-input' readOnly></textarea>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      computer: Computer,
      code: '',
      outbox: '',
      inbox: '',

    }
  }

  handleAssemble() {
    console.log('handleASsemble')
  }
  
  handleCode(input) {
    this.setState({code: input})
  }

  render() {
    return (
      <div>
        <div className='menu-container'>
          <ul>
            <li><About /></li>
            <li><Load onClick={(sel) => this.handleLoad(sel)} /></li>
            <li><Assemble onClick={() => this.handleAssemble()} /></li>
            <li><Step onClick={() => this.handleStep()} /></li>
            <li><Run onClick={() => this.handleRun()} /></li>
          </ul>
        </div>
        <div className='main-container'>
          <div className='sub-container'>
            <CodeInput text='placeholdera' onChange={(input) => this.handleCode(input)} />
          </div>
          <div className='sub-container'>
            <Reg programCounter={this.state.computer.programCounter} cycleCount={this.state.computer.cycleCount} accumulator={this.state.computer.accumulator}/>
            <Outbox />
            <Inbox />
          </div>
          <div className='main-container'>
            <Memory memory={this.state.computer.memory} active={this.state.computer.programCounter} />
          </div>
        </div>
      </div>);
  }
}

export default App;
