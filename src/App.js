import React, { Component } from 'react';
import './App.css';
import Computer from './computer.js';
import Assembler from './assembler.js';

class Memory extends Component {
  /* TODO:Using index as a key is bad practice */
  renderCell(value, index) {
    return (
      <div className='cell-container' key={index}>
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
  constructor() {
    super()
    this.state = {
      value: 'none'
    }
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <div className='load-container'>
        <button onClick={() => this.props.onClick(this.state.value)}>Load</button>
        <select value={this.state.value} onChange={this.onChange}>
          <option value='none'>-</option>
          <option value='io'>IO</option>
          <option value='add'>ADD</option>
          <option value='multi'>MULTIPLY</option>
          <option value='max'>MAX</option>V
        </select>
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
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
    }
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className='code-container'>
        <h1>Code Input</h1>
        <textarea className='code-input' onChange={this.onChange} value={this.props.text} ></textarea>
      </div>
    )
  }
}

class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
    }
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="io-box">
        <h1>Inbox</h1>
        <textarea className='io-input' onChange={this.onChange} value={this.props.text} ></textarea>
      </div>
    )
  }
}

class Outbox extends Component {
  render() {
    return (
      <div className='io-box'>
        <h1>Outbox</h1>
        <textarea className='io-input' value={this.props.text} readOnly></textarea>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      computer: Computer,
      memory: Computer.memory,
      programCounter: Computer.programCounter,
      cycleCount: Computer.cycleCount,
      accumulator: Computer.accumulator,
      code: '',
      outbox: '',
      inbox: '',

    }
  }

  handleAssemble() {
    const instructionArray = Assembler.assemble(this.state.code);
    Computer.reset();
    Computer.loadInstructions(instructionArray);
    this.loadToInbox();
    this.updateGUI();
  }

  handleLoad(sel) {
    let code = ""
    let inbox = ""
    if (sel == "io") {
			code = "// Get a value from inbox and then output it to the outbox \nINP \nOUT \nHLT";
			inbox = "506";
		} else if (sel == "add") {
			code = "// Get two values from inbox, add them together and then output the result \nINP \nSTA tmp \nINP \nADD tmp \nOUT \nHLT \ntmp DAT";
			inbox = "506\n360";

		} else if (sel == "multi") {
			code = "// Get two values, multiply first value by second and then output the result \nINP \nSTA tmp1 \nINP \nloop BRZ op \nSUB one \nSTA tmp2 \nLDA tmp3 \nADD tmp1 \nSTA tmp3 \nLDA tmp2 \nBRA loop \nop LDA tmp3 \nOUT \nHLT \ntmp1 DAT \ntmp2 DAT \ntmp3 DAT \none DAT 1";
			inbox = "41\n18";
		} else if (sel == "max") {
			code = "//First input amount of numbers to check and then the numbers. Outputs the largest number \nINP \nnext BRZ end \nSUB one \nSTA count \nINP \nSTA tmp \nSUB max \nBRP isGreater \nBRA skip \nisGreater LDA tmp \nSTA max \nskip LDA count \nBRA next \nend LDA max \nOUT \nHLT \ncount DAT \none DAT 1 \nmax DAT 0 \ntmp DAT";
			inbox = "5\n256\n455\n506\n888\n456";
		}
    this.setState({
      code: code,
      inbox: inbox
    })
  }
  
  handleCode(input) {
    this.setState({code: input})
  }

  handleInbox(input) {
    this.setState({inbox: input})
  }

  handleStep(input) {
    this.loadToInbox();
    Computer.cycle();
    this.updateGUI();
  }

  handleRun() {
    let tmp = true;
    this.loadToInbox();
    while (tmp) {
      tmp = Computer.cycle();
    };
    this.updateGUI();
  }

  updateGUI() {
    this.setState({
      memory: Computer.memory,
      programCounter: Computer.programCounter,
      cycleCount: Computer.cycleCount,
      accumulator: Computer.accumulator,
      outbox: Computer.outbox.join('\n'),
      inbox: Computer.inbox.join('\n')
    }); 
  }

  loadToInbox() {
    const input = this.state.inbox;
    Computer.clearInbox();
    input.split('\n')
			.map((val) => parseInt(val))
			.filter((val) => Number.isInteger(val))
			.forEach((val) => Computer.inbox.push(val));
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
            <CodeInput text={this.state.code} onChange={(input) => this.handleCode(input)} />
          </div>
          <div className='sub-container'>
            <Reg programCounter={this.state.programCounter} cycleCount={this.state.cycleCount} accumulator={this.state.accumulator}/>
            <Inbox text={this.state.inbox} onChange={(input => this.handleInbox(input))} />
            <Outbox text={this.state.outbox}/>
          </div>
          <div className='sub-container'>
            <Memory memory={this.state.memory} active={this.state.programCounter} />
          </div>
        </div>
      </div>);
  }
}

export default App;
