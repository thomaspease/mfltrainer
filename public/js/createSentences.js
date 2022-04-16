import axios from 'axios';
import { showAlert } from './alerts';

export const postSentence = async (
  sentence,
  translation,
  vivaRef,
  tense,
  grammar
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/sentences',
      data: {
        sentence,
        translation,
        vivaRef,
        grammar,
        tense,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Sentence created!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
