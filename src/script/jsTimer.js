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
        this.pause = this.pause.bind(this)
        this.reset = this.reset.bind(this)
    }

    run(){
        document.getElementById('start-button').setAttribute('disabled', 'true')
        let audio = document.querySelector('.audio_alarm')

        this.intervalId = setInterval(()=>{
            this.setState((prevState)=>{
                let prevSecond = prevState['secondsValue']
                let prevMinute = prevState['minutesValue']
                let breakLength = prevState['breakLengthMinuteValue']

                if(+prevMinute == +breakLength && +prevSecond == 0){
                    document.querySelector('.timer-value_style').classList.add('timer-value_alert') //Должен исчезнуть при нажатии reset
                }
                
                if(+prevSecond === 0 && +prevMinute === 0) {
                    audio.play()
                    return {
                        minutesValue: breakLength <= 9 ?`0${--breakLength}`:--breakLength
                    }
                }

                if(+prevSecond === 0){
                    this.setState(()=>{
                        return {
                            minutesValue: prevMinute <= 10?`0${--prevMinute}`:--prevMinute
                        }
                    })
                }

                if(+prevSecond > 0) {
                    return {
                        secondsValue: prevSecond <= 10?`0${--prevSecond}`:--prevSecond
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
        clearInterval(this.intervalId)
        document.getElementById('start-button').removeAttribute('disabled')
        document.querySelector('.timer-value_style').classList.remove('timer-value_alert')
        this.setState((prevState)=>{
            return {
                minutesValue: prevState['sessionLengthMinuteValue'],
                secondsValue: '00'
            }
        })
    }

/*     increment(value){
        this.setState(()=>{
            return {
                
            }
        })
    } */

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
                            <button className="button button_style">+</button>
                            <span className="label-value_style">
                                {breakValue}
                            </span>
                            <button className="button button_style">-</button>
                        </div>
                    </div>

                    <div id="session-label" className="label session-label">
                        <p className="label-text_style">Session Length</p>
                        <div className="label-buttons-wrapper">
                            <button className="button button_style">+</button>
                            <span className="label-value_style">
                                {sessionValue}
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
                    <button id="start-button" onClick={this.run} className="button button_style">1</button>
                    <button onClick={this.pause} className="button button_style">2</button>
                    <button onClick={this.reset} className="button button_style">3</button>
                </div>

                <audio className="audio_alarm" src="./audio-alarm.wav" preload="true"></audio>
            </div>
        )
    }
}