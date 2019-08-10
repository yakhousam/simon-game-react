import React from 'react'
import Button from "../button";
import Control from "../control";
import sound from "../sounds";
import './style.css'


export default class Simon extends React.Component {
    constructor() {
      super();
      this.state = {
        sequence: [],
        playerSequence: [],
        playBtn: 0,
        index: 0,
        isStarted: false,
        steps: 0,
        displayer:'OFF',
        isBusy: true,
        strict: false
      };
    }
    addSequence = () => {
      this.setState(
        (state) => {
          const btn = Math.floor(Math.random() * 4 + 1);
          const arr = [...this.state.sequence];
          arr.pop();
          const steps = state.steps + 1;
          return { sequence: [...this.state.sequence, btn], index: 0, steps, displayer: steps };
        },
        () => {
          // console.log(this.state.sequence);
          // this.playSequence();
          //this.setState({playBtn: this.state.sequence[0]})
          this.next();
        }
      );
    };
    playSequence = () => {
      this.state.sequence.forEach((seq, i) => {
        setTimeout(() => {
          this.setState(() => {
            return { playBtn: seq };
          });
          this.setState(() => {
            return { playBtn: 0 };
          });
        }, (i + 1) * 1000);
      });
    };
    handleClick = id => {
      this.setState(
        () => {
          return { playerSequence: [...this.state.playerSequence, id] };
        },
        () => {
          const playerSeqLength = this.state.playerSequence.length;
          const seqLength = this.state.sequence.length;
          if (
            +this.state.playerSequence[playerSeqLength - 1] !==
            +this.state.sequence[playerSeqLength - 1]
          ) {
            console.log("*****WRONG******");
            console.log('strict =', this.state.strict)
            if(!this.state.strict){
              this.setState({ playerSequence: [], index: 0, displayer:'WRONG!' , isBusy:true});
              setTimeout(() => {
                this.next();
              }, 3000);
            }else{
              this.setState({ playerSequence: [], sequence: [], steps: 0, index: 0, displayer:'WRONG!' , isBusy:true});
              setTimeout(() => {
                this.addSequence();
              }, 3000);
            }
            
            return;
          }
          if (playerSeqLength === 3) {
            console.log("-----Congratulation you are a winner-------");
            this.setState({
              sequence: [],
              playerSequence: [],
              playBtn: 0,
              index: 0,
              displayer:"WIN!",
              steps: 0
            });
            setTimeout(() => {
              this.addSequence();
            }, 3000);
            return
          }
          if (playerSeqLength === seqLength) {
            console.log("-----------------WIN-------------------");
            this.setState(() => ({ playerSequence: [], index: 0, playBtn: 0 , isBusy: true, displayer:'--'}));
            setTimeout(() => {
              this.addSequence();
            }, 3000);
            return;
          }
          
        }
      );
    };
    
    next = () => {
      // console.log('index next', this.state.index)
      if (this.state.index < this.state.sequence.length) {
        this.setState(
          state => ({
            playBtn: state.sequence[state.index],
            index: state.index + 1,
            displayer: state.steps,
            isBusy: true
          }),
          this.setState({ playBtn: 0 })
        );
  
        // console.log('next + 1')
      } else {
        this.setState(() => ({ playBtn: 0 , isBusy: false}));
        // console.log('next + 0')
      }
    };
  
    start = () => {
      if (this.state.isStarted === false) {
        this.setState({ isStarted: true });
        this.addSequence();
      } else {
        this.setState({
          sequence: [],
          playerSequence: [],
          playBtn: 0,
          index: 0,
          isStarted: false,
          steps: 0,
          displayer:'OFF'
        });
      }
    };
    reset = ()=>{
      if(!this.state.isStarted){
        return
      }
      this.setState({
        sequence: [],
        playerSequence: [],
        playBtn: 0,
        index: 0,
        steps: 0,
        displayer:'RESET'
      });
      setTimeout(() => {
        this.addSequence()
      }, 2000);
    };
  
    strict = ()=>{
      if(!this.state.isStarted){
        return
      }
      this.setState({
        // sequence: [],
        // playerSequence: [],
        // playBtn: 0,
        // index: 0,
        // isStarted: false,
        // steps: 0,
        displayer: this.state.strict ? 'NO STRICT' : 'STRICT',
        strict: !this.state.strict
      });
      setTimeout(() => {
        this.setState({displayer: this.state.steps})
      }, 1000);
    };
    
    render() {
      return (
        <div className="grid">
          <Button
            classes="btn btn-1"
            id={1}
            playBtn={this.state.playBtn}
            sound={sound.sound01}
            bgColor1="gold"
            bgColor2="yellow"
            click={this.handleClick}
            next={this.next}
            isStarted={this.state.isStarted}
            isBusy={this.state.isBusy}
          />
          <Button
            classes="btn btn-2"
            id={2}
            playBtn={this.state.playBtn}
            sound={sound.sound02}
            bgColor1="red"
            bgColor2="orange"
            click={this.handleClick}
            next={this.next}
            isStarted={this.state.isStarted}
            isBusy={this.state.isBusy}
          />
          <Button
            classes="btn btn-3"
            id={3}
            playBtn={this.state.playBtn}
            sound={sound.sound03}
            bgColor1="green"
            bgColor2="lime"
            click={this.handleClick}
            next={this.next}
            isStarted={this.state.isStarted}
            isBusy={this.state.isBusy}
          />
          <Button
            classes="btn btn-4"
            id={4}
            playBtn={this.state.playBtn}
            sound={sound.sound04}
            bgColor1="blue"
            bgColor2="skyblue"
            click={this.handleClick}
            next={this.next}
            isStarted={this.state.isStarted}
            isBusy={this.state.isBusy}
          />
          <Control
            start={this.start}
            reset={this.reset}
            strict={this.strict}
            isStarted={this.state.isStarted}
            displayer={this.state.displayer}
            isStrict={this.state.strict}
          />
        </div>
      );
    }
  }
  