import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRunning: false,
  minutes: 25,
  second: 0,
}

class DigitalTimer extends Component {
  state = initialState

  IncreaseMinutes = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
    }))
  }

  DecreaseMinutes = () => {
    const {minutes} = this.state

    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  timeAdjust = () => {
    const {minutes, second} = this.state

    const isButtonDisable = second > 0

    return (
      <div>
        <button
          type="button"
          onClick={this.IncreaseMinutes}
          disabled={isButtonDisable}
        >
          +
        </button>
        <p>{minutes}</p>
        <button
          type="button"
          onClick={this.DecreaseMinutes}
          disabled={isButtonDisable}
        >
          -
        </button>
      </div>
    )
  }

  increaseSeconds = () => {
    const {second, minutes} = this.state

    const timeCompleted = second === minutes * 60

    if (timeCompleted) {
      this.clearTimerInterval()
    } else {
      this.setState(prevState => ({
        second: prevState.second + 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.timerId)
  }

  start = () => {
    const {isTimeRunning} = this.state

    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.increaseSeconds, 1000)
    }

    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  Rest = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  timeStart = () => {
    const {isTimeRunning} = this.state

    console.log(isTimeRunning)

    return (
      <div>
        <button type="button" onClick={this.start}>
          Start
        </button>
        <button type="button" onClick={this.Rest}>
          Reset
        </button>
      </div>
    )
  }

  getTime = () => {
    const {minutes, second} = this.state

    const secondsLeft = minutes * 60 - second

    const actualMinutes = Math.floor(secondsLeft / 60)
    const actualSeconds = Math.floor(secondsLeft % 60)

    const stringMinutes =
      actualMinutes > 9 ? actualMinutes : `0${actualMinutes}`

    const stringSeconds =
      actualSeconds > 9 ? actualSeconds : `0${actualSeconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    return (
      <div>
        <div>{this.getTime()}</div>
        <div>{this.timeStart()}</div>
        <div>{this.timeAdjust()}</div>
      </div>
    )
  }
}

export default DigitalTimer
