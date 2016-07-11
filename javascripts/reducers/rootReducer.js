import * as actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';
import _ from 'lodash';

const rootReducer = (state=fromJS({}), action) => {

  if (action.type == actionTypes.PLAYER_INIT) {
      const audio = new Audio(action.payload.urls);
      audio.volume = 0.5;
      audio.preload = 'none';
      audio.onended = action.payload.onEnd;
      audio.onloadedmetadata = action.payload.onMetaLoad;

      return state.setIn([action.payload.key, 'audio'], audio)
                  .setIn([action.payload.key, 'status'], 'stopped');
  }

  if (action.type == actionTypes.PLAYER_PLAY) {
      const audio = state.getIn([action.payload.key, 'audio']);
      audio.play();

      return state.setIn([action.payload.key, 'status'], 'playing');
  }

  if (action.type == actionTypes.PLAYER_PAUSE) {
      const audio = state.getIn([action.payload.key, 'audio']);
      audio.pause();

      return state.setIn([action.payload.key, 'status'], 'paused');
  }

  if (action.type == actionTypes.PLAYER_PAUSE_ALL) {
      return state.map(obj => {
          obj.get('audio').pause();

          if (obj.get('status') == 'playing') {
              return obj.set('status', 'paused');
          } else {
              return obj;
          }
      });
  }

  if (action.type == actionTypes.PLAYER_STOP) {
      const audio = state.getIn([action.payload.key, 'audio']);
      audio.pause();
      audio.currentTime = 0;

      return state.setIn([action.payload.key, 'status'], 'stopped');
  }

  if (action.type == actionTypes.PLAYER_SET_DURATION) {
      const audio = state.getIn([action.payload.key, 'audio']);

      if (audio) {
          return state.setIn([action.payload.key, 'duration'], audio.duration);
      } else {
          return state;
      }
  }

  return state;
};

export default rootReducer;
