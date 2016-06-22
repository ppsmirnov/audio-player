import React, { Component, PropTypes } from 'react';

import Buttons from './buttons';
import Volume from './volume';
import Position from './position';
import Slider from './slider';

import {
    INIT_PLAYER,
} from '../actions/actionTypes';

class AudioPlayer extends Component {

    componentDidMount() {
        this.props.store.dispatch({
            type: INIT_PLAYER,
            payload: {
                key: 'na-zare',
                urls: [this.props.song.src],
            }
        });
    }

    render() {
        return (
            <div className = 'audio-player'>
                <p>{this.props.song.src}</p>
                <Buttons playerKey = 'na-zare' store = {this.props.store} />
                <span>Volume: </span>
                <Volume playerKey = 'na-zare' store = {this.props.store} />
                <span>Position: </span>
                <Position playerKey = 'na-zare' store = {this.props.store} />
                <div className = 'slider-container'>
                    <Slider />
                </div>
            </div>
        );
    }
}

export default AudioPlayer;
