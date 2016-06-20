import React, { Component } from 'react';
import { Howl } from 'howler';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false
        };

        this.howler = new Howl({
            urls: [this.props.song.src],
        });
    }

    playMusic() {
        console.log(this.howler);

        if (this.state.playing) {
            console.log('Stop');
            this.howler.stop();
        } else {
            console.log('Play');
            this.howler.play();
        }

        this.setState({playing: !this.state.playing});
    }

    render() {
        return (
            <div className = 'audio-player' onClick = {this.playMusic.bind(this)}>
                test
            </div>
        );
    }
}

export default AudioPlayer;
