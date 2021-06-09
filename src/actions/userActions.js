import { SAVE_EMAIL } from './index';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export default saveEmail;
