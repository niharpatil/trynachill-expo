import types from './types';
import axios from 'axios';
import {Contacts} from 'expo';

import {API_SERVER_BASE_URL} from '../../constants/APIConstants'

const {
  TOGGLE_CHILLER_SELECT,
  CHILL_FAILURE,
  CHILL_SUCCESS,
  CHILL_REQUESTED,
  GET_CONTACTS_REQUESTED,
  GET_CONTACTS_FAILURE,
  GET_CONTACTS_SUCCESS,
  GET_ACTIVITY_REQUESTED,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
} = types;

const CHILL_ACTIVITY_TYPE = 'CH';
const EAT_ACTIVITY_TYPE = 'EA';
const STUDY_ACTIVITY_TYPE = 'ST';


export function initializeChillerUsers () {
  return async dispatch => {
    dispatch({
      type: GET_CONTACTS_REQUESTED,
    }) 

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.PHONE_NUMBERS],
    }); 
    dispatch({
      type: GET_CONTACTS_SUCCESS,
      contacts: data
    })
  }
}


export function toggleChillerSelection (userid) {
  return dispatch => {
    dispatch({
      type: TOGGLE_CHILLER_SELECT,
      userid
    })
  }
}

export function initiateChill ({chillerList, chillTime, chillLocation}) {
  const users = chillerList;
  return dispatch => {
    dispatch({type: CHILL_REQUESTED})
    axios.post(`${API_SERVER_BASE_URL}/create_activity`, {
      users,
      activity_type: EAT_ACTIVITY_TYPE,
      activity_time: chillTime,
      activity_location: chillLocation,
    })
    .then( ({data}) => {
      const activityId = data['activity_id']
      dispatch({
        type: CHILL_SUCCESS,
        activityId,
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

export function getActivityStatus (activityId) {
  return dispatch => {
    dispatch({type: GET_ACTIVITY_REQUESTED})
    axios.post(`${API_SERVER_BASE_URL}/activity_status`, {
      activity_id: activityId
    })
    .then( ({data}) => {
      const activity = data;
      dispatch({
        type: GET_ACTIVITY_SUCCESS,
        activity
      })
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: GET_ACTIVITY_FAILURE,
        error
      })
    })
  }
}