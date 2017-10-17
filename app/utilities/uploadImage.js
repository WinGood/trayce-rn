import CryptoJS from 'crypto-js';

export default function uploadImage(image, cb) {
  let timestamp   = (Date.now() / 1000 | 0).toString();
  let api_key     = '778128863833446'
  let api_secret  = 'CHXcqUeciQvFEPHfRvDoDcH7a2I'
  let cloud       = 'www-mollerhoj-com'
  let hash_string = 'timestamp=' + timestamp + api_secret
  let signature   = CryptoJS.SHA1(hash_string).toString();
  let upload_url  = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

  let xhr = new XMLHttpRequest();
  xhr.open('POST', upload_url);
  xhr.onload  = (resp) => {
    const response = JSON.parse(resp.currentTarget._response);
    cb(null, response.public_id);
  };
  xhr.onerror = (err) => {
    cb(err);
  }

  let formdata = new FormData();
  formdata.append('file', {
    uri: image.path,
    type: image.mime,
    name: 'upload.png'
  });

  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);
  xhr.send(formdata);
}