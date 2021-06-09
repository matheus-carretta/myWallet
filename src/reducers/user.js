// Esse reducer será responsável por tratar as informações da pessoa usuária
import SAVE_EMAIL from '../actions/index';

const initialState = {
  user: {
    email: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      user: { email: payload },
    };
  default:
    return state;
  }
};
