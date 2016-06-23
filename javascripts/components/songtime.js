import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

class SongTime extends Component {

    constructor(props) {
        super(props);

        this.state = {time: 0};
    }

    componentDidUpdate() {
        if (this.props.isPlaying) {
            this.interval = setInterval(() => {
                this.setState({
                    time: this.props.audio.currentTime
                });
            }, 1000);
        } else {
            clearInterval(this.interval);
        }
    }

    formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) seconds = '0' + seconds;

        return `${minutes}:${seconds}`;
    }

    render() {
        return (
            <div className = 'audio-player__song-time'>
                {this.formatTime(this.state.time)}
            </div>
         );
    }
}

export default connect((state, props) => {
    let audio;
    let isPlaying = false;

    if (state[props.playerKey]) {
        audio = state[props.playerKey].audio;
        isPlaying = state[props.playerKey].isPlayed;
    }

    return { audio, isPlaying };
})(SongTime);
