import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

class Volume extends Component {
    handleClick(event) {
        const node = findDOMNode(this);

        const offset = $(node).offset().left;
        const width = $(node).width();
        const clickOffset = event.nativeEvent.x;

        const newVolume = (clickOffset - offset) / width;

        let $slider = $(this.refs.slider);
        $slider.width(clickOffset - offset);

        this.props.howler.volume(newVolume);
    }

    render() {
        return (
            <div className = 'audio-player__volume'
                 onClick = {this.handleClick.bind(this)}>
                <div className = 'audio-player__volume-slider' ref = 'slider'/>
            </div>
         );
    }
}

export default connect((state) => {
    let howler;

    if (state['na-zare']) {
        howler = state['na-zare'].howler;
    }

    return { howler };
})(Volume);
