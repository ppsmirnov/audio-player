import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

class SongTime extends Component {

    constructor(props) {
        super(props);

        this.state = {time: 0};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status == nextProps.status) return;

        if (this.isPlaying(nextProps)) {
            this.interval = setInterval(() => {
                this.setState({
                    time: this.props.audio.currentTime
                });
            }, 1000);
        } else {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) seconds = '0' + seconds;

        return `${minutes}:${seconds}`;
    }

    isPlaying(props = this.props) {
        return props.status == 'playing';
    }

    isStopped(props = this.props) {
        return props.status == 'stopped';
    }

    render() {
        const time = this.isStopped() ? 0 : this.state.time;

        return (
            <div className = 'audio-player__song-time'>
                {this.formatTime(time)}
            </div>
         );
    }
}

SongTime.contextTypes = {
    store: PropTypes.object
};

export default connect((state, props) => {
    let audio;
    let duration;
    let status = 'stopped';

    if (state.getIn([props.playerKey])) {
        audio = state.getIn([props.playerKey, 'audio']);
        status = state.getIn([props.playerKey, 'status']);
        duration = state.getIn([props.playerKey, 'duration']);
    }

    return { audio, status, duration };
})(SongTime);
