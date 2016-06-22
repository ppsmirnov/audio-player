import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

class Position extends Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            width: 0
        };
    }

    componentDidMount() {
        this.setDimVariables();
    }

    componentDidUpdate() {
        if (this.props.isPlaying) {
            this.interval = setInterval(() => {
                const pos = this.props.audio.currentTime;
                const buffer = this.props.audio.buffered.end(this.props.audio.buffered.length - 1);

                $(this.refs.slider).width(pos * this.state.width / this.props.audio.duration);
                $(this.refs.buffer).width(buffer * this.state.width / this.props.audio.duration);

            }, 400);
        } else {
            clearInterval(this.interval);
        }
    }

    setDimVariables() {
        const dims = this.refs.container.getBoundingClientRect();

        this.setState({
            offset: dims.left,
            width: dims.width
        });
    }

    handleClick(event) {
        const clickOffset = event.nativeEvent.x;

        const newVolume = (clickOffset - this.state.offset) / this.state.width;

        $(this.refs.slider).width(clickOffset - this.state.offset);

        this.props.audio.currentTime = (newVolume * this.props.audio.duration);
    }

    render() {
        return (
            <div className = 'audio-player__position'
                 onClick = {this.handleClick.bind(this)}
                 ref = 'container'>
                <div className = 'audio-player__position-buffer' ref = 'buffer'/>
                <div className = 'audio-player__position-slider' ref = 'slider'/>
            </div>
         );
    }
}

export default connect((state) => {
    let audio;
    let isPlaying = false;

    if (state['na-zare']) {
        audio = state['na-zare'].audio;
        isPlaying = state['na-zare'].isPlayed;
    }

    return { audio, isPlaying };
})(Position);
