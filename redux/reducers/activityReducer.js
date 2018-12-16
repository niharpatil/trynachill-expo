import types from '../actions/types'

const {
  TOGGLE_CHILLER_SELECT
} = types;

const anon_user_vector="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fanonymous-avatar-information-button_318-32279.jpg"


const defaultState = {
  chillerUsers : {
    1: { image_url: anon_user_vector, name: "John David"},
    2: { image_url: anon_user_vector, name: "Sanjit Kalapatagod"},
    3: { image_url: anon_user_vector, name: "Pranav Pillai" },
  },
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
    default:
      return stateCopy
  }
}