import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import {
    PLAY_PLAYER,
    PAUSE_PLAYER,
    PAUSE_ALL_PLAYERS
} from '../actions/actionTypes';

class Buttons extends Component {

    playMusic() {
        if (this.props.isPlaying) {
            this.props.store.dispatch({
                type: PAUSE_PLAYER,
                payload: {
                    key: this.props.playerKey
                }
            });
        } else {
            this.props.store.dispatch({type: PAUSE_ALL_PLAYERS});
            this.props.store.dispatch({
                type: PLAY_PLAYER,
                payload: {
                    key: this.props.playerKey
                }
            });
        }
    }

    render() {
        console.log(this.props);

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

export default connect((state, props) => {
    let isPlaying = false;

    if (state[props.playerKey]) {
        isPlaying = state[props.playerKey].isPlayed;
    }

    return { isPlaying };
})(Buttons);
