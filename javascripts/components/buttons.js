import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import {
    PLAYER_PLAY,
    PLAYER_PAUSE,
    PLAYER_PAUSE_ALL
} from '../actions/actionTypes';

class Buttons extends Component {

    playMusic() {
        if (this.props.nonPlayable) return;

        if (this.isPlaying()) {
            this.context.store.dispatch({
                type: PLAYER_PAUSE,
                payload: {
                    key: this.props.playerKey
                }
            });
        } else {
            this.context.store.dispatch({type: PLAYER_PAUSE_ALL});
            this.context.store.dispatch({
                type: PLAYER_PLAY,
                payload: {
                    key: this.props.playerKey
                }
            });
        }
    }

    isPlaying() {
        return this.props.status == 'playing';
    }

    render() {
        const classes = cn(
            'audio-player__buttons',
            {
                'audio-player__buttons--playing': this.isPlaying(),
                'audio-player__buttons--non-playable': this.props.nonPlayable
            }
        );

        return (
            <div className = {classes} onClick = {this.playMusic.bind(this)}>
                <div className = 'audio-player__buttons-inner' />
            </div>
        );
    }
}

Buttons.contextTypes = {
    store: PropTypes.object
};

export default connect((state, props) => {
    let status = 'stopped';

    if (state.getIn([props.playerKey])) {
        status = state.getIn([props.playerKey, 'status']);
    }

    return { status };
})(Buttons);
