import RNFetchBlob from 'react-native-fetch-blob';
import store from '../config/store';

const basePath = (__DEV__) ? 'https://trayce.herokuapp.com/api/v1' : 'https://trayce.herokuapp.com/api/v1';
let token      = '';

store.subscribe(() => {
  token = store.getState().userSession.token;
});

const methods = {
  get(path) {
    return fetch(basePath + path, {
      headers: {
        'access_token': token
      }
    })
  },
  post(path, body) {
    return fetch(basePath + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify(body)
    });
  },
  put(path, body) {
    return fetch(basePath + path, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify(body)
    })
  },
  patch(path, body) {
    return fetch(basePath + path, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify(body)
    })
  },
  delete(path) {
    return fetch(basePath + path, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access_token': token
      }
    })
  },
  uploadPhoto(path, car, photo) {
    let fd = new FormData();
    fd.append('image', [photo]);

    return RNFetchBlob.fetch('POST', basePath + path, {
      'access_token': token,
      'Content-Type': 'multipart/form-data',
    }, [{
      name: 'image',
      filename: 'photo.jpg',
      type: photo.mime,
      data: RNFetchBlob.wrap(photo.path)
    }, {
      name: 'carId',
      data: JSON.stringify(car._id)
    }]);
  }
}

export default methods;