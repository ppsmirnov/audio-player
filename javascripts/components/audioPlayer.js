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
                key: this.props.playerKey,
                urls: [this.props.song.src],
                onEnd: this.stopAudio.bind(this)
            }
        });
    }

    stopAudio() {
        this.props.store.dispatch({
            type: STOP_PLAYER,
            payload: {
                key: this.props.playerKey
            }
        });
    }

    render() {
        return (
            <div className = 'audio-player'>
                <p>{this.props.song.src}</p>
                <Buttons playerKey = {this.props.playerKey} store = {this.props.store} />
                <SongTime playerKey = {this.props.playerKey} store = {this.props.store} />
                <div className = 'position-container'>
                    <Position playerKey = {this.props.playerKey} store = {this.props.store} />
                </div>
                <div className = 'volume-container'>
                    <Volume playerKey = {this.props.playerKey} store = {this.props.store} />
                </div>
            </div>
        );
    }
}

export default AudioPlayer;
