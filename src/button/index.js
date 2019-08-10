import React from "react";
import './style.css'

export default class Button extends React.Component {
    constructor(props) {
      super(props);
      this.audio = React.createRef();
      this.state = {
        active: false
      };
    }
    flash = (click) => {
      if (this.state.active === false) {
        this.audio.current.play();
        console.log('volume', this.audio.current.volume)
        this.setState({ active: true });
        this.audio.current.onended = () => {
          this.setState({ active: false });
          if(!click){
            setTimeout(() => {
              this.props.next();
            }, 1000);
            
          }        
        };
      }
    };
    handleClick = e => {
      if(!this.props.isStarted){
        return
      }
      if(this.props.isBusy){
        return;
      }
      this.props.click(e.target.id);
      this.flash(true);
    };
  
    componentDidUpdate(prevProps) {
      if (prevProps.playBtn !== this.props.playBtn && +this.props.playBtn === +this.props.id) {
        console.log("did update", this.props.id);
        this.flash();      
      }
    }
    
    render() {
      const style = {
        backgroundColor: this.state.active
          ? this.props.bgColor2
          : this.props.bgColor1
      };
      return (
        <div className={this.props.classes} id={this.props.id}style={style} onClick={this.handleClick}>
          <audio src={this.props.sound} ref={this.audio} />
        </div>
      );
    }
  }
  