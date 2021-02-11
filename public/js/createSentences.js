import axios from 'axios';
import { showAlert } from './alerts';

export const postSentence = async (
  sentence,
  translation,
  level,
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
        level,
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
