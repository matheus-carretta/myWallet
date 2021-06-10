// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { START_LOADING, FINISH_LOADING, GET_CURRENCIES } from '../actions';

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
  case GET_CURRENCIES:
    return {
      ...state,
      expenses: [...state.expenses, { ...payload.allData, id: state.expenses.length }],
    };
  default:
    return state;
  }
};
