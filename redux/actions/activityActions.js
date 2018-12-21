import types from './types';
import axios from 'axios';

const API_SERVER_BASE_URL='http://localhost:3000/api'

const {
  TOGGLE_CHILLER_SELECT
} = types;

const CHILL_ACTIVITY_TYPE = 'CH';
const EAT_ACTIVITY_TYPE = 'EA';
const STUDY_ACTIVITY_TYPE = 'ST';




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
    axios.post(`${API_SERVER_BASE_URL}/create_activity`, {
      userids,
      activity_type: CHILL_ACTIVITY_TYPE,
    })
    .then(({data})=> {
      console.log(data)
    })  
    .catch(err => console.log(err))
  }
}

export function getChillStatus (chillID) {
  //TODO
}