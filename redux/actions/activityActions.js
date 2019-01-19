import types from './types';
import axios from 'axios';

import {API_SERVER_BASE_URL} from '../../constants/APIConstants'

const {
  TOGGLE_CHILLER_SELECT,
  CHILL_FAILURE,
  CHILL_SUCCESS,
  CHILL_REQUESTED,
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

export function initiateChill ({chillerList, chillTime, chillLocation}) {
  const userids = chillerList;
  return dispatch => {
    dispatch({type: CHILL_REQUESTED})
    axios.post(`${API_SERVER_BASE_URL}/create_activity`, {
      userids,
      activity_type: CHILL_ACTIVITY_TYPE,
      activity_time: chillTime,
      activity_location: chillLocation,
    })
    .then(({data})=> {
      dispatch({
        type: CHILL_SUCCESS

      })
    })  
    .catch(error => {
      console.log(error)
      dispatch({
        type: CHILL_FAILURE,
        error
      })
    })
  }
}

export function getChillStatus (chillID) {
  //TODO
}