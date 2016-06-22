import React, { Component, PropTypes } from 'react';
import ReactDom, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

class Position extends Component {
    componentDidMount() {
        const node = findDOMNode(this);

        const offset = $(node).offset().left;
        const width = $(node).width();
        let $slider = $(this.refs.slider);

        setInterval(() => {
            const pos = this.props.howler.pos();
            $slider.width(pos * width / this.props.howler._duration);
            // console.log('Postion!', pos);
        }, 400);
    }

    handleClick(event) {
        const node = findDOMNode(this);

        const offset = $(node).offset().left;
        const width = $(node).width();
        const clickOffset = event.nativeEvent.x;

        const newVolume = (clickOffset - offset) / width;

        let $slider = $(this.refs.slider);
        $slider.width(clickOffset - offset);

        this.props.howler.pos(newVolume * this.props.howler._duration);
    }

    render() {
        return (
            <div className = 'audio-player__position'
                 onClick = {this.handleClick.bind(this)}>
                <div className = 'audio-player__position-slider' ref = 'slider'/>
            </div>
         );
    }
}

export default connect((state) => {
    let howler;
    let isPlaying = false;

    if (state['na-zare']) {
        howler = state['na-zare'].howler;
        isPlaying = state['na-zare'].isPlayed;
    }

    return { howler, isPlaying };
})(Position);
