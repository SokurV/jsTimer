import React from "react";

export default class JsTimer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            breakLengthMinuteValue: '5',
            sessionLengthMinuteValue: '25',
            minutesValue: '25',
            secondsValue: '00',
        }
        this.run = this.run.bind(this)
    }

    run(){
        this.intervalId = setInterval(()=>{
            this.setState((prevState)=>{
                if(+prevState['secondsValue'] > 0) {
                    return {
                        secondsValue: --prevState['secondsValue']
                    }} else {
                        return {
                            secondsValue: '59'
                        }
                    }
            })
        }, 1000)
    }

/*     increment(value){
        this.setState(()=>{
            return {
                
            }
        })
    } */

    render(){
        let breakMinuteValue = this.state.breakLengthMinuteValue
        let sessionMinuteValue = this.state.sessionLengthMinuteValue
        let seconds = this.state.secondsValue
        let minutes = this.state.minutesValue

        return (
            <div className="container container_style">

                <header className="header header_style">
                    <p className="header__text header__text_style">
                        JavaScript Timer
                    </p>
                </header>

                <div className="timer-control timer-control_style">

                    <div id="break-label" className="label break-label">
                        <p className="label-text_style">Break Length</p>
                        <div className="label-buttons-wrapper">
                            <button className="button button_style">+</button>
                            <span className="label-value_style">
                                {breakMinuteValue}
                            </span>
                            <button className="button button_style">-</button>
                        </div>
                    </div>

                    <div id="session-label" className="label session-label">
                        <p className="label-text_style">Session Length</p>
                        <div className="label-buttons-wrapper">
                            <button className="button button_style">+</button>
                            <span className="label-value_style">
                                {sessionMinuteValue}
                            </span>
                            <button className="button button_style">-</button>
                        </div>
                    </div>
                </div>

                <div className="timer-display timer-display_style">
                    <p className="timer-text timer-text_style">Session</p>
                    <p className="timer-value timer-value_style">
                      {minutes}:{seconds}  
                    </p>
                </div>

                <div className="timer-buttons">
                    <button onClick={this.run} className="button button_style">1</button>
                    <button className="button button_style">2</button>
                    <button className="button button_style">3</button>
                </div>
            </div>
        )
    }
}