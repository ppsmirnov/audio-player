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
                <Slider onSliderChange = {this.onSliderChange.bind(this)} pos = {100}/>
            </div>
         );
    }
}

export default connect((state) => {
    let audio;

    if (state['na-zare']) {
        audio = state['na-zare'].audio;
    }

    return { audio };
})(Volume);
