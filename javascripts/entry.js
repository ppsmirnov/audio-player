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

class TestDiv extends React.Component {
    componentDidMount() {
        setInterval(() => {
            this.forceUpdate();
        }, 200);
    }

    render() {
        console.log('TestDiv render!');
        return (
            <div>{this.props.children}</div>
        );
    }
}

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

    const song3 = {
        src: '/samples/ja-budu-ryadom.mp3',
        key: 'budu'
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
