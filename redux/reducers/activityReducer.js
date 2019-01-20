import types from '../actions/types'

const {
  TOGGLE_CHILLER_SELECT,
  GET_CONTACTS_SUCCESS,
} = types;

const anon_user_vector="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fanonymous-avatar-information-button_318-32279.jpg"


const defaultState = {
  chillerUsers : {},
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
      contacts = contacts.filter(contact => contact.phoneNumbers.some(pn => pn.label == 'mobile'))
      contacts = contacts.map(contact => ({...contact, phoneNumbers: contact.phoneNumbers.filter(pn => pn.label == 'mobile')}))
      contacts = contacts.map(contact => ({...contact, cellNumber: contact.phoneNumbers[0].number}))
      contacts.forEach(contact => delete contact.phoneNumbers)
      const contactsObj = {}
      contacts.forEach(contact => contactsObj[contact.id] = contact)
      stateCopy.chillerUsers = contactsObj
      return stateCopy
    default:
      return stateCopy
  }
}