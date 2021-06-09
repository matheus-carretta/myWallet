import { START_LOADING, FINISH_LOADING } from './index';

const loadingAction = () => ({
  type: START_LOADING,
});

const finishLoading = (items) => ({
  type: FINISH_LOADING,
  payload: Object.keys(items),
});

const fetchCurrencies = () => async (dispatch) => {
  dispatch(loadingAction());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  dispatch(finishLoading(result));
};

export default fetchCurrencies;
