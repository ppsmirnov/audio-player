import React, { Component, PropTypes } from 'react';

import Buttons from './buttons';
import Volume from './volume';
import Position from './position';
import Slider from './slider';
import SongTime from './songtime';

import {
    INIT_PLAYER,
    STOP_PLAYER
} from '../actions/actionTypes';

class AudioPlayer extends Component {

    componentDidMount() {
        this.props.store.dispatch({
            type: INIT_PLAYER,
            payload: {
                key: this.props.song.src,
                urls: [this.props.song.src],
                onEnd: this.stopAudio.bind(this)
            }
        });
    }

    stopAudio() {
        this.props.store.dispatch({
            type: STOP_PLAYER,
            payload: {
                key: this.props.song.src
            }
        });
    }

    render() {
        console.log('Render!');
        return (
            <div className = 'audio-player'>
                <Buttons playerKey = {this.props.song.src} store = {this.props.store} />
                <SongTime playerKey = {this.props.song.src}
                          store = {this.props.store} />
                <div className = 'position-container'>
                    <Position playerKey = {this.props.song.src} store = {this.props.store} />
                </div>
                <div className = 'volume-container'>
                    <Volume playerKey = {this.props.song.src} store = {this.props.store} />
                </div>
            </div>
        );
    }
}

export default AudioPlayer;
