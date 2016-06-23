import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import Slider from './slider';

class Volume extends Component {
    onSliderChange(newVolume) {
        this.props.audio.volume = (newVolume / 100);
    }

    render() {
        return (
            <div className = 'audio-player__volume'>
                <Slider onSliderChange = {this.onSliderChange.bind(this)} pos = {50}/>
            </div>
         );
    }
}

export default connect((state, props) => {
    let audio;

    if (state[props.playerKey]) {
        audio = state[props.playerKey].audio;
    }

    return { audio };
})(Volume);
