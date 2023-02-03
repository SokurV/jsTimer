import React from "react";

export default class JsTimer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            breakLengthMinuteValue: '1',
            sessionLengthMinuteValue: '5',
            minutesValue: '05',
            secondsValue: '00',
        }
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
        this.reset = this.reset.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.formatCorrector = this.formatCorrector.bind(this)
    }

    start(){
        ['start-button', 'break-button-up', 'break-button-down', 'session-button-up', 'session-button-down'].forEach(buttonId => {
            document.getElementById(buttonId).setAttribute('disabled', 'true')
        });

        let audio = document.querySelector('.audio_alarm')

        this.intervalId = setInterval(()=>{  
            this.setState((prevState)=>{
                let prevSecond = prevState['secondsValue']
                let prevMinute = prevState['minutesValue']
                let breakLength = prevState['breakLengthMinuteValue']

                if(+prevMinute <= +breakLength && +prevSecond == 0){
                    document.querySelector('.timer-value_style').classList.add('timer-value_alert')
                }
                
                if(+prevSecond === 0 && +prevMinute === 0) {
                    audio.play()
                    document.querySelector('.timer-text').textContent = 'Break'
                    return {
                        minutesValue: this.formatCorrector(breakLength)
                    }
                }

                if(+prevSecond === 0){
                    this.setState(()=>{
                        return {
                            minutesValue: this.formatCorrector(--prevMinute)
                        }
                    })
                }

                if(+prevSecond > 0) {
                    return {
                        secondsValue: this.formatCorrector(--prevSecond)
                    }} else {
                    return {
                        secondsValue: '59'
                    }
                }
            })
        }, 1000)
    }

    pause(){
        clearInterval(this.intervalId)
        document.getElementById('start-button').removeAttribute('disabled')
    }

    reset(){
        clearInterval(this.intervalId);
        let audio = document.querySelector('.audio_alarm')
        audio.pause()
        audio.currentTime = 0;
        ['start-button', 'break-button-up', 'break-button-down', 'session-button-up', 'session-button-down'].forEach(buttonId => {
            document.getElementById(buttonId).removeAttribute('disabled')
        });
        document.querySelector('.timer-value_style').classList.remove('timer-value_alert')
        document.querySelector('.timer-text').textContent = 'Session'
        this.setState(()=>{
            return {
                breakLengthMinuteValue: '1',
                sessionLengthMinuteValue: '5',
                minutesValue: '05',
                secondsValue: '00'
            }
        })
    }

    increment(e){
        switch(e.target.id){
            case 'break-button-up': 
                this.setState((prevState)=>{
                    let prevBreak = prevState['breakLengthMinuteValue']
                    return {
                        breakLengthMinuteValue: prevBreak >= 0 && prevBreak <= 58?
                            ++prevBreak
                            :'00'
                    }
                })
                break;
            case 'session-button-up':
                this.setState((prevState)=>{
                    let prevSession = prevState['sessionLengthMinuteValue']
                    if(prevSession >= 0 && prevSession <= 58){
                        return {
                            sessionLengthMinuteValue: ++prevSession,
                            minutesValue: this.formatCorrector(++prevState['minutesValue'])
                        }
                    }
                })
                break;
            default: console.log('Target button ID not defined')
        }
    }

    decrement(e){
        const buttonId = e.target.id
        switch(buttonId){
            case 'break-button-down': 
                this.setState((prevState)=>{
                    let prevBreak = prevState['breakLengthMinuteValue']
                    return {
                        breakLengthMinuteValue: prevBreak >= 2?
                            --prevBreak:
                            '1'
                    }
                })
                break;
            case 'session-button-down':
                this.setState((prevState)=>{
                    let prevSession = prevState['sessionLengthMinuteValue']
                    if(prevSession >= 2){
                        return {
                            sessionLengthMinuteValue: --prevSession,
                            minutesValue: this.formatCorrector(--prevState['minutesValue'])
                        }
                    }
                })
                break;
            default: console.log('Target button ID not defined')
        }
    }

    formatCorrector(inputValue){
        return inputValue <= 9 ?`0${inputValue}`:inputValue
    }

    render(){
        let breakValue = this.state.breakLengthMinuteValue
        let sessionValue = this.state.sessionLengthMinuteValue
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
                            <button id="break-button-up" onClick={this.increment} className="button button_style">&#9650;</button>
                            <span className="label-value_style">
                                {breakValue}
                            </span>
                            <button id="break-button-down" onClick={this.decrement} className="button button_style">&#9660;</button>
                        </div>
                    </div>

                    <div id="session-label" className="label session-label">
                        <p className="label-text_style">Session Length</p>
                        <div className="label-buttons-wrapper">
                            <button id="session-button-up" onClick={this.increment} className="button button_style">&#9650;</button>
                            <span className="label-value_style">
                                {sessionValue}
                            </span>
                            <button id="session-button-down" onClick={this.decrement} className="button button_style">&#9660;</button>
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
                    <button id="start-button" onClick={this.start} className="button button_style">&#9658;</button>
                    <button onClick={this.pause} className="button button_style">||</button>
                    <button onClick={this.reset} className="button button_style">&#8635;</button>
                </div>

                <audio className="audio_alarm" src="./audio-alarm.wav" preload="true"></audio>
            </div>
        )
    }
}