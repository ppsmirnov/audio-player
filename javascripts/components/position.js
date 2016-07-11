import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

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
        $(window).bind('resize.position', _.debounce(this.setDimVariables.bind(this), 200));
    }

    componentWillUnmount() {
        $(window).unbind('resize.position');
    }

    componentDidUpdate() {
        if (this.isPlaying()) {
            this.interval = requestAnimationFrame(this.updateSliders.bind(this));
        } else {
            cancelAnimationFrame(this.interval);
        }
    }

    updateSliders() {
        let buffer;
        const pos = this.props.audio.currentTime;

        if (this.props.audio.buffered.length == 0) {
            buffer = 0;
        } else {
            buffer = this.props.audio.buffered.end(this.props.audio.buffered.length - 1);
        }

        $(this.refs.slider).width(pos / this.props.audio.duration * 100 + '%');
        $(this.refs.buffer).width(buffer / this.props.audio.duration * 100 + '%');

        this.interval = requestAnimationFrame(this.updateSliders.bind(this));
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

        $(this.refs.slider).width((clickOffset - this.state.offset) / 100 + '%');
        this.props.audio.currentTime = (newVolume * this.props.audio.duration);
        this.updateSliders();
    }

    isPlaying() {
        return this.props.status == 'playing';
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

Position.contextTypes = {
    store: PropTypes.object
};

export default connect((state, props) => {
    let audio;
    let status = 'stopped';

    if (state.getIn([props.playerKey])) {
        audio = state.getIn([props.playerKey, 'audio']);
        status = state.getIn([props.playerKey, 'status']);
    }

    return { audio, status };
})(Position);
