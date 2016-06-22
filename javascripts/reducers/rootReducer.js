import * as actionTypes from '../actions/actionTypes';

const rootReducer = (state = {}, action) => {
    if (action.type == actionTypes.INIT_PLAYER) {

        const newState = {
            [action.payload.key]: {
                audio: new Audio(action.payload.urls),
                isPlayed: false
            }
        };

        return newState;
    }

    if (action.type == actionTypes.PLAY_PLAYER) {

        let audio = state[action.payload.key].audio;
        audio.play();

        const newState = {
            [action.payload.key]: {
                audio,
                isPlayed: true
            }
        };

        return newState;
    }

    if (action.type == actionTypes.PAUSE_PLAYER) {

        let audio = state[action.payload.key].audio;
        audio.pause();

        const newState = {
            [action.payload.key]: {
                audio,
                isPlayed: false
            }
        };

        return newState;
    }

    return state;
};

export default rootReducer;
