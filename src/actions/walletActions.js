import { START_LOADING, FINISH_LOADING, GET_CURRENCIES } from './index';

const loadingAction = () => ({
  type: START_LOADING,
});

const finishLoading = (items) => ({
  type: FINISH_LOADING,
  payload: Object.keys(items),
});

const getCurrencies = (expenseData, currenciesData) => ({
  type: GET_CURRENCIES,
  payload: {
    allData: {
      ...expenseData,
      exchangeRates: currenciesData,
    },
  },
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(loadingAction());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  dispatch(finishLoading(result));
};

export const fetchCurrenciesData = (expenseData) => async (dispatch) => {
  dispatch(loadingAction());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  dispatch(getCurrencies(expenseData, result));
};
