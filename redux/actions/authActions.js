import axios from "axios";
import {API_SERVER_BASE_URL} from '../../constants/APIConstants'


export const postFBLogin = (fbUserData) => {
  axios.post(`${API_SERVER_BASE_URL}/auth/facebook/callback`, fbUserData)
  .then(resp => {
    // TODO
  })
}