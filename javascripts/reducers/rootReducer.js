import * as actionTypes from '../actions/actionTypes';
import { Howl } from 'howler';

const rootReducer = (state = {}, action) => {
    if (action.type == actionTypes.INIT_PLAYER) {

        const newState = {
            [action.payload.key]: {
                howler: new Howl({urls: action.payload.urls}),
                isPlayed: false
            }
        };

        return newState;
    }

    if (action.type == actionTypes.PLAY_PLAYER) {

        let howler = state[action.payload.key].howler;
        howler.play();

        const newState = {
            [action.payload.key]: {
                howler,
                isPlayed: true
            }
        };

        return newState;
    }

    if (action.type == actionTypes.STOP_PLAYER) {

        let howler = state[action.payload.key].howler;
        howler.stop();

        const newState = {
            [action.payload.key]: {
                howler,
                isPlayed: false
            }
        };

        return newState;
    }

    return state;
};

export default rootReducer;
