import types from './types';
import axios from 'axios';

const {
  TOGGLE_CHILLER_SELECT
} = types;

export function toggleChillerSelection (userid) {
  return dispatch => {
    dispatch({
      type: TOGGLE_CHILLER_SELECT,
      userid
    })
  }
}

export function initiateChill (userids) {
  return dispatch => {
    axios.post('/initiate_chill', {
      userids
    })
    .then(({data})=> {

    })  
    .catch(err => console.log(err))
  }
}

export function getChillStatus (chillID) {
  //TODO
}