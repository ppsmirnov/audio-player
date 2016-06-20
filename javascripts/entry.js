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
        src: '/samples/na-zare.mp3'
    };

    render(
        <AudioPlayer song = {song} store = {store}/>,
        document.querySelector('.test')
    );
});
