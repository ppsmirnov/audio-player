import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import {
    PLAY_PLAYER,
    PAUSE_PLAYER
} from '../actions/actionTypes';

class Buttons extends Component {

    playMusic() {
        if (this.props.isPlaying) {
            this.props.store.dispatch({
                type: PAUSE_PLAYER,
                payload: {
                    key: 'na-zare'
                }
            });
        } else {
            this.props.store.dispatch({
                type: PLAY_PLAYER,
                payload: {
                    key: 'na-zare'
                }
            });
        }
    }

    render() {
        const playing = this.props.isPlaying;

        const classes = cn(
            'audio-player__buttons',
            {
                'audio-player__buttons--playing': playing
            }
        );

        return (
            <div className = {classes} onClick = {this.playMusic.bind(this)}>
            </div>
        );
    }
}

export default connect((state) => {
    let isPlaying = false;

    if (state['na-zare']) {
        isPlaying = state['na-zare'].isPlayed;
    }

    return { isPlaying };
})(Buttons);
