import axios from 'axios';

export const fetchWords = async (e) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/sentences',
    });
    return res.data.data.data;
  } catch (err) {
    console.log('Unable to fetch sentences');
  }
};

export const fetchUser = async (e) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/',
    });
    return res.data;
  } catch (err) {
    console.log('Unable to fetch user');
  }
};


