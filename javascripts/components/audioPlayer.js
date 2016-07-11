import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import Buttons from './buttons';
import Volume from './volume';
import Position from './position';
import SongTime from './songtime';

import {
    PLAYER_INIT,
    PLAYER_STOP,
    PLAYER_SET_DURATION,
    PLAYER_DESTROY
} from '../actions/actionTypes';

class AudioPlayer extends Component {

    getChildContext() {
        return {store: this.props.store};
    }

    componentDidMount() {
        this.props.store.dispatch({
            type: PLAYER_INIT,
            payload: {
                key: this.props.song.file_src,
                urls: [this.props.song.file_src],
                onEnd: this.stopAudio.bind(this),
                onMetaLoad: this.setDuration.bind(this)
            }
        });
    }


    setDuration() {
        this.props.store.dispatch({
            type: PLAYER_SET_DURATION,
            payload: {
                key: this.props.song.file_src
            }
        });
    }

    stopAudio() {
        this.props.store.dispatch({
            type: PLAYER_STOP,
            payload: {
                key: this.props.song.file_src
            }
        });
    }

    renderTitle() {
        if (this.props.song.artist && this.props.song.title) {
            return `${this.props.song.artist} - ${this.props.song.title}`;
        } else {
            return this.props.song.file_file_name;
        }
    }

    isStopped() {
        return this.props.status == 'stopped';
    }

    render() {
        const classes = cn(
            'audio-player',
            {
                'audio-player--stopped': this.isStopped(),
                'audio-player--non-playable': this.props.nonPlayable
            }
        );

        let position = <div className = 'position-container'>
            <div className = 'audio-player__title'>{this.renderTitle()}</div>
        </div>;

        let volume = null;

        if (!this.props.nonPlayable) {
            position = <div className = 'position-container'>
                <div className = 'audio-player__title'>{this.renderTitle()}</div>
                <Position playerKey = {this.props.song.file_src} />
            </div>
            volume = <div className = 'volume-container'>
                <SongTime playerKey = {this.props.song.file_src} />
                <Volume playerKey = {this.props.song.file_src} />
            </div>
        }

        return (
            <div className = {classes}>
                <Buttons playerKey = {this.props.song.file_src}
                         nonPlayable = {this.props.nonPlayable}/>
                {position}
                {volume}
            </div>
        );
    }
}

AudioPlayer.childContextTypes = {
    store: PropTypes.object
};

export default connect((state, props) => {
    let status = 'stopped';

    if (state.getIn([props.song.file_src])) {
        status = state.getIn([props.song.file_src, 'status']);
    }

    return { status };
})(AudioPlayer);
