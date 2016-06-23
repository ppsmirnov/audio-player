import React from 'react';
import ReactDom, { render } from 'react-dom';
import { createStore, compose } from 'redux';

import rootReducer from './reducers/rootReducer';
import AudioPlayer from 'components/audioPlayer';

const initStore = (changeMiddlewares = mws => mws) => createStore(

    //use root reducer
    rootReducer,

    compose(
        ...changeMiddlewares([
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ])
    )
);

const store = initStore();

$(() => {

    const song = {
        src: '/samples/na-zare.mp3',
        key: 'na-zare'
    };

    const song2 = {
        src: '/samples/na-zare-cover.mp3',
        key: 'na-zare-cover'
    };

    render(
        <AudioPlayer song = {song} playerKey = 'na-zare' store = {store}/>,
        document.querySelector('.test')
    );

    render(
        <AudioPlayer song = {song2} playerKey = 'na-zare-cover' store = {store}/>,
        document.querySelector('.test2')
    );
});
