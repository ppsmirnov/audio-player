import React from 'react';
import ReactDom, { render } from 'react-dom';
import AudioPlayer from 'components/audioPlayer';

$(() => {

    const song = {
        src: '/samples/na-zare.mp3'
    };

    render(
        <AudioPlayer song = {song} />,
        document.querySelector('.test')
    );
});
