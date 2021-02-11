import axios from 'axios';
import { showAlert } from './alerts';

export const getWithCollectionAndQueryString = async (
  collection,
  queryString
) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/${collection}?${queryString}`,
    });

    if (res.data.status === 'success') {
      console.log(res);
      return res;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const axiosReq = async (collection, data, method) => {
  try {
    const res = await axios({
      method,
      url: `/api/v1/${collection}`,
      data,
    });

    if (res.data.status === 'success') {
      console.log(res);
      return res;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};
