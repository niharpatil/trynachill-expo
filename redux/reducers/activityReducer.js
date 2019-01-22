import types from '../actions/types'
import { 
  CHILL_STATUS_NONE,
  CHILL_STATUS_PENDING,
  CHILL_STATUS_SUCCESS,
  CHILL_STATUS_FAILURE 
} from '../../constants/AppConstants';

const {
  TOGGLE_CHILLER_SELECT,
  GET_CONTACTS_SUCCESS,
  CHILL_REQUESTED,
  CHILL_SUCCESS,
  CHILL_FAILURE,
  GET_ACTIVITY_REQUESTED,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
} = types;

const defaultState = {
  chillerUsers : {},
  chillRequestStatus: CHILL_STATUS_NONE,
  currentActivityId: null,
  currentActivity: null,
}

export const activityReducer = (state=defaultState,action) => {
  const stateCopy = Object.assign({}, state)
  switch (action.type) {
    case TOGGLE_CHILLER_SELECT:
      stateCopy.chillerUsers = Object.assign({}, stateCopy.chillerUsers)
      const {userid} = action;
      if (userid in state.chillerUsers) {
        stateCopy.chillerUsers[userid].selected = !stateCopy.chillerUsers[userid].selected
      }
      return stateCopy
    case GET_CONTACTS_SUCCESS:
      let {contacts} = action;
      contacts = contacts.filter(contact => contact.phoneNumbers)
      contacts = contacts.filter(contact => contact.phoneNumbers.some(pn => pn.label == 'mobile'))
      contacts = contacts.map(contact => ({...contact, phoneNumbers: contact.phoneNumbers.filter(pn => pn.label == 'mobile')}))
      contacts = contacts.map(contact => ({...contact, cellNumber: contact.phoneNumbers[0].number}))
      contacts.forEach(contact => delete contact.phoneNumbers)
      const contactsObj = {}
      contacts.forEach(contact => contactsObj[contact.id] = contact)
      stateCopy.chillerUsers = contactsObj
      return stateCopy
    case CHILL_REQUESTED:
      stateCopy.chillRequestStatus = CHILL_STATUS_PENDING;
      return stateCopy;
    case CHILL_SUCCESS:
      const {activityId} = action;
      stateCopy.chillRequestStatus = CHILL_STATUS_SUCCESS;
      stateCopy.currentActivityId = activityId;
      return stateCopy;
    case CHILL_FAILURE:
      stateCopy.chillRequestStatus = CHILL_STATUS_FAILURE;
      return stateCopy;
    case GET_ACTIVITY_SUCCESS:
      const { activity } = action;
      stateCopy.currentActivity = activity;
      return stateCopy;
    default:
      return stateCopy
  }
}