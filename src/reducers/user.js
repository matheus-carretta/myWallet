// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions/index';

const initialState = {
  email: '',
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default user;
