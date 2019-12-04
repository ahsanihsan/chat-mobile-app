import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const URL = 'http://06cf7c22.ngrok.io';

const client = axios.create({
  baseURL: URL,
});
client.defaults.headers.common['Authorization'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFoc2FuLmloc2FuQG91dGxvb2suY29tIiwiaWF0IjoxNTc1MjIxMzg0LCJleHAiOjE1NzUzMDc3ODR9.eWyQQaxHzCB2u9YAS1-T3XL6aJ9TkaW_SPpxRuWEY-I';

const request = function(options) {
  const onSuccess = function(response) {
    if (response) {
      return response.data;
    }
  };

  const onError = function(error) {
    console.log('Request Failed:', error.config);

    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
