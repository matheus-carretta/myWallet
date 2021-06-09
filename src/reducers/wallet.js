// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { START_LOADING, FINISH_LOADING } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case START_LOADING:
    return {
      ...state,
    };
  case FINISH_LOADING:
    return {
      ...state,
      currencies: payload,
    };

  default:
    return state;
  }
};
