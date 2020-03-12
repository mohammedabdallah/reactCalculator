import React, { Component } from 'react';
import Button from './components/Button';
import "./css/style.css";
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      current:'0',
      previous:[],
      nextIsReset:false
    };
  }
  reset = () => {
    this.setState({current:'0', previous:[],nextIsReset:false})
  }
  addToCurrent = (symbol) => {
    if((this.state.current === "0" && this.state.symbol !== ".") || this.state.nextIsReset)
    {
      this.setState({current:symbol,nextIsReset:false});
    }else{
      this.setState({current:this.state.current + symbol});
    }
    
  }
  updatePrevious = (symbol) => {
    let {previous} = this.state;
    previous.push(this.state.current + symbol);
    this.setState({previous,nextIsReset:true});
  }
  calculate = (symbol) => {
    console.log(this.state);
    let {current,previous,nextIsReset} = this.state;
    current = eval(String(previous+current));
    this.setState({current,previous:[],nextIsReset:false});
  }
  render() {
    const buttons = [
      {symbol:'C',cols:3,action:this.reset},
      {symbol:'/',cols:1,action:this.updatePrevious},
      {symbol:'7',cols:1,action:this.addToCurrent},
      {symbol:'8',cols:1,action:this.addToCurrent},
      {symbol:'9',cols:1,action:this.addToCurrent},
      {symbol:'*',cols:1,action:this.updatePrevious},
      {symbol:'4',cols:1,action:this.addToCurrent},
      {symbol:'5',cols:1,action:this.addToCurrent},
      {symbol:'6',cols:1,action:this.addToCurrent},
      {symbol:'-',cols:1,action:this.updatePrevious},
      {symbol:'1',cols:1,action:this.addToCurrent},
      {symbol:'2',cols:1,action:this.addToCurrent},
      {symbol:'3',cols:1,action:this.addToCurrent},
      {symbol:'+',cols:1,action:this.updatePrevious},
      {symbol:'0',cols:2,action:this.addToCurrent},
      {symbol:'.',cols:1,action:this.addToCurrent},
      {symbol:'=',cols:1,action:this.calculate},
    ]
    return (
      <div className="App">
        {this.state.previous.length ? <div className="floaty-last">
          {this.state.previous[this.state.previous.length-1]}
        </div>:null}
        <input type="text" className="result" name="result" value={this.state.current} />
        {buttons.map((btn,i)=>{
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=>{btn.action(btn.symbol)}} />
        })}
      </div>
    );
  }
}

export default App;
