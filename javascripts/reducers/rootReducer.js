import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const rootReducer = (state = {}, action) => {

    if (action.type == actionTypes.INIT_PLAYER) {

        const audio = new Audio(action.payload.urls);
        audio.volume = 0.5;
        audio.onended = action.payload.onEnd;

        const newState = _.merge(state, {
            [action.payload.key]: {
                audio: audio,
                isPlayed: false
            }
        });

        return newState;
    }

    if (action.type == actionTypes.PLAY_PLAYER) {

        const audio = state[action.payload.key].audio;
        audio.play();

        const newState = _.merge(state, {
            [action.payload.key]: {
                audio: audio,
                isPlayed: true
            }
        });

        return newState;
    }

    if (action.type == actionTypes.PAUSE_PLAYER) {

        const audio = state[action.payload.key].audio;
        audio.pause();

        const newState = _.merge(state, {
            [action.payload.key]: {
                audio: audio,
                isPlayed: false
            }
        });

        console.log(newState);
        return newState;
    }

    if (action.type == actionTypes.STOP_PLAYER) {

        const audio = state[action.payload.key].audio;
        audio.pause();
        audio.currentTime = 0;

        const newState = _.merge(state, {
            [action.payload.key]: {
                audio: audio,
                isPlayed: false
            }
        });

        return newState;
    }

    if (action.type == actionTypes.PAUSE_ALL_PLAYERS) {
        return _.mapValues(state, (obj) => {
            obj.audio.pause();
            obj.isPlayed = false;

            return obj;
        });
    }

    return state;
};

export default rootReducer;
