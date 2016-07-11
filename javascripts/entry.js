import React from 'react';
import ReactDom, { render } from 'react-dom';
import { createStore, compose } from 'redux';

import rootReducer from './reducers/rootReducer';
import AudioPlayer from './components/audioPlayer';

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
        file_src: '/samples/na-zare.mp3',
        artist: 'Альянс',
        title: 'На Заре'
    };

    const song2 = {
        file_src: '/samples/na-zare-cover.mp3',
        artist: 'Не Твоё Дело',
        title: 'На Заре'
    };

    const song3 = {
        file_src: '/samples/ja-budu-ryadom.mp3',
        artist: 'Не твоё дело',
        title: 'Я буду рядом'
    };

    render(
        <AudioPlayer song = {song} store = {store}/>,
        document.querySelector('.test')
    );

    render(
        <AudioPlayer song = {song2} store = {store}/>,
        document.querySelector('.test2')
    );

    render(
        <AudioPlayer song = {song3} store = {store}/>,
        document.querySelector('.test3')
    );
});
